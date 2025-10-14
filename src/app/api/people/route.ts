import { NextRequest, NextResponse } from 'next/server';
import { corePeople } from '@/data/core/people';

export const dynamic = 'force-dynamic';

// GET /api/people - Get all people or search by query
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredPeople = [...corePeople];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.aliases.some(alias => alias.toLowerCase().includes(lowerQuery)) ||
        person.biography.toLowerCase().includes(lowerQuery) ||
        person.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by significance
    if (significance) {
      filteredPeople = filteredPeople.filter(person => person.significance === significance);
    }

    // Pagination
    const total = filteredPeople.length;
    const paginatedPeople = filteredPeople.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedPeople,
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
        error: 'Failed to fetch people',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

