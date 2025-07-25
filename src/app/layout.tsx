import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Epstein Files - A Comprehensive Investigation',
  description: 'An in-depth exploration of the Jeffrey Epstein scandal, connecting evidence and revealing the full scope of the case through interactive storytelling.',
  keywords: ['Jeffrey Epstein', 'investigation', 'evidence', 'scandal', 'journalism'],
  authors: [{ name: 'Investigation Research Team' }],
  openGraph: {
    title: 'The Epstein Files - A Comprehensive Investigation',
    description: 'An in-depth exploration of the Jeffrey Epstein scandal, connecting evidence and revealing the full scope of the case.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Epstein Files - A Comprehensive Investigation',
    description: 'An in-depth exploration of the Jeffrey Epstein scandal, connecting evidence and revealing the full scope of the case.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <ServiceWorkerRegistration />
        </div>
      </body>
    </html>
  );
} 