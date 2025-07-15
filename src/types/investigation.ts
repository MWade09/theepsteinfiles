// Core Entity Types
export interface Person {
  id: string;
  name: string;
  aliases: string[];
  dateOfBirth?: string;
  dateOfDeath?: string;
  nationality: string[];
  occupations: string[];
  organizations: string[];
  biography: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  tags: string[];
  profileImage?: string;
  lastUpdated: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'corporation' | 'foundation' | 'government' | 'educational' | 'financial' | 'media' | 'other';
  foundedDate?: string;
  headquarterLocation?: Location;
  description: string;
  keyPersonnel: string[]; // Person IDs
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  tags: string[];
  lastUpdated: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'hotel' | 'venue' | 'other';
  coordinates: [number, number]; // [latitude, longitude]
  address: string;
  city: string;
  state?: string;
  country: string;
  description: string;
  ownership: PropertyOwnership[];
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  tags: string[];
  images?: string[];
  lastUpdated: string;
}

export interface PropertyOwnership {
  ownerId: string; // Person or Organization ID
  ownerType: 'person' | 'organization';
  purchaseDate?: string;
  saleDate?: string;
  purchasePrice?: number;
  currency?: string;
  legalStructure?: string;
  sources: Source[];
}

// Relationship and Connection Types
export interface Relationship {
  id: string;
  type: 'professional' | 'personal' | 'financial' | 'legal' | 'family' | 'associate' | 'other';
  subtype?: string; // e.g., 'employee', 'board member', 'client', 'friend'
  entity1Id: string;
  entity1Type: 'person' | 'organization' | 'location';
  entity2Id: string;
  entity2Type: 'person' | 'organization' | 'location';
  startDate?: string;
  endDate?: string;
  description: string;
  strength: 'strong' | 'moderate' | 'weak' | 'alleged';
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  tags: string[];
  lastUpdated: string;
}

// Financial and Transaction Types
export interface FinancialEntity {
  id: string;
  name: string;
  type: 'bank' | 'trust' | 'foundation' | 'corporation' | 'llc' | 'partnership' | 'other';
  jurisdiction: string;
  registrationDate?: string;
  description: string;
  owners: string[]; // Person or Organization IDs
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  tags: string[];
  lastUpdated: string;
}

export interface FinancialTransaction {
  id: string;
  fromEntityId: string;
  fromEntityType: 'person' | 'organization' | 'financial';
  toEntityId: string;
  toEntityType: 'person' | 'organization' | 'financial';
  amount?: number;
  currency: string;
  date: string;
  type: 'payment' | 'transfer' | 'loan' | 'investment' | 'gift' | 'purchase' | 'other';
  description: string;
  purpose?: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  tags: string[];
  lastUpdated: string;
}

// Timeline and Event Types
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string; // For events spanning multiple days
  type: 'arrest' | 'legal' | 'investigation' | 'media' | 'business' | 'travel' | 'meeting' | 'other';
  category: 'criminal' | 'civil' | 'financial' | 'political' | 'social' | 'other';
  significance: 'critical' | 'high' | 'medium' | 'low';
  entities: EventEntity[]; // People, organizations, locations involved
  relatedEvents: string[]; // IDs of related events
  consequences: string[];
  verificationStatus: 'verified' | 'pending' | 'disputed';
  sources: Source[];
  evidence: string[]; // Evidence IDs
  tags: string[];
  lastUpdated: string;
}

export interface EventEntity {
  entityId: string;
  entityType: 'person' | 'organization' | 'location';
  role: string; // e.g., 'defendant', 'witness', 'location', 'owner'
  description?: string;
}

// Evidence and Document Types
export interface Evidence {
  id: string;
  title: string;
  type: 'document' | 'testimony' | 'photo' | 'video' | 'audio' | 'financial' | 'communication' | 'other';
  subtype?: string; // e.g., 'court filing', 'deposition', 'email', 'bank record'
  description: string;
  date: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
  verificationStatus: 'verified' | 'pending' | 'disputed';
  confidenceLevel: 'high' | 'medium' | 'low';
  sources: Source[];
  relatedEntities: string[]; // Person, Organization, or Location IDs
  relatedEvents: string[]; // Timeline Event IDs
  tags: string[];
  content?: DocumentContent;
  annotations: Annotation[];
  accessLevel: 'public' | 'restricted' | 'sealed';
  lastUpdated: string;
}

