import Link from 'next/link';
import type { Post } from '../../../entities/post';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  emptyMessage?: string;
  getPostUrl?: (slug: string) => string;
}

export function PostList({
  posts,
  emptyMessage = '해당 태그의 게시물이 없습니다.',
  getPostUrl = (slug) => `/${slug}`,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 mb-2">{emptyMessage}</p>
        <Link href="/" className="text-primary hover:underline">
          모든 게시물 보기
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} getPostUrl={getPostUrl} />
      ))}
    </div>
  );
}
