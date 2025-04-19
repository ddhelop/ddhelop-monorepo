import { motion } from 'framer-motion';
import type { SummaryItem } from '../../../types/projectType';

interface SummarySectionProps {
  summaryItems: SummaryItem[];
}

/**
 * 프로젝트 요약 정보를 표시하는 컴포넌트
 */
const SummarySection = ({ summaryItems }: SummarySectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="mt-12"
    >
      <h4 className="font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100">
        <span className="h-2 w-2 rounded-full bg-main-500" />
        요약
      </h4>
      <ul className="list-disc pl-5 sm:pl-8 text-sm text-muted-foreground space-y-2.5 mt-2">
        {summaryItems.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            {item.text}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SummarySection;
