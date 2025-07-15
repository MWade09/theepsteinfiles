'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Map, FileText, Clock, Users, Search, BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AdvancedTimeline from '@/components/AdvancedTimeline';
import NetworkAnalysis from '@/components/NetworkAnalysis';
import EvidenceGrid from '@/components/EvidenceGrid';
import InteractiveMap from '@/components/InteractiveMap';
import DocumentLibrary from '@/components/DocumentLibrary';

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', title: 'Introduction', icon: FileText },
    { id: 'timeline', title: 'Timeline', icon: Clock },
    { id: 'connections', title: 'Network', icon: Users },
    { id: 'documents', title: 'Documents', icon: BookOpen },
    { id: 'evidence', title: 'Evidence', icon: Search },
    { id: 'map', title: 'Locations', icon: Map },
  ];

  return (
    <div className="min-h-screen">
      <Navigation 
        sections={sections}
        currentSection={currentSection}
        isScrolled={isScrolled}
      />
      
      {/* Hero Section */}
      <section id="hero" className="story-section">
        <HeroSection />
      </section>

      {/* Introduction */}
      <section className="story-section bg-white dark:bg-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Uncovering the Truth
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            <p className="mb-6">
              The Jeffrey Epstein case represents one of the most significant scandals of our time, 
              involving a complex network of powerful individuals, financial institutions, and 
              government connections that span decades.
            </p>
            <p className="mb-6">
              This investigation compiles publicly available evidence, court documents, and research 
              from dedicated journalists like Whitney Webb to present a comprehensive view of the 
              case and its far-reaching implications.
            </p>
            <p>
              Navigate through the evidence chronologically, explore connections between key figures, 
              examine original documents with annotation capabilities, and investigate the geographical 
              scope of Epstein's operations through our interactive tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="evidence-card p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Advanced Timeline</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Multi-modal timeline with chronological, thematic, and statistical analysis of 40+ key events
              </p>
            </div>
            
            <div className="evidence-card p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Network Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive visualization of complex relationships and connections between key figures
              </p>
            </div>
            
            <div className="evidence-card p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Document Library</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive document viewer with annotations, cross-referencing, and citation tracking
              </p>
            </div>
            
            <div className="evidence-card p-6 text-center">
              <Map className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Geographic Mapping</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive mapping of properties, travels, and operations worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Timeline */}
      <section id="timeline" className="story-section bg-gray-50 dark:bg-dark-900">
        <div className="w-full">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Comprehensive Timeline
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Navigate through decades of events with advanced filtering, cross-referencing, and multiple viewing modes
            </p>
          </div>
          <AdvancedTimeline />
        </div>
      </section>

      {/* Network Analysis */}
      <section id="connections" className="story-section bg-white dark:bg-dark-800">
        <div className="w-full">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Network Analysis
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore the complex web of relationships and connections through interactive network visualization
            </p>
          </div>
          <NetworkAnalysis />
        </div>
      </section>

      {/* Document Library */}
      <section id="documents" className="story-section bg-gray-50 dark:bg-dark-900">
        <div className="w-full h-screen">
          <div className="text-center pb-8 max-w-4xl mx-auto pt-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Document Library
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Access, search, and analyze critical documents with advanced annotation and cross-referencing capabilities
            </p>
          </div>
          <div className="h-full">
            <DocumentLibrary />
          </div>
        </div>
      </section>

      {/* Evidence Grid */}
      <section id="evidence" className="story-section bg-white dark:bg-dark-800">
        <EvidenceGrid />
      </section>

      {/* Interactive Map */}
      <section id="map" className="story-section bg-gray-50 dark:bg-dark-900">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Global Network
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore the geographical scope of Epstein's operations, properties, and connections across the world
            </p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* Call to Action */}
      <section className="story-section bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Continue the Investigation
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            This comprehensive investigation platform provides advanced tools for researchers, journalists, 
            and the public to examine evidence, analyze documents, and explore connections in this complex case.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Timeline
            </button>
            <button 
              onClick={() => document.getElementById('connections')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Analyze Networks
            </button>
            <button 
              onClick={() => document.getElementById('documents')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Documents
            </button>
            <button 
              onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              View Locations
            </button>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
} 