'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Home, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';

export default function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/timeline', label: 'Timeline' },
    { href: '/network', label: 'Network' },
    { href: '/geographic', label: 'Geographic' },
  ];

  const isHomePage = pathname === '/';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-cyan-500/30' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all duration-300"
              >
                The Epstein Files
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-neon-cyan'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-cyan-400 transition-colors"
                title="Search (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="hidden sm:inline text-sm text-gray-400">Search...</span>
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-400 border border-gray-600 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-cyan-500/30">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-neon-cyan'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
