import Link from 'next/link';
import type { TagWithCount } from '../../../entities/tag';

interface TagCloudProps {
  tags: TagWithCount[];
  getTagUrl: (slug: string) => string;
}

export function TagCloud({ tags, getTagUrl }: TagCloudProps) {
  return (
    <div className="md:sticky md:top-24 mb-6 md:mb-0">
      <h3 className="text-base font-medium text-primary mb-3">태그</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ name, slug, count, isSelected }) => (
          <Link
            key={slug}
            href={getTagUrl(slug)}
            className={`inline-flex items-center px-2.5 py-1.5 rounded-full transition-colors ${
              isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <span
              className={`text-[14px] ${
                isSelected ? 'text-blue-800' : 'text-gray-800'
              }`}
            >
              {name}
            </span>
            <span className="ml-1.5 text-xs text-gray-500">({count})</span>
            <span
              className={`text-blue-500 text-xs ml-2 transition-all duration-200 ${
                isSelected
                  ? 'opacity-100 max-w-10'
                  : 'opacity-0 max-w-0 overflow-hidden'
              }`}
            >
              ×
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
