import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 로그아웃 API 핸들러
 *
 * 서버 측 쿠키를 삭제하고 성공 응답을 반환합니다.
 */
export async function POST(request: NextRequest) {
  console.log('로그아웃 API 호출됨');

  // 응답 생성
  const response = new NextResponse(
    JSON.stringify({ success: true, message: '로그아웃 성공' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  // 모든 인증 관련 쿠키 삭제 (만료 시간을 과거로 설정)
  response.cookies.set({
    name: 'auth_token',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  response.cookies.set({
    name: 'user_email',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  return response;
}

/**
 * OPTIONS 핸들러 추가 (CORS 지원)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
