import type {
  ContributionArea,
  InsightItem,
  ProjectIntroduction,
  RoleItem,
  TechReason,
  TroubleshootItem,
} from '@/types/projectType';
import { useMemo } from 'react';
import IntroSection from '../../intro/components/IntroSection';
import InsightSection from './InsightSection';
import ProjectInfoSections from './ProjectInfoSections';
import TroubleshootingSection from './TroubleshootingSection';
import ProjectLayout from '@/components/layout/ProjectLayout';

interface ReusableProjectContentProps {
  // ProjectLayout 사용 프로퍼티
  title: string;
  duration: string;
  logo: React.ReactNode;
  links: { github?: string; website?: string };

  // 각 섹션 정보
  introduction: ProjectIntroduction;
  members: string;
  contributionAreas: ContributionArea[];
  techStack: { name: string }[];
  techReasons: TechReason[];
  roleItems: RoleItem[];
  troubleshootItems: TroubleshootItem[];
  insights: InsightItem[];
}

/**
 * 재사용 가능한 프로젝트 콘텐츠 컴포넌트
 * 여러 프로젝트에서 동일한 레이아웃과 구조를 사용할 수 있도록 설계
 */
const ReusableProjectContent = ({
  // ProjectLayout 프로퍼티
  title,
  duration,
  logo,
  links,

  // 콘텐츠 섹션 프로퍼티
  introduction,
  members,
  contributionAreas,
  techStack,
  techReasons,
  roleItems,
  troubleshootItems,
  insights,
}: ReusableProjectContentProps) => {
  // 기술 스택 이름만 추출
  const technologies = techStack.map((tech) => tech.name);

  // Convert troubleshootItems array to Record<string, TroubleshootItem>
  const troubleshootItemsRecord = useMemo(() => {
    return troubleshootItems.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<string, TroubleshootItem>);
  }, [troubleshootItems]);

  return (
    <ProjectLayout title={title} duration={duration} logo={logo} links={links}>
      <div className="max-w-3xl mx-auto pb-24">
        {/* 소개 섹션 */}
        <IntroSection />

        {/* 프로젝트 정보 섹션들 */}
        <ProjectInfoSections
          members={members}
          contributionAreas={contributionAreas}
          technologies={technologies}
          techReasons={techReasons}
          roleItems={roleItems}
        />

        {/* 트러블슈팅 섹션 */}
        <TroubleshootingSection troubleshootItems={troubleshootItemsRecord} />

        {/* 인사이트 섹션 */}
        <InsightSection insights={insights} />
      </div>
    </ProjectLayout>
  );
};

export default ReusableProjectContent;
