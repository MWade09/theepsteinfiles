'use client';

import { useState, useRef } from 'react';
import { 
  Download, 
  FileText, 
  BookOpen, 
  Bookmark,
  Copy,
  Calendar,
  User,
  DollarSign,
  MapPin,
  Printer,
  Plus,
  Trash2,
  Edit3,
  Save
} from 'lucide-react';
import { corePeople } from '@/data/core/people';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { coreRelationships } from '@/data/core/relationships';
import { financialTransactions } from '@/data/financial/transactions';
import { coreOrganizations } from '@/data/core/organizations';

interface ResearchNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  linkedData: {
    type: 'person' | 'event' | 'transaction' | 'organization' | 'relationship';
    id: string;
    title: string;
  }[];
}

interface Bookmark {
  id: string;
  title: string;
  description: string;
  type: 'person' | 'event' | 'transaction' | 'organization' | 'relationship' | 'search';
  dataId: string;
  url: string;
  createdAt: string;
  tags: string[];
}

interface Citation {
  type: 'apa' | 'mla' | 'chicago' | 'harvard';
  content: string;
}

interface ResearchToolsProps {
  className?: string;
}

export default function ResearchTools({ className = '' }: ResearchToolsProps) {
  const [activeTab, setActiveTab] = useState<'export' | 'notes' | 'bookmarks' | 'citations'>('export');
  const [researchNotes, setResearchNotes] = useState<ResearchNote[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [] as string[] });
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  // Generate PDF Report
  const generatePDFReport = async () => {
    const reportData = {
      title: 'Jeffrey Epstein Investigation Report',
      generatedAt: new Date().toISOString(),
      summary: {
        totalPeople: corePeople.length,
        totalEvents: comprehensiveTimeline.length,
        totalTransactions: financialTransactions.length,
        totalOrganizations: coreOrganizations.length,
        totalRelationships: coreRelationships.length,
        financialTotal: financialTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)
      },
      data: {
        people: corePeople,
        events: comprehensiveTimeline,
        transactions: financialTransactions,
        organizations: coreOrganizations,
        relationships: coreRelationships
      },
      notes: researchNotes
    };

    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reportData.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
          .summary { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .section { margin-bottom: 40px; }
          .section h2 { color: #1e40af; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
          .item { margin-bottom: 20px; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; }
          .item h3 { margin: 0 0 10px 0; color: #374151; }
          .meta { color: #6b7280; font-size: 14px; margin-bottom: 8px; }
          .tags { margin-top: 8px; }
          .tag { background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-right: 4px; }
          .financial { color: #059669; font-weight: bold; }
          .critical { color: #dc2626; font-weight: bold; }
          .high { color: #ea580c; font-weight: bold; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${reportData.title}</h1>
          <p>Generated on ${new Date(reportData.generatedAt).toLocaleDateString()}</p>
        </div>
        
        <div class="summary">
          <h2>Investigation Summary</h2>
          <p><strong>Total People:</strong> ${reportData.summary.totalPeople}</p>
          <p><strong>Total Events:</strong> ${reportData.summary.totalEvents}</p>
          <p><strong>Total Organizations:</strong> ${reportData.summary.totalOrganizations}</p>
          <p><strong>Financial Transactions:</strong> ${reportData.summary.totalTransactions}</p>
          <p class="financial"><strong>Total Financial Amount:</strong> $${reportData.summary.financialTotal.toLocaleString()}</p>
          <p><strong>Relationships Mapped:</strong> ${reportData.summary.totalRelationships}</p>
        </div>
        
        ${reportData.data.people.length > 0 ? `
        <div class="section">
          <h2>Key People</h2>
          ${reportData.data.people.map(person => `
            <div class="item">
              <h3>${person.name}</h3>
              <div class="meta">Occupations: ${person.occupations.join(', ')} | Significance: ${person.significance}</div>
              <p>${person.biography}</p>
              ${person.aliases.length > 0 ? `<p><strong>Aliases:</strong> ${person.aliases.join(', ')}</p>` : ''}
              <div class="tags">
                ${person.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${reportData.data.events.length > 0 ? `
        <div class="section">
          <h2>Timeline Events</h2>
          ${reportData.data.events.map(event => `
            <div class="item">
              <h3>${event.title}</h3>
              <div class="meta">Date: ${event.date} | Significance: <span class="${event.significance}">${event.significance}</span></div>
              <p>${event.description}</p>
              ${event.entities.length > 0 ? `<p><strong>Entities Involved:</strong> ${event.entities.join(', ')}</p>` : ''}
              <div class="tags">
                ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${reportData.data.transactions.length > 0 ? `
        <div class="section">
          <h2>Financial Transactions</h2>
          ${reportData.data.transactions.map(transaction => `
            <div class="item">
              <h3>${transaction.description}</h3>
              <div class="meta">Date: ${transaction.transactionDate} | Amount: <span class="financial">$${(transaction.amount || 0).toLocaleString()}</span></div>
              <p><strong>From:</strong> ${transaction.fromEntity} → <strong>To:</strong> ${transaction.toEntity}</p>
              ${transaction.purpose ? `<p><strong>Purpose:</strong> ${transaction.purpose}</p>` : ''}
              <div class="tags">
                ${transaction.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${researchNotes.length > 0 ? `
        <div class="section">
          <h2>Research Notes</h2>
          ${researchNotes.map(note => `
            <div class="item">
              <h3>${note.title}</h3>
              <div class="meta">Created: ${new Date(note.createdAt).toLocaleDateString()}</div>
              <p>${note.content}</p>
              <div class="tags">
                ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        <div class="footer">
          <p>This report was generated by the Jeffrey Epstein Investigation Platform</p>
          <p>For verification and sources, please refer to the original investigation data</p>
        </div>
      </body>
      </html>
    `;

    // Create and download the HTML file (can be converted to PDF by browser)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `epstein-investigation-report-${new Date().toISOString().split('T')[0]}.html`;
      downloadLinkRef.current.click();
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  // Export CSV Data
  const exportCSV = (type: 'people' | 'events' | 'transactions' | 'organizations') => {
    let csvContent = '';
    let filename = '';

    switch (type) {
      case 'people':
        filename = 'epstein-people';
        csvContent = [
          'ID,Name,Occupations,Significance,Biography,Aliases,Tags',
          ...corePeople.map(person => [
            person.id,
            person.name,
            person.occupations.join('; '),
            person.significance,
            person.biography.replace(/,/g, ';'),
            person.aliases.join('; '),
            person.tags.join('; ')
          ].map(field => field.includes(',') ? `"${field}"` : field).join(','))
        ].join('\n');
        break;
      case 'events':
        filename = 'epstein-timeline';
        csvContent = [
          'ID,Date,Title,Description,Significance,Entities,Tags',
          ...comprehensiveTimeline.map(event => [
            event.id,
            event.date,
            event.title,
            event.description.replace(/,/g, ';'),
            event.significance,
            event.entities.join('; '),
            event.tags.join('; ')
          ].map(field => field.includes(',') ? `"${field}"` : field).join(','))
        ].join('\n');
        break;
      case 'transactions':
        filename = 'epstein-financial';
        csvContent = [
          'ID,Date,Description,Amount,From Entity,To Entity,Purpose,Tags',
          ...financialTransactions.map(transaction => [
            transaction.id,
            transaction.transactionDate,
            transaction.description.replace(/,/g, ';'),
            transaction.amount?.toString() || '',
            transaction.fromEntity,
            transaction.toEntity,
            transaction.purpose || '',
            transaction.tags.join('; ')
          ].map(field => field.includes(',') ? `"${field}"` : field).join(','))
        ].join('\n');
        break;
      case 'organizations':
        filename = 'epstein-organizations';
        csvContent = [
          'ID,Name,Type,Description,Tags',
          ...coreOrganizations.map(org => [
            org.id,
            org.name,
            org.type,
            org.description.replace(/,/g, ';'),
            org.tags.join('; ')
          ].map(field => field.includes(',') ? `"${field}"` : field).join(','))
        ].join('\n');
        break;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
      downloadLinkRef.current.click();
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  // Generate Citations
  const generateCitation = (type: 'apa' | 'mla' | 'chicago' | 'harvard'): Citation => {
    const currentDate = new Date().toLocaleDateString();
    const url = "https://epstein-investigation.com";
    
    switch (type) {
      case 'apa':
        return {
          type: 'apa',
          content: `Jeffrey Epstein Investigation Platform. (2024). *Investigation database and analysis tools* [Database]. Retrieved ${currentDate}, from ${url}`
        };
      case 'mla':
        return {
          type: 'mla',
          content: `"Jeffrey Epstein Investigation Platform." *Investigation Database and Analysis Tools*, 2024, ${url}. Accessed ${currentDate}.`
        };
      case 'chicago':
        return {
          type: 'chicago',
          content: `Jeffrey Epstein Investigation Platform. "Investigation Database and Analysis Tools." Database. ${url} (accessed ${currentDate}).`
        };
      case 'harvard':
        return {
          type: 'harvard',
          content: `Jeffrey Epstein Investigation Platform (2024) *Investigation database and analysis tools* [Database]. Available at: ${url} (Accessed: ${currentDate}).`
        };
      default:
        return { type: 'apa', content: '' };
    }
  };

  // Add Research Note
  const addResearchNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    
    const note: ResearchNote = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      linkedData: []
    };
    
    setResearchNotes([note, ...researchNotes]);
    setNewNote({ title: '', content: '', tags: [] });
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('epstein-research-notes', JSON.stringify(researchNotes));
    alert('Research data saved to local storage!');
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {/* Hidden download link */}
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              Research Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Export data, generate reports, manage research notes and citations
            </p>
          </div>
          <button
            onClick={saveToLocalStorage}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Research
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'export', label: 'Data Export', icon: Download },
            { id: 'notes', label: 'Research Notes', icon: Edit3 },
            { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
            { id: 'citations', label: 'Citations', icon: FileText }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as 'export' | 'notes' | 'bookmarks' | 'citations')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'export' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Data Export & Reports</h3>
            
            {/* PDF Report Generation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Investigation Report (PDF/HTML)
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Create a comprehensive PDF report with all investigation data, research notes, and analysis.
              </p>
              <button
                onClick={generatePDFReport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Generate Report
              </button>
            </div>

            {/* CSV Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: 'people', label: 'People Database', icon: User, count: corePeople.length },
                { type: 'events', label: 'Timeline Events', icon: Calendar, count: comprehensiveTimeline.length },
                { type: 'transactions', label: 'Financial Data', icon: DollarSign, count: financialTransactions.length },
                { type: 'organizations', label: 'Organizations', icon: MapPin, count: coreOrganizations.length }
              ].map(({ type, label, icon: Icon, count }) => (
                <div key={type} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{label}</h4>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{count} records</span>
                  </div>
                  <button
                    onClick={() => exportCSV(type as 'people' | 'events' | 'transactions' | 'organizations')}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Research Notes</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{researchNotes.length} notes</span>
            </div>

            {/* Add New Note */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Add Research Note</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Note content..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addResearchNote}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Note
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {researchNotes.map((note) => (
                <div key={note.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{note.title}</h4>
                    <button
                      onClick={() => setResearchNotes(researchNotes.filter(n => n.id !== note.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{note.content}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {researchNotes.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No research notes yet. Add your first note above.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Investigation Bookmarks</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon</span>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Bookmark System</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Save important findings, create collections, and organize your investigation workflow.
              </p>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• Quick bookmark from any data view</li>
                <li>• Organize by investigation topics</li>
                <li>• Share bookmark collections</li>
                <li>• Cross-reference with notes</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'citations' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Citation Generator</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(['apa', 'mla', 'chicago', 'harvard'] as const).map((style) => {
                const citation = generateCitation(style);
                return (
                  <div key={style} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 uppercase">{style}</h4>
                      <button
                        onClick={() => navigator.clipboard.writeText(citation.content)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      {citation.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
