'use client';

import React, { useEffect, useState } from 'react';
import { MDXRemote as ClientMDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import { MdxComponents } from './MdxComponents';
import { PostMeta } from './PostMeta';

interface MdxRemoteProps {
  source: string;
}

// 노드 타입 정의
interface NodeType {
  children: { type: string; value: string }[];
  properties?: {
    className: string[];
  };
}

// MDX 메타데이터 타입 정의
interface MDXMetadata {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  published?: boolean;
  readingTime?: string;
  author?: string;
  [key: string]: unknown;
}

// MDX 직렬화 결과 타입
interface MDXSerializeResult {
  compiledSource: string;
  frontmatter: Record<string, unknown>;
  scope: Record<string, unknown>;
}

export const MdxRemote = ({ source }: MdxRemoteProps) => {
  const [content, setContent] = useState<MDXSerializeResult | null>(null);
  const [metadata, setMetadata] = useState<MDXMetadata | null>(null);

  useEffect(() => {
    const compileSource = async () => {
      // frontmatter 분리
      const frontMatterMatch = source.match(/^---\n([\s\S]*?)\n---\n/m);
      const extractedMetadata: MDXMetadata = {};
      let processedSource = source;

      if (frontMatterMatch) {
        // frontmatter에서 메타데이터 추출
        const frontMatter = frontMatterMatch[1];
        const frontMatterLines = frontMatter.split('\n');

        for (const line of frontMatterLines) {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // 따옴표 제거
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1);
            } else if (value.startsWith("'") && value.endsWith("'")) {
              value = value.slice(1, -1);
            }

            // 태그 처리
            if (key === 'tags') {
              try {
                // JSON.parse를 통해 안전하게 배열 파싱
                extractedMetadata.tags = JSON.parse(value.replace(/'/g, '"'));
              } catch (e) {
                // 배열 형식이 아닌 경우 fallback - 쉼표로 구분된 문자열로 처리
                extractedMetadata.tags = value
                  .replace(/[\[\]]/g, '')
                  .split(',')
                  .map((tag) => tag.trim());
              }
            }
            // 불리언 값 처리
            else if (key === 'published') {
              extractedMetadata.published = value.toLowerCase() === 'true';
            }
            // 기타 문자열 값
            else {
              extractedMetadata[key] = value;
            }
          }
        }

        // frontmatter 제거한 소스 생성
        processedSource = source.replace(frontMatterMatch[0], '');

        // 본문 내용 줄 배열
        const contentLines = processedSource.split('\n');
        const cleanedLines = [];

        // 제목 및 설명 중복 식별을 위한 플래그
        let foundTitle = false;
        let foundDesc = false;
        let skipNextLine = false;

        // 각 줄 처리
        for (let i = 0; i < contentLines.length; i++) {
          const line = contentLines[i];
          const nextLine =
            i < contentLines.length - 1 ? contentLines[i + 1] : '';
          const trimmedLine = line.trim();

          // 건너뛰기 로직
          if (skipNextLine) {
            skipNextLine = false;
            continue;
          }

          // H1, H2 제목 패턴 확인
          const isH1 = /^#\s+(.+)$/.test(trimmedLine);
          const isH2 = /^##\s+(.+)$/.test(trimmedLine);

          // 제목과 일치 확인
          if (extractedMetadata.title) {
            // H1 제목 처리
            if (isH1) {
              const titleText = trimmedLine.replace(/^#\s+/, '').trim();
              if (titleText === extractedMetadata.title && !foundTitle) {
                foundTitle = true;
                // 다음 라인이 빈 줄이면 그것도 스킵
                if (nextLine.trim() === '') {
                  skipNextLine = true;
                }
                continue;
              }
            }

            // 일반 텍스트 제목 처리
            if (trimmedLine === extractedMetadata.title && !foundTitle) {
              foundTitle = true;
              // 다음 라인이 빈 줄이면 그것도 스킵
              if (nextLine.trim() === '') {
                skipNextLine = true;
              }
              continue;
            }
          }

          // 설명과 일치 확인
          if (extractedMetadata.description && !foundDesc) {
            if (trimmedLine === extractedMetadata.description) {
              foundDesc = true;
              // 다음 라인이 빈 줄이면 그것도 스킵
              if (nextLine.trim() === '') {
                skipNextLine = true;
              }
              continue;
            }
          }

          // 위 조건에 해당하지 않으면 줄 유지
          cleanedLines.push(line);
        }

        // 정제된 내용으로 업데이트
        processedSource = cleanedLines.join('\n');

        setMetadata(extractedMetadata);
      }

      const mdxSource = await serialize(processedSource, {
        mdxOptions: {
          remarkPlugins: [remarkBreaks],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ['subheading-anchor'],
                  ariaLabel: 'Link to section',
                },
              },
            ],
            [
              rehypePrettyCode,
              {
                theme: 'slack-dark',
                onVisitLine(node: NodeType) {
                  if (node.children.length === 0) {
                    node.children = [{ type: 'text', value: ' ' }];
                  }
                },
                onVisitHighlightedLine(node: NodeType) {
                  if (node.properties) {
                    node.properties.className.push('line--highlighted');
                  }
                },
                onVisitHighlightedWord(node: NodeType) {
                  if (node.properties) {
                    node.properties.className = ['word--highlighted'];
                  }
                },
              },
            ],
          ],
        },
      });

      setContent(mdxSource as MDXSerializeResult);
    };

    compileSource();
  }, [source]);

  // 정규식에서 특수문자 이스케이프 처리 함수
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  if (!content) {
    return <div className="animate-pulse">로딩 중...</div>;
  }

  // 메타데이터가 존재하면 컴포넌트에 전달할 수 있도록 scope에 추가
  const contentWithMetadata = {
    ...content,
    scope: {
      ...content.scope,
      metadata,
    },
  };

  return (
    <>
      {metadata?.title && (
        <div>
          <PostMeta
            title={metadata.title}
            description={metadata.description}
            date={metadata.date}
            tags={metadata.tags}
            readingTime={metadata.readingTime as string}
            author={(metadata.author as string) || '김동혁'}
          />
        </div>
      )}
      <ClientMDXRemote {...contentWithMetadata} components={MdxComponents} />
    </>
  );
};
