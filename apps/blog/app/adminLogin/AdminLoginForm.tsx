'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoogleLoginButton } from '../../features/admin/components/GoogleLoginButton';

// 에러 메시지 매핑
const ERROR_MESSAGES: Record<string, string> = {
  no_code: '인증 코드를 받지 못했습니다. 다시 시도해주세요.',
  invalid_token: '유효하지 않은 인증 토큰입니다. 다시 시도해주세요.',
  unauthorized: '관리자 권한이 없는 계정입니다.',
  auth_failed: '인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
};

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // URL에서 에러 파라미터 확인
    const errorCode = searchParams.get('error');
    if (errorCode && ERROR_MESSAGES[errorCode]) {
      setError(ERROR_MESSAGES[errorCode]);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
        <h1 className="text-xl font-bold text-center mb-6">관리자 로그인</h1>
        <p className="text-[15px] text-gray-600 text-center mb-8">
          계속하려면 구글 계정으로 로그인하세요
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-[14px]">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}
