import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../../styles/globals.css';

import Footer from '../shared/ui/Footer';
import ScrollProgressBar from '../shared/ui/ScrollProgressBar';
import FloatingNav from '../shared/ui/FloatingNav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '김동혁 | 이력서',
  description: '프론트엔드 개발자 김동혁의 이력서입니다.',
  icons: {
    icon: '/rs.svg',
    shortcut: '/reserved.svg',
    apple: '/rs.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ScrollProgressBar />
        <FloatingNav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
