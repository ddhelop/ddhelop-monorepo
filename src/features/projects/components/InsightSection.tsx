import SectionHeader from '@/components/ui/SectionHeader';
import type { InsightItem } from '@/types/projectType';
import { motion } from 'framer-motion';

interface InsightSectionProps {
  insight?: string;
  insights?: InsightItem[];
}

/**
 * 프로젝트의 인사이트를 표시하는 컴포넌트
 */
const InsightSection = ({ insight, insights }: InsightSectionProps) => {
  // Support both single insight string and insights array
  if (insights && insights.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-16 bg-indigo-50/80 rounded-lg p-5 border border-indigo-100/40"
      >
        <SectionHeader title="Insights" className="border-b-0 pb-1" />
        <div className="space-y-4 mt-4">
          {insights.map((item) => (
            <div key={item.id} className="space-y-2">
              <h5 className="text-base font-medium">{item.title}</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              {item.image && (
                <div className="mt-2">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="rounded-md max-w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Fallback to original single insight display
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mt-16 bg-indigo-50/80 rounded-lg p-5 border border-indigo-100/40"
    >
      <SectionHeader title="Insight" className="border-b-0 pb-1" />
      {insight && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
          {insight}
        </p>
      )}
    </motion.div>
  );
};

export default InsightSection;
