'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  checkAuthStatus,
  getCurrentUserEmail,
  logout,
} from '../../features/admin/utils/auth';

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const authStatus = checkAuthStatus();
    setIsLoggedIn(authStatus);

    // 이메일 정보 가져오기
    const email = getCurrentUserEmail();
    setUserEmail(email);

    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    if (!authStatus) {
      console.log('로그인 상태가 아님, 리다이렉트');
      router.push('/adminLogin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // 로딩 중이거나 로그인되지 않은 경우 로딩 표시
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold mb-2">관리자 대시보드</h1>
          <p className="text-[15px] text-gray-600">
            블로그 콘텐츠 관리 및 설정을 변경할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col items-end">
          {isLoggedIn && userEmail && (
            <>
              <p className="text-[14px] text-gray-600 mb-2">{userEmail}</p>
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 bg-gray-100 rounded-md text-[14px] hover:bg-gray-200 transition-colors"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 콘텐츠 관리 카드 */}
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium mb-4">콘텐츠 관리</h2>
          <ul className="space-y-3 text-[15px]">
            <li>
              <Link href="#" className="text-primary hover:underline">
                게시물 작성
              </Link>
            </li>
            <li>
              <Link href="#" className="text-primary hover:underline">
                게시물 목록
              </Link>
            </li>
            <li>
              <Link href="#" className="text-primary hover:underline">
                태그 관리
              </Link>
            </li>
          </ul>
        </div>

        {/* 설정 카드 */}
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium mb-4">블로그 설정</h2>
          <ul className="space-y-3 text-[15px]">
            <li>
              <Link href="#" className="text-primary hover:underline">
                프로필 정보
              </Link>
            </li>
            <li>
              <Link href="#" className="text-primary hover:underline">
                소셜 미디어 링크
              </Link>
            </li>
            <li>
              <Link href="#" className="text-primary hover:underline">
                SEO 설정
              </Link>
            </li>
          </ul>
        </div>

        {/* 통계 카드 */}
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-lg font-medium mb-4">블로그 통계</h2>
          <div className="space-y-4 text-[15px]">
            <div>
              <p className="text-gray-600">게시물 수</p>
              <p className="text-2xl font-semibold mt-1">23</p>
            </div>
            <div>
              <p className="text-gray-600">태그 수</p>
              <p className="text-2xl font-semibold mt-1">15</p>
            </div>
            <div>
              <p className="text-gray-600">총 조회수</p>
              <p className="text-2xl font-semibold mt-1">12,345</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-[15px] text-primary hover:underline">
          블로그로 돌아가기
        </Link>
      </div>
    </div>
  );
}
