'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Building, 
  Plane, 
  Star, 
  AlertTriangle,
  DollarSign,
  Activity,
  Eye
} from 'lucide-react';
import { enhancedProperties as properties } from '@/data/geographic/properties';
import { flightLogs as flights, travelPatterns } from '@/data/geographic/travelPatterns';

// Fix for default markers in react-leaflet (safer approach)
const initializeLeafletIcons = () => {
  try {
    if (typeof window !== 'undefined' && L && L.Icon && L.Icon.Default) {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  } catch (error) {
    console.error('Failed to initialize Leaflet icons:', error);
  }
};

interface InteractiveMapProps {
  selectedProperty: string | null;
  onPropertySelect: (propertyId: string) => void;
  activeLayers: {
    flightPaths: boolean;
    travelPatterns: boolean;
    financialConnections: boolean;
  };
  className?: string;
}

interface DiscoveryPoint {
  id: string;
  name: string;
  category: 'property' | 'flight' | 'pattern' | 'financial';
  points: number;
  discovered: boolean;
}

// Custom marker icons based on property significance and type
const createCustomIcon = (
  type: string, 
  significance: string, 
  isSelected: boolean,
  hasDiscovery: boolean
) => {
  const getColor = () => {
    switch (significance) {
      case 'critical': return '#ef4444'; // red
      case 'high': return '#f59e0b'; // orange
      default: return '#3b82f6'; // blue
    }
  };

  const getTypeSymbol = () => {
    switch (type) {
      case 'island': return '🏝️';
      case 'mansion': case 'estate': return '🏛️';
      case 'ranch': return '🏡';
      case 'apartment': return '🏢';
      default: return '📍';
    }
  };

  const color = getColor();
  const symbol = getTypeSymbol();
  const size = isSelected ? 40 : 32;
  
  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}22 0%, ${color}11 70%);
        border: 3px solid ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${size * 0.4}px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(${significance === 'critical' ? '239, 68, 68' : significance === 'high' ? '245, 158, 11' : '59, 130, 246'}, 0.4);
        ${isSelected ? `
          animation: pulse 2s infinite;
          transform: scale(1.1);
        ` : ''}
      ">
        ${symbol}
        ${hasDiscovery ? `
          <div style="
            position: absolute;
            top: -5px;
            right: -5px;
            width: 16px;
            height: 16px;
            background: linear-gradient(45deg, #fbbf24, #f59e0b);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            border: 2px solid #000;
          ">⭐</div>
        ` : ''}
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      </style>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Discovery points system (same as before)
const discoveryPoints: DiscoveryPoint[] = [
  { id: 'property_little_saint_james', name: 'Little Saint James', category: 'property', points: 500, discovered: true },
  { id: 'property_manhattan_mansion', name: 'Manhattan Mansion', category: 'property', points: 400, discovered: true },
  { id: 'property_palm_beach_estate', name: 'Palm Beach Estate', category: 'property', points: 350, discovered: true },
  { id: 'property_zorro_ranch', name: 'Zorro Ranch', category: 'property', points: 300, discovered: false },
  { id: 'property_paris_apartment', name: 'Paris Apartment', category: 'property', points: 250, discovered: true },
];

// Flight path calculation
const getFlightPaths = () => {
  if (!flights) return [];
  
  return flights.map(flight => {
    // Find matching properties for departure and arrival
    const depProperty = properties.find(p => 
      flight.departure?.propertyId === p.id || 
      p.name.toLowerCase().includes(flight.departure?.location?.toLowerCase() || '')
    );
    const arrProperty = properties.find(p => 
      flight.arrival?.propertyId === p.id || 
      p.name.toLowerCase().includes(flight.arrival?.location?.toLowerCase() || '')
    );

    if (!depProperty || !arrProperty) {
      // Use flight coordinates if available
      const depCoords = flight.departure?.coordinates;
      const arrCoords = flight.arrival?.coordinates;
      if (depCoords && arrCoords) {
        return {
          id: flight.id,
          positions: [depCoords, arrCoords] as [number, number][],
          significance: flight.significance,
          flightInfo: flight
        };
      }
      return null;
    }

    return {
      id: flight.id,
      positions: [depProperty.coordinates, arrProperty.coordinates] as [number, number][],
      significance: flight.significance,
      flightInfo: flight
    };
  }).filter(Boolean);
};

// Travel pattern paths
const getTravelPatternPaths = () => {
  if (!travelPatterns) return [];
  
  return travelPatterns.map(pattern => {
    const routeCoordinates = pattern.primaryRoute
      .map(route => {
        const property = properties.find(p => 
          p.name.toLowerCase().includes(route.location?.toLowerCase() || '')
        );
        return property ? property.coordinates : null;
      })
      .filter(Boolean) as [number, number][];

    if (routeCoordinates.length < 2) return null;

    return {
      id: pattern.id,
      positions: routeCoordinates,
      frequency: pattern.frequency,
      description: pattern.description
    };
  }).filter(Boolean);
};

