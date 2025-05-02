import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  compileMDXContent,
  getAllPosts,
  type BlogPost,
} from '../../lib/mdx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
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

// 정적 경로 생성 (빌드 시 모든 MDX 파일 미리 렌더링)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post.published) {
      notFound();
    }

    const content = await compileMDXContent(post.content);

    return (
      <div className="mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-8">
            <Link href="/" className="text-gray-500 hover:text-primary">
              ← 블로그 홈으로 돌아가기
            </Link>
          </nav>

          <article>
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
                <span>{post.readingTime}</span>
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

            <div className="prose prose-slate max-w-none">{content}</div>
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">목차</h3>
            <ul className="ml-4 space-y-2 mb-8">
              {/* 목차는 구현 시 추가 */}
              <li className="text-gray-700 hover:text-primary">
                <a href="#section1">섹션 1</a>
              </li>
              <li className="text-gray-700 hover:text-primary">
                <a href="#section2">섹션 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
