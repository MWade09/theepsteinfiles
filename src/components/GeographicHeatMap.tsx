'use client';

import { useState, useMemo } from 'react';
import {
  Activity,
  Download
} from 'lucide-react';
import { enhancedProperties } from '@/data/geographic/properties';
import { allFlightLogs } from '@/data/geographic/travelPatterns';

interface HeatMapLayer {
  id: string;
  name: string;
  description: string;
  color: string;
  opacity: number;
  enabled: boolean;
}

interface GeographicHeatMapProps {
  className?: string;
}

export default function GeographicHeatMap({ className = '' }: GeographicHeatMapProps) {
  const [activeLayers, setActiveLayers] = useState<string[]>(['significance', 'financial', 'activity']);
  const [heatmapIntensity, setHeatmapIntensity] = useState(0.7);

  // Calculate heat map data
  const heatMapData = useMemo(() => {
    const layers: HeatMapLayer[] = [
      {
        id: 'significance',
        name: 'Investigation Significance',
        description: 'Shows areas of high investigation importance',
        color: '#ef4444',
        opacity: 0.8,
        enabled: activeLayers.includes('significance')
      },
      {
        id: 'financial',
        name: 'Financial Activity',
        description: 'Property values and transaction density',
        color: '#10b981',
        opacity: 0.7,
        enabled: activeLayers.includes('financial')
      },
      {
        id: 'activity',
        name: 'Operational Activity',
        description: 'Flight patterns and movement density',
        color: '#3b82f6',
        opacity: 0.6,
        enabled: activeLayers.includes('activity')
      },
      {
        id: 'network',
        name: 'Network Connections',
        description: 'Entity relationships and connections',
        color: '#8b5cf6',
        opacity: 0.5,
        enabled: activeLayers.includes('network')
      }
    ];

    // Calculate significance heatmap
    const significanceData = enhancedProperties.map(property => ({
      coordinates: property.coordinates,
      intensity: property.significance === 'critical' ? 1.0 :
                property.significance === 'high' ? 0.7 :
                property.significance === 'medium' ? 0.4 : 0.2,
      radius: 50 + (property.significance === 'critical' ? 30 :
                    property.significance === 'high' ? 20 :
                    property.significance === 'medium' ? 10 : 5)
    }));

    // Calculate financial heatmap
    const maxValue = Math.max(...enhancedProperties.map(p => p.financials.currentEstimatedValue || 0));
    const financialData = enhancedProperties.map(property => ({
      coordinates: property.coordinates,
      intensity: (property.financials.currentEstimatedValue || 0) / maxValue,
      radius: 30 + Math.log10((property.financials.currentEstimatedValue || 1) / 1000000) * 20,
      value: property.financials.currentEstimatedValue || 0
    }));

    // Calculate activity heatmap based on flights
    const activityData = enhancedProperties.map(property => {
      const flights = allFlightLogs.filter(f =>
        f.departure.propertyId === property.id || f.arrival.propertyId === property.id
      );
      const maxFlights = Math.max(...enhancedProperties.map(p =>
        allFlightLogs.filter(f => f.departure.propertyId === p.id || f.arrival.propertyId === p.id).length
      ));

      return {
        coordinates: property.coordinates,
        intensity: flights.length / Math.max(maxFlights, 1),
        radius: 20 + (flights.length * 15),
        flights: flights.length
      };
    });

    return {
      layers,
      significanceData,
      financialData,
      activityData
    };
  }, [activeLayers]);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const getIntensityColor = (intensity: number, baseColor: string) => {
    const alpha = Math.max(0.1, intensity * heatmapIntensity);
    return baseColor.replace('1)', `${alpha})`);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Geographic Heat Maps
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visual analysis of activity density, financial significance, and investigation intensity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Intensity:</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={heatmapIntensity}
                onChange={(e) => setHeatmapIntensity(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                {Math.round(heatmapIntensity * 100)}%
              </span>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-wrap gap-2">
          {heatMapData.layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                layer.enabled
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: layer.color, opacity: layer.opacity }}
              />
              <span className="text-sm font-medium">{layer.name}</span>
              {layer.enabled && (
                <div className="w-2 h-2 bg-white dark:bg-gray-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Heat Map Visualization */}
      <div className="p-6">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg h-96 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Heat Map Overlays */}
          <div className="absolute inset-0">
            {/* Significance Heat Map */}
            {activeLayers.includes('significance') && heatMapData.significanceData.map((point, index) => (
              <div
                key={`significance-${index}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
                style={{
                  left: `${(point.coordinates[1] + 180) / 360 * 100}%`,
                  top: `${(90 - point.coordinates[0]) / 180 * 100}%`,
                  width: `${point.radius}px`,
                  height: `${point.radius}px`,
                  background: `radial-gradient(circle, ${getIntensityColor(point.intensity, 'rgba(239, 68, 68, 0.8)')} 0%, transparent 70%)`,
                  boxShadow: `0 0 ${point.radius/2}px ${getIntensityColor(point.intensity * 0.5, 'rgba(239, 68, 68, 0.4)')}`
                }}
              />
            ))}

            {/* Financial Heat Map */}
            {activeLayers.includes('financial') && heatMapData.financialData.map((point, index) => (
              <div
                key={`financial-${index}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${(point.coordinates[1] + 180) / 360 * 100}%`,
                  top: `${(90 - point.coordinates[0]) / 180 * 100}%`,
                  width: `${point.radius}px`,
                  height: `${point.radius}px`,
                  background: `radial-gradient(circle, ${getIntensityColor(point.intensity, 'rgba(16, 185, 129, 0.7)')} 0%, transparent 70%)`,
                  boxShadow: `0 0 ${point.radius/3}px ${getIntensityColor(point.intensity * 0.6, 'rgba(16, 185, 129, 0.3)')}`
                }}
              />
            ))}

            {/* Activity Heat Map */}
            {activeLayers.includes('activity') && heatMapData.activityData.map((point, index) => (
              <div
                key={`activity-${index}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
                style={{
                  left: `${(point.coordinates[1] + 180) / 360 * 100}%`,
                  top: `${(90 - point.coordinates[0]) / 180 * 100}%`,
                  width: `${point.radius}px`,
                  height: `${point.radius}px`,
                  background: `radial-gradient(circle, ${getIntensityColor(point.intensity, 'rgba(59, 130, 246, 0.6)')} 0%, transparent 70%)`,
                  boxShadow: `0 0 ${point.radius/4}px ${getIntensityColor(point.intensity * 0.7, 'rgba(59, 130, 246, 0.3)')}`
                }}
              />
            ))}
          </div>

          {/* Property Markers */}
          <div className="absolute inset-0">
            {enhancedProperties.map((property) => (
              <div
                key={property.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(property.coordinates[1] + 180) / 360 * 100}%`,
                  top: `${(90 - property.coordinates[0]) / 180 * 100}%`
                }}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  property.significance === 'critical' ? 'bg-red-500 border-red-300 text-white' :
                  property.significance === 'high' ? 'bg-orange-500 border-orange-300 text-white' :
                  property.significance === 'medium' ? 'bg-yellow-500 border-yellow-300 text-black' :
                  'bg-blue-500 border-blue-300 text-white'
                }`}>
                  {property.type === 'island' ? '🏝️' :
                   property.type === 'residence' ? '🏛️' :
                   property.type === 'ranch' ? '🏡' :
                   property.type === 'airport' ? '✈️' :
                   property.type === 'yacht' ? '⛵' : '📍'}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-gray-900/90 border border-gray-600 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="text-sm font-semibold text-white mb-3">Heat Map Legend</h4>
            <div className="space-y-2 text-xs">
              {activeLayers.includes('significance') && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gradient-to-r from-red-500 to-red-300 rounded"></div>
                  <span className="text-gray-300">Investigation Significance</span>
                </div>
              )}
              {activeLayers.includes('financial') && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gradient-to-r from-green-500 to-green-300 rounded"></div>
                  <span className="text-gray-300">Financial Activity</span>
                </div>
              )}
              {activeLayers.includes('activity') && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gradient-to-r from-blue-500 to-blue-300 rounded"></div>
                  <span className="text-gray-300">Operational Activity</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-600">
                <p className="text-gray-400">Larger circles = Higher intensity</p>
                <p className="text-gray-400">Brighter colors = More significant</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="absolute top-4 right-4 bg-gray-900/90 border border-gray-600 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="text-sm font-semibold text-white mb-3">Analysis Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Properties:</span>
                <span className="text-white font-medium">{enhancedProperties.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hot Zones:</span>
                <span className="text-red-400 font-medium">
                  {enhancedProperties.filter(p => p.significance === 'critical').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Activity Centers:</span>
                <span className="text-blue-400 font-medium">
                  {enhancedProperties.filter(p => {
                    const flights = allFlightLogs.filter(f =>
                      f.departure.propertyId === p.id || f.arrival.propertyId === p.id
                    );
                    return flights.length > 2;
                  }).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Financial Hubs:</span>
                <span className="text-green-400 font-medium">
                  {enhancedProperties.filter(p =>
                    (p.financials.currentEstimatedValue || 0) > 20000000
                  ).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {heatMapData.layers.filter(layer => layer.enabled).map((layer) => (
            <div key={layer.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: layer.color, opacity: layer.opacity }}
                />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {layer.name}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {layer.description}
              </p>

              {layer.id === 'significance' && (
                <div className="text-xs text-gray-500">
                  {enhancedProperties.filter(p => p.significance === 'critical').length} critical • {enhancedProperties.filter(p => p.significance === 'high').length} high
                </div>
              )}

              {layer.id === 'financial' && (
                <div className="text-xs text-gray-500">
                  ${((enhancedProperties.reduce((sum, p) => sum + (p.financials.currentEstimatedValue || 0), 0)) / 1000000).toFixed(1)}M total value
                </div>
              )}

              {layer.id === 'activity' && (
                <div className="text-xs text-gray-500">
                  {allFlightLogs.length} flights • {enhancedProperties.filter(p => {
                    const flights = allFlightLogs.filter(f =>
                      f.departure.propertyId === p.id || f.arrival.propertyId === p.id
                    );
                    return flights.length > 0;
                  }).length} active properties
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

