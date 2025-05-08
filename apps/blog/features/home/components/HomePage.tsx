import type { Post } from '../../../entities/post';
import type { TagWithCount } from '../../../entities/tag';
import { AuthorCard } from '../../author/components/AuthorCard';
import { PostList } from '../../post/components/PostList';
import { TagCloud } from '../../tag/components/TagCloud';
import { Pagination } from './Pagination';

interface HomePageProps {
  posts: Post[];
  tagInfo: TagWithCount[];
  currentPage: number;
  totalPages: number;
  getTagUrl: (slug: string) => string;
  createPageUrl: (page: number) => string;
  getPostUrl?: (slug: string) => string;
}

export function HomePage({
  posts,
  tagInfo,
  currentPage,
  totalPages,
  getTagUrl,
  createPageUrl,
  getPostUrl = (slug) => `/${slug}`,
}: HomePageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <AuthorCard
        name="김동혁"
        initial="김"
        jobTitle="프로덕트 엔지니어"
        links={{
          github: 'https://github.com/ddhelop',
          linkedin: 'https://linkedin.com/in/ddhelop',
        }}
      />

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="w-full md:w-4/5">
          <PostList posts={posts} getPostUrl={getPostUrl} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            createPageUrl={createPageUrl}
          />
        </div>

        <div className="w-full md:w-1/5">
          <TagCloud tags={tagInfo} getTagUrl={getTagUrl} />
        </div>
      </div>
    </div>
  );
}
