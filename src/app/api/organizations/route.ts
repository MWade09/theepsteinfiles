import { NextRequest, NextResponse } from 'next/server';
import { coreOrganizations } from '@/data/core/organizations';

export const dynamic = 'force-dynamic';

// GET /api/organizations - Get all organizations or search by query
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredOrganizations = [...coreOrganizations];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredOrganizations = filteredOrganizations.filter(org =>
        org.name.toLowerCase().includes(lowerQuery) ||
        org.description.toLowerCase().includes(lowerQuery) ||
        org.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by type
    if (type) {
      filteredOrganizations = filteredOrganizations.filter(org => org.type === type);
    }

    // Pagination
    const total = filteredOrganizations.length;
    const paginatedOrganizations = filteredOrganizations.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedOrganizations,
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
        error: 'Failed to fetch organizations',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

