import { NextRequest, NextResponse } from 'next/server';
import { comprehensiveTimeline } from '@/data/core/timeline';

export const dynamic = 'force-dynamic';

// GET /api/timeline - Get timeline events with filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const significance = searchParams.get('significance');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredEvents = [...comprehensiveTimeline];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by date range
    if (startDate) {
      filteredEvents = filteredEvents.filter(event => event.date >= startDate);
    }
    if (endDate) {
      filteredEvents = filteredEvents.filter(event => event.date <= endDate);
    }

    // Filter by significance
    if (significance) {
      filteredEvents = filteredEvents.filter(event => event.significance === significance);
    }

    // Filter by type
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }

    // Sort by date
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Pagination
    const total = filteredEvents.length;
    const paginatedEvents = filteredEvents.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedEvents,
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
        error: 'Failed to fetch timeline events',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

