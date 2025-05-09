'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import '@mdxeditor/editor/style.css';
import { uploadImage } from '../../../lib/supabase';

// 코드 블록 언어 옵션
const CODE_BLOCK_LANGUAGES = {
  javascript: '자바스크립트',
  typescript: '타입스크립트',
  jsx: 'JSX',
  tsx: 'TSX',
  html: 'HTML',
  css: 'CSS',
};

// 최대 이미지 크기 제한 (5MB)
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

interface MdxEditorProps {
  initialContent: string;
  onChange: (value: string) => void;
}

export default function MdxEditor({
  initialContent,
  onChange,
}: MdxEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialContent);
  const [highlightedText, setHighlightedText] = useState('');
  const [imageError, setImageError] = useState<string | null>(null);

  // 마크다운 에디터에 텍스트 삽입 함수
  const insertMarkdown = useCallback(
    (markdown: string) => {
      if (editorRef.current) {
        const textarea = editorRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        // 선택된 텍스트가 있는지 확인
        const selectedText = text.substring(start, end);

        // 새 텍스트 생성 (선택 영역 대체)
        let newText = text;
        let newCursorPos = start;

        if (selectedText) {
          // 헤딩 태그 처리
          if (markdown.startsWith('#')) {
            // 제목 태그인 경우 라인 시작에 추가
            const lineStart = text.lastIndexOf('\n', start) + 1;
            const prefixText = text.substring(0, lineStart);
            const lineText = text.substring(lineStart, end);
            const suffixText = text.substring(end);

            newText = `${prefixText}${markdown} ${lineText}${suffixText}`;
            newCursorPos = lineStart + markdown.length + 1 + lineText.length;
          }
          // 코드 블록 처리
          else if (markdown === '```\n```') {
            newText = `${text.substring(
              0,
              start
            )}${'```\n'}${selectedText}${'\n```'}${text.substring(end)}`;
            newCursorPos = start + 4 + selectedText.length;
          }
          // 인라인 서식 처리 (굵게, 기울게, 취소선, 인라인 코드)
          else if (
            markdown === '**굵게**' ||
            markdown === '*기울게*' ||
            markdown === '~~취소선~~' ||
            markdown === '`코드`'
          ) {
            // 앞뒤 문자 추출 (예: **TEXT**)
            const prefix = markdown.match(/^(\*\*|\*|~~|`)/)?.[0] || '';
            const suffix = markdown.match(/(\*\*|\*|~~|`)$/)?.[0] || '';

            newText = `${text.substring(
              0,
              start
            )}${prefix}${selectedText}${suffix}${text.substring(end)}`;
            newCursorPos =
              start + prefix.length + selectedText.length + suffix.length;
          }
          // 그 외 일반 삽입
          else {
            newText = text.substring(0, start) + markdown + text.substring(end);
            newCursorPos = start + markdown.length;
          }
        } else {
          // 선택된 텍스트가 없는 경우
          if (markdown === '```\n```') {
            // 코드 블록 삽입 시 커서를 중간에 위치
            newText = `${text.substring(0, start)}${'```\n```'}${text.substring(
              end
            )}`;
            newCursorPos = start + 4; // ```\n 다음에 커서 위치
          }
          // 인라인 서식 처리 (굵게, 기울게, 취소선, 인라인 코드)
          else if (
            markdown === '**굵게**' ||
            markdown === '*기울게*' ||
            markdown === '~~취소선~~' ||
            markdown === '`코드`'
          ) {
            // 앞뒤 문자 추출 (예: **TEXT**)
            const prefix = markdown.match(/^(\*\*|\*|~~|`)/)?.[0] || '';
            const suffix = markdown.match(/(\*\*|\*|~~|`)$/)?.[0] || '';
            const placeholder = markdown
              .replace(/^(\*\*|\*|~~|`)/, '')
              .replace(/(\*\*|\*|~~|`)$/, '');

            newText = `${text.substring(
              0,
              start
            )}${prefix}${suffix}${text.substring(end)}`;
            newCursorPos = start + prefix.length; // 커서를 prefix와 suffix 사이에 위치
          }
          // 링크 처리
          else if (markdown === '[링크제목](링크주소)') {
            newText = `${text.substring(0, start)}[](링크주소)${text.substring(
              end
            )}`;
            newCursorPos = start + 1; // 커서를 [] 안에 위치
          } else {
            newText = `${text.substring(0, start)}${markdown}${text.substring(
              end
            )}`;
            newCursorPos = start + markdown.length;
          }
        }

        // 새 텍스트 설정 및 이벤트 발생
        const updatedContent = newText;
        setContent(updatedContent);
        onChange(updatedContent); // 외부 onChange 호출

        // 구문 강조된 텍스트 업데이트
        updateHighlightedText(updatedContent);

        // 커서 위치 조정
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    },
    [onChange]
  );

  // 이미지 압축 및 업로드 처리 함수
  const processAndUploadImage = useCallback(
    async (file: File, dataUrl: string) => {
      // 이미지 압축
      compressImage(dataUrl, file.name, async (compressedImage) => {
        try {
          setImageError('이미지 업로드 중...');

          // 압축된 이미지 데이터를 Blob으로 변환
          const base64Data = compressedImage.split(',')[1];
          const blob = await fetch(
            `data:${file.type};base64,${base64Data}`
          ).then((res) => res.blob());

          // 서버 API를 통해 이미지 업로드
          const formData = new FormData();
          formData.append('file', blob, file.name);

          const response = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
            credentials: 'include', // 쿠키를 포함시킴
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '이미지 업로드에 실패했습니다.');
          }

          const result = await response.json();

          // 마크다운에 이미지 삽입
          insertMarkdown(`![${file.name}](${result.url})`);
          setImageError(null);
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          setImageError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
      });
    },
    [insertMarkdown]
  );

  // 이미지 파일 처리 함수
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith('image/')) {
        setImageError('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 제한 확인
      if (file.size > MAX_IMAGE_SIZE) {
        setImageError(`이미지 크기는 ${MAX_IMAGE_SIZE_MB}MB 이하여야 합니다.`);
        return;
      }

      setImageError(null);

      // 이미지 처리 및 업로드
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          processAndUploadImage(file, result);
        }
      };
      reader.readAsDataURL(file);

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [processAndUploadImage]
  );

  // 이미지 압축 함수
  const compressImage = (
    dataUrl: string,
    fileName: string,
    callback: (compressedDataUrl: string) => void
  ) => {
    const img = new Image();
    img.onload = () => {
      // 적정 크기로 리사이징 (너무 큰 이미지 방지)
      const maxWidth = 800;
      const maxHeight = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = (height / width) * maxWidth;
          width = maxWidth;
        } else {
          width = (width / height) * maxHeight;
          height = maxHeight;
        }
      }

      // 캔버스에 이미지 그리기
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);

        // 압축된 이미지 생성 (품질 0.5로 낮춤)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
        callback(compressedDataUrl);
      } else {
        // 압축 실패 시 원본 반환
        callback(dataUrl);
      }
    };

    img.src = dataUrl;
  };

  // 이미지 버튼 클릭 핸들러
  const handleImageButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // 붙여넣기 이벤트 핸들러
  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      let hasImage = false;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          hasImage = true;
          const file = items[i].getAsFile();
          if (!file) continue;

          // 파일 크기 제한 확인
          if (file.size > MAX_IMAGE_SIZE) {
            setImageError(
              `이미지 크기는 ${MAX_IMAGE_SIZE_MB}MB 이하여야 합니다.`
            );
            event.preventDefault();
            return;
          }

          setImageError(null);
          event.preventDefault();

          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
              // 이미지 처리 및 업로드
              processAndUploadImage(file, result);
            }
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    },
    [processAndUploadImage]
  );

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const items = event.dataTransfer?.items;
      if (!items) return;

      let hasImage = false;

      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && items[i].type.indexOf('image') !== -1) {
          hasImage = true;
          const file = items[i].getAsFile();
          if (!file) continue;

          // 파일 크기 제한 확인
          if (file.size > MAX_IMAGE_SIZE) {
            setImageError(
              `이미지 크기는 ${MAX_IMAGE_SIZE_MB}MB 이하여야 합니다.`
            );
            return;
          }

          setImageError(null);

          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
              // 이미지 처리 및 업로드
              processAndUploadImage(file, result);
            }
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    },
    [processAndUploadImage]
  );

  // 드래그 오버 이벤트 핸들러
  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    if (containerRef.current) {
      containerRef.current.classList.add('drag-over');
    }
  }, []);

  // 드래그 리브 이벤트 핸들러
  const handleDragLeave = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.classList.remove('drag-over');
    }
  }, []);

  // 키보드 단축키 핸들러
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ctrl/Cmd + B: 굵게
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        insertMarkdown('**굵게**');
      }
      // Ctrl/Cmd + I: 기울게
      else if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
        event.preventDefault();
        insertMarkdown('*기울게*');
      }
      // Ctrl/Cmd + K: 링크
      else if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        insertMarkdown('[링크제목](링크주소)');
      }
      // Ctrl/Cmd + Shift + K: 코드 블록
      else if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'K'
      ) {
        event.preventDefault();
        insertMarkdown('```\n```');
      }
      // Ctrl/Cmd + Alt + 1~4: 헤딩 1~4
      else if ((event.ctrlKey || event.metaKey) && event.altKey) {
        if (event.key === '1') {
          event.preventDefault();
          insertMarkdown('#');
        } else if (event.key === '2') {
          event.preventDefault();
          insertMarkdown('##');
        } else if (event.key === '3') {
          event.preventDefault();
          insertMarkdown('###');
        } else if (event.key === '4') {
          event.preventDefault();
          insertMarkdown('####');
        }
      }
    },
    [insertMarkdown]
  );

  // 컨텐츠가 변경될 때마다 부모 컴포넌트에 알림
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);
      onChange(newContent);

      // 구문 강조된 텍스트 업데이트
      updateHighlightedText(newContent);
    },
    [onChange]
  );

  // 마크다운 구문 강조 처리
  const updateHighlightedText = useCallback((text: string) => {
    const lines = text.split('\n');
    const processedLines = lines.map((line) => {
      // 헤딩 (H1-H4) 처리
      if (line.match(/^# /)) {
        return `<div class="md-heading-1">${line}</div>`;
      }
      if (line.match(/^## /)) {
        return `<div class="md-heading-2">${line}</div>`;
      }
      if (line.match(/^### /)) {
        return `<div class="md-heading-3">${line}</div>`;
      }
      if (line.match(/^#### /)) {
        return `<div class="md-heading-4">${line}</div>`;
      }

      // 기타 마크다운 구문 처리 (굵게, 기울게 등)
      const processedLine = line
        .replace(/\*\*([^*]+)\*\*/g, '<span class="md-bold">**$1**</span>')
        .replace(/\*([^*]+)\*/g, '<span class="md-italic">*$1*</span>')
        .replace(/~~([^~]+)~~/g, '<span class="md-strikethrough">~~$1~~</span>')
        .replace(/`([^`]+)`/g, '<span class="md-code">`$1`</span>')
        .replace(/^> (.+)$/g, '<span class="md-quote">> $1</span>')
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<span class="md-link">[$1]($2)</span>'
        )
        .replace(
          /!\[([^\]]+)\]\(([^)]+)\)/g,
          '<span class="md-image">![$1]($2)</span>'
        );

      return processedLine;
    });

    setHighlightedText(processedLines.join('\n'));
  }, []);

  // 에디터 초기화 및 이벤트 리스너 설정
  useEffect(() => {
    const editor = editorRef.current;
    const container = containerRef.current;
    if (!editor || !container) return;

    // 붙여넣기 이벤트 리스너
    editor.addEventListener('paste', handlePaste as EventListener);

    // 드래그 앤 드롭 이벤트 리스너
    container.addEventListener('dragover', handleDragOver as EventListener);
    container.addEventListener('dragleave', handleDragLeave as EventListener);
    container.addEventListener('drop', handleDrop as EventListener);

    // 키보드 단축키 이벤트 리스너
    editor.addEventListener('keydown', handleKeyDown as EventListener);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      editor.removeEventListener('paste', handlePaste as EventListener);
      container.removeEventListener(
        'dragover',
        handleDragOver as EventListener
      );
      container.removeEventListener(
        'dragleave',
        handleDragLeave as EventListener
      );
      container.removeEventListener('drop', handleDrop as EventListener);
      editor.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [handlePaste, handleDrop, handleKeyDown, handleDragOver, handleDragLeave]);

  // 컴포넌트가 마운트될 때 initialContent로 동기화
  useEffect(() => {
    setContent(initialContent);
    updateHighlightedText(initialContent);
  }, [initialContent, updateHighlightedText]);

  // 코드 블록 언어 옵션 렌더링 함수
  const renderCodeLanguageOptions = () => {
    return Object.entries(CODE_BLOCK_LANGUAGES).map(([value, label]) => (
      <option key={value} value={value}>
        {label}
      </option>
    ));
  };

  // CustomToolbar 컴포넌트 수정 - 배경 및 그림자 제거, 아이콘 색상 변경
  const CustomToolbar = () => (
    <div className="flex items-center py-2 overflow-x-auto">
      {/* 헤딩 */}
      <ToolbarGroup>
        <button
          type="button"
          onClick={() => insertMarkdown('# ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="제목 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('## ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="제목 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('### ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="제목 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('#### ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="제목 4"
        >
          H4
        </button>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* 서식 */}
      <ToolbarGroup>
        <button
          type="button"
          onClick={() => insertMarkdown('**굵게**')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="굵게"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('*기울게*')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="기울게"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('~~취소선~~')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="취소선"
        >
          <span className="line-through">S</span>
        </button>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* 코드 */}
      <ToolbarGroup>
        <button
          type="button"
          onClick={() => insertMarkdown('`코드`')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="인라인 코드"
        >
          <code>{'<>'}</code>
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('```\n```')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="코드 블록"
        >
          <code>{'{}}'}</code>
        </button>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* 링크 및 이미지 */}
      <ToolbarGroup>
        <button
          type="button"
          onClick={() => insertMarkdown('[링크제목](링크주소)')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="링크"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={handleImageButtonClick}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="이미지"
        >
          🖼️
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* 인용 및 구분선 */}
      <ToolbarGroup>
        <button
          type="button"
          onClick={() => insertMarkdown('> ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="인용"
        >
          💬
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('\n---\n')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="구분선"
        >
          ―
        </button>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* 목록 */}
      <ToolbarGroup>
        <button
          type="button"
          onClick={() => insertMarkdown('- ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="글머리 기호"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('1. ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="번호 매기기"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('- [ ] ')}
          className="p-1 mx-1 rounded hover:bg-gray-100 text-gray-500 hover:text-black"
          title="체크박스"
        >
          ☐
        </button>
      </ToolbarGroup>
    </div>
  );

  // 구분선 컴포넌트 (그림자 제거)
  const ToolbarDivider = () => (
    <div className="h-4 mx-2 border-r border-gray-200" />
  );

  // 툴바 그룹
  const ToolbarGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center">{children}</div>
  );

  return (
    <div ref={containerRef} className="mdx-editor-wrapper flex flex-col h-full">
      <div className="mdx-editor-toolbar sticky top-0 z-10 bg-white border-b border-gray-100">
        <CustomToolbar />
        {imageError && (
          <div className="px-4 py-1 text-sm text-red-600 bg-red-50">
            {imageError}
          </div>
        )}
      </div>
      <div className="relative flex-1 h-0 overflow-auto">
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          className="w-full h-full min-h-0 px-6 py-6 font-mono text-sm resize-none focus:outline-none border-none"
          placeholder="마크다운으로 글을 작성하세요..."
          spellCheck="false"
          data-gramm="false"
        />
        {/* 텍스트 중복 방지를 위해 오버레이 제거 */}
      </div>
    </div>
  );
}

// 스타일 커스터마이징을 위한 CSS 변수 설정
// apps/blog/app/globals.css에 추가할 수 있는 변수들
/*
:root {
  --mdxeditor-bg: white;
  --mdxeditor-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --mdxeditor-font-size: 1rem;
  --mdxeditor-color: #1a202c;
  --mdxeditor-toolbar-bg: #f8fafc;
  --mdxeditor-border-color: #e2e8f0;
}
*/
