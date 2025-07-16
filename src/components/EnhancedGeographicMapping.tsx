'use client';

import { useState, useEffect } from 'react';
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
  Activity
} from 'lucide-react';
import { enhancedProperties as properties } from '@/data/geographic/properties';
import { flightLogs as flights, travelPatterns } from '@/data/geographic/travelPatterns';

interface LayerState {
  flightPaths: boolean;
  travelPatterns: boolean;
  financialConnections: boolean;
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
  const [viewMode, setViewMode] = useState<'overview' | 'timeline' | 'patterns' | 'financial'>('overview');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<LayerState>({
    flightPaths: true,
    travelPatterns: true,
    financialConnections: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 2750,
    discoveries: 18,
    rank: 'Senior Investigator',
    achievements: ['First Discovery', 'Financial Detective', 'Pattern Hunter', 'Property Sleuth']
  });

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
      setAnimationProgress(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const getPropertyPosition = (propertyId: string) => {
    const positions: Record<string, { x: number; y: number }> = {
      'little_saint_james': { x: 480, y: 280 },
      'cyril_e._king_airport': { x: 480, y: 280 }, // Virgin Islands airport
      'manhattan_mansion': { x: 420, y: 180 },
      'teterboro_airport': { x: 420, y: 180 }, // New York area
      'palm_beach_estate': { x: 450, y: 320 },
      'palm_beach_international_airport': { x: 450, y: 320 }, // Florida
      'zorro_ranch': { x: 280, y: 220 },
      'santa_fe_regional_airport': { x: 280, y: 220 }, // New Mexico
      'paris_apartment': { x: 580, y: 160 },
      'le_bourget_airport': { x: 580, y: 160 }, // Paris
      'victoria_international_airport': { x: 200, y: 100 }, // Canada
      'unknown': { x: 400, y: 250 }
    };
    return positions[propertyId] || { x: 400, y: 250 };
  };

  const getPropertyIcon = (type: string, isSelected: boolean, isHovered: boolean) => {
    const baseClass = `w-8 h-8 transition-all duration-300 ${
      isSelected || isHovered ? 'scale-125 drop-shadow-lg' : ''
    }`;
    
    switch (type) {
      case 'island': return <MapPin className={`${baseClass} text-red-400`} />;
      case 'mansion': return <Building className={`${baseClass} text-yellow-400`} />;
      case 'estate': return <Building className={`${baseClass} text-purple-400`} />;
      case 'ranch': return <Building className={`${baseClass} text-green-400`} />;
      case 'apartment': return <Building className={`${baseClass} text-blue-400`} />;
      default: return <MapPin className={`${baseClass} text-gray-400`} />;
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

  const renderOverviewView = () => (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-cyan-500/30 shadow-2xl overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 0, 100, 0.1) 0%, transparent 50%),
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Scanning Line Effect */}
      <div 
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"
        style={{ 
          top: `${(animationProgress * 6) % 100}%`,
          animation: 'scan 4s linear infinite'
        }}
      />

             {/* Property Markers */}
       {properties && properties.map((property) => {
        const position = getPropertyPosition(property.id);
        const isSelected = selectedProperty === property.id;
        const isHovered = hoveredProperty === property.id;
        const discovery = discoveryPoints.find(d => d.id === property.id?.split('_')[0]);
        
        return (
          <div
            key={property.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isSelected || isHovered ? 'z-30 scale-110' : 'z-20'
            }`}
            style={{ left: position.x, top: position.y }}
            onMouseEnter={() => setHoveredProperty(property.id)}
            onMouseLeave={() => setHoveredProperty(null)}
            onClick={() => setSelectedProperty(property.id)}
          >
            {/* Pulse Ring */}
            <div className={`absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping ${
              isSelected ? 'opacity-75' : 'opacity-0'
            }`} style={{ width: '60px', height: '60px', left: '-14px', top: '-14px' }} />
            
            {/* Discovery Badge */}
            {discovery?.discovered && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center z-10">
                <Star className="w-3 h-3 text-black" />
              </div>
            )}
            
            {/* Main Marker */}
            <div className={`relative p-3 rounded-full border-2 transition-all duration-300 ${
              property.significance === 'critical' 
                ? 'bg-red-900/80 border-red-400 shadow-red-400/50' 
                : property.significance === 'high'
                ? 'bg-orange-900/80 border-orange-400 shadow-orange-400/50'
                : 'bg-blue-900/80 border-blue-400 shadow-blue-400/50'
            } shadow-lg backdrop-blur-sm ${
              isSelected || isHovered ? 'shadow-2xl' : ''
            }`}>
              {getPropertyIcon(property.type, isSelected, isHovered)}
              
              {/* Activity Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-gray-900" />
            </div>

            {/* Flight Count Badge */}
            {property.flightLogReferences && property.flightLogReferences.length > 0 && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full border border-purple-400">
                <Plane className="w-3 h-3 inline mr-1" />
                {property.flightLogReferences.length}
              </div>
            )}
          </div>
        );
      })}

             {/* Flight Paths Layer */}
       {activeLayers.flightPaths && flights && (
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {flights.map((flight, index) => {
            const start = getPropertyPosition(flight.departure?.location?.split(' ').join('_').toLowerCase() || 'unknown');
            const end = getPropertyPosition(flight.arrival?.location?.split(' ').join('_').toLowerCase() || 'unknown');
            const significance = flight.significance;
            const strokeColor = significance === 'critical' ? '#ef4444' : significance === 'high' ? '#f59e0b' : '#3b82f6';
            
            return (
              <g key={flight.id}>
                <path
                  d={`M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${Math.min(start.y, end.y) - 50} ${end.x} ${end.y}`}
                  stroke={strokeColor}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse opacity-70"
                  style={{
                    filter: `drop-shadow(0 0 6px ${strokeColor})`
                  }}
                />
                <circle
                  cx={start.x}
                  cy={start.y}
                  r="4"
                  fill={strokeColor}
                  className="animate-pulse"
                />
                <circle
                  cx={end.x}
                  cy={end.y}
                  r="4"
                  fill={strokeColor}
                  className="animate-pulse"
                />
              </g>
            );
          })}
        </svg>
      )}

             {/* Travel Patterns Layer */}
       {activeLayers.travelPatterns && travelPatterns && (
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {travelPatterns.map((pattern, index) => {
             const primaryLocation = getPropertyPosition(pattern.primaryRoute[0]?.location?.split(' ').join('_').toLowerCase() || 'unknown');
            
                         return pattern.primaryRoute.slice(1).map((route, locIndex) => {
               const connectedPos = getPropertyPosition(route.location?.split(' ').join('_').toLowerCase() || 'unknown');
              
              return (
                <g key={`${pattern.id}-${locIndex}`}>
                  <path
                    d={`M ${primaryLocation.x} ${primaryLocation.y} Q ${(primaryLocation.x + connectedPos.x) / 2 + 30} ${(primaryLocation.y + connectedPos.y) / 2 - 30} ${connectedPos.x} ${connectedPos.y}`}
                    stroke="#a855f7"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,4"
                    className="opacity-60"
                    style={{
                      filter: 'drop-shadow(0 0 4px #a855f7)'
                    }}
                  />
                  <text
                    x={(primaryLocation.x + connectedPos.x) / 2}
                    y={(primaryLocation.y + connectedPos.y) / 2 - 20}
                    fill="#a855f7"
                    fontSize="10"
                    textAnchor="middle"
                    className="font-bold"
                  >
                    {pattern.frequency}
                  </text>
                </g>
              );
            });
          })}
        </svg>
      )}

             {/* Financial Connections Layer */}
       {activeLayers.financialConnections && properties && (
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {properties
             .filter(p => p.financials.suspiciousTransactions.length > 0)
             .map((property) => {
              const position = getPropertyPosition(property.id);
              
              return (
                <g key={`financial-${property.id}`}>
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="50"
                    stroke="#f97316"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6,6"
                    className="opacity-50 animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 8px #f97316)'
                    }}
                  />
                  <text
                    x={position.x}
                    y={position.y + 65}
                    fill="#f97316"
                    fontSize="10"
                    textAnchor="middle"
                    className="font-bold"
                  >
                    Suspicious Activity
                  </text>
                </g>
              );
            })}
        </svg>
      )}

      {/* Center Info Display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-cyan-400 opacity-60">
          <Activity className="w-16 h-16 mx-auto mb-2 animate-pulse" />
          <p className="text-lg font-bold">Interactive Enhanced Mapping</p>
          <p className="text-sm">Click properties to reveal evidence</p>
        </div>
      </div>
    </div>
  );

  const renderTimelineView = () => (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-cyan-500/30">
      <div className="flex items-center gap-3 text-cyan-400 mb-6">
        <Clock className="w-6 h-6" />
        <h3 className="text-xl font-bold">Property Acquisition Timeline</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
      </div>
      
             {properties && properties
         .sort((a, b) => new Date(a.ownershipHistory[0].startDate).getTime() - new Date(b.ownershipHistory[0].startDate).getTime())
        .map((property, index) => {
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
                  {getPropertyIcon(property.type, false, false)}
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
                    {getPropertyIcon(property.type, false, false)}
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
                      Current: ${property.financials.currentEstimatedValue.toLocaleString()}
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
      default: return renderOverviewView();
    }
  };

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
        <div className="flex items-center gap-2 mb-6 bg-gray-900/50 p-2 rounded-lg border border-gray-700 backdrop-blur-sm">
          {[
            { id: 'overview', label: 'Overview', icon: Map },
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'patterns', label: 'Patterns', icon: TrendingUp },
            { id: 'financial', label: 'Financial', icon: DollarSign }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id as typeof viewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
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

        {/* Map Layer Controls */}
        <div className="mb-6">
          <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700 backdrop-blur-sm">
            <span className="text-gray-300 font-medium">Map Layers:</span>
            
            {[
              { key: 'flightPaths', label: 'Flight Paths', icon: Plane, color: 'text-blue-400' },
              { key: 'travelPatterns', label: 'Travel Patterns', icon: TrendingUp, color: 'text-purple-400' },
              { key: 'financialConnections', label: 'Financial Connections', icon: DollarSign, color: 'text-orange-400' }
            ].map(({ key, label, icon: Icon, color }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer group">
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
                <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
              </label>
            ))}
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