import SectionHeader from '@ddhelop/ui/src/SectionHeader';
import { useFormattedText } from '@ddhelop/hooks';
import type { InsightItem } from '../../../types/projectType';

interface InsightSectionProps {
  insight?: string;
  insights?: InsightItem[];
  bgColor?: string; // 더 이상 사용하지 않지만 prop 호환성을 위해 유지
}

/**
 * 프로젝트의 인사이트를 표시하는 컴포넌트
 */
const InsightSection = ({
  insight,
  insights,
  bgColor,
}: InsightSectionProps) => {
  const { formatText } = useFormattedText();

  // Support both single insight string and insights array
  if (insights && insights.length > 0) {
    return (
      <div className="mt-16 bg-white rounded-lg p-5 border border-gray-200/40">
        <SectionHeader title="Insights" className="border-b-0 pb-1" />
        <div className="space-y-4 mt-4">
          {insights.map((item) => (
            <div key={item.id} className="space-y-2">
              <h5 className="text-base font-medium">{item.title}</h5>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {formatText(item.description)}
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
      </div>
    );
  }

  // Fallback to original single insight display
  return (
    <div className="mt-16 bg-white rounded-lg p-5 border border-gray-200/40">
      <SectionHeader title="Insight" className="border-b-0 pb-1" />
      {insight && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-4 whitespace-pre-line">
          {formatText(insight)}
        </p>
      )}
    </div>
  );
};

export default InsightSection;
