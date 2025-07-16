'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  sections: Array<{
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  currentSection: number;
  isScrolled: boolean;
}

export default function Navigation({ sections, currentSection, isScrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-cyan-500/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all duration-300"
            >
              The Epstein Files
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentSection === index
                        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-neon-cyan'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {section.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-cyan-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      currentSection === index
                        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-neon-cyan'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {section.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 