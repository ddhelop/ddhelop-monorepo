import type {
  LinkTextItem,
  TroubleshootImage,
  TroubleshootItem,
} from '../../../types/projectType';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Fragment, type ReactNode } from 'react';
import useFormattedText from '@ddhelop/hooks/useFormattedText';

// 텍스트 내 링크 범위 정의 타입
interface TextLinkRange {
  text: string;
  url: string;
}

interface TroubleshootingSectionProps {
  troubleshootItems: Record<
    string,
    | TroubleshootItem
    | {
        id: string;
        title: string;
        problem: Array<{ id: string; text: string }> | string;
        solution: string[] | string;
        results: string[] | string;
        highlights?: string[];
        highlight?: string[];
        image?: TroubleshootImage;
        link?: {
          url: string;
          text: string;
        };
        term_links?: {
          [term: string]: string;
        };
        section_links?: {
          problem?: string;
          solution?: string;
          results?: string;
        };
        section_link_ranges?: {
          problem?: TextLinkRange[];
          solution?: TextLinkRange[];
          results?: TextLinkRange[];
        };
        linkText?: LinkTextItem[];
        relatedLinks?: {
          url: string;
          title: string;
        }[];
      }
  >;
}

/**
 * 텍스트 내 특정 부분에 링크를 추가하는 함수
 * @param text 원본 텍스트
 * @param linkRanges 링크를 추가할 텍스트 범위와 URL
 * @returns 링크가 포함된 React 노드
 */
const addLinksToText = (
  textNode: string,
  linkRanges?: TextLinkRange[] | LinkTextItem[]
): ReactNode => {
  if (!linkRanges || linkRanges.length === 0) {
    return textNode;
  }

  const text = textNode;
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  // 텍스트에서 링크 범위를 찾아 링크 추가
  for (const linkRange of linkRanges) {
    const index = text.indexOf(linkRange.text, lastIndex);
    if (index === -1) continue;

    // 링크 앞 부분 추가
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }

    // 링크 부분 추가
    parts.push(
      <a
        key={`link-${index}`}
        href={linkRange.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground border-b border-dotted border-gray-400 hover:text-main-500 transition-colors"
      >
        {linkRange.text}
      </a>
    );

    lastIndex = index + linkRange.text.length;
  }

  // 남은 텍스트 추가
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
};

/**
 * 하이라이트 처리된 내용에 링크 범위를 적용
 * @param content 하이라이트된 콘텐츠
 * @param linkRanges 링크 범위 배열
 */
const processContentWithLinks = (
  content: ReactNode,
  linkRanges?: TextLinkRange[] | LinkTextItem[]
): ReactNode => {
  if (!linkRanges || linkRanges.length === 0) {
    return content;
  }

  // 문자열이면 링크 처리
  if (typeof content === 'string') {
    return addLinksToText(content, linkRanges);
  }

  // ReactElement 배열이면 각 요소 처리
  if (Array.isArray(content)) {
    return content.map((item, index) => {
      if (typeof item === 'string') {
        return (
          <Fragment key={`fragment-${index}-${item.substring(0, 10)}`}>
            {addLinksToText(item, linkRanges)}
          </Fragment>
        );
      }
      return item;
    });
  }

  return content;
};

/**
 * 트러블슈팅 섹션 컴포넌트
 * 각 문제 해결 과정에 이미지를 선택적으로 포함 가능
 */
