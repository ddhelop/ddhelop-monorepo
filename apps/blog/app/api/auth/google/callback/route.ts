import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isAdminEmail } from '../../../../../features/admin/utils/auth';

// 환경 변수
const CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '516945039845-ap29ghurtsgqf59vdhd99i7jk20t2f5l.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''; // 실제 배포 시 반드시 환경 변수로 설정해야 함
const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:3003/api/auth/google/callback';
const IS_DEV = process.env.NODE_ENV !== 'production';

/**
 * 구글 OAuth 토큰을 교환하는 함수
 */
async function getGoogleOAuthTokens(code: string) {
  // 개발 환경이고 클라이언트 시크릿이 없는 경우
  if (IS_DEV && !CLIENT_SECRET) {
    console.warn(
      '개발 환경에서 CLIENT_SECRET이 설정되지 않았습니다. 개발용 토큰을 반환합니다.'
    );
    // 개발용 토큰 반환 (난수를 사용하여 매번 다른 토큰 생성)
    const randomToken = `dev_token_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // 개발용 데이터 반환
    return {
      access_token: `dev_access_${randomToken}`,
      id_token: randomToken,
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }

  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(values),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Google OAuth tokens:', error);
    throw new Error('Failed to fetch Google OAuth tokens');
  }
}

/**
 * 액세스 토큰으로 구글 사용자 정보를 가져오는 함수
 */
async function getGoogleUser(accessToken: string, idToken: string) {
  // 개발 환경이고 액세스 토큰이 'dev_access_'로 시작하는 경우
  if (IS_DEV && accessToken.startsWith('dev_access_')) {
    console.warn('개발 환경에서 개발용 사용자 정보를 반환합니다.');
    // 개발용 데이터 반환
    return {
      id: 'dev_user_id',
      email: 'ehdgur0630@gmail.com', // 허용된 관리자 이메일
      verified_email: true,
      name: '개발자',
      picture: 'https://via.placeholder.com/150',
    };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Google user:', error);
    throw new Error('Failed to fetch Google user');
  }
}

/**
 * 구글 OAuth 콜백 처리
 *
 * 이 API 라우트는 구글 로그인 후 리다이렉트되는 경로입니다.
 * 토큰 교환 후 사용자 정보를 가져와서 쿠키를 설정하고 자동으로 localStorage에도 저장합니다.
 */
export async function GET(request: NextRequest) {
  try {
    // URL에서 인증 코드 추출
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      // 코드가 없으면 에러 리다이렉트
      return NextResponse.redirect(
        new URL('/adminLogin?error=no_code', request.url)
      );
    }

    // 구글 OAuth 토큰 교환
    const { access_token, id_token } = await getGoogleOAuthTokens(code);

    if (!access_token || !id_token) {
      return NextResponse.redirect(
        new URL('/adminLogin?error=invalid_token', request.url)
      );
    }

    // 사용자 정보 가져오기
    const googleUser = await getGoogleUser(access_token, id_token);
    const { email } = googleUser;

    // 관리자 이메일인지 확인
    if (!isAdminEmail(email)) {
      return NextResponse.redirect(
        new URL('/adminLogin?error=unauthorized', request.url)
      );
    }

    console.log('인증 성공:', {
      email,
      token_type: `${id_token.substring(0, 10)}...`,
    });

    // 대신 HTML 응답을 반환하여 토큰을 localStorage에 저장하고 리다이렉트합니다
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>인증 완료</title>
          <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'unsafe-inline'">
        </head>
        <body>
          <h1>인증이 완료되었습니다. 잠시만 기다려주세요...</h1>
          <script>
            // localStorage에 인증 정보 저장
            localStorage.setItem('auth_token', '${id_token}');
            localStorage.setItem('user_email', '${email}');
            
            // 관리자 페이지로 리다이렉트
            window.location.href = '/admin';
          </script>
        </body>
      </html>
    `;

    // 응답 생성
    const response = new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

    // 쿠키 설정 (HttpOnly, Secure 옵션 추가)
    response.headers.append(
      'Set-Cookie',
      `auth_token=${id_token}; Path=/; HttpOnly; ${
        process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
      }Max-Age=${60 * 60 * 24 * 7}`
    );

    response.headers.append(
      'Set-Cookie',
      `user_email=${email}; Path=/; ${
        process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
      }Max-Age=${60 * 60 * 24 * 7}`
    );

    return response;
  } catch (error) {
    console.error('OAuth 콜백 처리 오류:', error);
    return NextResponse.redirect(
      new URL('/adminLogin?error=auth_failed', request.url)
    );
  }
}
