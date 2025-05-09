import { type NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // 관리자 권한 확인
    const authToken = request.cookies.get('auth_token')?.value;
    const userEmail = request.cookies.get('user_email')?.value;

    if (!authToken || !userEmail) {
      return NextResponse.json(
        { error: '인증되지 않은 요청입니다.' },
        { status: 401 }
      );
    }

    // 허용된 관리자 이메일 목록
    const ALLOWED_ADMIN_EMAILS = ['ehdgur0630@gmail.com'];

    if (!ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.json(
        { error: '관리자 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 폼 데이터 처리
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드할 수 있습니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 5MB 이하여야 합니다.' },
        { status: 400 }
      );
    }

    // 파일 이름 생성
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Supabase Storage에 업로드 (서비스 롤 키 사용)
    const { data, error } = await supabaseAdmin.storage
      .from('images')
      .upload(`uploads/${fileName}`, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('이미지 업로드 오류:', error);
      return NextResponse.json(
        { error: `이미지 업로드 실패: ${error.message}` },
        { status: 500 }
      );
    }

    // 공개 URL 가져오기
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(`uploads/${fileName}`);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error('서버 이미지 업로드 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
