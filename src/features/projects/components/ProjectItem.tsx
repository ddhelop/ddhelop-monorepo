'use client';

import ImageSection from '@/components/ui/ImageSection';
import type { ProjectItemData, TroubleshootItem } from '@/types/projectType';
import TroubleshootingSection from './TroubleshootingSection';
import { useFormattedText } from '@/lib/hooks/useFormattedText';
import InsightSection from './InsightSection';

interface ProjectItemProps {
  data: ProjectItemData;
}

/**
 * 프로젝트 정보를 일관된 방식으로 표시하는 컴포넌트
 * 데이터만 전달하면 자동으로 레이아웃을 구성합니다.
 */
export default function ProjectItem({ data }: ProjectItemProps) {
  const {
    meta,
    theme,
    introduction,
    members,
    contributionAreas,
    techStack,
    techReasons,
    summary,
    troubleshootItems,
    insight,
  } = data;

  const { formatText } = useFormattedText();

  // 기본 테마 및 사용자 지정 테마 설정
  const bgColor = theme?.bgColor || 'bg-white';
  const textColor = theme?.textColor || 'text-foreground';

  return (
    <div
      className={`${bgColor} -mx-6 sm:-mx-8 px-4 py-6 sm:py-8 relative rounded-xl`}
    >
      {/* 프로젝트 헤더 (항상 표시) */}
      <div className="sticky top-2 sm:top-3 z-20 bg-white rounded-lg sm:rounded-xl border border-gray-200/70 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-4 gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {meta.logo && (
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={meta.logo}
                  alt={meta.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <h3 className="font-medium text-sm sm:text-base text-foreground truncate max-w-[180px] sm:max-w-xs">
              {meta.title}
            </h3>
            <span className="text-[10px] sm:text-xs text-muted-foreground bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full">
              {meta.duration}
            </span>
          </div>

          {/* 외부 링크 */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 mt-1 sm:mt-0">
            <div className="flex gap-2">
              {meta.links?.github && (
                <a
                  href={meta.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {meta.links?.website && (
                <a
                  href={meta.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  Website ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 프로젝트 콘텐츠 (항상 표시) */}
      <div className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
        {/* 소개 */}
        <div className="sm:bg-white rounded-lg sm:p-5 sm:border sm:border-gray-200/60">
          <div className="text-muted-foreground text-sm leading-relaxed space-y-3 sm:space-y-4">
            {introduction.description.map((paragraph, index) => (
              <p
                key={`intro-paragraph-${meta.title}-${index}`}
                className="block"
              >
                {formatText(paragraph)}
              </p>
            ))}
          </div>
        </div>

        {/* 소개 이미지 */}
        {introduction.image && <ImageSection image={introduction.image} />}

        {/* 구성원 & 기여도 정보 */}
        <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
          {/* 구성원 */}
          <div>
            <h4 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-1.5 sm:gap-2 pb-1 border-b border-gray-100">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-main-500" />
              구성원
            </h4>
            <p className="text-sm text-muted-foreground pl-1 sm:pl-3 mt-2">
              {formatText(members)}
            </p>
          </div>

          {/* 기여도 */}
          {contributionAreas.length > 0 && (
            <div>
              <h4 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-1.5 sm:gap-2 pb-1 border-b border-gray-100">
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-main-500" />
                기여도
              </h4>
              <div className="space-y-2 sm:space-y-3 pl-1 sm:pl-3 mt-2">
                {contributionAreas.map((contrib) => (
                  <div key={contrib.id}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">
                        {formatText(contrib.area)}
                      </span>
                      <span className="text-sm font-medium text-main">
                        {contrib.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 기술 스택 & 선정 이유 통합 섹션 */}
        {(techStack.length > 0 || techReasons.length > 0) && (
          <div className="mt-8 sm:mt-12 space-y-4">
            <h4 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-1.5 sm:gap-2 pb-1 border-b border-gray-100">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-main-500" />
              기술 스택 & 선정 이유
            </h4>

            <div className="space-y-5">
              {/* 일반 기술 스택 (선정 이유가 없는 기술들) */}
              {techStack.filter(
                (tech) => !techReasons.some((reason) => reason.tech === tech)
              ).length > 0 && (
                <div className="py-2">
                  <h5 className="text-xs text-gray-500 mb-2">기타 사용 기술</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack
                      .filter(
                        (tech) =>
                          !techReasons.some((reason) => reason.tech === tech)
                      )
                      .map((tech, index) => (
                        <span
                          key={`tech-${tech}`}
                          className="text-sm font-medium text-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* 주요 기술 및 선정 이유 */}
              {techReasons.length > 0 && (
                <div className="space-y-2">
                  <div className="space-y-2.5">
                    {techReasons.map((item, index) => (
                      <div key={item.id} className="flex items-start">
                        <span className="mr-1.5 text-gray-400 flex-shrink-0 mt-0.5">
                          •
                        </span>
                        <div className="w-full flex flex-col sm:grid sm:grid-cols-[120px_1fr] sm:gap-3 sm:items-baseline">
                          <span className="text-sm font-medium text-gray-600 mr-2 flex-shrink-0 inline-block">
                            {item.tech}
                          </span>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-0 mt-1.5 sm:mt-0">
                            {formatText(item.reason)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 요약 섹션 */}
        {summary && summary.length > 0 && (
          <div className="space-y-3 mt-8 sm:mt-12">
            <h4 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-1.5 sm:gap-2 pb-1 border-b border-gray-100">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-main-500" />
              요약
            </h4>
            <ul className="list-disc pl-4 sm:pl-8 text-xs sm:text-sm text-muted-foreground space-y-2 sm:space-y-3 mt-2">
              {summary.map((item) => (
                <li key={item.id} className="leading-6">
                  {formatText(item.text)}
                  {item.link && (
                    <div className="mt-1">
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs inline-flex items-center gap-1 text-primary hover:text-main-500 hover:underline transition-colors"
                      >
                        <span>{item.link.text}</span>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="flex-shrink-0"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 트러블슈팅 섹션 */}
        {troubleshootItems && Object.keys(troubleshootItems).length > 0 && (
          <div className="mt-8 sm:mt-12">
            <TroubleshootingSection
              troubleshootItems={
                troubleshootItems as Record<
                  string,
                  | TroubleshootItem
                  | {
                      id: string;
                      title: string;
                      problem: string | { id: string; text: string }[];
                      solution: string | string[];
                      results: string | string[];
                      highlights?: string[];
                      highlight?: string[];
                      image?: {
                        src: string;
                        alt: string;
                        width: number;
                        height: number;
                      };
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
                      linkText?: {
                        text: string;
                        url: string;
                      }[];
                      relatedLinks?: {
                        title: string;
                        url: string;
                      }[];
                    }
                >
              }
            />
          </div>
        )}

        {/* 인사이트 */}
        {insight && <InsightSection insight={insight} bgColor={bgColor} />}
      </div>
    </div>
  );
}
