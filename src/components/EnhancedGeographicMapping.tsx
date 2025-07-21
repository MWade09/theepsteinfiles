'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Map, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Search,
  Filter,
  Target,
  Zap,
  Eye,
  Award,
  Star,
  MapPin,
  Plane,
  Building,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  ChevronRight,
  Trophy,
  Satellite,
  Layers,
  Box,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Globe,
  Mountain,
  Database,
  Navigation,
  MousePointer
} from 'lucide-react';
import { enhancedProperties as properties } from '@/data/geographic/properties';
import { flightLogs as flights, travelPatterns } from '@/data/geographic/travelPatterns';

interface LayerState {
  flightPaths: boolean;
  travelPatterns: boolean;
  financialConnections: boolean;
  satelliteImagery: boolean;
  property3D: boolean;
  timelineOverlay: boolean;
  realTimeTracking: boolean;
  terrainAnalysis: boolean;
  ownershipHistory: boolean;
  investigationMarkers: boolean;
}

interface ViewMode3D {
  enabled: boolean;
  elevation: number;
  rotation: number;
  tilt: number;
  zoom: number;
}

interface SatelliteLayer {
  id: string;
  name: string;
  type: 'optical' | 'radar' | 'infrared' | 'historical';
  date: string;
  resolution: number;
  opacity: number;
  enabled: boolean;
}

interface TimelineFilter {
  startDate: string;
  endDate: string;
  eventTypes: string[];
  showOwnershipChanges: boolean;
  showFlightActivity: boolean;
  showFinancialActivity: boolean;
  animationSpeed: number;
}

interface InvestigationMarker {
  id: string;
  coordinates: [number, number];
  type: 'evidence' | 'witness' | 'transaction' | 'meeting' | 'anomaly';
  title: string;
  description: string;
  date: string;
  reliability: 'confirmed' | 'probable' | 'unverified';
  linkedProperties: string[];
  linkedFlights: string[];
  evidence: {
    documents: string[];
    multimedia: string[];
    testimonies: string[];
  };
}

interface DiscoveryPoint {
  id: string;
  name: string;
  category: 'property' | 'flight' | 'pattern' | 'financial';
  points: number;
  discovered: boolean;
  coordinates?: { x: number; y: number };
}

interface UserProgress {
  totalPoints: number;
  discoveries: number;
  rank: string;
  achievements: string[];
}

