import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getRecentPosts,
} from '../../../features/post/api/getPostBySlug';
import { getAllPosts } from '../../../lib/supabase'; // 정적 경로 생성용으로만 사용
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  try {
    const post = await getPostBySlug(slug);

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: ['김동혁'],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
      },
    };
  } catch (error) {
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 블로그 포스트가 존재하지 않습니다.',
    };
  }
}

// 정적 경로 생성 (빌드 시 모든 포스트 미리 렌더링)
export async function generateStaticParams() {
  try {
    // Supabase에서 모든 공개 포스트 가져오기
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('정적 경로 생성 중 오류:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  try {
    // API를 통해 포스트 가져오기
    const post = await getPostBySlug(slug);

    if (!post || !post.published) {
      notFound();
    }

    // 최근 글 5개 가져오기
    const recentPosts = await getRecentPosts(slug);

    return (
      <div className="mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto relative">
          <article className="mb-16">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-500 mb-6 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
                    김
                  </div>
                  <span>김동혁</span>
                </div>
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'PPP', { locale: ko })}
                </time>
                <span>{post.readingTime || '약 5분'}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose prose-slate max-w-none">{post.content}</div>
          </article>

          {/* 최근 글 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">최근 글</h3>
            <ul className="space-y-2">
              {recentPosts.map((recentPost) => (
                <li key={recentPost.slug}>
                  <Link
                    href={`/post/${recentPost.slug}`}
                    className="text-gray-700 hover:text-primary line-clamp-1 transition-colors"
                  >
                    {recentPost.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('블로그 포스트 렌더링 중 오류:', error);
    notFound();
  }
}
