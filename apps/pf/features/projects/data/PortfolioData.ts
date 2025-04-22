import type {
  ProjectImage,
  ProjectItemData,
  TroubleshootImage,
} from '../../../types/projectType';

/**
 * 포트폴리오 웹사이트 프로젝트 데이터
 * 이 파일에서 포트폴리오 웹사이트 프로젝트의 모든 데이터를 정의합니다.
 */

const projectData: ProjectItemData = {
  // 프로젝트 메타 정보
  meta: {
    title: '모노레포 이력서/포트폴리오',
    duration: '25.04 ~ 현재',
    links: {
      website: 'https://pf.ddhelop.com',
      github: 'https://github.com/ddhelop/ddhrepo',
    },
    logo: '/logos/my_logo.svg',
  },

  // 테마 설정
  theme: {
    bgColor: 'bg-blue-50/30',
    textColor: 'text-gray-900',
  },

  // 프로젝트 소개
  introduction: {
    description: [
      '본 프로젝트는 <sb>개인 기술 브랜딩과 커리어 포지셔닝을 위한 포트폴리오 사이트</sb>로, 기획, 디자인, 개발 전반을 1인 주도로 수행했습니다.',
      '기존 노션이나 서핏, Figma 기반 포트폴리오에서 겪었던 <sb>자유도 제한과 업데이트 불편</sb>을 해결하고자, 정적 사이트로 개발했습니다.',
      '프로젝트를 모노레포 구조로 구성해, 공통 훅을 패키지로 분리하여 관리하고 있습니다.',
    ],

    // image: {
    //   src: '/images/projects/portfolio/intro.webp',
    //   alt: '포트폴리오 웹사이트 소개 이미지',
    // },
  },

  // 프로젝트 구성원
  members: '개인 프로젝트 (1인)',

  // 기여도 영역
  contributionAreas: [
    {
      id: 'contrib-1',
      area: '기획 및 디자인',
      percentage: 100,
      details: '사용자 경험과 읽기 편한 정보 설계에 중점을 둔 UI/UX 디자인',
    },
    {
      id: 'contrib-2',
      area: '프론트엔드 개발',
      percentage: 100,
      details: '반응형 웹 디자인, 모션 효과, 접근성 고려한 UI 구현',
    },
  ],

  // 기술 스택
  techStack: [
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'biome',
    'Shadcn/UI',
    'Framer Motion',
    'Vercel',
    'pnpm',
    'Turbo',
  ],

  // 기술 선정 이유
  techReasons: [
    {
      id: 'tech-1',
      tech: 'Next.js',
      reason: 'SEO 최적화와 정적 사이트 생성(SSG) 기능 활용을 위해',
    },
    {
      id: 'tech-2',
      tech: 'TypeScript',
      reason:
        '정적 타입 기반으로 프로젝트 구조를 명확히 하여 안정성과 유지보수성 확보',
    },
    {
      id: 'tech-3',
      tech: 'TailwindCSS',
      reason: '유틸리티 클래스 기반 스타일링으로 빠른 UI 작업과 일관성 유지.',
    },
    {
      id: 'tech-4',
      tech: 'Shadcn/UI',
      reason:
        '일관된 디자인 시스템을 제공하면서도 TailwindCSS와의 통합성이 뛰어나 컴포넌트화에 적합.',
    },
    {
      id: 'tech-6',
      tech: 'pnpm + Turborepo',
      reason:
        '모노레포 기반으로 공통 유틸/컴포넌트를 패키지 단위로 분리 관리, 재사용성과 빌드 효율 개선.',
    },
  ],

  // Empty roleItems to satisfy type requirements
  roleItems: [],

  // 요약 (성과 및 주요 특징을 통합)
  summary: [
    {
      id: 'summary-0',
      text: '커스텀 마크업<code><sb></code>, <code><md></code>, <code><link></code>을 React 엘리먼트로 변환해주는 <sb>텍스트 파서 훅을 구현</sb>했습니다.',
    },
    {
      id: 'summary-1',
      text: '<sb>정적 사이트 생성(SSG)을 적용</sb>해 SEO 점수 100점을 달성하고, 빠른 초기 로딩으로 포트폴리오 노출도와 접근성을 동시에 향상시켰습니다.',
    },
    {
      id: 'summary-2',
      text: '<sb>반응형 디자인 설계를 기반</sb>으로, 모바일부터 데스크톱까지 전 디바이스에서 일관된 사용자 경험을 제공.',
    },
    {
      id: 'summary-4',
      text: '모듈화된 컴포넌트 설계로 <sb>확장성과 유지보수성</sb>을 확보하여 새로운 프로젝트 추가 및 콘텐츠 업데이트 용이',
    },
  ],

  // 트러블슈팅 항목 - 빈 객체로 설정하여 표시되지 않도록 함
  troubleshootItems: {
    tailwindInline: {
      id: 'trouble-tailwind-inline',
      title: 'Tailwind CSS v4에서 동적으로 생성된 클래스가 적용되지 않음',
      problem: [
        {
          id: 'twinline-1',
          text: '<sb>동적으로 생성된 Tailwind 클래스(text-red-600 등)가 DOM에 존재함에도</sb>, 실제 스타일이 적용되지 않음',
        },
        {
          id: 'twinline-2',
          text: '커스텀 태그 파서를 통해 렌더링된 클래스가 정적 분석에 감지되지 않아 최종 CSS에서 누락',
        },
        {
          id: 'twinline-3',
          text: 'Tailwind v4에서는 기존의 tailwind.config.js 기반 safelist 옵션이 제거됨',
        },
      ],
      solution: [
        'Tailwind CSS v4.1에서 새롭게 도입된 <code>@source inline()</code> 지시어를 사용해 문제 해결',
        '<code>global.css</code> 파일 상단에 <code>@source inline("text-red-600 text-blue-900 font-semibold font-medium hover:text-main-500")</code> 형식으로 명시',
        '기존의 더미 컴포넌트 삽입 방식 대신, Tailwind의 빌드 프로세스에 필요한 클래스를 직접 선언하여 스타일이 누락되지 않도록 처리',
      ],
      results: [
        '동적 클래스의 스타일 정상 적용',
        '텍스트 파서 기반 커스텀 마크업 UI의 시각적 신뢰도 확보',
        '유지보수가 쉬운 방식으로 Tailwind 최신 버전에 대응',
      ],
      highlight: ['Tailwind CSS v4', '@source inline()', '동적 클래스'],
      relatedLinks: [
        {
          title: 'Tailwind CSS v4.1에서 동적 클래스 대응하기 (@source inline)',
          url: 'https://ddhelop.tistory.com/16', // 필요시 실제 링크로 대체
        },
      ],
    },
  },

  // 인사이트
  insight: `이 포트폴리오 프로젝트는 개인 프로젝트였던 만큼 기획, 디자인, 개발 전반에 있어 높은 자유도를 가지고 설계할 수 있었고, 그 과정에서 저의 스타일을 자연스럽게 담을 수 있었습니다.  

특히 제가 중요하게 생각하는 반응형 UI와 사용자 경험(UX)에 대한 기준을, 어떤 제약 없이 스스로 정의하고 구현해볼 수 있는 경험이였습니다.

또한 이전에는 다뤄보지 않았던 SSG(Static Site Generation) 렌더링 방식을 적용해보며, 정적 렌더링의 성능적인 장점을 직접 체감할 수 있었습니다.

무엇보다도 이 프로젝트는 제가 현재 가지고 있는 역량과 스타일을 가장 직접적이고 자유롭게 보여줄 수 있는 결과물이 된 것 같습니다.`,
};

export default projectData;