const TroubleshootingSection = ({
  troubleshootItems,
}: TroubleshootingSectionProps) => {
  // 트러블슈팅 아이템 키들을 배열로 변환
  const itemKeys = Object.keys(troubleshootItems);
  const { formatText } = useFormattedText();

  return (
    <div className="space-y-8">
      <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
        <span className="h-2 w-2 rounded-full bg-main-500" />
        트러블 슈팅
      </h4>

      {itemKeys.map((key, index) => {
        const item = troubleshootItems[key];
        // Get highlights from either property name (handle both formats)
        const highlightTerms =
          'highlights' in item && Array.isArray(item.highlights)
            ? item.highlights
            : 'highlight' in item && Array.isArray(item.highlight)
            ? item.highlight
            : [];

        // Get term links if available
        const termLinks = 'term_links' in item ? item.term_links : undefined;

        // Get section links if available
        const sectionLinks =
          'section_links' in item ? item.section_links : undefined;

        // Get section link ranges if available
        const sectionLinkRanges =
          'section_link_ranges' in item ? item.section_link_ranges : undefined;

        // Get linkText if available
        const linkTextItems = 'linkText' in item ? item.linkText : undefined;

        return (
          <div
            key={key}
            className={`space-y-3 pl-0 sm:pl-2 pb-5 ${
              index < itemKeys.length - 1 ? 'border-b border-gray-100/50' : ''
            }`}
          >
            <h5 className="text-base font-bold text-main/90">
              {index + 1}. {item.title}
            </h5>

            {/* 이미지가 있는 경우 표시 */}
            {item.image && (
              <div className="my-3 relative overflow-hidden rounded-md">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="object-contain max-w-full"
                />
              </div>
            )}

            <div className="mt-2">
              <h6 className="text-sm font-medium bg-main/5 inline-block px-2 py-0.5 rounded-md mb-1.5">
                문제점
              </h6>
              <div className="text-sm text-muted-foreground pl-1 sm:pl-2">
                {typeof item.problem === 'string' ? (
                  'section_links' in item && item.section_links?.problem ? (
                    <a
                      href={item.section_links.problem}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline decoration-dotted decoration-1 underline-offset-2"
                    >
                      <p>{formatText(item.problem)}</p>
                    </a>
                  ) : (
                    <p>{formatText(item.problem)}</p>
                  )
                ) : (
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1.5">
                    {Array.isArray(item.problem) && item.problem.length > 0
                      ? item.problem.map((prob) => (
                          <li
                            key={
                              typeof prob === 'object' && 'id' in prob
                                ? prob.id
                                : Math.random().toString()
                            }
                          >
                            {'section_links' in item &&
                            item.section_links?.problem ? (
                              <a
                                href={item.section_links.problem}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline decoration-dotted decoration-1 underline-offset-2"
                              >
                                {formatText(
                                  typeof prob === 'object' && 'text' in prob
                                    ? prob.text
                                    : String(prob)
                                )}
                              </a>
                            ) : (
                              formatText(
                                typeof prob === 'object' && 'text' in prob
                                  ? prob.text
                                  : String(prob)
                              )
                            )}
                          </li>
                        ))
                      : null}
                  </ul>
                )}
              </div>
            </div>

            {/* 해결 방법 섹션: 배열이 있고 비어있지 않을 때만 표시 */}
            {(!Array.isArray(item.solution) ||
              (Array.isArray(item.solution) && item.solution.length > 0)) && (
              <div className="mt-3">
                <h6 className="text-sm font-medium bg-main/5 inline-block px-2 py-0.5 rounded-md mb-1.5">
                  해결 방법
                </h6>
                <div className="text-sm text-muted-foreground pl-1 sm:pl-2">
                  {Array.isArray(item.solution) ? (
                    <ul className="list-disc pl-4 sm:pl-6 space-y-1.5">
                      {item.solution.map((sol, solIndex) => (
                        <li
                          key={`solution-${key}-${solIndex}-${sol
                            .substring(0, 15)
                            .replace(/[^a-zA-Z0-9]/g, '')}`}
                        >
                          {formatText(sol)}
                        </li>
                      ))}
                    </ul>
                  ) : 'section_links' in item &&
                    item.section_links?.solution ? (
                    <a
                      href={item.section_links.solution}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline decoration-dotted decoration-1 underline-offset-2"
                    >
                      <p>
                        {processContentWithLinks(
                          formatText(item.solution),
                          sectionLinkRanges?.solution
                        )}
                      </p>
                    </a>
                  ) : (
                    <p>
                      {processContentWithLinks(
                        formatText(item.solution),
                        sectionLinkRanges?.solution || linkTextItems
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 성과 섹션: 배열이 있고 비어있지 않을 때만 표시 */}
            {(!Array.isArray(item.results) ||
              (Array.isArray(item.results) && item.results.length > 0)) && (
              <div className="mt-3">
                <h6 className="text-sm font-medium bg-green-50 text-green-800 inline-block px-2 py-0.5 rounded-md mb-1.5">
                  성과
                </h6>
                <div className="text-sm text-muted-foreground pl-1 sm:pl-2">
                  {Array.isArray(item.results) ? (
                    <ul className="list-disc pl-4 sm:pl-6 space-y-1.5">
                      {item.results.map((result, resultIndex) => (
                        <li
                          key={`result-${key}-${resultIndex}-${result
                            .substring(0, 15)
                            .replace(/[^a-zA-Z0-9]/g, '')}`}
                        >
                          {formatText(result)}
                        </li>
                      ))}
                    </ul>
                  ) : 'section_links' in item && item.section_links?.results ? (
                    <a
                      href={item.section_links.results}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline decoration-dotted decoration-1 underline-offset-2"
                    >
                      <p>
                        {processContentWithLinks(
                          formatText(item.results),
                          sectionLinkRanges?.results
                        )}
                      </p>
                    </a>
                  ) : (
                    <p>
                      {processContentWithLinks(
                        formatText(item.results),
                        sectionLinkRanges?.results
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 관련 링크 섹션 */}
            {'relatedLinks' in item &&
              item.relatedLinks &&
              item.relatedLinks.length > 0 && (
                <div className="mt-4">
                  <h6 className="text-sm font-medium bg-blue-50 text-blue-700 inline-block px-2 py-0.5 rounded-md mb-1.5">
                    관련 링크
                  </h6>
                  <div className="text-sm pl-1 sm:pl-2">
                    <ul className="space-y-1.5">
                      {item.relatedLinks.map((link, linkIndex) => (
                        <li
                          key={`related-link-${key}-${link.url}`}
                          className="flex items-center"
                        >
                          <span className="text-blue-500 mr-1">•</span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                          >
                            {link.title}
                            <ExternalLink
                              size={12}
                              className="ml-1 inline-block"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            {item.link && (
              <div className="mt-2">
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm inline-flex items-center gap-1 text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  <span>{item.link.text}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TroubleshootingSection;
