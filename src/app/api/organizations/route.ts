import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/organizations - Get all organizations or search by query
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let supabaseQuery = supabase
      .from('organizations')
      .select('*')
      .order('name')
      .range(offset, offset + limit - 1);

    // Filter by type
    if (type) {
      supabaseQuery = supabaseQuery.eq('type', type);
    }

    // Execute query
    const { data: organizations, error: queryError } = await supabaseQuery;

    if (queryError) {
      throw new Error(`Database query failed: ${queryError.message}`);
    }

    // If there's a search query, filter results on the server side
    let filteredOrganizations = organizations || [];
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredOrganizations = filteredOrganizations.filter(org =>
        org.name.toLowerCase().includes(lowerQuery) ||
        (org.description && org.description.toLowerCase().includes(lowerQuery)) ||
        (org.headquarters && org.headquarters.toLowerCase().includes(lowerQuery))
      );
    }

    // Get total count (for pagination info)
    let totalQuery = supabase.from('organizations').select('*', { count: 'exact', head: true });

    if (type) {
      totalQuery = totalQuery.eq('type', type);
    }

    const { count: total, error: countError } = await totalQuery;

    if (countError) {
      console.warn('Failed to get total count:', countError.message)
    }

    const totalCount = total || filteredOrganizations.length;

    return NextResponse.json({
      success: true,
      data: filteredOrganizations,
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
    console.error('Organizations API error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch organizations',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}

