import { HomePage } from '../features/home/components/HomePage';
import { getPosts } from '../features/home/api/getPosts';
import { getAllTagsWithCount } from '../features/tag/api/getPostsByTag';

export default async function Home() {
  // 포스트와 태그 정보 가져오기
  const posts = await getPosts();
  const tagInfo = await getAllTagsWithCount();

  // 현재 페이지 및 총 페이지 수 (페이지네이션 목적)
  const currentPage = 1;
  const totalPages = 1; // 실제 구현에서는 페이지당 포스트 수에 따라 계산

  // URL 생성 함수
  // 태그 페이지가 없으므로 메인 페이지로 리다이렉트
  const getTagUrl = (slug: string) => `/?tag=${slug}`;
  const createPageUrl = (page: number) => `/?page=${page}`;

  return (
    <HomePage
      posts={posts}
      tagInfo={tagInfo}
      currentPage={currentPage}
      totalPages={totalPages}
      getTagUrl={getTagUrl}
      createPageUrl={createPageUrl}
      getPostUrl={(slug: string) => `/post/${slug}`}
    />
  );
}
