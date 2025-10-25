'use client';

import { useState } from 'react';
import {
  X,
  Building,
  DollarSign,
  Users,
  Plus,
  Minus,
  Shield,
  Download,
  Share2,
  BarChart3
} from 'lucide-react';
import { EnhancedProperty } from '@/data/geographic/properties';

interface PropertyComparisonProps {
  properties: EnhancedProperty[];
  isOpen: boolean;
  onClose: () => void;
  onPropertyRemove: (propertyId: string) => void;
  onAddProperty: () => void;
}

export default function PropertyComparison({
  properties,
  isOpen,
  onClose,
  onPropertyRemove,
  onAddProperty
}: PropertyComparisonProps) {
  const [selectedMetric, setSelectedMetric] = useState<'financial' | 'ownership' | 'features' | 'investigation'>('financial');

  if (!isOpen || properties.length === 0) return null;

  const metrics = [
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'ownership', label: 'Ownership', icon: Users },
    { id: 'features', label: 'Features', icon: Building },
    { id: 'investigation', label: 'Investigation', icon: Shield }
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-500" />
              Property Comparison
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Side-by-side analysis of {properties.length} properties
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddProperty}
              className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Selection */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 p-4">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedMetric === metric.id
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <metric.icon className="w-4 h-4" />
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-auto p-6">
          {selectedMetric === 'financial' && (
            <div className="space-y-6">
              {/* Financial Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Purchase Prices</h3>
                  <div className="space-y-3">
                    {properties.map((property) => (
                      <div key={property.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate mr-2">
                          {property.name}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(property.financials.purchasePrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Current Values</h3>
                  <div className="space-y-3">
                    {properties.map((property) => (
                      <div key={property.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate mr-2">
                          {property.name}
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(property.financials.currentEstimatedValue || 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Renovation Costs</h3>
                  <div className="space-y-3">
                    {properties.map((property) => (
                      <div key={property.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate mr-2">
                          {property.name}
                        </span>
                        <span className="font-semibold text-orange-600">
                          {formatCurrency(property.financials.renovationCosts || 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Financial Analysis */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Financial Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                          {property.name}
                        </h4>
                        <button
                          onClick={() => onPropertyRemove(property.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Minus className="w-4 h-4 text-red-500" />
                        </button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Purchase:</span>
                          <span className="font-medium">{formatCurrency(property.financials.purchasePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Current:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(property.financials.currentEstimatedValue || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Renovations:</span>
                          <span className="font-medium text-orange-600">
                            {formatCurrency(property.financials.renovationCosts || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Annual Maint:</span>
                          <span className="font-medium">{formatCurrency(property.financials.annualMaintenance || 0)}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getSignificanceColor(property.significance)}`}>
                          {property.significance}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(property.currentStatus)}`}>
                          {property.currentStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'ownership' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ownership History Comparison
                </h3>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {property.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {property.ownershipHistory.length} ownership change(s)
                        </span>
                      </div>

                      <div className="space-y-2">
                        {property.ownershipHistory.map((ownership) => (
                          <div key={ownership.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {ownership.ownerName}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                {ownership.ownerType} • {ownership.acquisitionMethod}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {ownership.purchasePrice ? formatCurrency(ownership.purchasePrice) : 'N/A'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(ownership.startDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {property.name}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSignificanceColor(property.significance)}`}>
                        {property.significance}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="text-sm font-medium capitalize">{property.type}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Size:</span>
                        <span className="text-sm font-medium">
                          {property.features.squareFootage?.toLocaleString() || 'N/A'} sq ft
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bedrooms:</span>
                        <span className="text-sm font-medium">{property.features.bedrooms || 'N/A'}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bathrooms:</span>
                        <span className="text-sm font-medium">{property.features.bathrooms || 'N/A'}</span>
                      </div>

                      {property.features.specialFeatures.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Features:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {property.features.specialFeatures.slice(0, 3).map((feature) => (
                              <span key={feature} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedMetric === 'investigation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {property.name}
                      </h4>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getSignificanceColor(property.significance)}`}>
                          {property.significance}
                        </span>
                        {property.verified && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Key Events */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Events ({property.investigationDetails.keyEvents.length})
                        </h5>
                        <div className="space-y-2">
                          {property.investigationDetails.keyEvents.slice(0, 3).map((event, index) => (
                            <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {event.event}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(event.date).toLocaleDateString()} • {event.source}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Law Enforcement */}
                      {property.investigationDetails.lawEnforcement.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Law Enforcement ({property.investigationDetails.lawEnforcement.length})
                          </h5>
                          <div className="space-y-2">
                            {property.investigationDetails.lawEnforcement.slice(0, 2).map((action, index) => (
                              <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900/10 rounded">
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                  {action.agency}
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-300">
                                  {action.action} • {new Date(action.date).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Connected Entities */}
                      {property.connectedEntities.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Connected Entities ({property.connectedEntities.length})
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {property.connectedEntities.slice(0, 4).map((entity) => (
                              <span key={entity} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded">
                                {entity.replace('entity_', '').replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Comparing {properties.length} properties
              </span>
              <div className="flex gap-2">
                {properties.map((property) => (
                  <div key={property.id} className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className={`w-2 h-2 rounded-full ${
                      property.significance === 'critical' ? 'bg-red-500' :
                      property.significance === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-20">
                      {property.name}
                    </span>
                    <button
                      onClick={() => onPropertyRemove(property.id)}
                      className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Minus className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

