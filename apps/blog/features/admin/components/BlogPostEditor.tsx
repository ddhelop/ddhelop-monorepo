'use client';

import { useState, useEffect, type KeyboardEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '../../../lib/supabase';
import type { BlogPost } from '../../../lib/supabase';
import { MdxRemote } from '@repo/mdx';
import MdxEditor from './MdxEditor';
import type { Metadata } from './MetadataEditor';
import './markdown-editor.css';

// MDX 템플릿 - 순수 컨텐츠만 포함
const MDX_TEMPLATE = `
# 제목

여기에 블로그 글 내용을 작성하세요. **Markdown** 및 *MDX* 문법을 지원합니다.
`;

interface BlogPostEditorProps {
  post?: Partial<BlogPost>;
  isEdit?: boolean;
}

export default function BlogPostEditor({
  post,
  isEdit = false,
}: BlogPostEditorProps) {
  // MDX 컨텐츠 (Front Matter 제외)
  const [content, setContent] = useState<string>(
    extractContent(post?.content) || MDX_TEMPLATE
  );

  // 메타데이터
  const [metadata, setMetadata] = useState<Metadata>({
    title: post?.title || '',
    description: post?.title || '', // 설명 필드를 제목과 동일하게 기본 설정
    tags: post?.tags || [],
    published: post?.is_published || false,
  });

  // 태그 입력
  const [tagInput, setTagInput] = useState<string>('');
  const [isProcessingTag, setIsProcessingTag] = useState(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 미리보기 스크롤 동기화를 위한 참조
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const router = useRouter();

  // 화면 크기에 따라 미리보기 표시 여부 결정
  useEffect(() => {
    const handleResize = () => {
      setIsPreviewVisible(window.innerWidth > 768);
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 에디터 스크롤 시 미리보기 스크롤 동기화
  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (!editor || !preview) return;

    const handleScroll = () => {
      const editorScrollPercent =
        editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      const previewScrollTarget =
        (preview.scrollHeight - preview.clientHeight) * editorScrollPercent;

      // 부드러운 스크롤 적용
      preview.scrollTo({
        top: previewScrollTarget,
        behavior: 'auto',
      });
    };

    editor.addEventListener('scroll', handleScroll);

    return () => {
      editor.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Front Matter에서 순수 컨텐츠만 추출하는 함수
  function extractContent(mdxContent?: string): string {
    if (!mdxContent) return '';

    // Front Matter 제거
    const contentWithoutFrontMatter = mdxContent.replace(
      /^---\n[\s\S]*?\n---\n/,
      ''
    );
    return contentWithoutFrontMatter;
  }

  // 태그 추가 함수 - 중복 실행 방지
  const addTag = () => {
    // 이미 처리 중이면 무시
    if (isProcessingTag) return;

    // 처리 플래그 설정
    setIsProcessingTag(true);

    const value = tagInput.trim();

    // 값이 비어있거나 이미 존재하는 태그인 경우 무시
    if (value && !metadata.tags.includes(value)) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, value],
      }));
    }

    // 입력창 초기화 - 즉시 처리
    setTagInput('');

    // 처리 완료 표시 (비동기 실행을 위해 짧은 시간 대기)
    setTimeout(() => {
      setIsProcessingTag(false);
    }, 10);
  };

  // 태그 삭제 함수
  const removeTag = (tagToRemove: string) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // 태그 입력 처리
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // 이미지 경로를 상대 경로로 변환
  const processImagePaths = (mdxContent: string): string => {
    // data URL을 상대 경로로 변환 (실제로는 업로드 기능이 필요함)
    // 여기서는 임시로 placeholder로 대체
    return mdxContent.replace(
      /!\[(.*?)\]\(data:image\/[^)]+\)/g,
      '![$1](/images/placeholder.jpg)'
    );
  };

  // 미리보기용 컨텐츠 생성 - 작성자 정보 없이
  function generatePreviewContent(): string {
    // 제목을 첫 번째 헤딩으로 추가
    const title = metadata.title.trim() ? `# ${metadata.title}\n\n` : '';

    // 이미지 경로 처리
    const processedContent = processImagePaths(content);

    // 컨텐츠 반환 (제목 포함)
    return title + processedContent;
  }

  // 메타데이터와 컨텐츠를 합쳐서 완전한 MDX 문서로 만드는 함수 (저장용)
  function generateFullMdx(): string {
    // 제목이 없으면 첫 번째 헤딩을 찾아서 제목으로 사용
    if (!metadata.title.trim()) {
      const headingMatch = content.match(/^#\s+(.+)$/m);
      if (headingMatch) {
        setMetadata({
          ...metadata,
          title: headingMatch[1],
          description: headingMatch[1],
        });
      }
    }

    // 이미지 경로 처리
    const processedContent = processImagePaths(content);

    // Front Matter 생성 - 작성자 정보 제거
    const frontMatter = `---
title: ${metadata.title}
description: ${metadata.title}
tags: ${JSON.stringify(metadata.tags)}
published: ${metadata.published}
---

`;

    // 완전한 MDX 문서 반환
    return frontMatter + processedContent;
  }

  // 임시 저장 처리 함수
  const handleSave = async (publishChange = false) => {
    try {
      setIsSaving(true);
      setError(null);

      // 유효성 검사
      if (!metadata.title.trim()) {
        throw new Error('제목을 입력해주세요.');
      }

      // 공개 상태 변경 처리
      if (publishChange) {
        setMetadata((prev) => ({ ...prev, published: !prev.published }));
      }

      // Supabase에 저장할 데이터 준비
      const now = new Date().toISOString();
      const slug =
        post?.slug ||
        metadata.title
          .toLowerCase()
          .replace(/[^a-z0-9가-힣]+/g, '-')
          .replace(/^-+|-+$/g, '');

      const postData = {
        title: metadata.title,
        description: metadata.title, // 설명을 제목과 동일하게 설정
        content: generateFullMdx(),
        slug,
        tags: metadata.tags,
        is_published: publishChange ? !metadata.published : metadata.published,
        author_id: post?.author_id || '1', // 기존 작성자 유지, 없으면 기본값
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

  // 미리보기 토글 함수
  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <div className="flex flex-col h-screen writing-container">
      {/* 메인 컨텐츠 영역: 에디터(왼쪽) + 미리보기(오른쪽) */}
      <div className="editor-preview-container">
        {/* 왼쪽 영역: 에디터 */}
        <div
          className={`editor-container ${!isPreviewVisible ? 'w-full' : ''}`}
          ref={editorRef}
        >
          {/* 제목 입력 영역 */}
          <div className="px-6 pt-6 pb-4">
            <input
              type="text"
              value={metadata.title}
              onChange={(e) =>
                setMetadata({ ...metadata, title: e.target.value })
              }
              placeholder="제목을 입력하세요"
              className="w-full text-3xl font-bold pb-2 outline-none no-border"
            />
          </div>

          {/* 태그 영역 */}
          <div className="px-6 mb-4">
            <div className="flex items-center mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="태그 입력 후 엔터"
                className="w-full px-2 py-1 text-sm outline-none no-border border-b border-gray-200 focus:border-gray-400 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <button
                  key={`tag-${tag}`}
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="px-2 py-1 bg-gray-100 text-sm rounded-md flex items-center hover:bg-gray-200 transition-colors"
                >
                  {tag}
                  <span className="ml-1 text-gray-500 hover:text-gray-700">
                    ×
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* MDX 에디터 */}
          <div className="flex-1 overflow-hidden">
            <MdxEditor initialContent={content} onChange={setContent} />
          </div>

          {/* 모바일에서 미리보기 토글 버튼 */}
          <button
            type="button"
            onClick={togglePreview}
            className="md:hidden fixed bottom-20 right-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg"
          >
            {isPreviewVisible ? '에디터만' : '미리보기'}
          </button>

          {/* 하단 고정 툴바 - 왼쪽 영역 내에 위치 */}
          <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-white">
            <div>
              <button
                type="button"
                onClick={() => router.push('/admin/posts')}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                나가기
              </button>
            </div>

            {error && (
              <div className="mx-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleSave()}
                className={`px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSaving}
              >
                임시저장
              </button>

              <button
                type="button"
                onClick={() => handleSave(true)}
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSaving}
              >
                {metadata.published ? '비공개로 저장' : '출간하기'}
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역: 미리보기 */}
        {isPreviewVisible && (
          <div
            className="w-1/2 bg-white preview-container p-6"
            ref={previewRef}
          >
            <div className="prose max-w-none">
              {/* 미리보기에 제목과 컨텐츠 표시 */}
              <MdxRemote source={generatePreviewContent()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
