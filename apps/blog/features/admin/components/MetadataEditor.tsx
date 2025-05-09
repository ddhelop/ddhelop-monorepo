'use client';

import { useEffect, useState } from 'react';
import TagsSelector from './TagsSelector';

export interface Metadata {
  title: string;
  description: string;
  tags: string[];
  published: boolean;
  [key: string]: unknown;
}

interface MetadataEditorProps {
  initialMetadata: Partial<Metadata>;
  onChange: (metadata: Metadata) => void;
}

export default function MetadataEditor({
  initialMetadata,
  onChange,
}: MetadataEditorProps) {
  const [metadata, setMetadata] = useState<Metadata>({
    title: initialMetadata.title || '',
    description: initialMetadata.description || '',
    tags: initialMetadata.tags || [],
    published: initialMetadata.published || false,
    ...initialMetadata,
  });

  // initialMetadata가 변경될 때만 상태 업데이트
  useEffect(() => {
    setMetadata({
      title: initialMetadata.title || '',
      description: initialMetadata.description || '',
      tags: initialMetadata.tags || [],
      published: initialMetadata.published || false,
      ...initialMetadata,
    });
  }, [initialMetadata]);

  const handleChange = (field: keyof Metadata, value: unknown) => {
    const newMetadata = { ...metadata, [field]: value };
    setMetadata(newMetadata);
    onChange(newMetadata); // 메타데이터 변경 시 바로 부모 컴포넌트에 알림
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="metadata-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          제목
        </label>
        <input
          id="metadata-title"
          type="text"
          value={metadata.title as string}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="글 제목을 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="metadata-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          설명
        </label>
        <textarea
          id="metadata-description"
          value={metadata.description as string}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="글에 대한 간단한 설명을 입력하세요"
          rows={2}
        />
      </div>

      <div>
        <label
          htmlFor="metadata-tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          태그
        </label>
        <div
          className="border border-gray-300 rounded-md p-2"
          id="metadata-tags"
        >
          <TagsSelector
            initialTags={metadata.tags}
            onChange={(tags) => handleChange('tags', tags)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="metadata-published"
          type="checkbox"
          checked={metadata.published as boolean}
          onChange={(e) => handleChange('published', e.target.checked)}
          className="h-4 w-4 text-primary border-gray-300 rounded"
        />
        <label
          htmlFor="metadata-published"
          className="ml-2 block text-sm text-gray-700"
        >
          공개 여부
        </label>
      </div>
    </div>
  );
}
