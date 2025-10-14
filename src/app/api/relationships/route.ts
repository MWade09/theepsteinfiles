import { NextRequest, NextResponse } from 'next/server';
import { coreRelationships } from '@/data/core/relationships';

export const dynamic = 'force-dynamic';

// GET /api/relationships - Get all relationships or search by query
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const type = searchParams.get('type');
    const entity = searchParams.get('entity');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredRelationships = [...coreRelationships];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredRelationships = filteredRelationships.filter(rel =>
        rel.description.toLowerCase().includes(lowerQuery) ||
        rel.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by type
    if (type) {
      filteredRelationships = filteredRelationships.filter(rel => rel.type === type);
    }

    // Filter by entity (either entity1 or entity2)
    if (entity) {
      filteredRelationships = filteredRelationships.filter(
        rel => rel.entity1Id === entity || rel.entity2Id === entity
      );
    }

    // Pagination
    const total = filteredRelationships.length;
    const paginatedRelationships = filteredRelationships.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedRelationships,
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
        error: 'Failed to fetch relationships',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

