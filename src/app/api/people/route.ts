import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/people - Get all people or search by query
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let supabaseQuery = supabase
      .from('people')
      .select('*')
      .order('name')
      .range(offset, offset + limit - 1);

    // Filter by significance
    if (significance) {
      supabaseQuery = supabaseQuery.eq('significance', significance);
    }

    // Execute query
    const { data: people, error: queryError } = await supabaseQuery;

    if (queryError) {
      throw new Error(`Database query failed: ${queryError.message}`);
    }

    // If there's a search query, use database full-text search
    let filteredPeople = people || [];
    if (query) {
      // Use Supabase's full-text search capabilities
      const { data: searchResults, error: searchError } = await supabase
        .from('people')
        .select('*')
        .or(`name.ilike.%${query}%,biography.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .limit(limit);

      if (!searchError && searchResults) {
        filteredPeople = searchResults;
      }
    }

    // Get total count (for pagination info)
    let totalQuery = supabase.from('people').select('*', { count: 'exact', head: true });

    if (significance) {
      totalQuery = totalQuery.eq('significance', significance);
    }

    const { count: total, error: countError } = await totalQuery;

    if (countError) {
      // Log count error but continue with filtered results count
      console.warn('Failed to get total count:', countError.message)
    }

    const totalCount = total || filteredPeople.length;

    return NextResponse.json({
      success: true,
      data: filteredPeople,
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
    console.error('People API error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch people',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}

