import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/timeline - Get timeline events with filtering using Supabase
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const significance = searchParams.get('significance');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build the base query
    let supabaseQuery = supabase
      .from('timeline_events')
      .select('*', { count: 'exact' })
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by search query (using ILIKE for case-insensitive search)
    if (query) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    }

    // Filter by date range
    if (startDate) {
      supabaseQuery = supabaseQuery.gte('date', startDate);
    }
    if (endDate) {
      supabaseQuery = supabaseQuery.lte('date', endDate);
    }

    // Filter by significance
    if (significance) {
      supabaseQuery = supabaseQuery.eq('significance', significance);
    }

    // Filter by type
    if (type) {
      supabaseQuery = supabaseQuery.eq('type', type);
    }

    // Execute the query
    const { data: events, error: queryError, count: total } = await supabaseQuery;

    if (queryError) {
      throw new Error(`Database query failed: ${queryError.message}`);
    }

    const totalCount = total || 0;

    return NextResponse.json({
      success: true,
      data: events || [],
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      },
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      source: 'supabase'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch timeline events',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}

