import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/financial - Get financial transactions with filtering using Supabase
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const minAmount = parseFloat(searchParams.get('minAmount') || '0');
    const maxAmount = parseFloat(searchParams.get('maxAmount') || '999999999999');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const suspiciousOnly = searchParams.get('suspiciousOnly') === 'true';
    const fromEntity = searchParams.get('fromEntity');
    const toEntity = searchParams.get('toEntity');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build the base query
    let supabaseQuery = supabase
      .from('financial_transactions')
      .select('*', { count: 'exact' })
      .order('transaction_date', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by search query (using ILIKE for case-insensitive search)
    if (query) {
      supabaseQuery = supabaseQuery.or(`description.ilike.%${query}%,purpose.ilike.%${query}%`);
    }

    // Filter by amount range
    supabaseQuery = supabaseQuery.gte('amount_usd', minAmount).lte('amount_usd', maxAmount);

    // Filter by date range
    if (startDate) {
      supabaseQuery = supabaseQuery.gte('transaction_date', startDate);
    }
    if (endDate) {
      supabaseQuery = supabaseQuery.lte('transaction_date', endDate);
    }

    // Filter by suspicious activity
    if (suspiciousOnly) {
      supabaseQuery = supabaseQuery.not('suspicious_activity', 'is', null);
    }

    // Filter by entities (from_entity and to_entity are stored as text in the database)
    if (fromEntity) {
      supabaseQuery = supabaseQuery.ilike('from_entity', `%${fromEntity}%`);
    }
    if (toEntity) {
      supabaseQuery = supabaseQuery.ilike('to_entity', `%${toEntity}%`);
    }

    // Execute the query
    const { data: transactions, error: queryError, count: total } = await supabaseQuery;

    if (queryError) {
      throw new Error(`Database query failed: ${queryError.message}`);
    }

    const filteredTransactions = transactions || [];
    const totalCount = total || 0;

    // Calculate statistics
    const totalValue = filteredTransactions.reduce((sum, t) => sum + (t.amount_usd || 0), 0);
    const suspiciousCount = filteredTransactions.filter(
      t => t.suspicious_activity && Object.keys(t.suspicious_activity).length > 0
    ).length;

    return NextResponse.json({
      success: true,
      data: filteredTransactions,
      statistics: {
        totalTransactions: totalCount,
        totalValue,
        suspiciousCount,
        averageAmount: totalCount > 0 ? totalValue / totalCount : 0
      },
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
    console.error('Financial API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch financial transactions',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}

