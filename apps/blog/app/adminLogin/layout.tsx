import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 로그인',
  description: '블로그 관리자 로그인 페이지',
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