export interface DocumentContent {
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  pageCount?: number;
  text?: string; // OCR extracted text
  url?: string;
  hash?: string; // For integrity verification
}

export interface Annotation {
  id: string;
  type: 'highlight' | 'note' | 'correction' | 'cross-reference';
  startPosition?: number;
  endPosition?: number;
  content: string;
  authorId: string;
  createdDate: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
}

// Advanced Document Management Types
export interface DocumentCollection {
  id: string;
  name: string;
  description: string;
  documents: string[]; // Document IDs
  createdDate: string;
  lastUpdated: string;
  isPublic: boolean;
  tags: string[];
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  changes: string;
  createdDate: string;
  createdBy: string;
  content: DocumentContent;
}

export interface DocumentSearch {
  query: string;
  filters: {
    type?: string[];
    significance?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
    entities?: string[];
    tags?: string[];
    sources?: string[];
    accessLevel?: string[];
  };
  sortBy: 'relevance' | 'date' | 'significance' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface DocumentAnalytics {
  id: string;
  documentId: string;
  views: number;
  downloads: number;
  annotations: number;
  citations: number;
  lastViewed: string;
  avgReadTime: number;
  popularSections: string[];
}

export interface CitationTracker {
  id: string;
  documentId: string;
  citingDocuments: string[]; // Other documents that cite this one
  externalCitations: string[]; // External sources that cite this document
  citationCount: number;
  lastUpdated: string;
}

export interface DocumentReview {
  id: string;
  documentId: string;
  reviewerId: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  comments: string;
  reviewDate: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
}

// Source and Verification Types
export interface Source {
  id: string;
  title: string;
  type: 'court_document' | 'news_article' | 'book' | 'interview' | 'government_document' | 'financial_record' | 'other';
  author?: string;
  publication?: string;
  publicationDate?: string;
  url?: string;
  accessDate?: string;
  reliability: 'high' | 'medium' | 'low' | 'unknown';
  description?: string;
  tags: string[];
}

export interface VerificationNote {
  id: string;
  entityId: string;
  entityType: 'person' | 'organization' | 'location' | 'relationship' | 'event' | 'evidence';
  verifierId: string;
  verificationDate: string;
  status: 'verified' | 'pending' | 'disputed' | 'false';
  confidence: 'high' | 'medium' | 'low';
  methodology: string;
  notes: string;
  sources: Source[];
}

// Search and Filter Types
export interface SearchQuery {
  term: string;
  entityTypes: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  significance?: string[];
  verificationStatus?: string[];
  tags?: string[];
  sources?: string[];
}

export interface SearchResult {
  id: string;
  type: 'person' | 'organization' | 'location' | 'event' | 'evidence' | 'relationship';
  title: string;
  description: string;
  relevanceScore: number;
  significance: string;
  verificationStatus: string;
  lastUpdated: string;
  matchedFields: string[];
  relatedItems: string[];
}

// Network Analysis Types
export interface NetworkNode {
  id: string;
  type: 'person' | 'organization' | 'location' | 'financial';
  name: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
  size: number; // Visual size based on connections/importance
  color: string;
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  relationshipType: string;
  strength: number; // 0-1 scale
  significance: 'critical' | 'high' | 'medium' | 'low';
  verified: boolean;
}

export interface NetworkAnalysis {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  centralityScores: Record<string, number>;
  clusters: NetworkCluster[];
  metrics: NetworkMetrics;
}

export interface NetworkCluster {
  id: string;
  name: string;
  nodeIds: string[];
  description: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
}

export interface NetworkMetrics {
  nodeCount: number;
  edgeCount: number;
  density: number;
  avgPathLength: number;
  clusteringCoefficient: number;
  modularity: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  version: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// User and Admin Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'researcher' | 'contributor' | 'viewer';
  permissions: string[];
  verified: boolean;
  joinDate: string;
  lastActive: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: 'create' | 'update' | 'delete' | 'verify' | 'dispute';
  entityId: string;
  entityType: string;
  timestamp: string;
  details: Record<string, any>;
  ipAddress?: string;
} 