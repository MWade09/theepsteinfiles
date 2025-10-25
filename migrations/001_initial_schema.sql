-- Epstein Investigation Platform - Initial Schema Migration
-- Created: October 2024

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE significance_level AS ENUM ('critical', 'high', 'medium', 'low');
CREATE TYPE verification_status AS ENUM ('verified', 'pending', 'disputed');
CREATE TYPE property_type AS ENUM ('residence', 'office', 'island', 'ranch', 'airport', 'yacht', 'other');
CREATE TYPE entity_type AS ENUM ('person', 'organization', 'property');
CREATE TYPE reliability_level AS ENUM ('high', 'medium', 'low');
CREATE TYPE user_role AS ENUM ('admin', 'researcher', 'viewer');

-- Core Tables

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type property_type NOT NULL,
  coordinates DECIMAL[] CHECK (coordinates IS NULL OR array_length(coordinates, 1) = 2),
  address TEXT NOT NULL,
  description TEXT,
  significance significance_level NOT NULL,
  current_status TEXT NOT NULL DEFAULT 'unknown',
  access_level TEXT NOT NULL DEFAULT 'private',
  verified BOOLEAN DEFAULT false,
  geom GEOMETRY(POINT, 4326),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- People table
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  aliases TEXT[],
  date_of_birth DATE,
  date_of_death DATE,
  nationality TEXT[],
  occupations TEXT[],
  organizations TEXT[],
  biography TEXT,
  significance significance_level NOT NULL,
  verification_status verification_status NOT NULL,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  headquarters TEXT,
  founding_date DATE,
  status TEXT DEFAULT 'active',
  description TEXT,
  significance significance_level NOT NULL,
  verification_status verification_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline events table
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  end_date DATE,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  significance significance_level NOT NULL,
  coordinates DECIMAL[] CHECK (coordinates IS NULL OR array_length(coordinates, 1) = 2),
  verification_status verification_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial transactions table
CREATE TABLE financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  amount_usd DECIMAL NOT NULL CHECK (amount_usd >= 0),
  currency TEXT DEFAULT 'USD',
  transaction_date DATE NOT NULL,
  from_entity TEXT NOT NULL,
  to_entity TEXT NOT NULL,
  purpose TEXT,
  suspicious_activity JSONB,
  significance significance_level NOT NULL,
  verification_status verification_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight logs table
CREATE TABLE flight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time TIME,
  aircraft TEXT NOT NULL,
  tail_number TEXT NOT NULL,
  departure_location TEXT NOT NULL,
  arrival_location TEXT NOT NULL,
  departure_coordinates DECIMAL[] CHECK (departure_coordinates IS NULL OR array_length(departure_coordinates, 1) = 2),
  arrival_coordinates DECIMAL[] CHECK (arrival_coordinates IS NULL OR array_length(arrival_coordinates, 1) = 2),
  passengers JSONB NOT NULL,
  purpose TEXT,
  flight_duration TEXT,
  distance INTEGER CHECK (distance IS NULL OR distance >= 0),
  significance significance_level NOT NULL,
  verification_status verification_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  author TEXT,
  publication TEXT,
  publication_date DATE,
  url TEXT,
  reliability reliability_level DEFAULT 'medium',
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sources table
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  author TEXT,
  publication TEXT,
  publication_date DATE,
  url TEXT,
  reliability reliability_level NOT NULL,
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relationship Tables

-- Property ownership history
CREATE TABLE property_ownership_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  owner_id UUID, -- Can reference people or organizations
  owner_type entity_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  acquisition_method TEXT,
  purchase_price DECIMAL CHECK (purchase_price IS NULL OR purchase_price >= 0),
  legal_entity TEXT,
  verification_status verification_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event entities (linking timeline events to entities)
CREATE TABLE event_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES timeline_events(id) ON DELETE CASCADE,
  entity_id UUID, -- Can reference people, organizations, or properties
  entity_type entity_type NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Entity relationships
CREATE TABLE entity_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity1_id UUID NOT NULL,
  entity1_type entity_type NOT NULL,
  entity2_id UUID NOT NULL,
  entity2_type entity_type NOT NULL,
  relationship_type TEXT NOT NULL,
  strength DECIMAL CHECK (strength IS NULL OR (strength >= 0 AND strength <= 1)),
  start_date DATE,
  end_date DATE,
  description TEXT,
  verification_status verification_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entity1_id, entity1_type, entity2_id, entity2_type, relationship_type)
);