export default function InteractiveMap({ 
  selectedProperty, 
  onPropertySelect, 
  activeLayers, 
  className = '' 
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      setIsClient(true);
      
      // Add a small delay to ensure all libraries are loaded
      const timer = setTimeout(() => {
        try {
          initializeLeafletIcons();
          setIsMapReady(true);
        } catch (error) {
          console.error('Map initialization failed:', error);
          setMapError(error instanceof Error ? error.message : 'Unknown error');
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isClient || !isMapReady) {
    return (
      <div className={`w-full h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-cyan-500/30 flex items-center justify-center ${className}`}>
        <div className="text-center text-cyan-400">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold">Loading Interactive Map</p>
          <p className="text-sm opacity-60">
            {!isClient ? 'Initializing client environment...' : 'Loading map components...'}
          </p>
          {mapError && (
            <div className="mt-4 text-red-400 text-sm">
              Error: {mapError}
            </div>
          )}
        </div>
      </div>
    );
  }

  const flightPaths = getFlightPaths();
  const travelPatternPaths = getTravelPatternPaths();

  // Map center (Caribbean region to show Little Saint James prominently)
  const mapCenter: [number, number] = [18.3, -64.8];
  const mapZoom = 6;

  try {
    return (
      <div className={`relative w-full h-[600px] rounded-xl overflow-hidden border border-cyan-500/30 ${className}`}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          className="z-10"
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          zoomControl={true}
          whenReady={() => {
            // Map is ready for interaction
          }}
        >
        {/* Base Map Layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains={['a', 'b', 'c', 'd']}
        />

        {/* Property Markers */}
        {properties && properties.map((property) => {
          const discovery = discoveryPoints.find(d => d.id === property.id);
          const isSelected = selectedProperty === property.id;
          
          return (
            <Marker
              key={property.id}
              position={property.coordinates}
              icon={createCustomIcon(
                property.type, 
                property.significance, 
                isSelected,
                discovery?.discovered || false
              )}
              eventHandlers={{
                click: () => onPropertySelect(property.id),
              }}
            >
              <Popup>
                <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[250px]">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{property.name}</h3>
                    {discovery?.discovered && (
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                        +{discovery.points} pts
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">{property.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        property.significance === 'critical' ? 'bg-red-900/50 text-red-400' :
                        property.significance === 'high' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-blue-900/50 text-blue-400'
                      }`}>
                        {property.significance.toUpperCase()}
                      </span>
                      
                      <span className="text-green-400 font-bold">
                        ${property.financials.purchasePrice.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-cyan-400">
                      Owner: {property.ownershipHistory[0]?.ownerName}
                    </div>
                    
                    {property.flightLogReferences && property.flightLogReferences.length > 0 && (
                      <div className="text-purple-400">
                        {property.flightLogReferences.length} documented flights
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Flight Paths */}
        {activeLayers.flightPaths && flightPaths.map((path) => {
          if (!path) return null;
          
          const color = path.significance === 'critical' ? '#ef4444' : 
                       path.significance === 'high' ? '#f59e0b' : '#3b82f6';
          
          return (
            <Polyline
              key={path.id}
              positions={path.positions}
              color={color}
              weight={3}
              opacity={0.8}
              dashArray="10, 10"
            />
          );
        })}

        {/* Travel Patterns */}
        {activeLayers.travelPatterns && travelPatternPaths.map((pattern) => {
          if (!pattern) return null;
          
          return (
            <Polyline
              key={pattern.id}
              positions={pattern.positions}
              color="#a855f7"
              weight={2}
              opacity={0.6}
              dashArray="15, 8"
            />
          );
        })}

        {/* Financial Connections (Circles around suspicious properties) */}
        {activeLayers.financialConnections && properties
          .filter(p => p.financials.suspiciousTransactions.length > 0)
          .map((property) => (
            <Circle
              key={`financial-${property.id}`}
              center={property.coordinates}
              radius={50000} // 50km radius
              color="#f97316"
              fillColor="#f97316"
              fillOpacity={0.1}
              weight={2}
              opacity={0.6}
              dashArray="8, 8"
            />
          ))
        }
      </MapContainer>

      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-cyan-400 text-sm">
          <Eye className="w-4 h-4" />
          <span className="font-medium">Interactive Investigation Map</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Zoom, pan, and click markers to explore
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-20 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
        <div className="text-xs text-gray-300 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Critical Significance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>High Significance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-blue-500"></div>
            <span>Flight Paths</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-purple-500"></div>
            <span>Travel Patterns</span>
          </div>
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('InteractiveMap rendering error:', error);
    return (
      <div className={`relative w-full h-[600px] rounded-xl overflow-hidden border border-red-500/30 ${className}`}>
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="text-center text-red-400">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">Map Loading Failed</p>
            <p className="text-sm opacity-60 mb-4">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
} 