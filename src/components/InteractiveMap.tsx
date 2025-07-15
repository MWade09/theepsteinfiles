'use client';

import { useEffect, useState } from 'react';
import { MapPin, Home, Building, Plane, Users } from 'lucide-react';

// Types for our map data
interface MapLocation {
  id: string;
  name: string;
  type: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'other';
  coordinates: [number, number];
  description: string;
  significance: 'high' | 'medium' | 'low';
  dateRange: string;
  details: string[];
  verified: boolean;
}

const mapLocations: MapLocation[] = [
  {
    id: '1',
    name: 'Little Saint James Island',
    type: 'island',
    coordinates: [18.3009, -64.8257],
    description: 'Private island in the U.S. Virgin Islands, often referred to as "Epstein Island"',
    significance: 'high',
    dateRange: '1998-2019',
    details: [
      'Purchased for $7.95 million in 1998',
      'Site of alleged trafficking activities',
      'Featured temple-like structure',
      'Multiple guest accommodations'
    ],
    verified: true
  },
  {
    id: '2',
    name: 'Manhattan Mansion',
    type: 'residence',
    coordinates: [40.7736, -73.9566],
    description: 'Upper East Side townhouse, one of the largest private homes in Manhattan',
    significance: 'high',
    dateRange: '1996-2019',
    details: [
      'Nine-story, 21,000 square foot mansion',
      'Located at 9 East 71st Street',
      'Site of alleged activities',
      'Purchased from Les Wexner'
    ],
    verified: true
  },
  {
    id: '3',
    name: 'Palm Beach Estate',
    type: 'residence',
    coordinates: [26.6612, -80.0350],
    description: 'Waterfront mansion in Palm Beach, Florida',
    significance: 'high',
    dateRange: '1990-2019',
    details: [
      'Located at 358 El Brillo Way',
      'Site of initial 2005 investigation',
      'Multiple staff quarters',
      'Private dock and beach access'
    ],
    verified: true
  },
  {
    id: '4',
    name: 'Zorro Ranch',
    type: 'ranch',
    coordinates: [35.8411, -105.4758],
    description: 'Large ranch property in New Mexico',
    significance: 'medium',
    dateRange: '1993-2019',
    details: [
      '8,000-acre property near Santa Fe',
      'Main residence and guest facilities',
      'Private airstrip',
      'Alleged site of activities'
    ],
    verified: true
  },
  {
    id: '5',
    name: 'Paris Apartment',
    type: 'residence',
    coordinates: [48.8632, 2.3126],
    description: 'Luxury apartment in the 7th arrondissement',
    significance: 'medium',
    dateRange: '2000-2019',
    details: [
      'Located near the Eiffel Tower',
      'High-end neighborhood',
      'European base of operations',
      'Multiple bedrooms and entertainment areas'
    ],
    verified: true
  },
  {
    id: '6',
    name: 'Teterboro Airport',
    type: 'airport',
    coordinates: [40.8501, -74.0606],
    description: 'Private aviation hub used for flights',
    significance: 'medium',
    dateRange: '1990s-2019',
    details: [
      'Primary departure point for private jet',
      'Frequent destination in flight logs',
      'New Jersey location',
      'Connected to transportation network'
    ],
    verified: true
  }
];

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [mapFilter, setMapFilter] = useState<string>('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredLocations = mapLocations.filter(location => 
    mapFilter === 'all' || location.type === mapFilter
  );

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'residence': return <Home className="w-5 h-5" />;
      case 'office': return <Building className="w-5 h-5" />;
      case 'island': return <MapPin className="w-5 h-5" />;
      case 'ranch': return <Home className="w-5 h-5" />;
      case 'airport': return <Plane className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'bg-red-500 border-red-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600';
      case 'low': return 'bg-blue-500 border-blue-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  // For now, we'll show a static representation since Leaflet requires client-side rendering
  // In a production environment, you would dynamically import the Map component
  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setMapFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mapFilter === 'all' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
          }`}
        >
          All Locations
        </button>
        <button
          onClick={() => setMapFilter('residence')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mapFilter === 'residence' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
          }`}
        >
          Residences
        </button>
        <button
          onClick={() => setMapFilter('island')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mapFilter === 'island' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
          }`}
        >
          Islands
        </button>
        <button
          onClick={() => setMapFilter('airport')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mapFilter === 'airport' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
          }`}
        >
          Transportation
        </button>
      </div>

      {/* Map Placeholder - In production, this would be the actual Leaflet map */}
      <div className="relative bg-gray-100 dark:bg-dark-800 rounded-lg overflow-hidden mb-8" style={{ height: '600px' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-dark-700 dark:to-dark-600">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-primary-600" />
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Interactive Map Loading...
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Click on a location below to explore details
            </p>
          </div>
        </div>
        
        {/* Floating location markers - Static representation */}
        <div className="absolute top-20 left-1/4 transform -translate-x-1/2">
          <button 
            onClick={() => setSelectedLocation(mapLocations[1])}
            className={`w-8 h-8 rounded-full border-2 ${getSignificanceColor('high')} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
            title="Manhattan Mansion"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
        
        <div className="absolute bottom-32 right-1/3 transform translate-x-1/2">
          <button 
            onClick={() => setSelectedLocation(mapLocations[0])}
            className={`w-8 h-8 rounded-full border-2 ${getSignificanceColor('high')} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
            title="Little Saint James Island"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
        
        <div className="absolute bottom-40 left-1/3 transform -translate-x-1/2">
          <button 
            onClick={() => setSelectedLocation(mapLocations[2])}
            className={`w-8 h-8 rounded-full border-2 ${getSignificanceColor('high')} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
            title="Palm Beach Estate"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="evidence-card p-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setSelectedLocation(location)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg text-white ${getSignificanceColor(location.significance).split(' ')[0]}`}>
                  {getLocationIcon(location.type)}
                </div>
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                    location.significance === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    location.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {location.significance}
                  </span>
                </div>
              </div>
              {location.verified && (
                <span className="text-green-600 font-bold">✓</span>
              )}
            </div>

            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
              {location.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              {location.description}
            </p>

            <div className="text-sm text-gray-500 dark:text-gray-500">
              <div className="mb-1">
                <strong>Type:</strong> {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
              </div>
              <div>
                <strong>Active:</strong> {location.dateRange}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg text-white ${getSignificanceColor(selectedLocation.significance).split(' ')[0]}`}>
                    {getLocationIcon(selectedLocation.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedLocation.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedLocation.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <strong>Coordinates:</strong><br />
                    {selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}
                  </div>
                  <div>
                    <strong>Active Period:</strong><br />
                    {selectedLocation.dateRange}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Details:</h3>
                <ul className="space-y-2">
                  {selectedLocation.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 mt-1">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedLocation.significance === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    selectedLocation.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {selectedLocation.significance.toUpperCase()} SIGNIFICANCE
                  </span>
                  {selectedLocation.verified && (
                    <span className="text-green-600 font-semibold">✓ Verified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 