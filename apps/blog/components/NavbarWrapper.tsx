'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import Footer from './Footer';

// 에디터 페이지 경로 배열
const editorPaths = ['/admin/post/create', '/admin/post/edit'];

interface NavbarWrapperProps {
  children: React.ReactNode;
}

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  // 현재 경로 확인
  const pathname = usePathname();

  // 에디터 페이지인지 확인
  const isEditorPage = editorPaths.some((path) => pathname?.startsWith(path));

  return (
    <>
      {!isEditorPage && <NavBar />}
      <main className={isEditorPage ? 'flex-grow' : 'flex-grow pt-16'}>
        {children}
      </main>
      {!isEditorPage && <Footer />}
    </>
  );
}
