import { getAllPosts as getSupabasePosts } from '../../../lib/supabase';
import type { BlogPost } from '../../../lib/supabase';
import type { Post } from '../../../entities/post';

export async function getPosts(): Promise<Post[]> {
  // Supabase에서 가져온 BlogPost 타입을 Post 타입으로 변환
  const posts = await getSupabasePosts();

  return posts.map((post: BlogPost) => ({
    title: post.title,
    description: post.description,
    date: post.published_at,
    slug: post.slug,
    tags: post.tags || [],
    published: post.is_published,
    readingTime: post.reading_time,
    content: post.content,
    image: post.featured_image,
  }));
}

// 설명 텍스트 길이 다양화를 위한 헬퍼 함수
export const getRandomLength = (text: string): string => {
  const sentences = text.split(/\.\s+/);
  if (sentences.length <= 2) return text;

  // 2-3개 문장으로 랜덤하게 반환
  const sentenceCount = Math.floor(Math.random() * 2) + 2; // 2 또는 3
  return `${sentences.slice(0, sentenceCount).join('. ')}.`;
};
