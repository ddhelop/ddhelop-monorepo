/**
 * 구글 OAuth 인증을 구현하기 위한 유틸리티 함수들
 */

// 환경 변수
const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '516945039845-ap29ghurtsgqf59vdhd99i7jk20t2f5l.apps.googleusercontent.com';
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_REDIRECT_URI ||
  'http://localhost:3003/api/auth/google/callback';
const ALLOWED_ADMIN_EMAILS = ['ehdgur0630@gmail.com']; // 관리자 이메일 목록
const IS_DEV = process.env.NODE_ENV !== 'production';

// 구글 OAuth URL 생성
export function getGoogleOAuthUrl() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

// 인증 상태 확인 (클라이언트측)
export function checkAuthStatus() {
  if (typeof window === 'undefined') return false;

  // 로컬 스토리지에서 인증 토큰 확인
  const token = localStorage.getItem('auth_token');
  const email = localStorage.getItem('user_email');

  // 개발 환경에서는 허용된 관리자 이메일만 확인
  if (IS_DEV && token && email && ALLOWED_ADMIN_EMAILS.includes(email)) {
    console.log('개발 환경 인증 상태 확인: 성공');
    return true;
  }

  // 토큰과 이메일이 모두 있고, 이메일이 허용된 관리자 목록에 있는지 확인
  if (token && email && ALLOWED_ADMIN_EMAILS.includes(email)) {
    console.log('인증 상태 확인: 성공');
    return true;
  }

  console.log('인증 상태 확인: 실패');
  return false;
}

// 쿠키 생성 함수 추가
export function setCookie(name: string, value: string, days: number) {
  if (typeof window === 'undefined') return;

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

// 쿠키 제거 함수
export function removeCookie(name: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

// 로그아웃 (클라이언트측)
export async function logout() {
  if (typeof window !== 'undefined') {
    try {
      // 서버에 로그아웃 API 호출하여 서버측 쿠키 삭제
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키 포함
      });

      // 로컬 스토리지에서 제거
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');

      // 클라이언트 쿠키도 만료시킴
      removeCookie('auth_token');
      removeCookie('user_email');

      console.log('로그아웃 성공');

      // 로그인 페이지로 리다이렉트
      window.location.href = '/adminLogin';
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);

      // 오류가 발생해도 로컬 스토리지와 쿠키는 삭제
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      removeCookie('auth_token');
      removeCookie('user_email');

      window.location.href = '/adminLogin';
    }
  }
}

// 이메일 주소가 관리자인지 확인
export function isAdminEmail(email: string) {
  return ALLOWED_ADMIN_EMAILS.includes(email);
}

// 로그인 사용자 정보 저장
export function saveUserInfo(token: string, email: string) {
  if (typeof window !== 'undefined') {
    // 개발 환경에서 더미 토큰 사용 시 경고
    if (IS_DEV && token === 'dev_id_token') {
      console.warn('개발 환경에서 더미 토큰이 사용되고 있습니다.');
    }

    // 로컬 스토리지에 저장
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_email', email);

    // 쿠키에도 저장 (7일간 유효)
    setCookie('auth_token', token, 7);
    setCookie('user_email', email, 7);

    console.log('사용자 정보 저장 완료:', email);
  }
}

// 현재 로그인한 사용자 이메일 가져오기
export function getCurrentUserEmail() {
  return typeof window !== 'undefined'
    ? localStorage.getItem('user_email')
    : null;
}

// 인증이 필요한 페이지로 리다이렉트
export function redirectToProtectedPage(path = '/admin') {
  if (typeof window !== 'undefined') {
    if (checkAuthStatus()) {
      window.location.href = path;
    } else {
      window.location.href = '/adminLogin';
    }
  }
}
