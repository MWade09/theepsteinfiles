'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Don't show header on homepage since it has its own
  const shouldShowHeader = pathname !== '/';

  return (
    <>
      {shouldShowHeader && <SiteHeader />}
      <main className={shouldShowHeader ? 'pt-16' : ''}>
        {children}
      </main>
    </>
  );
}
