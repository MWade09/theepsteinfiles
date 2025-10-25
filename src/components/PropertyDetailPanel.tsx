'use client';

import { useState } from 'react';
import {
  X,
  Building,
  DollarSign,
  Users,
  FileText,
  Plane,
  AlertTriangle,
  Eye,
  Camera,
  MapPin,
  TrendingUp,
  Shield,
  Star,
  ExternalLink,
  Download,
  Share2,
  Info,
  BarChart3
} from 'lucide-react';
import { EnhancedProperty } from '@/data/geographic/properties';
import { getFlightsByProperty } from '@/data/geographic/travelPatterns';

interface PropertyDetailPanelProps {
  property: EnhancedProperty | null;
  isOpen: boolean;
  onClose: () => void;
  onTimelineEventClick?: (eventId: string) => void;
  onCompare?: (propertyId: string) => void;
  isInComparison?: boolean;
  relatedTimelineEvents?: string[];
  onClearSync?: () => void;
}

export default function PropertyDetailPanel({
  property,
  isOpen,
  onClose,
  onTimelineEventClick,
  onCompare,
  isInComparison = false,
  relatedTimelineEvents = [],
  onClearSync
}: PropertyDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'ownership' | 'financial' | 'investigation' | 'connections'>('overview');

  if (!property) return null;

  const relatedFlights = getFlightsByProperty(property.id);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'ownership', label: 'Ownership', icon: Users },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'investigation', label: 'Investigation', icon: Shield },
    { id: 'connections', label: 'Connections', icon: TrendingUp }
  ];

  const getSignificanceColor = (sig: string) => {
    switch (sig) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'seized': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'sold': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 lg:w-[28rem] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {property.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {property.address}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Significance and Status Badges */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSignificanceColor(property.significance)}`}>
            <Star className="w-3 h-3 inline mr-1" />
            {property.significance.toUpperCase()}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(property.currentStatus)}`}>
            <Shield className="w-3 h-3 inline mr-1" />
            {property.currentStatus.toUpperCase()}
          </span>
          {property.verified && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <Eye className="w-3 h-3 inline mr-1" />
              VERIFIED
            </span>
          )}
          {relatedTimelineEvents.length > 0 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
              <Clock className="w-3 h-3 inline mr-1" />
              TIMELINE SYNC ({relatedTimelineEvents.length})
            </span>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Property Image Placeholder */}
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Property Image</p>
                <p className="text-xs opacity-75">Coming Soon</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Building className="w-4 h-4" />
                  Property Type
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {property.type}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property.coordinates[0].toFixed(4)}, {property.coordinates[1].toFixed(4)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Physical Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {property.features.squareFootage && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                        {property.features.squareFootage.toLocaleString()} sq ft
                      </span>
                    )}
                    {property.features.bedrooms && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                        {property.features.bedrooms} beds
                      </span>
                    )}
                    {property.features.bathrooms && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded">
                        {property.features.bathrooms} baths
                      </span>
                    )}
                  </div>
                </div>
                {property.features.specialFeatures.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Special Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.specialFeatures.slice(0, 4).map((feature) => (
                        <span key={feature} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ownership' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ownership History
              </h3>
              <div className="space-y-4">
                {property.ownershipHistory.map((ownership) => (
                  <div key={ownership.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {ownership.ownerName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {ownership.ownerType}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        ownership.verificationStatus === 'verified'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {ownership.verificationStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">From:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(ownership.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">To:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {ownership.endDate ? new Date(ownership.endDate).toLocaleDateString() : 'Present'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Acquisition:</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {ownership.acquisitionMethod}
                        {ownership.purchasePrice && ` - $${ownership.purchasePrice.toLocaleString()}`}
                      </p>
                    </div>

                    {ownership.legalEntity && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Legal Entity:</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {ownership.legalEntity}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Financial Analysis
              </h3>

              {/* Current Values */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    Purchase Price
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${property.financials.purchasePrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(property.financials.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    Current Value
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${property.financials.currentEstimatedValue?.toLocaleString() || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">Estimated</p>
                </div>
              </div>

              {/* Additional Costs */}
              <div className="space-y-3 mb-6">
                {property.financials.renovationCosts && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Renovations</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${property.financials.renovationCosts.toLocaleString()}
                    </span>
                  </div>
                )}
                {property.financials.annualMaintenance && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Annual Maintenance</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${property.financials.annualMaintenance.toLocaleString()}
                    </span>
                  </div>
                )}
                {property.financials.propertyTaxes && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Property Taxes</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${property.financials.propertyTaxes.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Suspicious Transactions */}
              {property.financials.suspiciousTransactions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Suspicious Transactions
                  </h4>
                  <div className="space-y-2">
                    {property.financials.suspiciousTransactions.map((transaction) => (
                      <div key={transaction} className="p-2 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded">
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-400">
                          {transaction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'investigation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Investigation Timeline
              </h3>

              {/* Key Events */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Key Events
                  </h4>
                  <div className="space-y-3">
                    {/* Related Timeline Events */}
                    {relatedTimelineEvents.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-500" />
                          Timeline Synchronization ({relatedTimelineEvents.length} events)
                        </h4>
                        <div className="space-y-2">
                          {relatedTimelineEvents.map((eventId) => {
                            // Find the timeline event by ID
                            const timelineEvent = comprehensiveTimeline.find(event => event.id === eventId);
                            if (!timelineEvent) return null;

                            return (
                              <div
                                key={eventId}
                                className="p-3 border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/10 rounded-lg cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                                onClick={() => onTimelineEventClick?.(eventId)}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-purple-800 dark:text-purple-400">
                                      {timelineEvent.title}
                                    </p>
                                    <p className="text-xs text-purple-600 dark:text-purple-300">
                                      {timelineEvent.description.substring(0, 100)}...
                                    </p>
                                  </div>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    timelineEvent.significance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                    timelineEvent.significance === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                  }`}>
                                    {timelineEvent.significance}
                                  </span>
                                </div>
                                <p className="text-xs text-purple-500">
                                  {new Date(timelineEvent.date).toLocaleDateString()}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Property Key Events */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Key Events
                      </h4>
                      <div className="space-y-3">
                        {property.investigationDetails.keyEvents.map((event) => (
                          <div
                            key={event.date}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              event.significance === 'critical'
                                ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10'
                                : event.significance === 'high'
                                ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/10'
                                : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                            }`}
                            onClick={() => onTimelineEventClick?.(event.date)}
                          >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {event.event}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {event.source}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getSignificanceColor(event.significance)}`}>
                            {event.significance}
                          </span>
                        </div>
                            <p className="text-xs text-gray-500">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  </div>
                </div>

                {/* Law Enforcement */}
                {property.investigationDetails.lawEnforcement.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Law Enforcement Actions
                    </h4>
                    <div className="space-y-3">
                      {property.investigationDetails.lawEnforcement.map((action) => (
                        <div key={action.date} className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                {action.agency}
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {action.action}
                              </p>
                            </div>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                              {new Date(action.date).toLocaleDateString()}
                            </span>
                          </div>
                          {action.result && (
                            <p className="text-xs text-blue-600 dark:text-blue-300">
                              Result: {action.result}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Witness Accounts */}
                {property.investigationDetails.witnessAccounts.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Witness Accounts
                    </h4>
                    <div className="space-y-2">
                      {property.investigationDetails.witnessAccounts.map((witness) => (
                        <div key={witness} className="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {witness}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connected Entities & Networks
              </h3>

              {/* Connected Entities */}
              {property.connectedEntities.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Connected Entities
                  </h4>
                  <div className="space-y-2">
                    {property.connectedEntities.map((entity) => (
                      <div key={entity} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {entity.replace('entity_', '').replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Flights */}
              {relatedFlights.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Related Flights ({relatedFlights.length})
                  </h4>
                  <div className="space-y-2">
                    {relatedFlights.slice(0, 5).map((flight) => (
                      <div key={flight.id} className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                              {flight.departure.location} → {flight.arrival.location}
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-300">
                              {new Date(flight.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getSignificanceColor(flight.significance)}`}>
                            {flight.significance}
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-300">
                          Passengers: {flight.passengers.length}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Transactions */}
              {property.relatedTransactions.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Related Transactions
                  </h4>
                  <div className="space-y-2">
                    {property.relatedTransactions.map((transaction) => (
                      <div key={transaction} className="p-2 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded">
                        <p className="text-sm font-medium text-green-800 dark:text-green-400">
                          {transaction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {property.documents.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documents & Evidence
                  </h4>
                  <div className="space-y-2">
                    {property.documents.map((doc) => (
                      <div key={doc} className="p-2 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded flex items-center justify-between">
                        <span className="text-sm text-purple-800 dark:text-purple-400">
                          {doc}
                        </span>
                        <ExternalLink className="w-3 h-3 text-purple-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={() => onCompare?.(property.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isInComparison
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            {isInComparison ? 'Remove Compare' : 'Compare'}
          </button>
          {relatedTimelineEvents.length > 0 && (
            <button
              onClick={onClearSync}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Clear Sync
            </button>
          )}
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

