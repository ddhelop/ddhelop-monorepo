import { motion } from 'framer-motion';
import SectionHeader from '../../../../../../components/projects/SectionHeader';

interface InsightSectionProps {
  insight: string;
}

/**
 * 프로젝트의 인사이트를 표시하는 컴포넌트
 */
const InsightSection = ({ insight }: InsightSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mt-16 bg-indigo-50/80 rounded-lg p-5 border border-indigo-100/40"
    >
      <SectionHeader title="Insight" className="border-b-0 pb-1" />
      <p className="text-sm text-muted-foreground leading-relaxed mt-4">
        {insight}
      </p>
    </motion.div>
  );
};

export default InsightSection;
