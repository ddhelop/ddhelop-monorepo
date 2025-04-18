import SectionHeader from '@/components/ui/SectionHeader';
import type {
  ContributionArea,
  RoleItem,
  TechReason,
} from '@/types/projectType';
import { motion } from 'framer-motion';

interface ProjectInfoSectionsProps {
  members: string;
  contributionAreas: ContributionArea[];
  technologies: string[];
  techReasons: TechReason[];
  roleItems: RoleItem[];
}

/**
 * 프로젝트 정보 섹션들을 모아놓은 컴포넌트
 * 구성원, 기여도, 기술 스택, 기술 선정 이유, 역할 섹션 포함
 */
const ProjectInfoSections = ({
  members,
  contributionAreas,
  technologies,
  techReasons,
  roleItems,
}: ProjectInfoSectionsProps) => {
  return (
    <>
      {/* 구성원 & 기여도 정보 */}
      <div className="mt-16 space-y-16">
        {/* 구성원 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader title="구성원" className="mb-4" />
          <p className="text-sm text-muted-foreground pl-5">{members}</p>
        </motion.div>

        {/* 기여도 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionHeader title="기여도" className="mb-4" />
          <div className="space-y-3 pl-5">
            {contributionAreas.map((contrib) => (
              <div key={contrib.title}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">
                    {contrib.title}
                  </span>
                  <span className="text-sm font-medium text-main">
                    {contrib.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 기술 스택 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 space-y-4"
      >
        <SectionHeader title="기술 스택" />

        <div className="flex flex-wrap gap-3 pl-5">
          {technologies.map((tech, index) => (
            <motion.span
              key={`tech-${tech}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="px-3 py-1 rounded-full bg-main/10 text-sm font-medium text-main border border-gray-200/60"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* 기술 선정 이유 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-16"
      >
        <SectionHeader title="기술 선정 이유" className="mb-4" />
        <div className="space-y-4 pl-5">
          {techReasons.map((item) => (
            <div key={item.tech} className="flex items-start gap-3">
              <span className="text-sm font-medium text-main">
                {item.tech}:
              </span>
              <p className="text-sm text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 역할 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4 mt-16"
      >
        <SectionHeader title="Roles" />
        <ul className="list-disc pl-10 text-sm text-muted-foreground space-y-2.5">
          {roleItems.map((role, index) => (
            <motion.li
              key={`role-${role.role}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {role.role}: {role.count}명
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default ProjectInfoSections;
