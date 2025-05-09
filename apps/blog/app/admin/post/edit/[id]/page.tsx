'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type BlogPost } from '../../../../../lib/supabase';
import BlogPostEditor from '../../../../../features/admin/components/BlogPostEditor';
import { checkAuthStatus } from '../../../../../features/admin/utils/auth';

interface Props {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // 로그인 상태 확인
    const authStatus = checkAuthStatus();
    setIsLoggedIn(authStatus);

    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    if (!authStatus) {
      router.push('/adminLogin');
      return;
    }

    // 게시글 정보 가져오기
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('게시글 가져오기 오류:', error);
          setError('게시글을 찾을 수 없습니다.');
          return;
        }

        setPost(data as BlogPost);
      } catch (error) {
        console.error('게시글 가져오기 오류:', error);
        setError('게시글 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [id, router]);

  // 로딩 중이거나 로그인되지 않은 경우 로딩 표시
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 오류가 있는 경우 오류 메시지 표시
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
          <h1 className="text-xl font-bold mb-4">오류 발생</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            게시글 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 게시글이 없는 경우
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
          <h1 className="text-xl font-bold mb-4">게시글 없음</h1>
          <p className="text-gray-600 mb-6">
            요청하신 게시글을 찾을 수 없습니다.
          </p>
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            게시글 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <BlogPostEditor post={post} isEdit={true} />
    </div>
  );
}
