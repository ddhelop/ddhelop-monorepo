// 서비스 역할 키로 포스트 업로드 (RLS 우회)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase 클라이언트 생성 (서비스 역할 키 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('환경변수가 설정되지 않았습니다.');
  console.log('필요한 환경변수:');
  console.log('NEXT_PUBLIC_SUPABASE_URL');
  console.log(
    'SUPABASE_SERVICE_ROLE_KEY - Supabase 대시보드의 Project Settings > API에서 확인'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 블로그 포스트 데이터
const samplePost = {
  title: '테스트 글입니다',
  slug: 'test-post',
  content: `---
title: 테스트 글입니다
description: 이것은 Supabase에 직접 업로드하는 테스트 글입니다.
tags: ['테스트', 'Supabase']
published: true
date: '2024-08-05'
---

# 테스트 글입니다

이 글은 Supabase에 직접 업로드하기 위한 테스트입니다.

## 마크다운 테스트

- 항목 1
- 항목 2
- 항목 3

\`\`\`javascript
// 코드 블록 테스트
function hello() {
  console.log('안녕하세요!');
}
\`\`\``,
  description: '이것은 Supabase에 직접 업로드하는 테스트 글입니다.',
  tags: ['테스트', 'Supabase'],
  is_published: true,
  published_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  author_id: '1',
};

async function uploadPost() {
  try {
    console.log('Supabase에 포스트 업로드 중...');

    // 이미 동일한 slug가 있는지 확인
    const { data: existing, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', samplePost.slug)
      .maybeSingle();

    if (checkError) {
      console.error('기존 포스트 확인 오류:', checkError);
      return;
    }

    let result;

    if (existing) {
      // 기존 포스트 업데이트
      const { data, error } = await supabase
        .from('posts')
        .update(samplePost)
        .eq('id', existing.id)
        .select();

      if (error) throw error;
      result = data;
      console.log('포스트가 업데이트되었습니다.');
    } else {
      // 새 포스트 생성
      const { data, error } = await supabase
        .from('posts')
        .insert([samplePost])
        .select();

      if (error) throw error;
      result = data;
      console.log('새 포스트가 생성되었습니다.');
    }

    console.log('업로드 성공!');
    console.log('포스트 ID:', result[0].id);
    console.log('제목:', result[0].title);
    console.log('슬러그:', result[0].slug);
  } catch (error) {
    console.error('업로드 오류:', error);
  }
}

// 스크립트 실행
uploadPost();
