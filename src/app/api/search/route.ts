import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'organization' | 'transaction' | 'document' | 'property' | 'flight';
  title: string;
  description: string;
  relevance: number;
  significance?: string;
  date?: string;
  url: string;
}

// GET /api/search - Universal search across all data types using full-text search
export async function GET(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const types = searchParams.get('types')?.split(',') || ['person', 'event', 'organization', 'transaction', 'document', 'property', 'flight'];
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Query parameter is required',
          timestamp: new Date().toISOString(),
          version: '2.0.0',
          source: 'supabase'
        },
        { status: 400 }
      );
    }

    const results: SearchResult[] = [];

    // Search people using full-text search
    if (types.includes('person')) {
      const { data: people, error: peopleError } = await supabase
        .from('people')
        .select('*')
        .or(`name.ilike.%${query}%,biography.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!peopleError && people) {
        people.forEach(person => {
          let relevance = 0;
          if (person.name.toLowerCase().includes(query.toLowerCase())) relevance += 100;
          if (person.aliases?.some((alias: string) => alias.toLowerCase().includes(query.toLowerCase()))) relevance += 80;
          if (person.biography?.toLowerCase().includes(query.toLowerCase())) relevance += 30;

          results.push({
            id: person.id,
            type: 'person',
            title: person.name,
            description: person.biography?.substring(0, 200) + '...' || 'No description available',
            relevance,
            significance: person.significance,
            url: `/research?person=${person.id}`
          });
        });
      }
    }

    // Search timeline events using full-text search
    if (types.includes('event')) {
      const { data: events, error: eventsError } = await supabase
        .from('timeline_events')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .order('date', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!eventsError && events) {
        events.forEach(event => {
          let relevance = 0;
          if (event.title.toLowerCase().includes(query.toLowerCase())) relevance += 100;
          if (event.description.toLowerCase().includes(query.toLowerCase())) relevance += 50;

          results.push({
            id: event.id,
            type: 'event',
            title: event.title,
            description: event.description.substring(0, 200) + '...',
            relevance,
            significance: event.significance,
            date: event.date,
            url: `/timeline#${event.id}`
          });
        });
      }
    }

    // Search organizations using full-text search
    if (types.includes('organization')) {
      const { data: organizations, error: orgsError } = await supabase
        .from('organizations')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!orgsError && organizations) {
        organizations.forEach(org => {
          let relevance = 0;
          if (org.name.toLowerCase().includes(query.toLowerCase())) relevance += 100;
          if (org.description?.toLowerCase().includes(query.toLowerCase())) relevance += 50;

          results.push({
            id: org.id,
            type: 'organization',
            title: org.name,
            description: org.description?.substring(0, 200) + '...' || 'No description available',
            relevance,
            significance: org.significance,
            url: `/network#${org.id}`
          });
        });
      }
    }

    // Search financial transactions
    if (types.includes('transaction')) {
      const { data: transactions, error: transError } = await supabase
        .from('financial_transactions')
        .select('*')
        .or(`description.ilike.%${query}%,purpose.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .order('transaction_date', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!transError && transactions) {
        transactions.forEach(transaction => {
          let relevance = 0;
          if (transaction.description.toLowerCase().includes(query.toLowerCase())) relevance += 50;
          if (transaction.purpose?.toLowerCase().includes(query.toLowerCase())) relevance += 40;

          results.push({
            id: transaction.id,
            type: 'transaction',
            title: `$${transaction.amount_usd?.toLocaleString() || '0'} Transaction`,
            description: transaction.description.substring(0, 200) + '...',
            relevance,
            significance: transaction.significance,
            date: transaction.transaction_date,
            url: `/financial#${transaction.id}`
          });
        });
      }
    }

    // Search documents using full-text search
    if (types.includes('document')) {
      const { data: documents, error: docsError } = await supabase
        .from('documents')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('reliability', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!docsError && documents) {
        documents.forEach(doc => {
          let relevance = 0;
          if (doc.title.toLowerCase().includes(query.toLowerCase())) relevance += 100;
          if (doc.description?.toLowerCase().includes(query.toLowerCase())) relevance += 50;

          results.push({
            id: doc.id,
            type: 'document',
            title: doc.title,
            description: doc.description?.substring(0, 200) + '...' || 'No description available',
            relevance,
            significance: doc.reliability || 'medium',
            date: doc.publication_date,
            url: `/documents#${doc.id}`
          });
        });
      }
    }

    // Search properties
    if (types.includes('property')) {
      const { data: properties, error: propsError } = await supabase
        .from('properties')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!propsError && properties) {
        properties.forEach(property => {
          let relevance = 0;
          if (property.name.toLowerCase().includes(query.toLowerCase())) relevance += 100;
          if (property.description?.toLowerCase().includes(query.toLowerCase())) relevance += 50;
          if (property.address?.toLowerCase().includes(query.toLowerCase())) relevance += 40;

          results.push({
            id: property.id,
            type: 'property',
            title: property.name,
            description: `${property.type} - ${property.address}`,
            relevance,
            significance: property.significance,
            url: `/geographic#${property.id}`
          });
        });
      }
    }

    // Search flight logs
    if (types.includes('flight')) {
      const { data: flights, error: flightsError } = await supabase
        .from('flight_logs')
        .select('*')
        .or(`aircraft.ilike.%${query}%,departure_location.ilike.%${query}%,arrival_location.ilike.%${query}%`)
        .order('significance', { ascending: false })
        .order('date', { ascending: false })
        .limit(Math.ceil(limit / types.length));

      if (!flightsError && flights) {
        flights.forEach(flight => {
          let relevance = 0;
          if (flight.aircraft.toLowerCase().includes(query.toLowerCase())) relevance += 100;
          if (flight.departure_location?.toLowerCase().includes(query.toLowerCase())) relevance += 50;
          if (flight.arrival_location?.toLowerCase().includes(query.toLowerCase())) relevance += 50;

          results.push({
            id: flight.id,
            type: 'flight',
            title: `${flight.aircraft} - ${flight.departure_location} to ${flight.arrival_location}`,
            description: flight.purpose || `Flight on ${flight.date}`,
            relevance,
            significance: flight.significance,
            date: flight.date,
            url: `/geographic#flight-${flight.id}`
          });
        });
      }
    }

    // Sort by relevance and significance
    results.sort((a, b) => {
      if (a.relevance !== b.relevance) {
        return b.relevance - a.relevance;
      }
      // If same relevance, sort by significance (critical > high > medium > low)
      const significanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return (significanceOrder[b.significance as keyof typeof significanceOrder] || 0) -
             (significanceOrder[a.significance as keyof typeof significanceOrder] || 0);
    });

    // Limit results
    const limitedResults = results.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedResults,
      query,
      total: results.length,
      returned: limitedResults.length,
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      source: 'supabase'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        source: 'supabase'
      },
      { status: 500 }
    );
  }
}

