import type {
  ProjectImage,
  ProjectItemData,
  TroubleshootImage,
} from '../../../types/projectType';

/**
 * 모아 커뮤니티 프로젝트 데이터
 * 이 파일에서 모아 커뮤니티 프로젝트의 모든 데이터를 정의합니다.
 */

const projectData: ProjectItemData = {
  // 프로젝트 메타 정보
  meta: {
    title: '모아 커뮤니티',
    duration: '2025.04 ~ 현재',
    links: {
      website: 'https://www.mo-a.kr',
      github: 'https://github.com/ddhelop/moa-community',
    },
    logo: '/logos/moa_logo.svg',
  },

  // 테마 설정
  theme: {
    bgColor: 'bg-gray-100/30',
    textColor: 'text-gray-900',
  },

  // 프로젝트 소개
  introduction: {
    description: [
      '모아 커뮤니티는 각 지역 주민들이 자유롭게 소통하고 정보를 나눌 수 있도록 기획된 <highlight>하이퍼로컬 커뮤니티 플랫폼</highlight>입니다.',
      '에브리타임처럼 익명 기반 게시판 구조를 중심으로, 동네 인증/게시판 요청 등의 구조를 설계했으며, 반응형 UI와 직관적인 UX에 중점을 두었습니다.',
      '본 프로젝트는 <highlight>바이브 코딩 기반</highlight>으로 기획과 실험을 빠르게 반복하며, <highlight>실제 서비스 구조를 직접 구상하고 빠르게 구현하는 데 집중</highlight>한 프로젝트입니다.',
      '2024년 4월 중순부터 시작하여, 사이드 프로젝트 형태로 시간을 투자하며 지속적으로 디벨롭하고 있습니다.',
    ],
  },

  // 프로젝트 구성원
  members: '1인 개발 (기획 · 디자인 · 프론트엔드 · 서버리스 백엔드)',

  // 기여도 영역
  contributionAreas: [
    {
      id: 'contrib-1',
      area: '개발',
      percentage: 100,
    },
    {
      id: 'contrib-2',
      area: '기획/디자인',
      percentage: 100,
    },
  ],

  // 역할 항목 (필수 필드)
  roleItems: [
    {
      id: 'role-1',
      text: '프론트엔드 개발',
    },
  ],

  // 기술 스택
  techStack: [
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'Supabase',
    'Vercel',
    'React Hook Form',
    'Shadcn UI',
  ],

  // 기술 선정 이유
  techReasons: [
    {
      id: 'tech-1',
      tech: 'Next.js',
      reason:
        '서버 사이드 렌더링(SSR)을 활용하여 초기 로딩 속도를 개선하고 SEO 최적화가 필요한 커뮤니티 플랫폼에 적합했습니다.',
    },
    {
      id: 'tech-2',
      tech: 'TypeScript',
      reason:
        '복잡한 컴포넌트 구조와 데이터 흐름에서 타입 안정성을 확보하여 개발 효율성을 향상시켰습니다.',
    },
    {
      id: 'tech-3',
      tech: 'TailwindCSS',
      reason:
        '유틸리티 기반 CSS 프레임워크로 일관된 디자인 시스템을 구축하고, 반응형 UI를 효율적으로 개발할 수 있었습니다.',
    },
    {
      id: 'tech-4',
      tech: 'Supabase',
      reason:
        '초기 비용 없이 인증·DB·스토리지를 통합 제공해, 개인 프로젝트와 MVP 단계에서 빠르고 효율적인 백엔드 구성이 가능했습니다.',
    },
    {
      id: 'tech-5',
      tech: 'Vercel',
      reason:
        'Next.js와의 완벽한 통합으로 CI/CD 파이프라인을 간소화하고, 빠른 배포와 성능 모니터링이 가능했습니다.',
    },
    {
      id: 'tech-6',
      tech: 'Shadcn UI',
      reason:
        '접근성과 사용자 경험을 고려한 고품질 컴포넌트 라이브러리로, 일관된 디자인 시스템을 빠르게 구축할 수 있었습니다.',
    },
  ],

  // 요약 (성과 및 주요 특징을 통합)
  summary: [
    {
      id: 'summary-1',
      text: 'Figma 없이 <highlight>Cursor AI와 직접 소통하며 UI 구조와 레이아웃을 코드로 바로 설계 및 구현</highlight>했습니다.',
    },
  ],

  // 트러블슈팅 항목
  troubleshootItems: {},

  // 인사이트
  insight: `빠르게 변화하는 AI 시대 속에서, 단순한 개발 역량보다는 기획·디자인·구조 설계·의사 결정과 같은 복합적인 역량이 개발자에게 더 중요해질 것이라 느꼈습니다. 이에 따라, 기술보다는 서비스 구조와 사용자 흐름에 집중하며 전체를 설계하고 실험해보는 프로젝트를 스스로 시작하게 되었습니다.

에브리타임의 구조와 지역 커뮤니티의 특징을 참고해 익명성과 게시판 중심 흐름, 반응형 UI 등을 설계하고, Next.js·TailwindCSS·Supabase 등 기술로 빠르게 MVP를 구현했습니다. 코드를 짜는 것보다 ‘왜 이렇게 만들었는가’를 먼저 고민하며, 기획자·매니저의 시선으로 실행하는 과정 자체가 저에게 큰 성장의 기회가 되었습니다.`,
};

export default projectData;
