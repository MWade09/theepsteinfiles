'use client';

import { usePathname } from 'next/navigation';
import { useMobileOptimization } from '@/utils/performance';
import SiteHeader from './SiteHeader';
import MobileLayout from './MobileLayout';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const { isMobile } = useMobileOptimization();
  
  // Don't show header on homepage since it has its own
  const shouldShowHeader = pathname !== '/';

  // Use mobile layout for mobile devices
  if (isMobile) {
    return (
      <MobileLayout showHeader={shouldShowHeader}>
        {children}
      </MobileLayout>
    );
  }

  // Desktop layout
  return (
    <>
      {shouldShowHeader && <SiteHeader />}
      <main className={shouldShowHeader ? 'pt-16' : ''}>
        {children}
      </main>
    </>
  );
}
