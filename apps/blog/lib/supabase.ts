import { createClient } from '@supabase/supabase-js';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// MDX 내용 컴파일을 위한 옵션
const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeHighlight],
};

// MDX 컴파일 함수
export async function compileSupabaseMdxContent(content: string) {
  try {
    const { content: compiledContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true, mdxOptions },
    });

    return { content: compiledContent };
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
