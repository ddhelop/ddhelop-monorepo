import {
  getPostBySlug as getSupabasePostBySlug,
  compileSupabaseBlogPost,
} from '../../../lib/supabase';
import type { BlogPost } from '../../../lib/supabase';
import type { Post } from '../../../entities/post';
import type { ReactNode } from 'react';

export interface PostWithContent extends Omit<Post, 'content'> {
  content: ReactNode;
}

export async function getPostBySlug(slug: string): Promise<PostWithContent> {
  // Supabase에서 포스트 가져오기
  const post = await getSupabasePostBySlug(slug);

  if (!post) {
    throw new Error(`포스트를 찾을 수 없습니다: ${slug}`);
  }

  // MDX 컴파일
  const compiledPost = await compileSupabaseBlogPost(post);

  // BlogPost를 Post 타입으로 변환
  return {
    title: post.title,
    description: post.description,
    date: post.published_at,
    slug: post.slug,
    tags: post.tags || [],
    published: post.is_published,
    readingTime: post.reading_time,
    image: post.featured_image,
    content: compiledPost.content,
  };
}

export async function getRecentPosts(excludeSlug?: string): Promise<Post[]> {
  // Supabase에서 최근 포스트 5개 가져오기
  const { getAllPosts } = await import('../../../lib/supabase');
  const posts = await getAllPosts();

  // 현재 포스트 제외하고 최근 5개만 가져오기
  const recentPosts = posts
    .filter((post) => !excludeSlug || post.slug !== excludeSlug)
    .slice(0, 5)
    .map((post: BlogPost) => ({
      title: post.title,
      description: post.description,
      date: post.published_at,
      slug: post.slug,
      tags: post.tags || [],
      published: post.is_published,
      readingTime: post.reading_time,
      image: post.featured_image,
    }));

  return recentPosts;
}
