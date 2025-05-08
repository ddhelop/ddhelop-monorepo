import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../../../styles/globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 김동혁 블로그',
    default: '김동혁 블로그',
  },
  description: '프론트엔드 개발자 김동혁의 기술 블로그입니다.',
  metadataBase: new URL('https://blog.ddhelop.dev'),
  authors: [{ name: '김동혁', url: 'https://ddhelop.dev' }],
  creator: '김동혁',
  publisher: '김동혁',
  keywords: ['프론트엔드', '웹 개발', '기술 블로그', 'Next.js', 'React'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '김동혁 블로그',
    title: '김동혁 블로그',
    description: '프론트엔드 개발자 김동혁의 기술 블로그입니다.',
    url: 'https://blog.ddhelop.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: '김동혁 블로그',
    description: '프론트엔드 개발자 김동혁의 기술 블로그입니다.',
    creator: '@ddhelop',
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen bg-white text-foreground flex flex-col">
        <NavBar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
