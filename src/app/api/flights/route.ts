import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/flights - Get all flight logs with filtering using Supabase
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const aircraft = searchParams.get('aircraft');
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const significance = searchParams.get('significance');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build the base query
    let supabaseQuery = supabase
      .from('flight_logs')
      .select('*', { count: 'exact' })
      .order('significance', { ascending: false })
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by search query (using ILIKE for case-insensitive search)
    if (query) {
      supabaseQuery = supabaseQuery.or(`aircraft.ilike.%${query}%,departure_location.ilike.%${query}%,arrival_location.ilike.%${query}%,purpose.ilike.%${query}%`);
    }

    // Filter by aircraft type
    if (aircraft) {
      supabaseQuery = supabaseQuery.ilike('aircraft', `%${aircraft}%`);
    }

    // Filter by departure location
    if (departure) {
      supabaseQuery = supabaseQuery.ilike('departure_location', `%${departure}%`);
    }

    // Filter by arrival location
    if (arrival) {
      supabaseQuery = supabaseQuery.ilike('arrival_location', `%${arrival}%`);
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

    // Execute the query
    const { data: flights, error: queryError, count: total } = await supabaseQuery;

    if (queryError) {
      throw new Error(`Database query failed: ${queryError.message}`);
    }

    const filteredFlights = flights || [];
    const totalCount = total || 0;

    return NextResponse.json({
      success: true,
      data: filteredFlights,
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
    console.error('Flights API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch flight logs',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}
