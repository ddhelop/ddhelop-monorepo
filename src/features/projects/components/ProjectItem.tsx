'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import TroubleshootingSection from './TroubleshootingSection';
import type { ProjectItemData } from '@/types/projectType';
import ProjectLayout from '@/components/layout/ProjectLayout';
import ImageSection from '@/components/ui/ImageSection';

interface ProjectItemProps {
  data: ProjectItemData;
}

/**
 * 프로젝트 정보를 일관된 방식으로 표시하는 컴포넌트
 * 데이터만 전달하면 자동으로 레이아웃을 구성합니다.
 */
export default function ProjectItem({ data }: ProjectItemProps) {
  // 프로젝트의 고유 식별자 생성 (localStorage 키로 사용)
  const projectKey = `project-${data.meta.title
    .replace(/\s+/g, '-')
    .toLowerCase()}-expanded`;

  // 프로젝트 내용 전체 펼치기/접기 상태
  const [isExpanded, setIsExpanded] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 상태 복원
  useEffect(() => {
    const savedState = localStorage.getItem(projectKey);
    if (savedState !== null) {
      setIsExpanded(savedState === 'true');
    }
  }, [projectKey]);

  // 펼치기/접기 토글 함수
  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    // localStorage에 상태 저장
    localStorage.setItem(projectKey, newState.toString());
  };

  const {
    meta,
    introduction,
    members,
    contributionAreas,
    techStack,
    techReasons,
    roleItems,
    troubleshootItems,
    insight,
  } = data;

  return (
    <div className="relative -mx-4 sm:mx-0">
      {/* 프로젝트 헤더 (항상 표시) */}
      <div className="sticky top-3 z-20 bg-white rounded-xl shadow-sm border border-gray-200/60 transition-all duration-300 mb-4 mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-4 gap-2">
          <div className="flex items-center gap-2">
            {meta.logo && (
              <div className="w-6 h-6 relative rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={meta.logo}
                  alt={meta.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <h3 className="font-medium text-base text-foreground truncate max-w-[200px] sm:max-w-xs">
              {meta.title}
            </h3>
            <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
              {meta.duration}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 mt-1 sm:mt-0">
            {/* 외부 링크 */}
            <div className="flex gap-2">
              {meta.links?.github && (
                <a
                  href={meta.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {meta.links?.website && (
                <a
                  href={meta.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm text-primary hover:text-main-500 hover:underline transition-colors"
                >
                  Website ↗
                </a>
              )}
            </div>

            <div className="h-4 border-r border-gray-200 hidden sm:block" />

            {/* 펼치기/접기 버튼 */}
            <button
              onClick={toggleExpand}
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-main-500 hover:underline ml-auto sm:ml-0"
              type="button"
              aria-expanded={isExpanded}
            >
              {isExpanded ? '접기' : '펼치기'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={`transform transition-transform ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
                aria-hidden="true"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 프로젝트 콘텐츠 (접기/펼치기 가능) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="space-y-8 px-2 sm:px-0"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* 소개 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-muted/10 rounded-lg p-3 sm:p-5 border border-gray-200/60"
            >
              <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                {introduction.description.map((paragraph, index) => (
                  <p
                    key={`intro-paragraph-${meta.title}-${index}`}
                    className="block"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* 소개 이미지 */}
            {introduction.image && <ImageSection image={introduction.image} />}

            {/* 구성원 & 기여도 정보 */}
            <div className="mt-12 space-y-12">
              {/* 구성원 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="h-2 w-2 rounded-full bg-main-500" />
                  구성원
                </h4>
                <p className="text-sm text-muted-foreground pl-1 sm:pl-3 mt-2">
                  {members}
                </p>
              </motion.div>

              {/* 기여도 */}
              {contributionAreas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
                    <span className="h-2 w-2 rounded-full bg-main-500" />
                    기여도
                  </h4>
                  <div className="space-y-3 pl-1 sm:pl-3 mt-2">
                    {contributionAreas.map((contrib) => (
                      <div key={contrib.id}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground">
                            {contrib.area}
                          </span>
                          <span className="text-sm font-medium text-main">
                            {contrib.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 기술 스택 */}
            {techStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 space-y-3"
              >
                <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="h-2 w-2 rounded-full bg-main-500" />
                  기술 스택
                </h4>

                <div className="flex flex-wrap gap-2 pl-0 sm:pl-2 mt-2">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={`tech-${tech}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="px-3 py-1 rounded-full bg-indigo-50 text-sm font-medium text-indigo-700 border border-indigo-100"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 기술 선정 이유 */}
            {techReasons.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-12"
              >
                <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="h-2 w-2 rounded-full bg-main-500" />
                  기술 선정 이유
                </h4>
                <div className="space-y-3 pl-0 sm:pl-3 mt-2">
                  {techReasons.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <span className="text-sm font-medium text-indigo-700 mb-1">
                        {item.tech}
                      </span>
                      <p className="text-sm text-muted-foreground border-l-2 border-gray-100 pl-2 sm:pl-3">
                        {item.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 역할 */}
            {roleItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-3 mt-12"
              >
                <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
                  <span className="h-2 w-2 rounded-full bg-main-500" />
                  Roles
                </h4>
                <ul className="list-disc pl-5 sm:pl-8 text-sm text-muted-foreground space-y-2.5 mt-2">
                  {roleItems.map((role, index) => (
                    <motion.li
                      key={role.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {role.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* 트러블슈팅 섹션 */}
            {Object.keys(troubleshootItems).length > 0 && (
              <div className="mt-12">
                <TroubleshootingSection
                  // @ts-ignore - 데이터 포맷 이슈는 추후 TroubleshootItem 인터페이스와 맞게 수정 예정
                  troubleshootItems={troubleshootItems}
                />
              </div>
            )}

            {/* 인사이트 */}
            {insight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-12 bg-indigo-50/80 rounded-lg p-3 sm:p-5 border border-indigo-100/40"
              >
                <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1">
                  <span className="h-2 w-2 rounded-full bg-main-500" />
                  Insight
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {insight}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
