import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/people/[id] - Get a specific person by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    // Get person data
    const { data: person, error: personError } = await supabase
      .from('people')
      .select('*')
      .eq('id', id)
      .single();

    if (personError) {
      if (personError.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Person not found',
            timestamp: new Date().toISOString(),
            version: '2.0.0',
            source: 'supabase'
          },
          { status: 404 }
        );
      }
      throw new Error(`Database query failed: ${personError.message}`);
    }

    // Get related sources for this person
    const { data: sources, error: sourcesError } = await supabase
      .from('sources')
      .select('*')
      .order('created_at', { ascending: false });

    if (sourcesError) {
      console.warn('Failed to fetch sources:', sourcesError.message)
    }

    // Get related organizations
    const { data: relationships, error: relationshipsError } = await supabase
      .from('entity_relationships')
      .select(`
        entity2_id,
        relationship_type,
        organizations!entity_relationships_entity2_id_fkey (
          id,
          name,
          type,
          description
        )
      `)
      .eq('entity1_id', id)
      .eq('entity1_type', 'person')
      .eq('entity2_type', 'organization');

    if (relationshipsError) {
      console.warn('Failed to fetch relationships:', relationshipsError.message)
    }

    // Combine person data with related information
    const enhancedPerson = {
      ...person,
      sources: sources || [],
      relatedOrganizations: relationships?.map(rel => rel.organizations).filter(Boolean) || []
    };

    return NextResponse.json({
      success: true,
      data: enhancedPerson,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      source: 'supabase'
    });
  } catch (error) {
    console.error('Person API error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch person',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}

