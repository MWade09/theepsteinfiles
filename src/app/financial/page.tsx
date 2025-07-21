'use client';

import FinancialFlowAnalysis from '@/components/FinancialFlowAnalysis';

export default function FinancialPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Financial Flow Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Comprehensive analysis of financial transactions, entities, and flow patterns in the investigation.
          </p>
        </div>
        
        <FinancialFlowAnalysis />
      </div>
    </div>
  );
}
