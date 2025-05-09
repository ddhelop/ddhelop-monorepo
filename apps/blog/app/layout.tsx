import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NavbarWrapper from '../components/NavbarWrapper';
import './globals.css';

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
    icon: '/icons/blog_logo.svg',
    apple: '/icons/blog_logo.svg',
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

// Next.js가 스크롤 복원 기능을 사용하지 않도록 설정
export const scrollRestoration = 'manual';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={inter.variable}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-screen bg-white text-foreground flex flex-col">
        <NavbarWrapper>{children}</NavbarWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
