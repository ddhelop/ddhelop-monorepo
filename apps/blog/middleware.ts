import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 관리자 이메일 목록
const ALLOWED_ADMIN_EMAILS = ['ehdgur0630@gmail.com'];

export async function middleware(request: NextRequest) {
  console.log('미들웨어 실행:', request.nextUrl.pathname);

  // 관리자 페이지에 대한 요청인지 확인
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/adminLogin')
  ) {
    // 쿠키에서 인증 정보 가져오기
    const authToken = request.cookies.get('auth_token')?.value;
    const userEmail = request.cookies.get('user_email')?.value;

    console.log('인증 토큰 확인:', authToken ? '있음' : '없음');
    console.log('이메일 확인:', userEmail);

    // 인증 토큰이 없거나 관리자가 아닌 경우 로그인 페이지로 리다이렉트
    if (!authToken || !userEmail || !ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
      console.log('인증 실패, 로그인 페이지로 리다이렉트');
      return NextResponse.redirect(new URL('/adminLogin', request.url));
    }

    console.log('인증 성공, 접근 허용');
  }

  // 다른 페이지는 그대로 진행
  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ['/admin/:path*'],
};
