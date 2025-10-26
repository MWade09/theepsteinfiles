import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/properties - Get all properties with filtering using Supabase
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const type = searchParams.get('type');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build the base query
    let supabaseQuery = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .order('significance', { ascending: false })
      .order('name')
      .range(offset, offset + limit - 1);

    // Filter by search query (using ILIKE for case-insensitive search)
    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%`);
    }

    // Filter by property type
    if (type) {
      supabaseQuery = supabaseQuery.eq('type', type);
    }

    // Filter by significance
    if (significance) {
      supabaseQuery = supabaseQuery.eq('significance', significance);
    }

    // Execute the query
    const { data: properties, error: queryError, count: total } = await supabaseQuery;

    if (queryError) {
      throw new Error(`Database query failed: ${queryError.message}`);
    }

    const filteredProperties = properties || [];
    const totalCount = total || 0;

    return NextResponse.json({
      success: true,
      data: filteredProperties,
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
    console.error('Properties API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch properties',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}
