import { NextRequest, NextResponse } from 'next/server';
import { corePeople } from '@/data/core/people';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { coreOrganizations } from '@/data/core/organizations';
import { financialTransactions } from '@/data/financial/transactions';
import { coreDocuments } from '@/data/core/documents';

export const dynamic = 'force-dynamic';

interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'organization' | 'transaction' | 'document';
  title: string;
  description: string;
  relevance: number;
  significance?: string;
  date?: string;
  url: string;
}

// GET /api/search - Universal search across all data types
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const types = searchParams.get('types')?.split(',') || ['person', 'event', 'organization', 'transaction', 'document'];
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Query parameter is required',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        },
        { status: 400 }
      );
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search people
    if (types.includes('person')) {
      corePeople.forEach(person => {
        let relevance = 0;
        if (person.name.toLowerCase().includes(lowerQuery)) relevance += 100;
        if (person.aliases.some(alias => alias.toLowerCase().includes(lowerQuery))) relevance += 80;
        if (person.biography.toLowerCase().includes(lowerQuery)) relevance += 30;
        if (person.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) relevance += 50;

        if (relevance > 0) {
          results.push({
            id: person.id,
            type: 'person',
            title: person.name,
            description: person.biography.substring(0, 200) + '...',
            relevance,
            significance: person.significance,
            url: `/timeline#${person.id}`
          });
        }
      });
    }

    // Search timeline events
    if (types.includes('event')) {
      comprehensiveTimeline.forEach(event => {
        let relevance = 0;
        if (event.title.toLowerCase().includes(lowerQuery)) relevance += 100;
        if (event.description.toLowerCase().includes(lowerQuery)) relevance += 50;
        if (event.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) relevance += 40;

        if (relevance > 0) {
          results.push({
            id: event.id,
            type: 'event',
            title: event.title,
            description: event.description.substring(0, 200) + '...',
            relevance,
            significance: event.significance,
            date: event.date,
            url: `/timeline#${event.id}`
          });
        }
      });
    }

    // Search organizations
    if (types.includes('organization')) {
      coreOrganizations.forEach(org => {
        let relevance = 0;
        if (org.name.toLowerCase().includes(lowerQuery)) relevance += 100;
        if (org.description.toLowerCase().includes(lowerQuery)) relevance += 50;
        if (org.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) relevance += 40;

        if (relevance > 0) {
          results.push({
            id: org.id,
            type: 'organization',
            title: org.name,
            description: org.description.substring(0, 200) + '...',
            relevance,
            significance: org.significance,
            url: `/network#${org.id}`
          });
        }
      });
    }

    // Search transactions
    if (types.includes('transaction')) {
      financialTransactions.forEach(transaction => {
        let relevance = 0;
        if (transaction.description.toLowerCase().includes(lowerQuery)) relevance += 50;
        if (transaction.purpose?.toLowerCase().includes(lowerQuery)) relevance += 40;
        if (transaction.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) relevance += 30;

        if (relevance > 0) {
          results.push({
            id: transaction.id,
            type: 'transaction',
            title: `$${transaction.amountUSD.toLocaleString()} Transaction`,
            description: transaction.description.substring(0, 200) + '...',
            relevance,
            significance: transaction.significance,
            date: transaction.transactionDate,
            url: `/financial#${transaction.id}`
          });
        }
      });
    }

    // Search documents
    if (types.includes('document')) {
      coreDocuments.forEach(doc => {
        let relevance = 0;
        if (doc.title.toLowerCase().includes(lowerQuery)) relevance += 100;
        if (doc.description.toLowerCase().includes(lowerQuery)) relevance += 50;
        if (doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) relevance += 40;

        if (relevance > 0) {
          results.push({
            id: doc.id,
            type: 'document',
            title: doc.title,
            description: doc.description.substring(0, 200) + '...',
            relevance,
            significance: doc.significance,
            date: doc.date,
            url: `/documents#${doc.id}`
          });
        }
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    // Limit results
    const limitedResults = results.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedResults,
      query,
      total: results.length,
      returned: limitedResults.length,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

