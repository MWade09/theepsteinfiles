'use client';

import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ResearchTools from '@/components/ResearchTools';

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Investigation
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Research Tools
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Professional Research & Analysis Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Export investigation data, generate comprehensive reports, manage research notes, 
            and create citations for academic research. Professional tools for serious investigation work.
          </p>
        </div>

        {/* Research Tools Component */}
        <ResearchTools />

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Data Export
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Export investigation data in CSV format for analysis in spreadsheet applications. 
              Generate comprehensive HTML/PDF reports with all findings.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Research Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Create and manage personal research notes linked to investigation data. 
              Track your analysis and findings with persistent local storage.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Academic Citations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Generate properly formatted citations in APA, MLA, Chicago, and Harvard styles 
              for academic research and documentation.
            </p>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Research Guidelines
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-2">
            <li>• All data exports include source attribution and verification status</li>
            <li>• Research notes are stored locally in your browser for privacy</li>
            <li>• PDF reports can be printed or saved for offline analysis</li>
            <li>• Citations follow standard academic formatting guidelines</li>
            <li>• Data integrity is maintained across all export formats</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
