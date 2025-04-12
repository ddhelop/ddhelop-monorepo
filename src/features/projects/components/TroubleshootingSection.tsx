import SectionHeader from '@/components/ui/SectionHeader';
import { highlightText } from '@/lib/formatting/TextHighlighter';
import type {
  TroubleshootImage,
  TroubleshootItem,
  LinkTextItem,
} from '@/types/projectType';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Fragment, type ReactNode } from 'react';

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
        solution: string;
        results: string;
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="space-y-8"
    >
      <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
        <span className="h-2 w-2 rounded-full bg-main-500" />
        Troubleshooting
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
                  sectionLinks?.problem ? (
                    <a
                      href={sectionLinks.problem}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline decoration-dotted decoration-1 underline-offset-2"
                    >
                      <p>
                        {highlightText(item.problem, highlightTerms, termLinks)}
                      </p>
                    </a>
                  ) : (
                    <p>
                      {sectionLinkRanges?.problem
                        ? processContentWithLinks(
                            highlightText(
                              item.problem,
                              highlightTerms,
                              termLinks
                            ),
                            sectionLinkRanges.problem
                          )
                        : highlightText(
                            item.problem,
                            highlightTerms,
                            termLinks
                          )}
                    </p>
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
                            {sectionLinks?.problem ? (
                              <a
                                href={sectionLinks.problem}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline decoration-dotted decoration-1 underline-offset-2"
                              >
                                {highlightText(
                                  typeof prob === 'object' && 'text' in prob
                                    ? prob.text
                                    : String(prob),
                                  highlightTerms,
                                  termLinks
                                )}
                              </a>
                            ) : sectionLinkRanges?.problem ? (
                              processContentWithLinks(
                                highlightText(
                                  typeof prob === 'object' && 'text' in prob
                                    ? prob.text
                                    : String(prob),
                                  highlightTerms,
                                  termLinks
                                ),
                                sectionLinkRanges.problem
                              )
                            ) : (
                              highlightText(
                                typeof prob === 'object' && 'text' in prob
                                  ? prob.text
                                  : String(prob),
                                highlightTerms,
                                termLinks
                              )
                            )}
                          </li>
                        ))
                      : null}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h6 className="text-sm font-medium bg-main/5 inline-block px-2 py-0.5 rounded-md mb-1.5">
                해결 방법
              </h6>
              {sectionLinks?.solution ? (
                <a
                  href={sectionLinks.solution}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline decoration-dotted decoration-1 underline-offset-2"
                >
                  <p className="text-sm text-muted-foreground pl-1 sm:pl-2 leading-relaxed">
                    {highlightText(item.solution, highlightTerms, termLinks)}
                  </p>
                </a>
              ) : (
                <p className="text-sm text-muted-foreground pl-1 sm:pl-2 leading-relaxed">
                  {linkTextItems && linkTextItems.length > 0
                    ? // 링크 텍스트가 있는 경우, 직접 텍스트 처리
                      addLinksToText(item.solution, linkTextItems)
                    : sectionLinkRanges?.solution
                    ? processContentWithLinks(
                        highlightText(item.solution, highlightTerms, termLinks),
                        sectionLinkRanges.solution
                      )
                    : highlightText(item.solution, highlightTerms, termLinks)}
                </p>
              )}
            </div>

            <div className="mt-3">
              <h6 className="text-sm font-medium bg-main/5 inline-block px-2 py-0.5 rounded-md mb-1.5">
                결과
              </h6>
              {sectionLinks?.results ? (
                <a
                  href={sectionLinks.results}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:underline decoration-dotted decoration-1 underline-offset-2"
                >
                  <p className="text-sm text-muted-foreground pl-1 sm:pl-2">
                    {highlightText(item.results, highlightTerms, termLinks)}
                  </p>
                </a>
              ) : (
                <p className="text-sm text-muted-foreground pl-1 sm:pl-2">
                  {sectionLinkRanges?.results
                    ? processContentWithLinks(
                        highlightText(item.results, highlightTerms, termLinks),
                        sectionLinkRanges.results
                      )
                    : highlightText(item.results, highlightTerms, termLinks)}
                </p>
              )}
            </div>

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
    </motion.div>
  );
};

export default TroubleshootingSection;
