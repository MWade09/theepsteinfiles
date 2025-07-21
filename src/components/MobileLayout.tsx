'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown,
  Home,
  Users,
  Clock,
  DollarSign,
  Map,
  Network,
  BookOpen,
  ArrowUp,
  Wifi,
  WifiOff
} from 'lucide-react';
import Link from 'next/link';
import { useMobileOptimization, useOfflineSupport } from '@/utils/performance';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
  showHeader?: boolean;
}

export default function MobileLayout({ 
  children, 
  title = 'The Epstein Files',
  showBackButton = false,
  backUrl = '/',
  showHeader = true
}: MobileLayoutProps) {
  const { isMobile, isTablet, orientation, touchSupport } = useMobileOptimization();
  const { isOnline } = useOfflineSupport();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Navigation items for mobile
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'people', label: 'People', icon: Users, href: '/people' },
    { id: 'timeline', label: 'Timeline', icon: Clock, href: '/timeline' },
    { id: 'financial', label: 'Financial', icon: DollarSign, href: '/financial' },
    { id: 'geographic', label: 'Geographic', icon: Map, href: '/geographic' },
    { id: 'network', label: 'Network', icon: Network, href: '/network' },
    { id: 'research', label: 'Research', icon: BookOpen, href: '/research' }
  ];

  // Handle scroll for showing scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setShowScrollTop(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when orientation changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [orientation]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
      isMobile ? 'mobile-layout' : isTablet ? 'tablet-layout' : 'desktop-layout'
    }`}>
      {/* Mobile Header */}
      {showHeader && (isMobile || isTablet) && (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between h-14 px-4">
            {/* Left side - Menu or Back */}
            {showBackButton ? (
              <Link 
                href={backUrl}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
              >
                <ChevronDown className="w-5 h-5 rotate-90" />
                {isMobile ? '' : 'Back'}
              </Link>
            ) : (
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            {/* Center - Title */}
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h1>

            {/* Right side - Status indicators */}
            <div className="flex items-center gap-2">
              {/* Offline indicator */}
              {!isOnline && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <WifiOff className="w-4 h-4" />
                  {!isMobile && 'Offline'}
                </div>
              )}
              {isOnline && (
                <Wifi className="w-4 h-4 text-green-500" />
              )}
            </div>
          </div>
        </header>
      )}

      {/* Mobile Slide-out Menu */}
      {(isMobile || isTablet) && (
        <>
          {/* Overlay */}
          {showMobileMenu && (
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowMobileMenu(false)}
            />
          )}
          
          {/* Menu Panel */}
          <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
            showMobileMenu ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Investigation
              </h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Quick Search */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Offline Status */}
              {!isOnline && (
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 text-sm">
                    <WifiOff className="w-4 h-4" />
                    <span>Offline Mode</span>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">
                    Some features may be limited
                  </p>
                </div>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main 
        ref={scrollContainerRef}
        className={`${(isMobile || isTablet) ? 'pt-0' : 'pt-8'} ${
          touchSupport ? 'touch-optimized' : ''
        }`}
      >
        {children}
      </main>

      {/* Mobile Bottom Actions */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          {/* Scroll to Top */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Touch-specific styles */}
      <style jsx global>{`
        .mobile-layout {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        .touch-optimized button,
        .touch-optimized a {
          min-height: 44px;
          min-width: 44px;
        }
        
        .touch-optimized input,
        .touch-optimized textarea {
          font-size: 16px; /* Prevents zoom on iOS */
        }
        
        @media (max-width: 768px) {
          .mobile-layout .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .mobile-layout h1 {
            font-size: 1.5rem;
          }
          
          .mobile-layout h2 {
            font-size: 1.25rem;
          }
          
          .mobile-layout .grid {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
          .tablet-layout .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        /* PWA optimizations */
        @media (display-mode: standalone) {
          .mobile-layout {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
        
        /* Dark mode optimizations for mobile */
        @media (prefers-color-scheme: dark) {
          .mobile-layout {
            color-scheme: dark;
          }
        }
      `}</style>
    </div>
  );
}
