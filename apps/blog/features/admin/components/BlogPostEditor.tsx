'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '../../../lib/supabase';
import type { BlogPost } from '../../../lib/supabase';
import { validateMdxMetadata } from '../../../lib/utils';

// Front Matter 템플릿
const FRONT_MATTER_TEMPLATE = `---
title: 제목을 입력하세요
description: 글에 대한 간단한 설명을 입력하세요
tags: [태그1, 태그2]
published: false
---

# 제목

여기에 블로그 글 내용을 작성하세요. **Markdown** 및 *MDX* 문법을 지원합니다.
`;

interface BlogPostEditorProps {
  post?: Partial<BlogPost>;
  isEdit?: boolean;
}

// Front Matter에서 추출된 메타데이터 타입
interface PostMetadata {
  title: string;
  description: string;
  tags: string[];
  published: boolean;
  [key: string]: unknown;
}

export default function BlogPostEditor({
  post,
  isEdit = false,
}: BlogPostEditorProps) {
  const [content, setContent] = useState<string>(
    post?.content || FRONT_MATTER_TEMPLATE
  );
  const [title, setTitle] = useState<string>(post?.title || '');
  const [isPublished, setIsPublished] = useState<boolean>(
    post?.is_published || false
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  // 제목 필드가 변경될 때 Front Matter 내의 제목도 업데이트
  useEffect(() => {
    if (title && !content.includes(`title: ${title}`)) {
      const updatedContent = content.replace(
        /title:\s*(.*)/,
        `title: ${title}`
      );
      setContent(updatedContent);
    }
  }, [title, content]);

  // 저장 처리 함수
  const handleSave = async (publishChange = false) => {
    try {
      setIsSaving(true);
      setError(null);

      // Front Matter 파싱 시도
      let metadata: PostMetadata;
      try {
        // Front Matter 추출 - 간단한 정규식 방식
        const frontMatterMatch = content.match(/---\n([\s\S]*?)\n---/);
        if (!frontMatterMatch) {
          throw new Error('Front Matter를 찾을 수 없습니다.');
        }

        const frontMatter = frontMatterMatch[1];
        const frontMatterLines = frontMatter.split('\n');

        metadata = frontMatterLines.reduce<PostMetadata>(
          (acc, line) => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim();

              // 태그 파싱 (배열)
              if (key.trim() === 'tags') {
                try {
                  acc.tags = JSON.parse(value);
                } catch {
                  // 배열 형식이 아닌 경우 쉼표로 구분된 문자열로 처리
                  acc.tags = value
                    .replace(/[\[\]]/g, '')
                    .split(',')
                    .map((tag) => tag.trim());
                }
              }
              // 불리언 값 파싱
              else if (key.trim() === 'published') {
                acc.published = value.toLowerCase() === 'true';
              }
              // 다른 메타데이터 필드 처리
              else if (key.trim() === 'title') {
                acc.title = value;
              } else if (key.trim() === 'description') {
                acc.description = value;
              }
              // 기타 메타데이터 필드
              else if (key.trim()) {
                acc[key.trim()] = value;
              }
            }
            return acc;
          },
          { title: '', description: '', tags: [], published: false }
        );
      } catch (err) {
        console.error('Front Matter 파싱 오류:', err);
        throw new Error('Front Matter 파싱에 실패했습니다. 형식을 확인하세요.');
      }

      // 메타데이터 유효성 검사
      try {
        validateMdxMetadata(metadata);
      } catch (err) {
        throw new Error(
          `메타데이터 유효성 검사 실패: ${(err as Error).message}`
        );
      }

      // published 값 변경 처리
      if (publishChange) {
        // Front Matter의 published 값 업데이트
        const newContent = content.replace(
          /published:\s*(true|false)/,
          `published: ${!isPublished}`
        );
        setContent(newContent);
        setIsPublished(!isPublished);
        metadata.published = !isPublished;
      }

      // Supabase에 저장할 데이터 준비
      const now = new Date().toISOString();
      const slug =
        post?.slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9가-힣]+/g, '-')
          .replace(/^-+|-+$/g, '');

      const postData = {
        title: metadata.title,
        description: metadata.description,
        content,
        slug,
        tags: metadata.tags,
        is_published: metadata.published,
        author_id: '1', // 기본 작성자 ID
        updated_at: now,
        ...(isEdit ? {} : { published_at: now }),
      };

      // 저장 처리
      if (isEdit && post?.id) {
        await updatePost(post.id, postData);
      } else {
        await createPost(postData as Omit<BlogPost, 'id'>);
      }

      // 성공 후 목록 페이지로 이동
      router.push('/admin/posts');
    } catch (err) {
      console.error('저장 오류:', err);
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="글 제목을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            내용 (MDX)
          </label>
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {previewMode ? '편집 모드' : '미리보기'}
          </button>
        </div>

        {previewMode ? (
          <div className="border border-gray-300 rounded-md p-4 min-h-[400px] prose max-w-none">
            {/* 미리보기 - 실제 구현에서는 MDX 컴파일 및 렌더링 추가 */}
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            id="content"
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm min-h-[400px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <div>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className={`mr-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSaving}
          >
            {isPublished ? '비공개로 변경' : '공개하기'}
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className={`px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push('/admin/posts')}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          취소
        </button>
      </div>
    </div>
  );
}
