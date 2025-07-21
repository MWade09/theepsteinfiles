'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  PenTool, 
  Link,
  ZoomIn,
  ZoomOut,
  Eye,
  Calendar,
  User,
  ExternalLink,
  Verified,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Evidence, Annotation } from '@/types/investigation';
import { coreDocuments } from '@/data/core/documents';
import { corePeople } from '@/data/core/people';
import { comprehensiveTimeline } from '@/data/core/timeline';

interface DocumentViewerProps {
  documentId?: string;
  isEmbedded?: boolean;
}

export default function DocumentViewer({ documentId, isEmbedded = false }: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<Evidence | null>(null);
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [showAnnotations] = useState(true);
  const [selectedText, setSelectedText] = useState('');
  const [annotationMode, setAnnotationMode] = useState<'highlight' | 'note' | 'cross-reference' | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'info' | 'annotations' | 'references' | 'analysis'>('info');
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Load document
  useEffect(() => {
    if (documentId) {
      const doc = coreDocuments.find(d => d.id === documentId);
      if (doc) {
        setSelectedDoc(doc);
        setAnnotations(doc.annotations || []);
      }
    } else if (coreDocuments.length > 0) {
      setSelectedDoc(coreDocuments[0]);
      setAnnotations(coreDocuments[0].annotations || []);
    }
  }, [documentId]);

  // Search and highlight functionality
  useEffect(() => {
    if (searchTerm && selectedDoc?.content?.text) {
      const regex = new RegExp(searchTerm, 'gi');
      const matches = selectedDoc.content.text.match(regex) || [];
      setHighlightedText(matches);
    } else {
      setHighlightedText([]);
    }
  }, [searchTerm, selectedDoc]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
    }
  };

  const addAnnotation = (type: 'highlight' | 'note' | 'cross-reference', content: string) => {
    if (!selectedDoc || !selectedText) return;

    const newAnnotation: Annotation = {
      id: `annotation_${Date.now()}`,
      type,
      content,
      authorId: 'current_user',
      createdDate: new Date().toISOString(),
      significance: 'medium',
      startPosition: 0, // In a real implementation, you'd calculate this
      endPosition: selectedText.length
    };

    setAnnotations([...annotations, newAnnotation]);
    setSelectedText('');
    setAnnotationMode(null);
  };

  const getRelatedPeople = () => {
    if (!selectedDoc) return [];
    return corePeople.filter(person => 
      selectedDoc.relatedEntities.includes(person.id)
    );
  };

  const getRelatedEvents = () => {
    if (!selectedDoc) return [];
    return comprehensiveTimeline.filter(event => 
      selectedDoc.relatedEvents.includes(event.id)
    );
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Verified className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getSignificanceBadge = (significance: string) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded border ${colors[significance as keyof typeof colors]}`}>
        {significance.toUpperCase()}
      </span>
    );
  };

  if (!selectedDoc) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No document selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isEmbedded ? 'h-full' : 'min-h-screen'} flex bg-gray-50 dark:bg-dark-900`}>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {selectedDoc.title}
              </h1>
              <div className="flex items-center space-x-2">
                {getVerificationBadge(selectedDoc.verificationStatus)}
                {getSignificanceBadge(selectedDoc.significance)}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-1 border-l border-gray-200 pl-2">
                <button 
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 min-w-[50px] text-center">{zoom}%</span>
                <button 
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-1 border-l border-gray-200 pl-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Annotation Tools */}
          {selectedText && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  Selected: &quot;{selectedText.length > 50 ? selectedText.substring(0, 50) + '...' : selectedText}&quot;
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setAnnotationMode('highlight')}
                    className="flex items-center space-x-1 px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm hover:bg-yellow-300"
                  >
                    <PenTool className="w-3 h-3" />
                    <span>Highlight</span>
                  </button>
                  <button
                    onClick={() => setAnnotationMode('note')}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-200 text-blue-800 rounded text-sm hover:bg-blue-300"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Note</span>
                  </button>
                  <button
                    onClick={() => setAnnotationMode('cross-reference')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-200 text-green-800 rounded text-sm hover:bg-green-300"
                  >
                    <Link className="w-3 h-3" />
                    <span>Cross-ref</span>
                  </button>
                </div>
              </div>
              
              {annotationMode && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder={`Add ${annotationMode}...`}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addAnnotation(annotationMode, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-auto p-6">
          <div 
            ref={contentRef}
            className="max-w-4xl mx-auto bg-white dark:bg-dark-800 shadow-lg rounded-lg p-8"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            onMouseUp={handleTextSelection}
          >
            {/* Document Header */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {selectedDoc.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedDoc.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{selectedDoc.subtype}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedDoc.content?.pageCount || 1} pages</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Confidence Level</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {selectedDoc.confidenceLevel.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Document Text Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div 
                className="whitespace-pre-wrap font-mono text-sm leading-relaxed"
                onMouseUp={handleTextSelection}
                ref={contentRef}
              >
                {(() => {
                  const content = selectedDoc.content?.text || 'Document content not available.';
                  
                  if (highlightedText.length > 0 && searchTerm) {
                    // Create highlighted content
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const parts = content.split(regex);
                    
                    return parts.map((part, index) => {
                      if (part.toLowerCase() === searchTerm.toLowerCase()) {
                        return (
                          <mark 
                            key={index}
                            className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded"
                          >
                            {part}
                          </mark>
                        );
                      }
                      return part;
                    });
                  }
                  
                  return content;
                })()}
              </div>
            </div>

            {/* Annotations Overlay */}
            {showAnnotations && annotations.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Annotations</h3>
                <div className="space-y-3">
                  {annotations.map((annotation) => (
                    <div key={annotation.id} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {annotation.type === 'highlight' && <PenTool className="w-4 h-4 text-yellow-600" />}
                          {annotation.type === 'note' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                          {annotation.type === 'cross-reference' && <Link className="w-4 h-4 text-green-600" />}
                          <span className="font-medium capitalize">{annotation.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(annotation.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">{annotation.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 flex flex-col">
        {/* Sidebar Tabs */}
        <div className="border-b border-gray-200 dark:border-dark-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Info', icon: FileText },
              { id: 'annotations', label: 'Notes', icon: MessageSquare },
              { id: 'references', label: 'References', icon: Link },
              { id: 'analysis', label: 'Analysis', icon: Search }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id as 'info' | 'annotations' | 'references' | 'analysis')}
                className={`flex-1 flex items-center justify-center space-x-1 px-3 py-3 text-sm font-medium ${
                  sidebarTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto p-4">
          {sidebarTab === 'info' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Document Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="ml-2 font-medium">{selectedDoc.subtype}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="ml-2 font-medium">{new Date(selectedDoc.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Access Level:</span>
                    <span className="ml-2 font-medium capitalize">{selectedDoc.accessLevel}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Description</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedDoc.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Sources</h3>
                <div className="space-y-2">
                  {selectedDoc.sources.map((source) => (
                    <div key={source.id} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{source.title}</h4>
                        {source.url && (
                          <ExternalLink className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {source.author} • {source.publication}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          source.reliability === 'high' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {source.reliability.toUpperCase()}
                        </span>
                        {source.publicationDate && (
                          <span className="text-xs text-gray-500">
                            {new Date(source.publicationDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sidebarTab === 'annotations' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Annotations ({annotations.length})</h3>
              
              {annotations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No annotations yet. Select text to add notes.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {annotations.map((annotation) => (
                    <div key={annotation.id} className="p-3 border border-gray-200 dark:border-dark-600 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {annotation.type === 'highlight' && <PenTool className="w-3 h-3 text-yellow-600" />}
                        {annotation.type === 'note' && <MessageSquare className="w-3 h-3 text-blue-600" />}
                        {annotation.type === 'cross-reference' && <Link className="w-3 h-3 text-green-600" />}
                        <span className="text-xs font-medium capitalize text-gray-600">
                          {annotation.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(annotation.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{annotation.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {sidebarTab === 'references' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Related People</h3>
                <div className="space-y-2">
                  {getRelatedPeople().map((person) => (
                    <div key={person.id} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-sm">{person.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {person.occupations.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Related Events</h3>
                <div className="space-y-2">
                  {getRelatedEvents().map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-sm">{event.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sidebarTab === 'analysis' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Document Analysis</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-600">{selectedDoc.content?.pageCount || 1}</div>
                  <div className="text-xs text-gray-600">Pages</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600">{annotations.length}</div>
                  <div className="text-xs text-gray-600">Annotations</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600">{selectedDoc.relatedEntities.length}</div>
                  <div className="text-xs text-gray-600">Entities</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg text-center">
                  <div className="text-lg font-bold text-orange-600">{selectedDoc.sources.length}</div>
                  <div className="text-xs text-gray-600">Sources</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Word Count:</span>
                    <span className="font-medium">
                      {selectedDoc.content?.text ? selectedDoc.content.text.split(' ').length.toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">
                      {new Date(selectedDoc.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verification:</span>
                    <span className="font-medium capitalize">{selectedDoc.verificationStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 