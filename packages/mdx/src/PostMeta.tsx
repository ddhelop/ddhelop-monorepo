'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface PostMetaProps {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  readingTime?: string;
  author?: string;
}

export const PostMeta = ({
  title,
  description,
  date,
  tags,
  readingTime,
  author = '김동혁', // 기본 작성자 이름
}: PostMetaProps) => {
  const formattedDate = date
    ? format(new Date(date), 'yyyy년 MM월 dd일', { locale: ko })
    : '';

  return (
    <div className="mb-8 border-b border-gray-100 pb-8">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="mb-4 text-lg text-gray-600">{description}</p>
      )}

      <div className="flex items-center text-gray-500 mb-6 gap-4">
        {/* 작성자 정보 */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
            {author.substring(0, 1)}
          </div>
          <span>{author}</span>
        </div>

        {/* 간단한 구분자 */}
        <span>•</span>

        {/* 날짜 - 아이콘 없이 */}
        {date && <span>{formattedDate}</span>}

        {/* 간단한 구분자 */}
        {readingTime && <span>•</span>}

        {/* 읽는 시간 - 아이콘 없이 */}
        {readingTime && <span>{readingTime}</span>}
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
              className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
