import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, type BlogPost } from '../lib/mdx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const metadata: Metadata = {
  title: '블로그',
  description: '프론트엔드 개발 관련 게시물들을 확인하세요.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">아직 게시물이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: BlogPost) => (
            <article
              key={post.slug}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/${post.slug}`}>
                <div className="h-48 bg-blue-400 flex items-center justify-center">
                  {/* 블로그 썸네일 이미지 자리 */}
                  <div className="text-white text-lg font-semibold">
                    {post.title.substring(0, 1)}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'PPP', { locale: ko })}
                    </time>
                    <span>{post.readingTime}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
