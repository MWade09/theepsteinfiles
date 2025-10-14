import { NextRequest, NextResponse } from 'next/server';
import { corePeople } from '@/data/core/people';

export const dynamic = 'force-dynamic';

// GET /api/people/[id] - Get a specific person by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const person = corePeople.find(p => p.id === id);

    if (!person) {
      return NextResponse.json(
        {
          success: false,
          error: 'Person not found',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: person,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch person',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      },
      { status: 500 }
    );
  }
}

