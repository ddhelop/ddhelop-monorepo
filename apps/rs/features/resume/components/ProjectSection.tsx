'use client';

import useFormattedText from '@ddhelop/hooks/useFormattedText';
import projectsData from '../data/ProjectsData';
import Image from 'next/image';

// cn 유틸리티 함수 추가
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// SVG 아이콘 컴포넌트
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
    />
  </svg>
);

interface ContributionArea {
  id: string;
  area: string;
  percentage?: number;
  details?: string;
}

// 프로젝트 확장 인터페이스
interface ProjectBase {
  id: string;
  name: string;
  period?: string;
  logo?: string;
  links?: {
    github?: string;
    websites?: { url: string; name: string }[];
  };
  description?: string | string[];
  technologies?: string[];
  teamComposition?: string;
  [key: string]: unknown;
}

// 팀원 정보가 있는 프로젝트 인터페이스
interface ProjectWithMembers extends ProjectBase {
  members: string;
}

// 기여 영역 정보가 있는 프로젝트 인터페이스
interface ProjectWithContributions extends ProjectBase {
  contributionAreas: ContributionArea[];
}

// 타입 가드 함수
function hasMembers(obj: ProjectBase): obj is ProjectWithMembers {
  return obj && typeof obj.members === 'string';
}

function hasContributionAreas(
  obj: ProjectBase
): obj is ProjectWithContributions {
  return (
    obj &&
    Array.isArray(obj.contributionAreas) &&
    obj.contributionAreas.length > 0
  );
}

// position을 string 타입으로 확장
function hasPosition(
  obj: ProjectBase
): obj is ProjectBase & { position: string } {
  return obj && typeof obj.position === 'string';
}

export default function ProjectSection() {
  const { formatText } = useFormattedText();

  return (
    <section className="space-y-6">
      <h2 className="text-5xl font-bold">Project</h2>
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-12">
          {projectsData.items.map((project, index) => (
            <div key={project.id} className="relative">
              {/* 프로젝트 사이 구분선 (첫 번째 항목 제외) */}
              {index > 0 && <div className="border-t border-gray-100 mb-12" />}

              {/* Desktop View - 2 Columns Layout */}
              <div className="flex flex-col md:flex-row md:gap-8">
                {/* Left Column (로고, 이름, 기간, 링크) */}
                <div className="w-full md:w-1/4 md:sticky md:top-24 md:self-start space-y-4">
                  {/* Logo */}
                  {project.logo ? (
                    <div className="relative w-16 h-16 flex items-center justify-center rounded-md overflow-hidden ">
                      <Image
                        src={project.logo}
                        alt={`${project.name} 로고`}
                        className="w-full h-full object-contain"
                        objectFit="contain"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-md">
                      <span className="text-xl font-bold">
                        {project.name.substring(0, 2)}
                      </span>
                    </div>
                  )}

                  {/* Project Name & Period */}
                  <h3 className="text-3xl font-bold ">{project.name}</h3>
                  <div className="text-sm ">{project.period}</div>

                  {/* Links */}
                  {project.links && (
                    <div className="flex flex-row space-x-3 md:flex-col md:space-x-0 md:space-y-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline underline hover:text-main-500 flex items-center gap-1 print-hide"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                            aria-hidden="true"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                          GitHub
                        </a>
                      )}

                      {/* 웹사이트 링크들 - 여러 개 등록 가능 */}
                      {project.links?.websites &&
                        project.links.websites.length > 0 &&
                        project.links.websites.map((website, idx) => (
                          <a
                            key={`${project.id}-website-${idx}`}
                            href={website.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline underline hover:text-main-500 flex items-center gap-1 print-hide"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-link"
                              aria-hidden="true"
                            >
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            {website.name}
                          </a>
                        ))}
                    </div>
                  )}
                </div>

                {/* Right Column (Content) */}
                <div className="w-full md:w-3/4 space-y-6 ">
                  {/* Description */}
                  {project.description && (
                    <div className="">
                      {typeof project.description === 'string' ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-base leading-relaxed ">
                            {formatText(project.description)}
                          </p>
                        </div>
                      ) : (
                        <div className="">
                          {/* 프로젝트 요약 (첫 번째 항목) */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-base leading-relaxed ">
                              {formatText(project.description[0])}
                            </p>
                          </div>

                          {/* Technologies used */}
                          {project.technologies &&
                            project.technologies.length > 0 && (
                              <div className="p-4">
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech) => (
                                    <div
                                      className="rounded-md border border-stone-200 px-2 py-1 text-xs font-medium text-stone-600"
                                      key={tech}
                                    >
                                      {tech}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* 프로젝트 유형 및 기여도 정보 */}
                          <div className="p-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              {hasMembers(project) && project.members && (
                                <div className="flex items-center gap-1.5">
                                  <UserIcon className="h-4 w-4 text-gray-700" />
                                  <span className="">
                                    {project.members}
                                    {project.teamComposition &&
                                      `(${project.teamComposition})`}
                                  </span>
                                </div>
                              )}
                              {hasContributionAreas(project) &&
                                project.contributionAreas.length > 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <SparklesIcon className="h-4 w-4 text-gray-700" />
                                    <span className="">
                                      {project.contributionAreas
                                        .map(
                                          (area) =>
                                            `${area.area}${
                                              area.percentage
                                                ? ` ${area.percentage}%`
                                                : ''
                                            }`
                                        )
                                        .join(', ')}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>

                          {/* 세부 업무 내역 및 성과 */}
                          <div className="p-4">
                            <ul className="list-none space-y-3 pl-0">
                              {project.description
                                .slice(1)
                                .map((desc, index) => {
                                  const hasSubItems = desc.includes('---');
                                  const mainDesc = hasSubItems
                                    ? desc.split('---')[0]
                                    : desc;
                                  const subItems = hasSubItems
                                    ? desc
                                        .split('---')
                                        .slice(1)
                                        .map((item) => item.trim())
                                    : [];

                                  return (
                                    <li
                                      key={`${project.id}-desc-${index + 1}`}
                                      className="relative pl-4"
                                    >
                                      {/* 메인 항목 마커 */}
                                      <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                                      <p className="text-base font-medium text-gray-900  ml-2">
                                        {formatText(mainDesc)}
                                      </p>

                                      {/* 서브 항목 */}
                                      {subItems.length > 0 && (
                                        <ul className="list-none pl-4 mt-2 space-y-2">
                                          {subItems.map((subItem, subIndex) => (
                                            <li
                                              key={`${project.id}-sub-${index}-${subIndex}`}
                                              className="relative pl-4 text-base font-normal"
                                            >
                                              <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                                              <span className="ml-2 text-gray-700">
                                                {formatText(subItem)}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
