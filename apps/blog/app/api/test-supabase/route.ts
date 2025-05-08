import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    // Supabase posts 테이블 연결 테스트
    const { data, error, status } = await supabase
      .from('posts')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Supabase 연결 실패 또는 posts 테이블 없음',
          error: error.message,
          status: status,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase와 posts 테이블에 성공적으로 연결됨',
      rowCount: data?.length || 0,
      firstRow: data?.[0] || null,
      supabaseInfo: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL
          ? '설정됨 (값 숨김)'
          : '설정되지 않음',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? '설정됨 (값 숨김)'
          : '설정되지 않음',
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '오류 발생',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
