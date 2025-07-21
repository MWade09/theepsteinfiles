'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('auto');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const resolvedTheme = theme === 'auto' ? systemTheme : theme;

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#000000' : '#ffffff');
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme toggle component
export function ThemeToggle({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  };

  const themes: Theme[] = ['light', 'dark', 'auto'];
  
  const getNextTheme = (currentTheme: Theme): Theme => {
    const currentIndex = themes.indexOf(currentTheme);
    return themes[(currentIndex + 1) % themes.length];
  };

  const getThemeIcon = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
        return '🔄';
      default:
        return '🔄';
    }
  };

  const getThemeLabel = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'auto':
        return 'Auto mode (follows system)';
      default:
        return 'Auto mode';
    }
  };

  return (
    <button
      onClick={() => setTheme(getNextTheme(theme))}
      className={`
        ${sizeClasses[size]} 
        rounded-lg 
        bg-gray-800/50 hover:bg-gray-700/50 
        dark:bg-gray-200/10 dark:hover:bg-gray-200/20
        text-gray-300 hover:text-white
        dark:text-gray-300 dark:hover:text-white
        border border-gray-600/30 
        dark:border-gray-400/30
        transition-all duration-200 
        flex items-center justify-center
        backdrop-blur-sm
        relative group
      `}
      title={getThemeLabel(theme)}
      aria-label={getThemeLabel(theme)}
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        {getThemeIcon(theme)}
      </span>
      
      {/* Current resolved theme indicator */}
      <span 
        className={`
          absolute -bottom-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center
          ${resolvedTheme === 'dark' 
            ? 'bg-gray-800 text-gray-300' 
            : 'bg-gray-100 text-gray-600 border border-gray-300'
          }
        `}
      >
        {resolvedTheme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

// Utility hook for theme-aware styles
export function useThemeStyles() {
  const { resolvedTheme } = useTheme();
  
  return {
    background: resolvedTheme === 'dark' 
      ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' 
      : 'bg-gradient-to-br from-white via-gray-50 to-gray-100',
    
    card: resolvedTheme === 'dark'
      ? 'bg-gray-800/50 border-gray-700/50 text-white'
      : 'bg-white/80 border-gray-200/50 text-gray-900',
    
    text: {
      primary: resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900',
      secondary: resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      muted: resolvedTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
    },
    
    button: {
      primary: resolvedTheme === 'dark'
        ? 'bg-blue-600 hover:bg-blue-700 text-white'
        : 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: resolvedTheme === 'dark'
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    },
    
    border: resolvedTheme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    
    backdrop: resolvedTheme === 'dark' 
      ? 'bg-black/50 backdrop-blur-sm' 
      : 'bg-white/50 backdrop-blur-sm'
  };
}

// Component for theme-aware investigation content
export function ThemedInvestigationCard({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const styles = useThemeStyles();
  
  return (
    <div className={`
      ${styles.card} 
      ${className}
      rounded-lg border backdrop-blur-sm
      transition-all duration-200
      hover:shadow-lg
    `}>
      {children}
    </div>
  );
}

// Hook for theme-aware animations
export function useThemeAnimation() {
  const { resolvedTheme } = useTheme();
  
  return {
    fadeIn: `animate-in fade-in duration-300 ${resolvedTheme === 'dark' ? 'from-gray-900' : 'from-gray-100'}`,
    slideUp: `animate-in slide-in-from-bottom-4 duration-300`,
    scaleIn: `animate-in zoom-in-95 duration-200`,
    
    // Custom CSS variables for smooth transitions
    getCSSVariables: () => ({
      '--theme-bg': resolvedTheme === 'dark' ? '#1f2937' : '#f9fafb',
      '--theme-text': resolvedTheme === 'dark' ? '#ffffff' : '#111827',
      '--theme-border': resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'
    })
  };
}
