'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, type BlogPost } from '../../../lib/supabase';
import { checkAuthStatus } from '../../../features/admin/utils/auth';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const authStatus = checkAuthStatus();
    setIsLoggedIn(authStatus);

    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    if (!authStatus) {
      router.push('/adminLogin');
      return;
    }

    // 게시글 목록 가져오기
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) {
          console.error('게시글 가져오기 오류:', error);
          return;
        }

        setPosts(data as BlogPost[]);
      } catch (error) {
        console.error('게시글 가져오기 오류:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [router]);

  // 게시글 삭제 처리
  const handleDeletePost = async (id: string) => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);

      if (error) {
        console.error('게시글 삭제 오류:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
        return;
      }

      // 목록에서 삭제된 게시글 제거
      setPosts(posts.filter((post) => post.id !== id));
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

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

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold mb-2">게시글 관리</h1>
          <p className="text-[15px] text-gray-600">
            블로그 게시글을 관리할 수 있습니다.
          </p>
        </div>
        <Link
          href="/admin/post/create"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          새 게시글 작성
        </Link>
      </div>

      {/* 게시글 목록 테이블 */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                제목
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                상태
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                작성일
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                수정일
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">작업</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                >
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <Link
                        href={`/post/${post.slug}`}
                        target="_blank"
                        className="hover:text-primary hover:underline"
                      >
                        {post.title}
                      </Link>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {post.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.is_published ? '공개' : '비공개'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.published_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.updated_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/post/edit/${post.id}`}
                      className="text-primary hover:text-primary-dark mr-4"
                    >
                      수정
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/admin"
          className="text-[15px] text-primary hover:underline"
        >
          관리자 대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}
