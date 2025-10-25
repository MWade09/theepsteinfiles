export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          name: string
          type: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'yacht' | 'other'
          coordinates: number[] | null
          address: string
          description: string | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          current_status: string
          access_level: string
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'yacht' | 'other'
          coordinates?: number[] | null
          address: string
          description?: string | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          current_status?: string
          access_level?: string
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'yacht' | 'other'
          coordinates?: number[] | null
          address?: string
          description?: string | null
          significance?: 'critical' | 'high' | 'medium' | 'low'
          current_status?: string
          access_level?: string
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      people: {
        Row: {
          id: string
          name: string
          aliases: string[] | null
          date_of_birth: string | null
          date_of_death: string | null
          nationality: string[] | null
          occupations: string[] | null
          organizations: string[] | null
          biography: string | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          aliases?: string[] | null
          date_of_birth?: string | null
          date_of_death?: string | null
          nationality?: string[] | null
          occupations?: string[] | null
          organizations?: string[] | null
          biography?: string | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          aliases?: string[] | null
          date_of_birth?: string | null
          date_of_death?: string | null
          nationality?: string[] | null
          occupations?: string[] | null
          organizations?: string[] | null
          biography?: string | null
          significance?: 'critical' | 'high' | 'medium' | 'low'
          verification_status?: 'verified' | 'pending' | 'disputed'
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          type: string
          headquarters: string | null
          founding_date: string | null
          status: string
          description: string | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          headquarters?: string | null
          founding_date?: string | null
          status?: string
          description?: string | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          headquarters?: string | null
          founding_date?: string | null
          status?: string
          description?: string | null
          significance?: 'critical' | 'high' | 'medium' | 'low'
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
          updated_at?: string
        }
      }
      timeline_events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          end_date: string | null
          type: string
          category: string
          significance: Database['public']['Enums']['significance_level']
          coordinates: number[] | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          end_date?: string | null
          type: string
          category: string
          significance: Database['public']['Enums']['significance_level']
          coordinates?: number[] | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          end_date?: string | null
          type?: string
          category?: string
          significance?: 'critical' | 'high' | 'medium' | 'low'
          coordinates?: number[] | null
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
          updated_at?: string
        }
      }
      financial_transactions: {
        Row: {
          id: string
          description: string
          amount_usd: number
          currency: string
          transaction_date: string
          from_entity: string
          to_entity: string
          purpose: string | null
          suspicious_activity: Json | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          created_at: string
        }
        Insert: {
          id?: string
          description: string
          amount_usd: number
          currency?: string
          transaction_date: string
          from_entity: string
          to_entity: string
          purpose?: string | null
          suspicious_activity?: Json | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
        Update: {
          id?: string
          description?: string
          amount_usd?: number
          currency?: string
          transaction_date?: string
          from_entity?: string
          to_entity?: string
          purpose?: string | null
          suspicious_activity?: Json | null
          significance?: 'critical' | 'high' | 'medium' | 'low'
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
      }
      flight_logs: {
        Row: {
          id: string
          date: string
          time: string | null
          aircraft: string
          tail_number: string
          departure_location: string
          arrival_location: string
          departure_coordinates: number[] | null
          arrival_coordinates: number[] | null
          passengers: Json
          purpose: string | null
          flight_duration: string | null
          distance: number | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          time?: string | null
          aircraft: string
          tail_number: string
          departure_location: string
          arrival_location: string
          departure_coordinates?: number[] | null
          arrival_coordinates?: number[] | null
          passengers: Json
          purpose?: string | null
          flight_duration?: string | null
          distance?: number | null
          significance: 'critical' | 'high' | 'medium' | 'low'
          verification_status: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          time?: string | null
          aircraft?: string
          tail_number?: string
          departure_location?: string
          arrival_location?: string
          departure_coordinates?: number[] | null
          arrival_coordinates?: number[] | null
          passengers?: Json
          purpose?: string | null
          flight_duration?: string | null
          distance?: number | null
          significance?: 'critical' | 'high' | 'medium' | 'low'
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          type: string
          content: string | null
          file_url: string | null
          author: string | null
          publication: string | null
          publication_date: string | null
          url: string | null
          reliability: 'high' | 'medium' | 'low'
          description: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          content?: string | null
          file_url?: string | null
          author?: string | null
          publication?: string | null
          publication_date?: string | null
          url?: string | null
          reliability?: 'high' | 'medium' | 'low'
          description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          content?: string | null
          file_url?: string | null
          author?: string | null
          publication?: string | null
          publication_date?: string | null
          url?: string | null
          reliability?: 'high' | 'medium' | 'low'
          description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      sources: {
        Row: {
          id: string
          title: string
          type: string
          author: string | null
          publication: string | null
          publication_date: string | null
          url: string | null
          reliability: 'high' | 'medium' | 'low'
          description: string | null
          tags: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          author?: string | null
          publication?: string | null
          publication_date?: string | null
          url?: string | null
          reliability: 'high' | 'medium' | 'low'
          description?: string | null
          tags?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          author?: string | null
          publication?: string | null
          publication_date?: string | null
          url?: string | null
          reliability?: 'high' | 'medium' | 'low'
          description?: string | null
          tags?: string[] | null
          created_at?: string
        }
      }
      property_ownership_history: {
        Row: {
          id: string
          property_id: string
          owner_id: string | null
          owner_type: 'person' | 'organization'
          start_date: string
          end_date: string | null
          acquisition_method: string | null
          purchase_price: number | null
          legal_entity: string | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id?: string | null
          owner_type: 'person' | 'organization'
          start_date: string
          end_date?: string | null
          acquisition_method?: string | null
          purchase_price?: number | null
          legal_entity?: string | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string | null
          owner_type?: 'person' | 'organization'
          start_date?: string
          end_date?: string | null
          acquisition_method?: string | null
          purchase_price?: number | null
          legal_entity?: string | null
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
      }
      event_entities: {
        Row: {
          id: string
          event_id: string
          entity_id: string | null
          entity_type: 'person' | 'organization' | 'property'
          role: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          entity_id?: string | null
          entity_type: 'person' | 'organization' | 'property'
          role: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          entity_id?: string | null
          entity_type?: 'person' | 'organization' | 'property'
          role?: string
          description?: string | null
          created_at?: string
        }
      }
      entity_relationships: {
        Row: {
          id: string
          entity1_id: string
          entity1_type: 'person' | 'organization' | 'property'
          entity2_id: string
          entity2_type: 'person' | 'organization' | 'property'
          relationship_type: string
          strength: number | null
          start_date: string | null
          end_date: string | null
          description: string | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at: string
        }
        Insert: {
          id?: string
          entity1_id: string
          entity1_type: 'person' | 'organization' | 'property'
          entity2_id: string
          entity2_type: 'person' | 'organization' | 'property'
          relationship_type: string
          strength?: number | null
          start_date?: string | null
          end_date?: string | null
          description?: string | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at?: string
        }
        Update: {
          id?: string
          entity1_id?: string
          entity1_type?: 'person' | 'organization' | 'property'
          entity2_id?: string
          entity2_type?: 'person' | 'organization' | 'property'
          relationship_type?: string
          strength?: number | null
          start_date?: string | null
          end_date?: string | null
          description?: string | null
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
      }
      flight_paths: {
        Row: {
          id: string
          flight_id: string
          path: Json
          created_at: string
        }
        Insert: {
          id?: string
          flight_id: string
          path: Json
          created_at?: string
        }
        Update: {
          id?: string
          flight_id?: string
          path?: Json
          created_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'researcher' | 'viewer'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'researcher' | 'viewer'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'researcher' | 'viewer'
          created_at?: string
        }
      }
      research_sessions: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      relationships: {
        Row: {
          id: string
          entity1_id: string
          entity1_type: 'person' | 'organization' | 'property'
          entity2_id: string
          entity2_type: 'person' | 'organization' | 'property'
          relationship_type: string
          strength: number | null
          start_date: string | null
          end_date: string | null
          description: string | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at: string
        }
        Insert: {
          id?: string
          entity1_id: string
          entity1_type: 'person' | 'organization' | 'property'
          entity2_id: string
          entity2_type: 'person' | 'organization' | 'property'
          relationship_type: string
          strength?: number | null
          start_date?: string | null
          end_date?: string | null
          description?: string | null
          verification_status: Database['public']['Enums']['verification_status']
          created_at?: string
        }
        Update: {
          id?: string
          entity1_id?: string
          entity1_type?: 'person' | 'organization' | 'property'
          entity2_id?: string
          entity2_type?: 'person' | 'organization' | 'property'
          relationship_type?: string
          strength?: number | null
          start_date?: string | null
          end_date?: string | null
          description?: string | null
          verification_status?: 'verified' | 'pending' | 'disputed'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      significance_level: 'critical' | 'high' | 'medium' | 'low'
      verification_status: 'verified' | 'pending' | 'disputed'
      property_type: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'yacht' | 'other'
      entity_type: 'person' | 'organization' | 'property'
      reliability_level: 'high' | 'medium' | 'low'
      user_role: 'admin' | 'researcher' | 'viewer'
    }
  }
}
