import type React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

/**
 * 프로젝트 내 각 섹션의 헤더 컴포넌트
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = "" }) => {
  return (
    <h4
      className={`font-bold text-lg text-foreground flex items-center gap-2 pb-1 border-b border-gray-100 ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-main-500" />
      {title}
    </h4>
  );
};

export default SectionHeader;
