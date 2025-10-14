import { NextRequest, NextResponse } from 'next/server';
import { coreDocuments } from '@/data/core/documents';

export const dynamic = 'force-dynamic';

// GET /api/documents - Get all documents or search by query
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const type = searchParams.get('type');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredDocuments = [...coreDocuments];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredDocuments = filteredDocuments.filter(doc =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.description.toLowerCase().includes(lowerQuery) ||
        doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by type
    if (type) {
      filteredDocuments = filteredDocuments.filter(doc => doc.type === type);
    }

    // Filter by significance
    if (significance) {
      filteredDocuments = filteredDocuments.filter(doc => doc.significance === significance);
    }

    // Pagination
    const total = filteredDocuments.length;
    const paginatedDocuments = filteredDocuments.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedDocuments,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch documents',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

