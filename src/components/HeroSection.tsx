'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The{' '}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Epstein
            </span>{' '}
            Files
          </h1>
          
          <div className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <p className="mb-4">
              A comprehensive investigation into one of the most significant scandals of our time
            </p>
            <p className="text-lg opacity-80">
              Connecting the dots through evidence, testimony, and investigative journalism
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Begin Investigation
            </button>
            
            <button className="flex items-center gap-3 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10">
              <Play className="w-5 h-5" />
              Watch Introduction
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="group">
              <div className="text-3xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-gray-400">Court Documents</div>
            </div>
            
            <div className="group">
              <div className="text-3xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform">
                25+
              </div>
              <div className="text-gray-400">Key Locations</div>
            </div>
            
            <div className="group">
              <div className="text-3xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform">
                100+
              </div>
              <div className="text-gray-400">Connected Individuals</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-red-500/20 rounded-full animate-pulse-slow" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-blue-500/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-500/20 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-60 right-10 w-5 h-5 bg-green-500/20 rounded-full animate-pulse-slow" style={{animationDelay: '0.5s'}} />
    </div>
  );
} 