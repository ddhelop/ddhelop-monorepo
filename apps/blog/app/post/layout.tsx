'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 컴포넌트가 마운트될 때와 pathname이 변경될 때마다 스크롤 초기화
  useEffect(() => {
    // DOM이 완전히 로드된 후 스크롤 초기화 (지연 적용으로 더 안정적)
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant', // 즉시 스크롤 (smooth 대신 즉시 이동)
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
