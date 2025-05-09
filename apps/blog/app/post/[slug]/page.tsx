import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getRecentPosts,
} from '../../../features/post/api/getPostBySlug';
import { getAllPosts } from '../../../lib/supabase'; // 정적 경로 생성용으로만 사용
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

// 정적 경로 생성 (선택 사항 - ISR로 처리할 수도 있음)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
          {/* 그림자 제거, 기본 스타일 유지 */}
          <article className="mb-16 bg-white rounded-lg overflow-hidden">
            {/* 콘텐츠는 MdxRemote의 PostMeta가 처리합니다 */}
            <div className="prose prose-slate max-w-none p-6 md:p-8">
              {post.content}
            </div>
          </article>

          {/* 최근 글 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">최근 글</h3>
            <ul className="space-y-3">
              {recentPosts.map((recentPost) => (
                <li
                  key={recentPost.slug}
                  className="hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Link
                    href={`/post/${recentPost.slug}`}
                    className="text-gray-700 hover:text-primary block p-3 line-clamp-1 transition-colors"
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