-- Flight paths (for PostGIS visualization)
CREATE TABLE flight_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flight_id UUID REFERENCES flight_logs(id) ON DELETE CASCADE,
  path GEOMETRY(LINESTRING, 4326),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Authentication and User Management

-- User roles and permissions
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User research sessions
CREATE TABLE research_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_properties_coordinates ON properties USING GIST (geom);
CREATE INDEX idx_properties_significance ON properties (significance);
CREATE INDEX idx_properties_type ON properties (type);
CREATE INDEX idx_properties_status ON properties (current_status);
-- Note: Full-text search index will be created separately after schema setup

CREATE INDEX idx_people_name ON people (name);
CREATE INDEX idx_people_significance ON people (significance);
CREATE INDEX idx_people_verification ON people (verification_status);
-- Note: Full-text search index will be created separately after schema setup

CREATE INDEX idx_organizations_name ON organizations (name);
CREATE INDEX idx_organizations_type ON organizations (type);
CREATE INDEX idx_organizations_significance ON organizations (significance);

CREATE INDEX idx_timeline_events_date ON timeline_events (date);
CREATE INDEX idx_timeline_events_type ON timeline_events (type);
CREATE INDEX idx_timeline_events_category ON timeline_events (category);
CREATE INDEX idx_timeline_events_significance ON timeline_events (significance);
-- Note: Full-text search index will be created separately after schema setup

CREATE INDEX idx_financial_transactions_date ON financial_transactions (transaction_date);
CREATE INDEX idx_financial_transactions_amount ON financial_transactions (amount_usd);
CREATE INDEX idx_financial_transactions_entities ON financial_transactions (from_entity, to_entity);

CREATE INDEX idx_flight_logs_date ON flight_logs (date);
CREATE INDEX idx_flight_logs_aircraft ON flight_logs (aircraft);
CREATE INDEX idx_flight_logs_locations ON flight_logs (departure_location, arrival_location);

CREATE INDEX idx_documents_type ON documents (type);
CREATE INDEX idx_documents_reliability ON documents (reliability);
-- Note: Full-text search index will be created separately after schema setup

CREATE INDEX idx_property_ownership_property ON property_ownership_history (property_id);
CREATE INDEX idx_property_ownership_owner ON property_ownership_history (owner_id, owner_type);
CREATE INDEX idx_property_ownership_dates ON property_ownership_history (start_date, end_date);

CREATE INDEX idx_event_entities_event ON event_entities (event_id);
CREATE INDEX idx_event_entities_entity ON event_entities (entity_id, entity_type);

CREATE INDEX idx_entity_relationships_entity1 ON entity_relationships (entity1_id, entity1_type);
CREATE INDEX idx_entity_relationships_entity2 ON entity_relationships (entity2_id, entity2_type);
CREATE INDEX idx_entity_relationships_type ON entity_relationships (relationship_type);

CREATE INDEX idx_flight_paths_flight ON flight_paths (flight_id);
CREATE INDEX idx_flight_paths_geom ON flight_paths USING GIST (path);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON timeline_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_research_sessions_updated_at BEFORE UPDATE ON research_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to update PostGIS geometry when coordinates change
CREATE OR REPLACE FUNCTION update_property_geom()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.coordinates IS NOT NULL AND array_length(NEW.coordinates, 1) = 2 THEN
    NEW.geom = ST_SetSRID(ST_MakePoint(NEW.coordinates[2], NEW.coordinates[1]), 4326);
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_geom BEFORE INSERT OR UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_property_geom();

-- Create trigger to update flight paths when coordinates change
CREATE OR REPLACE FUNCTION update_flight_path()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.departure_coordinates IS NOT NULL AND NEW.arrival_coordinates IS NOT NULL
     AND array_length(NEW.departure_coordinates, 1) = 2
     AND array_length(NEW.arrival_coordinates, 1) = 2 THEN

    -- Delete existing path
    DELETE FROM flight_paths WHERE flight_id = NEW.id;

    -- Insert new path
    INSERT INTO flight_paths (flight_id, path)
    VALUES (NEW.id, ST_SetSRID(
      ST_MakeLine(
        ST_MakePoint(NEW.departure_coordinates[2], NEW.departure_coordinates[1]),
        ST_MakePoint(NEW.arrival_coordinates[2], NEW.arrival_coordinates[1])
      ), 4326));
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_flight_paths BEFORE INSERT OR UPDATE ON flight_logs FOR EACH ROW EXECUTE FUNCTION update_flight_path();
