import { createClient } from '@supabase/supabase-js';
import { compileMDX } from 'next-mdx-remote/rsc';
import readingTime from 'reading-time';
import React from 'react';
import { MdxRemote } from '@repo/mdx';

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 생성 (브라우저에서 쿠키 사용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// 서버 측에서 서비스 키로 Supabase 클라이언트 생성 (어드민 API용)
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  : supabase; // 서비스 키가 없으면 일반 클라이언트 사용

// 블로그 글 인터페이스
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  published_at: string;
  updated_at: string;
  tags: string[];
  author_id: string;
  is_published: boolean;
  featured_image?: string;
  reading_time?: string;
}

// 저자 인터페이스
export interface Author {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar_url?: string;
}

// 이미지 업로드 함수
export async function uploadImage(
  file: File,
  compressedDataUrl: string
): Promise<string> {
  try {
    // 현재 사용자 세션 확인
    const { data: sessionData } = await supabase.auth.getSession();

    // 로그인 상태가 아니면, Google 인증을 통해 얻은 관리자 이메일로 로그인 시도
    if (!sessionData?.session) {
      console.log(
        'Supabase 인증 세션이 없습니다. 관리자 권한으로 업로드를 시도합니다.'
      );

      // 브라우저 환경인 경우 localStorage에서 관리자 이메일을 확인
      if (typeof window !== 'undefined') {
        const adminEmail = localStorage.getItem('user_email');

        // 이메일이 있으면 임시 로그인 시도 (이 부분은 보안상 실제로는 위험할 수 있음)
        if (adminEmail) {
          await supabase.auth
            .signInWithPassword({
              email: adminEmail,
              password: 'temp_password_for_storage_access',
            })
            .catch((err) => {
              console.log('임시 인증 실패:', err);
            });
        }
      }
    }

    // 파일 형식 가져오기 (JPEG, PNG 등)
    const fileFormat = file.type.split('/')[1];

    // 파일 이름 생성 (현재 시간 + 원본 파일 이름)
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // 버킷 이름
    const bucketName = 'images';

    // Blob으로 변환 (base64 데이터 URL에서)
    const base64Data = compressedDataUrl.split(',')[1];
    const blob = await fetch(`data:${file.type};base64,${base64Data}`).then(
      (res) => res.blob()
    );

    // Storage에 업로드 (서비스 롤 키 사용)
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`uploads/${fileName}`, blob, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('이미지 업로드 오류:', error);
      throw error;
    }

    // 공개 URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`uploads/${fileName}`);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    throw error;
  }
}

// 블로그 글 가져오기 (공개된 글만)
export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  // 포스트마다 읽기 시간 계산
  const postsWithReadingTime = data.map((post: BlogPost) => ({
    ...post,
    reading_time: readingTime(post.content).text,
  }));

  return postsWithReadingTime as BlogPost[];
}

// 특정 슬러그로 블로그 글 가져오기
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }

  // 읽기 시간 계산
  const postWithReadingTime = {
    ...data,
    reading_time: readingTime(data.content).text,
  };

  return postWithReadingTime as BlogPost;
}

// 태그별 블로그 글 가져오기
export async function getPostsByTag(tag: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .contains('tags', [tag])
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching posts with tag ${tag}:`, error);
    return [];
  }

  // 포스트마다 읽기 시간 계산
  const postsWithReadingTime = data.map((post: BlogPost) => ({
    ...post,
    reading_time: readingTime(post.content).text,
  }));

  return postsWithReadingTime as BlogPost[];
}

// 모든 태그 목록 가져오기
export async function getAllTags() {
  const { data, error } = await supabase
    .from('posts')
    .select('tags')
    .eq('is_published', true);

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  // 모든 글에서 태그를 추출하고 중복 제거
  const allTags = data.flatMap((post) => post.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
}

// 새 블로그 글 저장 (관리자 전용)
export async function createPost(post: Omit<BlogPost, 'id'>) {
  const { data, error } = await supabase.from('posts').insert([post]).select();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return data?.[0] as BlogPost;
}

// 블로그 글 업데이트 (관리자 전용)
export async function updatePost(id: string, post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }

  return data?.[0] as BlogPost;
}

// 블로그 글 삭제 (관리자 전용)
export async function deletePost(id: string) {
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }

  return true;
}

// MDX 컴파일 함수
export async function compileSupabaseMdxContent(content: string) {
  try {
    // 서버 컴포넌트에서는 직접 React 컴포넌트를 반환하는 것이 더 효율적입니다
    return {
      content: React.createElement(MdxRemote, { source: content }),
    };
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
}

// 블로그 포스트 컴파일 함수
export async function compileSupabaseBlogPost(post: BlogPost) {
  try {
    const { content } = await compileSupabaseMdxContent(post.content);

    return {
      ...post,
      content,
    };
  } catch (error) {
    console.error(`Error compiling post content for ${post.slug}:`, error);

    // 컴파일 오류 시 원본 내용을 반환
    return post;
  }
}
