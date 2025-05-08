'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    // 초기 상태 설정
    setIsAtTop(window.scrollY <= 2);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrolledBeyondThreshold = currentScrollPos > 10;

      // 스크롤 위치에 따른 헤더 노출 상태 결정
      setVisible(!isScrollingDown || !isScrolledBeyondThreshold);
      setPrevScrollPos(currentScrollPos);

      // 페이지 최상단 여부 결정 (약간의 여유 추가)
      setIsAtTop(currentScrollPos <= 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300 ease-in-out ${
        isAtTop ? 'border-transparent' : 'border-gray-100'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          ddhelop.dev
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="https://ddhelop.dev"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