export default function EnhancedGeographicMapping() {
  const [viewMode, setViewMode] = useState<'overview' | 'timeline' | 'patterns' | 'financial' | '3d' | 'satellite'>('overview');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<LayerState>({
    flightPaths: true,
    travelPatterns: true,
    financialConnections: true,
    satelliteImagery: false,
    property3D: false,
    timelineOverlay: false,
    realTimeTracking: false,
    terrainAnalysis: false,
    ownershipHistory: true,
    investigationMarkers: true
  });
  const [showFilters, setShowFilters] = useState(false);
  const [view3D, setView3D] = useState<ViewMode3D>({
    enabled: false,
    elevation: 45,
    rotation: 0,
    tilt: 60,
    zoom: 12
  });
  const [timelineFilter] = useState<TimelineFilter>({
    startDate: '1990-01-01',
    endDate: '2019-12-31',
    eventTypes: ['ownership', 'flights', 'financial'],
    showOwnershipChanges: true,
    showFlightActivity: true,
    showFinancialActivity: true,
    animationSpeed: 1
  });
  const [satelliteLayers, setSatelliteLayers] = useState<SatelliteLayer[]>([
    {
      id: 'optical_2019',
      name: 'Optical Imagery 2019',
      type: 'optical',
      date: '2019-08-10',
      resolution: 0.5,
      opacity: 1.0,
      enabled: false
    },
    {
      id: 'historical_2015',
      name: 'Historical Imagery 2015',
      type: 'historical',
      date: '2015-03-15',
      resolution: 1.0,
      opacity: 0.8,
      enabled: false
    }
  ]);
  const [investigationMarkers] = useState<InvestigationMarker[]>([
    {
      id: 'witness_1',
      coordinates: [18.310, -64.825],
      type: 'witness',
      title: 'Witness Testimony Location',
      description: 'Key witness testimony regarding activities at Little Saint James',
      date: '2019-07-02',
      reliability: 'confirmed',
      linkedProperties: ['lsj_main'],
      linkedFlights: ['fl_001'],
      evidence: {
        documents: ['witness_statement_001.pdf'],
        multimedia: ['testimony_audio_001.mp3'],
        testimonies: ['virginia_giuffre_testimony']
      }
    }
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userProgress] = useState<UserProgress>({
    totalPoints: 2750,
    discoveries: 18,
    rank: 'Senior Investigator',
    achievements: ['First Discovery', 'Financial Detective', 'Pattern Hunter', 'Property Sleuth']
  });

  // Data validation and loading state
  const isDataLoaded = properties && properties.length > 0 && flights && flights.length > 0;

  // Gamification: Discovery points system
  const discoveryPoints: DiscoveryPoint[] = [
    { id: 'lsj', name: 'Little Saint James', category: 'property', points: 500, discovered: true },
    { id: 'manhattan', name: 'Manhattan Mansion', category: 'property', points: 400, discovered: true },
    { id: 'palm_beach', name: 'Palm Beach Estate', category: 'property', points: 350, discovered: true },
    { id: 'zorro_ranch', name: 'Zorro Ranch', category: 'property', points: 300, discovered: false },
    { id: 'paris_apt', name: 'Paris Apartment', category: 'property', points: 250, discovered: true },
    { id: 'flight_vg', name: 'Giuffre Testimony Flight', category: 'flight', points: 400, discovered: true },
    { id: 'pattern_weekend', name: 'Weekend Shuttle Pattern', category: 'pattern', points: 300, discovered: false },
    { id: 'financial_wexner', name: 'Wexner Gift Transaction', category: 'financial', points: 450, discovered: true }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      // Animation timer for UI effects
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Log data loading status
  useEffect(() => {
    if (isDataLoaded) {
      // Data loaded successfully
    } else {
      // Data loading issues detected
    }
  }, [isDataLoaded]);

  // Icon helper function for timeline and financial views
  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'island': return <MapPin className="w-5 h-5 text-red-400" />;
      case 'mansion': case 'estate': return <Building className="w-5 h-5 text-yellow-400" />;
      case 'ranch': return <Building className="w-5 h-5 text-green-400" />;
      case 'apartment': return <Building className="w-5 h-5 text-blue-400" />;
      default: return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Senior Investigator': return 'from-yellow-400 to-orange-500';
      case 'Detective': return 'from-blue-400 to-purple-500';
      case 'Rookie': return 'from-gray-400 to-gray-600';
      default: return 'from-green-400 to-teal-500';
    }
  };

  const renderOverviewView = () => {
    // Enhanced Interactive Map with advanced features
    const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
      ssr: false,
      loading: () => (
        <div className="w-full h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-cyan-500/30 flex items-center justify-center">
          <div className="text-center text-cyan-400">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold">Loading Enhanced Interactive Map</p>
            <p className="text-sm opacity-60">Initializing advanced geographic visualization...</p>
          </div>
        </div>
      )
    });

    return (
      <div className="space-y-6">
        {/* Advanced Features Panel */}
        {(activeLayers.satelliteImagery || activeLayers.property3D || activeLayers.timelineOverlay) && (
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <h4 className="text-blue-400 font-bold">Advanced Features Active</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {activeLayers.satelliteImagery && (
                <div className="flex items-center gap-2 text-green-400">
                  <Satellite className="w-4 h-4" />
                  <span>High-resolution satellite imagery overlay</span>
                </div>
              )}
              {activeLayers.property3D && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <Box className="w-4 h-4" />
                  <span>3D property visualizations enabled</span>
                </div>
              )}
              {activeLayers.timelineOverlay && (
                <div className="flex items-center gap-2 text-yellow-400">
                  <Clock className="w-4 h-4" />
                  <span>Timeline overlay with temporal data</span>
                </div>
              )}
            </div>
          </div>
        )}

        <InteractiveMap
          selectedProperty={selectedProperty}
          onPropertySelect={(propertyId) => setSelectedProperty(propertyId)}
          activeLayers={{
            flightPaths: activeLayers.flightPaths,
            travelPatterns: activeLayers.travelPatterns,
            financialConnections: activeLayers.financialConnections
          }}
        />
      </div>
    );
  };

  const renderTimelineView = () => (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
      <div className="flex items-center gap-3 text-cyan-400 mb-6">
        <Clock className="w-6 h-6" />
        <h3 className="text-xl font-bold">Property Acquisition Timeline</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
      </div>
      
             {properties && properties
         .sort((a, b) => new Date(a.ownershipHistory[0].startDate).getTime() - new Date(b.ownershipHistory[0].startDate).getTime())
        .map((property, _index) => {
          const discovery = discoveryPoints.find(d => d.id === property.id?.split('_')[0]);
          
          return (
            <div 
              key={property.id} 
              className="flex items-start gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              onClick={() => setSelectedProperty(property.id)}
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  property.significance === 'critical' 
                    ? 'bg-red-900/50 border-red-400' 
                    : 'bg-blue-900/50 border-blue-400'
                }`}>
                  {getPropertyIcon(property.type)}
                </div>
                {discovery?.discovered && (
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mt-1 mx-auto">
                    <Star className="w-2 h-2 text-black" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-white">{property.name}</h4>
                  <span className="px-2 py-1 bg-cyan-900/50 text-cyan-400 text-xs rounded-full border border-cyan-500/30">
                    {new Date(property.ownershipHistory[0].startDate).getFullYear()}
                  </span>
                  {discovery && (
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-400 text-xs rounded-full border border-purple-500/30">
                      +{discovery.points} pts
                    </span>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm mt-1">
                  Acquired: {property.ownershipHistory[0].startDate} • 
                  Method: {property.ownershipHistory[0].acquisitionMethod} • 
                  Value: ${property.financials.purchasePrice.toLocaleString()}
                </p>
                
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    Investigation Milestone
                  </span>
                  <span className="text-gray-500">
                    {property.investigationDetails?.keyEvents?.length || 0} key events documented
                  </span>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
          );
        })}
    </div>
  );

  const renderPatternsView = () => (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
      <div className="flex items-center gap-3 text-purple-400 mb-6">
        <TrendingUp className="w-6 h-6" />
        <h3 className="text-xl font-bold">Travel Pattern Analysis</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent" />
      </div>
      
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {travelPatterns && travelPatterns.length > 0 ? travelPatterns.map((pattern) => {
          const discovery = discoveryPoints.find(d => d.id === pattern.id);
          
          return (
            <div 
              key={pattern.id}
              className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-900/50 border border-purple-400 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-purple-400" />
                </div>
                                 <div className="flex-1">
                   <h4 className="font-bold text-white">{pattern.description}</h4>
                   <p className="text-sm text-gray-400">{pattern.frequency} • {pattern.primaryRoute[0]?.location || 'Unknown'}</p>
                 </div>
                {discovery && (
                  <div className={`px-2 py-1 text-xs rounded-full border ${
                    discovery.discovered 
                      ? 'bg-green-900/50 text-green-400 border-green-500/30' 
                      : 'bg-gray-900/50 text-gray-400 border-gray-500/30'
                  }`}>
                    {discovery.discovered ? (
                      <><Unlock className="w-3 h-3 inline mr-1" />Discovered</>
                    ) : (
                      <><Lock className="w-3 h-3 inline mr-1" />Locked</>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">Connected Locations:</span>
                </div>
                                 <div className="flex flex-wrap gap-1">
                   {pattern.primaryRoute.map((route, index) => (
                     <span 
                       key={index}
                       className="px-2 py-1 bg-cyan-900/30 text-cyan-400 text-xs rounded border border-cyan-500/30"
                     >
                       {route.location}
                     </span>
                   ))}
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Flight Activity Level</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 4 ? 'bg-purple-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-2 text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400">No travel patterns discovered yet</p>
            <p className="text-sm text-gray-500 mt-1">Continue investigating to unlock patterns</p>
          </div>
        )}
      </div>
    </div>
  );

  const render3DView = () => (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
      <div className="flex items-center gap-3 text-blue-400 mb-6">
        <Box className="w-6 h-6" />
        <h3 className="text-xl font-bold">3D Property Analysis</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
      </div>

      {/* 3D Controls */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Elevation</label>
            <input
              type="range"
              min="0"
              max="90"
              value={view3D.elevation}
              onChange={(e) => setView3D(prev => ({ ...prev, elevation: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-blue-400">{view3D.elevation}°</span>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              value={view3D.rotation}
              onChange={(e) => setView3D(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-blue-400">{view3D.rotation}°</span>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tilt</label>
            <input
              type="range"
              min="0"
              max="90"
              value={view3D.tilt}
              onChange={(e) => setView3D(prev => ({ ...prev, tilt: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-blue-400">{view3D.tilt}°</span>
          </div>
          
          <div className="flex items-end gap-2">
            <button
              onClick={() => setView3D({
                enabled: true,
                elevation: 45,
                rotation: 0,
                tilt: 60,
                zoom: 12
              })}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4 inline mr-1" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3D Property Visualization */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-800 rounded-xl p-6 border border-blue-500/30 min-h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        {/* 3D Scene Container */}
        <div className="relative z-10 h-full">
          {properties && properties.slice(0, 3).map((property, index) => {
            const x = 50 + (index * 200);
            const y = 200;
            const height = property.significance === 'critical' ? 120 : 80;
            const discovery = discoveryPoints.find(d => d.id === property.id?.split('_')[0]);
            
            return (
              <div
                key={property.id}
                className="absolute transition-all duration-500 hover:scale-110 cursor-pointer group"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `
                    perspective(800px)
                    rotateX(${view3D.tilt}deg)
                    rotateY(${view3D.rotation}deg)
                    translateZ(${view3D.elevation}px)
                  `
                }}
                onClick={() => setSelectedProperty(property.id)}
              >
                {/* 3D Building */}
                <div 
                  className={`relative ${
                    property.significance === 'critical' 
                      ? 'bg-gradient-to-t from-red-900/80 to-red-600/60 border-red-400' 
                      : 'bg-gradient-to-t from-blue-900/80 to-blue-600/60 border-blue-400'
                  } border-2 rounded-lg shadow-2xl`}
                  style={{ 
                    width: '80px', 
                    height: `${height}px`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                >
                  {/* Building Details */}
                  <div className="absolute inset-1 bg-gradient-to-t from-black/40 to-transparent rounded" />
                  
                  {/* Windows */}
                  {Array.from({ length: Math.floor(height / 20) }).map((_, i) => (
                    <div key={i} className="absolute w-full px-2" style={{ top: `${i * 20 + 10}px` }}>
                      <div className="flex justify-between">
                        <div className="w-2 h-2 bg-yellow-400/60 rounded-sm" />
                        <div className="w-2 h-2 bg-yellow-400/60 rounded-sm" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Discovery Badge */}
                  {discovery?.discovered && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                
                {/* Property Info Panel */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-bold text-white text-sm">{property.name}</h4>
                  <p className="text-gray-400 text-xs">{property.type} • {property.coordinates[0]?.toFixed(2)}, {property.coordinates[1]?.toFixed(2)}</p>
                  <p className="text-green-400 text-xs mt-1">
                    ${property.financials.purchasePrice.toLocaleString()}
                  </p>
                  {discovery && (
                    <p className="text-purple-400 text-xs">+{discovery.points} Discovery Points</p>
                  )}
                </div>
                
                {/* Connection Lines */}
                {index > 0 && (
                  <svg 
                    className="absolute"
                    style={{ 
                      left: '-200px', 
                      top: '40px', 
                      width: '200px', 
                      height: '20px',
                      zIndex: -1
                    }}
                  >
                    <line 
                      x1="0" 
                      y1="10" 
                      x2="200" 
                      y2="10" 
                      stroke="url(#connectionGradient)" 
                      strokeWidth="2"
                      className="opacity-60"
                    />
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 3D Scene Info */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
          <div className="flex items-center gap-2 text-sm text-blue-400">
            <MousePointer className="w-4 h-4" />
            <span>Click properties to investigate • Hover for details</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSatelliteView = () => (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
      <div className="flex items-center gap-3 text-green-400 mb-6">
        <Satellite className="w-6 h-6" />
        <h3 className="text-xl font-bold">Satellite Intelligence Analysis</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
      </div>

      {/* Satellite Layer Controls */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Available Satellite Layers
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {satelliteLayers.map((layer) => (
            <div key={layer.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={layer.enabled}
                  onChange={(e) => setSatelliteLayers(prev => 
                    prev.map(l => l.id === layer.id ? { ...l, enabled: e.target.checked } : l)
                  )}
                  className="w-4 h-4 text-green-600 rounded border-gray-500 focus:ring-green-500"
                />
                <div>
                  <p className="text-white font-medium text-sm">{layer.name}</p>
                  <p className="text-gray-400 text-xs">{layer.date} • {layer.resolution}m resolution</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Opacity</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={layer.opacity * 100}
                  onChange={(e) => setSatelliteLayers(prev =>
                    prev.map(l => l.id === layer.id ? { ...l, opacity: parseInt(e.target.value) / 100 } : l)
                  )}
                  className="w-16 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Satellite Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Comparison */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 p-4 rounded-lg border border-green-500/30">
          <h5 className="text-green-400 font-bold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Historical Analysis: Little Saint James
          </h5>
          
          <div className="space-y-3">
            <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">2015 vs 2019 Comparison</span>
                <span className="text-green-400 text-xs">Confirmed Changes</span>
              </div>
              <div className="text-gray-300 text-xs space-y-1">
                <p>• New construction identified: Guest facility expansion</p>
                <p>• Vegetation changes: Landscaping modifications detected</p>
                <p>• Infrastructure: Additional helicopter landing pad</p>
                <p>• Coastal changes: Dock modifications observed</p>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">Thermal Analysis</span>
                <span className="text-orange-400 text-xs">Heat Signatures</span>
              </div>
              <div className="text-gray-300 text-xs space-y-1">
                <p>• Building activity patterns identified</p>
                <p>• Unusual heat signatures during investigation period</p>
                <p>• Power consumption anomalies detected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investigation Markers */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 p-4 rounded-lg border border-purple-500/30">
          <h5 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Investigation Markers
          </h5>
          
          <div className="space-y-3">
            {investigationMarkers.map((marker) => (
              <div key={marker.id} className="bg-gray-900/50 p-3 rounded border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{marker.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    marker.reliability === 'confirmed' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                    marker.reliability === 'probable' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30' :
                    'bg-gray-900/50 text-gray-400 border border-gray-500/30'
                  }`}>
                    {marker.reliability}
                  </span>
                </div>
                <p className="text-gray-300 text-xs mb-2">{marker.description}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-400">{marker.date}</span>
                  <span className="text-blue-400">{marker.evidence.documents.length} docs</span>
                  <span className="text-purple-400">{marker.evidence.multimedia.length} media</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Satellite Imagery Viewer */}
      <div className="bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-800 rounded-xl p-6 border border-green-500/30 min-h-[400px] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl" />
        
        <div className="relative z-10 text-center">
          <Satellite className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-60" />
          <h4 className="text-green-400 text-lg font-bold mb-2">Live Satellite Feed</h4>
          <p className="text-gray-400 mb-4">High-resolution satellite imagery analysis interface</p>
          
          <div className="bg-black/40 p-4 rounded-lg border border-green-500/30 max-w-md mx-auto">
            <div className="text-green-400 text-sm font-mono space-y-1">
              <p>SATELLITE: WorldView-3</p>
              <p>RESOLUTION: 0.31m PAN / 1.24m MS</p>
              <p>COVERAGE: Caribbean Region</p>
              <p>STATUS: Active Monitoring</p>
              <p>LAST UPDATE: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialView = () => (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
      <div className="flex items-center gap-3 text-orange-400 mb-6">
        <DollarSign className="w-6 h-6" />
        <h3 className="text-xl font-bold">Financial Analysis Dashboard</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-green-400 font-bold text-xl">$38.0M</p>
              <p className="text-green-300 text-sm">Total Property Value</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-orange-900/50 to-orange-800/30 border border-orange-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-400/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-orange-400 font-bold text-xl">3</p>
              <p className="text-orange-300 text-sm">Suspicious Properties</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-400 font-bold text-xl">15</p>
              <p className="text-purple-300 text-sm">Tracked Transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {properties && properties.map((property) => {
          const discovery = discoveryPoints.find(d => d.id === property.id?.split('_')[0]);
          
          return (
            <div 
              key={property.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                property.financials.suspiciousTransactions.length > 0
                  ? 'bg-red-900/20 border-red-500/30 hover:border-red-400/50'
                  : 'bg-gray-800/50 border-gray-700 hover:border-orange-500/50'
              } backdrop-blur-sm`}
              onClick={() => setSelectedProperty(property.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    property.financials.suspiciousTransactions.length > 0
                      ? 'bg-red-900/50 border-red-400'
                      : 'bg-orange-900/50 border-orange-400'
                  }`}>
                    {getPropertyIcon(property.type)}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2">
                      {property.name}
                      {property.financials.suspiciousTransactions.length > 0 && (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                      {discovery?.discovered && (
                        <Star className="w-4 h-4 text-yellow-400" />
                      )}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Purchase: ${property.financials.purchasePrice.toLocaleString()} • 
                      Current: ${property.financials.currentEstimatedValue?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    property.financials.suspiciousTransactions.length > 0
                      ? 'bg-red-900/50 text-red-400 border border-red-500/30'
                      : 'bg-green-900/50 text-green-400 border border-green-500/30'
                  }`}>
                    {property.financials.suspiciousTransactions.length > 0 ? 'FLAGGED' : 'CLEAN'}
                  </div>
                  {discovery && (
                    <p className="text-xs text-purple-400 mt-1">
                      Discovery: +{discovery.points} pts
                    </p>
                  )}
                </div>
              </div>

              {property.financials.suspiciousTransactions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-red-500/20">
                  <p className="text-red-400 text-sm font-medium">Suspicious Activity Detected:</p>
                  <p className="text-red-300 text-xs mt-1">
                    {property.financials.suspiciousTransactions.length} flagged transaction{property.financials.suspiciousTransactions.length > 1 ? 's' : ''} - Unusual ownership transfer patterns and financing irregularities identified
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (viewMode) {
      case 'timeline': return renderTimelineView();
      case 'patterns': return renderPatternsView();
      case 'financial': return renderFinancialView();
      case '3d': return render3DView();
      case 'satellite': return renderSatelliteView();
      default: return renderOverviewView();
    }
  };

  // Show loading screen if data is not loaded
  if (!isDataLoaded) {
    return (
      <div className="w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Loading Enhanced Geographic Mapping</h2>
          <p className="text-gray-400">Initializing property data and flight patterns...</p>
          <div className="mt-4 text-red-400 text-sm">
            Warning: Data loading failed. Properties: {properties?.length || 0}, Flights: {flights?.length || 0}
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen">
      {/* Header with Gamification */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                Enhanced Geographic Mapping
              </h1>
              
              {/* User Progress */}
              <div className="flex items-center gap-4 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className={`text-sm font-bold bg-gradient-to-r ${getRankColor(userProgress.rank)} bg-clip-text text-transparent`}>
                    {userProgress.rank}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-bold">{userProgress.totalPoints}</span>
                </div>
                <div className="w-px h-4 bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-bold">{userProgress.discoveries}/25</span>
                </div>
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <p className="text-gray-400 mt-2">
            Comprehensive property ownership analysis, travel patterns, and financial connections across global operations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-500/30 rounded-lg p-4 text-center backdrop-blur-sm">
            <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">$38.0M</div>
            <div className="text-sm text-cyan-300">Total Property Value</div>
          </div>
          
                     <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-lg p-4 text-center backdrop-blur-sm">
             <Building className="w-8 h-8 text-green-400 mx-auto mb-2" />
             <div className="text-2xl font-bold text-green-400">{properties ? properties.length : 0}</div>
             <div className="text-sm text-green-300">Total Properties</div>
           </div>
          
                     <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-lg p-4 text-center backdrop-blur-sm">
             <Plane className="w-8 h-8 text-purple-400 mx-auto mb-2" />
             <div className="text-2xl font-bold text-purple-400">{flights ? flights.length : 0}</div>
             <div className="text-sm text-purple-300">Documented Flights</div>
           </div>
          
                     <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 rounded-lg p-4 text-center backdrop-blur-sm">
             <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
             <div className="text-2xl font-bold text-red-400">{properties ? properties.filter(p => p.significance === 'critical').length : 0}</div>
             <div className="text-sm text-red-300">Critical Locations</div>
           </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-gray-900/50 p-2 rounded-lg border border-gray-700 backdrop-blur-sm overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Map },
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'patterns', label: 'Patterns', icon: TrendingUp },
            { id: 'financial', label: 'Financial', icon: DollarSign },
            { id: '3d', label: '3D View', icon: Box },
            { id: 'satellite', label: 'Satellite', icon: Satellite }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id as typeof viewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                viewMode === id
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
          
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors group">
              <Eye className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Enhanced Map Layer Controls */}
        <div className="mb-6">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 font-medium flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Advanced Layer Controls
              </span>
              
              {/* Timeline Animation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </button>
                <span className="text-sm text-purple-400">Timeline Animation</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: 'flightPaths', label: 'Flight Paths', icon: Plane, color: 'text-blue-400' },
                { key: 'travelPatterns', label: 'Travel Patterns', icon: TrendingUp, color: 'text-purple-400' },
                { key: 'financialConnections', label: 'Financial Connections', icon: DollarSign, color: 'text-orange-400' },
                { key: 'satelliteImagery', label: 'Satellite Imagery', icon: Satellite, color: 'text-green-400' },
                { key: 'property3D', label: '3D Properties', icon: Box, color: 'text-cyan-400' },
                { key: 'timelineOverlay', label: 'Timeline Overlay', icon: Clock, color: 'text-yellow-400' },
                { key: 'realTimeTracking', label: 'Real-time Tracking', icon: Navigation, color: 'text-red-400' },
                { key: 'terrainAnalysis', label: 'Terrain Analysis', icon: Mountain, color: 'text-gray-400' },
                { key: 'ownershipHistory', label: 'Ownership History', icon: Database, color: 'text-indigo-400' },
                { key: 'investigationMarkers', label: 'Investigation Markers', icon: Target, color: 'text-pink-400' }
              ].map(({ key, label, icon: Icon, color }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer group p-2 rounded hover:bg-gray-800/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={activeLayers[key as keyof LayerState]}
                    onChange={(e) => setActiveLayers(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded transition-all duration-300 ${
                    activeLayers[key as keyof LayerState]
                      ? 'bg-cyan-500 border-cyan-500'
                      : 'border-gray-500 group-hover:border-gray-400'
                  }`}>
                    {activeLayers[key as keyof LayerState] && (
                      <CheckCircle className="w-full h-full text-black" />
                    )}
                  </div>
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main View Area */}
        {renderCurrentView()}

        {/* Achievement Bar */}
        <div className="mt-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-4 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-bold text-yellow-400">Enhanced Geographic Analysis</h4>
                <p className="text-yellow-300 text-sm">Investigation module completed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {userProgress.achievements.map((achievement, index) => (
                <div key={index} className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-black" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600px); }
        }
      `}</style>
    </div>
  );
} 