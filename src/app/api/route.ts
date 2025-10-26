import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api - API documentation and available endpoints
export async function GET() {
  const apiDocs = {
    version: '2.0.0',
    title: 'Epstein Investigation Platform API',
    description: 'RESTful API for accessing investigation data including people, timeline events, financial transactions, properties, flight logs, and more. Now powered by Supabase with full-text search capabilities.',
    baseUrl: '/api',
    endpoints: {
      people: {
        list: {
          method: 'GET',
          path: '/api/people',
          description: 'Get all people with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            significance: 'Filter by significance level (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/people?query=epstein&significance=critical&limit=10'
        },
        getById: {
          method: 'GET',
          path: '/api/people/[id]',
          description: 'Get a specific person by ID',
          example: '/api/people/person_jeffrey_epstein'
        }
      },
      timeline: {
        list: {
          method: 'GET',
          path: '/api/timeline',
          description: 'Get timeline events with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            startDate: 'Filter by start date (YYYY-MM-DD, optional)',
            endDate: 'Filter by end date (YYYY-MM-DD, optional)',
            significance: 'Filter by significance level (optional)',
            type: 'Filter by event type (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/timeline?startDate=2000-01-01&endDate=2020-12-31&significance=critical'
        }
      },
      financial: {
        list: {
          method: 'GET',
          path: '/api/financial',
          description: 'Get financial transactions with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            minAmount: 'Minimum transaction amount in USD (optional)',
            maxAmount: 'Maximum transaction amount in USD (optional)',
            startDate: 'Filter by start date (YYYY-MM-DD, optional)',
            endDate: 'Filter by end date (YYYY-MM-DD, optional)',
            suspiciousOnly: 'Show only suspicious transactions (true/false, optional)',
            fromEntity: 'Filter by source entity ID (optional)',
            toEntity: 'Filter by target entity ID (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/financial?minAmount=1000000&suspiciousOnly=true&limit=20'
        }
      },
      search: {
        universal: {
          method: 'GET',
          path: '/api/search',
          description: 'Universal full-text search across all data types using Supabase',
          parameters: {
            query: 'Search query (required)',
            types: 'Comma-separated list of types to search (person,event,organization,transaction,document,property,flight)',
            limit: 'Number of results to return (default: 50)'
          },
          example: '/api/search?query=manhattan&types=person,event,transaction,property&limit=20'
        }
      },
      organizations: {
        list: {
          method: 'GET',
          path: '/api/organizations',
          description: 'Get all organizations with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            type: 'Filter by organization type (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/organizations?type=corporation&limit=20'
        }
      },
      documents: {
        list: {
          method: 'GET',
          path: '/api/documents',
          description: 'Get all documents with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            type: 'Filter by document type (optional)',
            significance: 'Filter by significance level (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/documents?type=court_document&significance=critical'
        }
      },
      relationships: {
        list: {
          method: 'GET',
          path: '/api/relationships',
          description: 'Get all relationships with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            type: 'Filter by relationship type (optional)',
            entity: 'Filter by entity ID (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/relationships?type=financial&limit=50'
        }
      },
      properties: {
        list: {
          method: 'GET',
          path: '/api/properties',
          description: 'Get all properties with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            type: 'Filter by property type (optional)',
            significance: 'Filter by significance level (optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/properties?type=island&significance=critical'
        }
      },
      flights: {
        list: {
          method: 'GET',
          path: '/api/flights',
          description: 'Get all flight logs with optional filtering',
          parameters: {
            query: 'Search query (optional)',
            aircraft: 'Filter by aircraft type (optional)',
            departure: 'Filter by departure location (optional)',
            arrival: 'Filter by arrival location (optional)',
            startDate: 'Filter by start date (YYYY-MM-DD, optional)',
            endDate: 'Filter by end date (YYYY-MM-DD, optional)',
            limit: 'Number of results to return (default: 100)',
            offset: 'Pagination offset (default: 0)'
          },
          example: '/api/flights?aircraft=Boeing&departure=Palm%20Beach&limit=20'
        }
      }
    },
    responseFormat: {
      success: {
        success: true,
        data: '...',
        pagination: {
          total: 'number',
          limit: 'number',
          offset: 'number',
          hasMore: 'boolean'
        },
        timestamp: 'ISO 8601 date string',
        version: 'string'
      },
      error: {
        success: false,
        error: 'Error message',
        message: 'Detailed error description',
        timestamp: 'ISO 8601 date string',
        version: 'string'
      }
    },
    rateLimit: {
      requests: 1000,
      period: '1 hour',
      note: 'Rate limiting is not currently enforced but may be implemented in the future'
    },
    cors: {
      enabled: true,
      allowedOrigins: ['*'],
      allowedMethods: ['GET'],
      note: 'Currently read-only API. POST/PUT/DELETE methods are not supported.'
    },
    authentication: {
      required: false,
      note: 'Public read-only access. Authentication may be required for future write operations.'
    },
    dataSource: {
      type: 'Supabase PostgreSQL',
      note: 'All API endpoints now query the database with full-text search capabilities. Previous local data imports have been migrated to the database.'
    },
    searchCapabilities: {
      fullText: true,
      caseInsensitive: true,
      multipleTypes: true,
      note: 'Enhanced search using PostgreSQL full-text search indexes for faster and more accurate results.'
    }
  };

  return NextResponse.json(apiDocs);
}

