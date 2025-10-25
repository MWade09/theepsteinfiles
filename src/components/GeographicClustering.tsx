'use client';

import { useState, useEffect } from 'react';
import L from 'leaflet';
import { MarkerClusterGroup } from 'react-leaflet-markercluster';
import { EnhancedProperty } from '@/data/geographic/properties';
import { comprehensiveTimeline } from '@/data/core/timeline';

interface GeographicClusteringProps {
  properties: EnhancedProperty[];
  selectedProperty: string | null;
  selectedTimelineEvent: string | null;
  onPropertySelect: (propertyId: string) => void;
  onTimelineEventSelect: (eventId: string) => void;
  activeLayers: {
    flightPaths: boolean;
    travelPatterns: boolean;
    financialConnections: boolean;
  };
}

interface ClusterData {
  properties: EnhancedProperty[];
  timelineEvents: any[];
  center: [number, number];
  significance: 'critical' | 'high' | 'medium' | 'low';
  totalValue: number;
}

export default function GeographicClustering({
  properties,
  selectedProperty,
  selectedTimelineEvent,
  onPropertySelect,
  onTimelineEventSelect,
  activeLayers
}: GeographicClusteringProps) {
  const [clusters, setClusters] = useState<ClusterData[]>([]);

  // Calculate clusters based on geographic proximity
  useEffect(() => {
    const calculateClusters = () => {
      const clusterMap = new Map<string, ClusterData>();
      const processedProperties = new Set<string>();

      properties.forEach(property => {
        if (processedProperties.has(property.id)) return;

        // Find nearby properties within 50km
        const nearbyProperties = properties.filter(p =>
          !processedProperties.has(p.id) &&
          calculateDistance(property.coordinates, p.coordinates) < 50
        );

        // Calculate cluster center
        const center: [number, number] = [
          nearbyProperties.reduce((sum, p) => sum + p.coordinates[0], 0) / nearbyProperties.length,
          nearbyProperties.reduce((sum, p) => sum + p.coordinates[1], 0) / nearbyProperties.length
        ];

        // Find timeline events in this area
        const timelineEvents = comprehensiveTimeline.filter(event =>
          event.coordinates &&
          calculateDistance(event.coordinates, center) < 25
        );

        // Determine cluster significance
        const maxSignificance = nearbyProperties.reduce((max, p) => {
          const significanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return Math.max(max, significanceOrder[p.significance as keyof typeof significanceOrder] || 0);
        }, 0);

        const significance = maxSignificance >= 4 ? 'critical' :
                           maxSignificance >= 3 ? 'high' :
                           maxSignificance >= 2 ? 'medium' : 'low';

        // Calculate total value
        const totalValue = nearbyProperties.reduce((sum, p) =>
          sum + (p.financials.currentEstimatedValue || 0), 0
        );

        const clusterKey = nearbyProperties.map(p => p.id).sort().join('-');
        clusterMap.set(clusterKey, {
          properties: nearbyProperties,
          timelineEvents,
          center,
          significance,
          totalValue
        });

        nearbyProperties.forEach(p => processedProperties.add(p.id));
      });

      setClusters(Array.from(clusterMap.values()));
    };

    calculateClusters();
  }, [properties]);

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getClusterIcon = (cluster: ClusterData) => {
    const size = Math.max(40, Math.min(80, 30 + cluster.properties.length * 5));
    const significance = cluster.significance;
    const color = significance === 'critical' ? '#ef4444' :
                  significance === 'high' ? '#f59e0b' : '#3b82f6';

    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, ${color}22 0%, ${color}11 70%);
          border: 3px solid ${color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size * 0.25}px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(${significance === 'critical' ? '239, 68, 68' : significance === 'high' ? '245, 158, 11' : '59, 130, 246'}, 0.4);
        ">
          ${cluster.properties.length}
        </div>
      `,
      className: 'cluster-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  const getTimelineEventIcon = (event: any, isSelected: boolean) => {
    const size = isSelected ? 32 : 24;
    const color = event.significance === 'critical' ? '#ef4444' :
                  event.significance === 'high' ? '#f59e0b' : '#3b82f6';

    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, #8b5cf6 0%, #7c3aed 70%);
          border: ${isSelected ? '3px' : '2px'} solid #a855f7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isSelected ? '12px' : '10px'};
          cursor: pointer;
          box-shadow: 0 ${isSelected ? '4px' : '2px'} 8px rgba(139, 92, 246, 0.4);
          transition: all 0.3s ease;
          ${isSelected ? 'animation: timeline-pulse 1.5s infinite;' : ''}
        ">
          📅
        </div>
        <style>
          @keyframes timeline-pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.1);
            }
          }
        </style>
      `,
      className: 'timeline-event-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  };

  return (
    <>
      {/* Property Clusters */}
      {clusters.map((cluster) => (
        <MarkerClusterGroup
          key={`cluster-${cluster.properties.map(p => p.id).join('-')}`}
          iconCreateFunction={() => getClusterIcon(cluster)}
          chunkedLoading
          maxClusterRadius={50}
        >
          {cluster.properties.map((property) => {
            const discovery = { id: property.id, name: property.name, category: 'property' as const, points: 100, discovered: true };
            const isSelected = selectedProperty === property.id;

            const relatedToTimelineEvent = selectedTimelineEvent &&
              comprehensiveTimeline.find(event => event.id === selectedTimelineEvent)
                ?.entities.some(entity => entity.entityId === property.id);

            return (
              <L.Marker
                key={property.id}
                position={property.coordinates}
                icon={L.divIcon({
                  html: `
                    <div style="
                      position: relative;
                      width: ${isSelected ? '42px' : '32px'};
                      height: ${isSelected ? '42px' : '32px'};
                      background: radial-gradient(circle, ${
                        property.significance === 'critical' ? 'rgba(239, 68, 68, 0.3)' :
                        property.significance === 'high' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.3)'
                      } 0%, transparent 70%);
                      border: 3px solid ${property.significance === 'critical' ? '#ef4444' : property.significance === 'high' ? '#f59e0b' : '#3b82f6'};
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: ${isSelected ? '16px' : '12px'};
                      cursor: pointer;
                      transition: all 0.3s ease;
                      box-shadow: 0 4px 15px rgba(${
                        property.significance === 'critical' ? '239, 68, 68' : property.significance === 'high' ? '245, 158, 11' : '59, 130, 246'
                      }, 0.4);
                      ${isSelected ? `
                        animation: pulse 2s infinite;
                        transform: scale(1.15);
                        box-shadow: 0 6px 20px rgba(${
                          property.significance === 'critical' ? '239, 68, 68' : property.significance === 'high' ? '245, 158, 11' : '59, 130, 246'
                        }, 0.6);
                      ` : ''}
                    ">
                      ${property.type === 'island' ? '🏝️' :
                       property.type === 'residence' ? '🏛️' :
                       property.type === 'ranch' ? '🏡' :
                       property.type === 'airport' ? '✈️' :
                       property.type === 'yacht' ? '⛵' : '📍'}
                      ${relatedToTimelineEvent ? `
                        <div style="
                          position: absolute;
                          top: -8px;
                          right: -8px;
                          width: 18px;
                          height: 18px;
                          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
                          border-radius: 50%;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          font-size: 8px;
                          border: 2px solid #fff;
                          box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
                          animation: sync-pulse 1.5s infinite;
                        ">🔗</div>
                      ` : ''}
                    </div>
                    <style>
                      @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                      }
                      @keyframes sync-pulse {
                        0%, 100% {
                          opacity: 1;
                          transform: scale(1);
                        }
                        50% {
                          opacity: 0.6;
                          transform: scale(1.1);
                        }
                      }
                    </style>
                  `,
                  className: 'custom-marker',
                  iconSize: [isSelected ? 42 : 32, isSelected ? 42 : 32],
                  iconAnchor: [isSelected ? 21 : 16, isSelected ? 21 : 16],
                  popupAnchor: [0, isSelected ? -21 : -16]
                })}
                eventHandlers={{
                  click: () => onPropertySelect(property.id),
                }}
              >
                <L.Popup>
                  <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[250px]">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{property.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        property.significance === 'critical' ? 'bg-red-900/50 text-red-400' :
                        property.significance === 'high' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-blue-900/50 text-blue-400'
                      }`}>
                        {property.significance?.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300">{property.description}</p>

                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-bold">
                          ${property.financials.purchasePrice.toLocaleString()}
                        </span>
                        <span className="text-cyan-400">
                          {property.ownershipHistory[0]?.ownerName}
                        </span>
                      </div>

                      {property.flightLogReferences && property.flightLogReferences.length > 0 && (
                        <div className="text-purple-400">
                          {property.flightLogReferences.length} documented flights
                        </div>
                      )}
                    </div>
                  </div>
                </L.Popup>
              </L.Marker>
            );
          })}
        </MarkerClusterGroup>
      ))}

      {/* Individual Timeline Event Markers (for events not in clusters) */}
      {activeLayers.flightPaths && comprehensiveTimeline
        .filter(event => event.coordinates && !clusters.some(cluster =>
          calculateDistance(event.coordinates!, cluster.center) < 25
        ))
        .map((event) => {
          if (!event.coordinates) return null;
          const isSelected = selectedTimelineEvent === event.id;

          return (
            <L.Marker
              key={`timeline-${event.id}`}
              position={event.coordinates}
              icon={getTimelineEventIcon(event, isSelected)}
              eventHandlers={{
                click: () => onTimelineEventSelect(event.id),
              }}
            >
              <L.Popup>
                <div className="bg-gray-900 text-white p-4 rounded-lg min-w-[300px]">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      event.significance === 'critical' ? 'bg-red-900/50 text-red-400' :
                      event.significance === 'high' ? 'bg-orange-900/50 text-orange-400' :
                      'bg-blue-900/50 text-blue-400'
                    }`}>
                      {event.significance?.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <p className="text-gray-300">{event.description}</p>

                    <div className="flex items-center gap-4">
                      <span className="text-cyan-400">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="text-purple-400">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>

                    {/* Related Properties */}
                    {event.entities.some(entity => entity.entityType === 'location') && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-400 mb-2">Related Properties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.entities
                            .filter(entity => entity.entityType === 'location')
                            .map((entity, index) => {
                              const property = properties.find(p => p.id === entity.entityId);
                              return property ? (
                                <button
                                  key={index}
                                  onClick={() => onPropertySelect(property.id)}
                                  className="px-2 py-1 text-xs bg-cyan-900/50 text-cyan-400 rounded hover:bg-cyan-800/50 transition-colors"
                                >
                                  {property.name}
                                </button>
                              ) : null;
                            })}
                        </div>
                      </div>
                    )}

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-purple-900/50 text-purple-400 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </L.Popup>
            </L.Marker>
          );
        })}
    </>
  );
}

