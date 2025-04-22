'use client';

import useFormattedText from '@ddhelop/hooks/useFormattedText';
import experienceData from '../data/ExperienceData';

export default function ExperienceSection() {
  const { formatText } = useFormattedText();

  return (
    <section className="space-y-6">
      <h2 className="text-5xl font-bold">Experience</h2>
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-12">
          {experienceData.items.map((experience, index) => (
            <div key={experience.id} className="relative">
              {/* 아이템 간 구분선 (첫 번째 제외) */}
              {index > 0 && <div className="border-t border-gray-100 mb-12" />}

              <div className="flex flex-col space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-bold">{experience.name}</h3>
                  <span className="text-sm">{experience.period}</span>
                </div>

                {experience.position && (
                  <p className="text-lg">{experience.position}</p>
                )}

                {/* 설명 섹션 */}
                {experience.description && (
                  <div className="mt-3">
                    {typeof experience.description === 'string' ? (
                      <p className="text-base">
                        <span className="formatted-text">
                          {formatText(experience.description)}
                        </span>
                      </p>
                    ) : (
                      <ul className="list-none space-y-3 pl-0">
                        {experience.description.map((desc, index) => {
                          // 하위 항목이 포함된 설명인지 확인
                          const hasSubItems = desc.includes('---');

                          // 설명에서 메인 콘텐츠만 추출 (--- 이전 부분)
                          const mainDesc = hasSubItems
                            ? desc.split('---')[0]
                            : desc;

                          // 설명에서 하위 항목들 추출 (--- 이후 부분들)
                          const subItems = hasSubItems
                            ? desc
                                .split('---')
                                .slice(1)
                                .map((item) => item.trim())
                            : [];

                          return (
                            <li
                              key={`${experience.id}-desc-${index}`}
                              className="relative pl-4"
                            >
                              <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                              <p className="text-base font-medium ml-2">
                                <span className="formatted-text">
                                  {formatText(mainDesc)}
                                </span>
                              </p>

                              {/* 하위 항목이 있는 경우 렌더링 */}
                              {subItems.length > 0 && (
                                <ul className="list-none pl-4 mt-2 space-y-2">
                                  {subItems.map((subItem, subIndex) => (
                                    <li
                                      key={`${experience.id}-sub-${index}-${subIndex}`}
                                      className="relative pl-4 text-base font-normal"
                                    >
                                      <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                                      <span className="ml-2">
                                        <span className="formatted-text">
                                          {formatText(subItem)}
                                        </span>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}

                {/* 성과 섹션 */}
                {experience.achievements &&
                  experience.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-base font-semibold flex items-center gap-1.5 mb-2">
                        🏆 주요 성과
                      </h4>
                      <ul className="list-none space-y-2 pl-0 mt-1">
                        {experience.achievements.map((achievement, index) => {
                          // 하위 항목이 포함된 성과인지 확인
                          const hasSubItems = achievement.includes('---');

                          // 성과에서 메인 콘텐츠만 추출 (--- 이전 부분)
                          const mainAchievement = hasSubItems
                            ? achievement.split('---')[0]
                            : achievement;

                          // 성과에서 하위 항목들 추출 (--- 이후 부분들)
                          const subItems = hasSubItems
                            ? achievement
                                .split('---')
                                .slice(1)
                                .map((item) => item.trim())
                            : [];

                          return (
                            <li
                              key={`${experience.id}-achievement-${index}`}
                              className="relative pl-4"
                            >
                              <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full bg-yellow-500" />
                              <p className="text-base font-medium ml-2">
                                <span className="formatted-text">
                                  {formatText(mainAchievement)}
                                </span>
                              </p>

                              {/* 하위 항목이 있는 경우 렌더링 */}
                              {subItems.length > 0 && (
                                <ul className="list-none pl-4 mt-2 space-y-2">
                                  {subItems.map((subItem, subIndex) => (
                                    <li
                                      key={`${experience.id}-sub-achievement-${index}-${subIndex}`}
                                      className="relative pl-4 text-base font-normal"
                                    >
                                      <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                      <span className="ml-2">
                                        <span className="formatted-text">
                                          {formatText(subItem)}
                                        </span>
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
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
