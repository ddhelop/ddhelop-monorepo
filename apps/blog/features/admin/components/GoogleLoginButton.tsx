'use client';

import { useState } from 'react';
import { getGoogleOAuthUrl } from '../utils/auth';

export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // 구글 OAuth URL 가져오기
      const googleOAuthUrl = getGoogleOAuthUrl();

      // 실제 구글 OAuth 페이지로 리다이렉트
      window.location.href = googleOAuthUrl;
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="flex items-center gap-3 bg-white border border-gray-300 px-5 py-2.5 rounded-md shadow-sm hover:shadow transition-all duration-200 disabled:opacity-70"
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <title>Google 로고</title>
          <path
            fill="#4285F4"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
      )}
      <span className="font-medium text-gray-700">Google 계정으로 로그인</span>
    </button>
  );
}
