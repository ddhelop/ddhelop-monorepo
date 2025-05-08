import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Post } from '../../../entities/post';
import { getRandomLength } from '../../home/api/getPosts';

interface PostCardProps {
  post: Post;
  authorName?: string;
  getPostUrl?: (slug: string) => string;
}

export function PostCard({
  post,
  authorName = '김동혁',
  getPostUrl = (slug) => `/${slug}`,
}: PostCardProps) {
  return (
    <Link href={getPostUrl(post.slug)}>
      <article className="py-6 px-4 rounded-lg transition-all duration-200 cursor-pointer hover:bg-white">
        <div className="flex items-center text-sm text-gray-500 mb-2 gap-2">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'PPP', { locale: ko })}
          </time>
          <span>•</span>
          <span>{authorName}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {post.title}
            </h2>
            <p className="text-[15px] text-gray-700 mb-3">
              {getRandomLength(post.description)}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {post.image && (
            <div className="md:w-40 h-40 mt-3 md:mt-0 flex-shrink-0">
              <div className="rounded-lg overflow-hidden h-full w-full">
                <div className="w-full h-full relative bg-black">
                  <div className="absolute inset-0 bg-blue-500 opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-white">
                    <div className="text-3xl font-bold">
                      {post.title.substring(0, 1)}
                    </div>
                    <div className="text-sm mt-1">Simplicity</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
