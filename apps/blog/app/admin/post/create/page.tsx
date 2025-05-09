'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostEditor from '../../../../features/admin/components/BlogPostEditor';
import { checkAuthStatus } from '../../../../features/admin/utils/auth';

export default function CreatePostPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const authStatus = checkAuthStatus();
    setIsLoggedIn(authStatus);

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
    <div className="h-screen">
      <BlogPostEditor />
    </div>
  );
}
