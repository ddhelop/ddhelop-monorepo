/**
 * 역할 항목 타입
 */
export interface RoleItem {
  role: string;
  count: number;
}

/**
 * 기여도 영역 타입
 */
export interface ContributionArea {
  title: string;
  percentage: number;
}

/**
 * 기술 스택 타입
 */
export interface TechStack {
  id: string;
  name: string;
  description?: string;
}

/**
 * 기술 스택 아이템 타입
 */
export interface TechStackItem {
  name: string;
  category?: string;
}

/**
 * 기술 선정 이유 타입
 */
export interface TechReason {
  tech: string;
  reason: string;
  highlights: string[];
}

/**
 * 문제점 항목 타입
 */
export interface ProblemItem {
  id: string;
  text: string;
}

/**
 * 트러블슈팅 이미지 타입
 */
export interface TroubleshootImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * 링크 텍스트 항목 타입
 */
export interface LinkTextItem {
  text: string;
  url: string;
}

/**
 * 트러블슈팅 아이템 타입
 */
export interface TroubleshootItem {
  id: string;
  title: string;
  problem: Array<{ id: string; text: string }> | string;
  solution: string[] | string;
  results: string[] | string;
  highlight: string[];
  image?: TroubleshootImage;
  link?: {
    url: string;
    text: string;
  };
  linkText?: LinkTextItem[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
}

/**
 * 트러블슈팅 카테고리
 */
export interface TroubleshootItems {
  [key: string]: TroubleshootItem;
}

/**
 * 프로젝트 이미지 타입
 */
export interface ProjectImage {
  src: string;
  alt: string;
}

/**
 * 요약 항목 타입
 */
export interface SummaryItem {
  id: string;
  text: string;
  highlightTerms?: string[];
  link?: {
    url: string;
    text: string;
  };
}

/**
 * 프로젝트 데이터 타입
 */
export interface ProjectData {
  title: string;
  duration: string;
  logo?: string;
  links?: {
    github?: string;
    website?: string;
  };
  introImage?: ProjectImage;
  introduction: {
    paragraph1: string;
    paragraph2: string;
  };
  members: string;
  contributionAreas: ContributionArea[];
  techStack: TechStackItem[];
  techReasons: TechReason[];
  roleItems: RoleItem[];
  troubleshootItems?: Record<string, TroubleshootItem>;
  insight?: string;
}

/**
 * 통합된 프로젝트 데이터 타입
 */
export interface ProjectItemData {
  meta: {
    title: string;
    duration: string;
    links?: {
      github?: string;
      website?: string;
    };
    logo?: string;
  };
  introduction: {
    description: string[];
    image?: ProjectImage;
  };
  members: string;
  contributionAreas: {
    id: string;
    area: string;
    percentage: number;
    details?: string;
  }[];
  techStack: string[];
  techReasons: {
    id: string;
    tech: string;
    reason: string;
  }[];
  roleItems: {
    id: string;
    text: string;
  }[];
  summary?: SummaryItem[];
  troubleshootItems: {
    [key: string]: {
      id: string;
      title: string;
      problem: { id: string; text: string }[];
      solution: string[];
      results: string[];
      highlight: string[];
      image?: {
        src?: string;
        alt?: string;
        width?: number;
        height?: number;
      };
      link?: {
        url: string;
        text: string;
      };
      linkText?: {
        text: string;
        url: string;
      }[];
      relatedLinks?: {
        title: string;
        url: string;
      }[];
    };
  };
  insight?: string;
}

/**
 * 인사이트 아이템 타입
 */
export interface InsightItem {
  id: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface ProjectIntroduction {
  paragraph1: string;
  paragraph2: string;
}
