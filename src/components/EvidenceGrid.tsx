'use client';

import { useState } from 'react';
import { Filter, Search, Eye, Download, Star } from 'lucide-react';

interface Evidence {
  id: string;
  title: string;
  type: 'document' | 'testimony' | 'photo' | 'recording' | 'financial';
  category: 'legal' | 'financial' | 'personal' | 'government' | 'media';
  date: string;
  description: string;
  significance: 'high' | 'medium' | 'low';
  source: string;
  verified: boolean;
  tags: string[];
}

const evidenceData: Evidence[] = [
  {
    id: '1',
    title: 'Flight Logs from Private Jet',
    type: 'document',
    category: 'legal',
    date: '1997-2005',
    description: 'Detailed flight manifests showing passengers on Epstein\'s private aircraft over multiple years.',
    significance: 'high',
    source: 'Federal Court Records',
    verified: true,
    tags: ['transportation', 'passengers', 'timeline']
  },
  {
    id: '2',
    title: 'Black Book Contact List',
    type: 'document',
    category: 'personal',
    date: '2004',
    description: 'Personal contact directory containing names and contact information of associates.',
    significance: 'high',
    source: 'Court Evidence',
    verified: true,
    tags: ['contacts', 'network', 'associates']
  },
  {
    id: '3',
    title: 'Virginia Giuffre Deposition',
    type: 'testimony',
    category: 'legal',
    date: '2016',
    description: 'Sworn testimony detailing allegations of trafficking and abuse.',
    significance: 'high',
    source: 'Federal Court',
    verified: true,
    tags: ['testimony', 'victim', 'allegations']
  },
  {
    id: '4',
    title: 'Financial Transaction Records',
    type: 'financial',
    category: 'financial',
    date: '2000-2019',
    description: 'Banking records showing large cash transfers and suspicious financial activity.',
    significance: 'medium',
    source: 'Banking Records',
    verified: true,
    tags: ['money', 'transfers', 'banking']
  },
  {
    id: '5',
    title: 'Property Purchase Documents',
    type: 'document',
    category: 'financial',
    date: '1998-2019',
    description: 'Real estate transactions for properties in multiple jurisdictions.',
    significance: 'medium',
    source: 'Public Records',
    verified: true,
    tags: ['real-estate', 'properties', 'ownership']
  },
  {
    id: '6',
    title: 'Federal Investigation Memos',
    type: 'document',
    category: 'government',
    date: '2006-2008',
    description: 'Internal FBI and DOJ communications regarding the initial investigation.',
    significance: 'high',
    source: 'FOIA Requests',
    verified: true,
    tags: ['investigation', 'fbi', 'government']
  }
];

export default function EvidenceGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvidence = evidenceData.filter(evidence => {
    const matchesSearch = evidence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || evidence.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || evidence.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'testimony': return '🗣️';
      case 'photo': return '📸';
      case 'recording': return '🎵';
      case 'financial': return '💰';
      default: return '📋';
    }
  };

  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Evidence Database
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Documented evidence from court filings, investigations, and public records
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search evidence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showFilters 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 justify-center bg-gray-50 dark:bg-dark-800 p-4 rounded-lg">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="document">Documents</option>
              <option value="testimony">Testimony</option>
              <option value="photo">Photos</option>
              <option value="recording">Recordings</option>
              <option value="financial">Financial</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="legal">Legal</option>
              <option value="financial">Financial</option>
              <option value="personal">Personal</option>
              <option value="government">Government</option>
              <option value="media">Media</option>
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:text-red-400"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredEvidence.map((evidence) => (
          <div
            key={evidence.id}
            className="evidence-card p-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setSelectedEvidence(evidence)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(evidence.type)}</span>
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSignificanceBadge(evidence.significance)}`}>
                    {evidence.significance.toUpperCase()}
                  </span>
                  {evidence.verified && (
                    <Star className="inline w-4 h-4 text-yellow-500 ml-2" />
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
              {evidence.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
              {evidence.description}
            </p>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-500">
                <strong>Date:</strong> {evidence.date}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                <strong>Source:</strong> {evidence.source}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {evidence.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {evidence.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    +{evidence.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No evidence found matching your criteria.
          </p>
        </div>
      )}

      {/* Evidence Detail Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getTypeIcon(selectedEvidence.type)}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedEvidence.title}
                    </h2>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getSignificanceBadge(selectedEvidence.significance)}`}>
                      {selectedEvidence.significance.toUpperCase()} SIGNIFICANCE
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvidence(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {selectedEvidence.type}</div>
                    <div><strong>Category:</strong> {selectedEvidence.category}</div>
                    <div><strong>Date:</strong> {selectedEvidence.date}</div>
                    <div><strong>Source:</strong> {selectedEvidence.source}</div>
                    <div className="flex items-center gap-2">
                      <strong>Verified:</strong> 
                      {selectedEvidence.verified ? (
                        <span className="text-green-600 font-medium">✓ Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">✗ No</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvidence.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedEvidence.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  View Document
                </button>
                <button className="flex items-center gap-2 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 px-4 py-2 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 