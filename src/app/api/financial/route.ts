import { NextRequest, NextResponse } from 'next/server';
import { financialTransactions } from '@/data/financial/transactions';

export const dynamic = 'force-dynamic';

// GET /api/financial - Get financial transactions with filtering
export async function GET(request: NextRequest) {
  try {
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

    let filteredTransactions = [...financialTransactions];

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredTransactions = filteredTransactions.filter(transaction =>
        transaction.description.toLowerCase().includes(lowerQuery) ||
        transaction.purpose?.toLowerCase().includes(lowerQuery) ||
        transaction.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by amount range
    filteredTransactions = filteredTransactions.filter(
      transaction => transaction.amountUSD >= minAmount && transaction.amountUSD <= maxAmount
    );

    // Filter by date range
    if (startDate) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.transactionDate >= startDate
      );
    }
    if (endDate) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.transactionDate <= endDate
      );
    }

    // Filter by suspicious activity
    if (suspiciousOnly) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.suspiciousActivity && transaction.suspiciousActivity.length > 0
      );
    }

    // Filter by entities
    if (fromEntity) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.fromEntity === fromEntity
      );
    }
    if (toEntity) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.toEntity === toEntity
      );
    }

    // Sort by date
    filteredTransactions.sort((a, b) => 
      new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
    );

    // Pagination
    const total = filteredTransactions.length;
    const paginatedTransactions = filteredTransactions.slice(offset, offset + limit);

    // Calculate statistics
    const totalValue = filteredTransactions.reduce((sum, t) => sum + t.amountUSD, 0);
    const suspiciousCount = filteredTransactions.filter(
      t => t.suspiciousActivity && t.suspiciousActivity.length > 0
    ).length;

    return NextResponse.json({
      success: true,
      data: paginatedTransactions,
      statistics: {
        totalTransactions: total,
        totalValue,
        suspiciousCount,
        averageAmount: total > 0 ? totalValue / total : 0
      },
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
        error: 'Failed to fetch financial transactions',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

