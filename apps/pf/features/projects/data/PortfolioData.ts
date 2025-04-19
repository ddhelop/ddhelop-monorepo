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
    title: '개인 포트폴리오 웹사이트',
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
      '프론트엔드 개발자로서 <highlight>본인 강점과 프로젝트 경험을 효과적으로</highlight> 보여줄 수 있는 포트폴리오를 만들고자 웹 기반 사이트를 직접 개발하게 되었습니다.',
      '노션, 서핏, 오픈프로젝트는 제한된 포맷으로 나만의 스타일을 담기에 어려움이 있었고, 피그마는 정적이면서도 유지보수가 번거로웠습니다.',
      '이에 따라 <highlight>자유로운 디자인 설계와 손쉬운 업데이트</highlight>, 그리고 나만의 브랜딩을 반영할 수 있는 1인 웹 프로젝트입니다.',
    ],

    // image: {
    //   src: '/images/projects/portfolio/intro.webp',
    //   alt: '포트폴리오 웹사이트 소개 이미지',
    // },
  },

  // 프로젝트 구성원
  members: '개인 프로젝트 (1인 개발)',

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
      reason:
        'SEO 최적화와 정적 사이트 생성(SSG) 기능을 활용해, 빠른 초기 로딩과 검색 노출이 모두 가능한 구조로 구현하기 위해 선택했습니다.',
    },
    {
      id: 'tech-2',
      tech: 'TypeScript',
      reason:
        '정적 타입을 통해 컴포넌트 간 데이터 흐름을 명확하게 하고, 오류를 줄이며 유지보수성을 높이기 위해 도입했습니다.',
    },
    {
      id: 'tech-3',
      tech: 'TailwindCSS',
      reason:
        '반응형 웹 구현과 빠른 스타일 반복 작업에 유리한 유틸리티 클래스 기반 CSS로, 개인 사이트 제작에 최적화되어 있었습니다.',
    },
    {
      id: 'tech-4',
      tech: 'Shadcn/UI',
      reason:
        'TailwindCSS 기반으로 설계된 컴포넌트 라이브러리로, 일관된 디자인 시스템을 유지하면서도 접근성과 개발 속도를 높일 수 있었습니다.',
    },
    {
      id: 'tech-5',
      tech: 'Framer Motion',
      reason:
        '은은한 애니메이션을 통해 콘텐츠의 시각적 완성도와 사용자 경험을 강화하기 위해 사용했습니다.',
    },
    {
      id: 'tech-6',
      tech: 'Vercel',
      reason:
        '빠른 배포 흐름과 신뢰할 수 있는 호스팅 환경으로 개발 생산성과 서비스 안정성을 확보했습니다.',
    },
  ],

  // Empty roleItems to satisfy type requirements
  roleItems: [],

  // 요약 (성과 및 주요 특징을 통합)
  summary: [
    {
      id: 'summary-0',
      text: '커스텀 마크업<code><highlight></code>, <code><code></code>, <code><link></code>을 React 엘리먼트로 변환해주는 <highlight>텍스트 파서 훅을 구현</highlight>했습니다.',
    },
    {
      id: 'summary-1',
      text: '<highlight>정적 사이트 생성(SSG)을 적용</highlight>해 SEO 점수 100점을 달성하고, 빠른 초기 로딩으로 포트폴리오 노출도와 접근성을 동시에 향상시켰습니다.',
    },
    {
      id: 'summary-2',
      text: '<highlight>반응형 디자인 설계를 기반</highlight>으로, 모바일부터 데스크톱까지 전 디바이스에서 일관된 사용자 경험을 제공.',
    },
    {
      id: 'summary-3',
      text: '<highlight>Framer Motion을 활용</highlight>한 은은한 인터랙션으로 콘텐츠의 시각적 매력을 높임.',
    },
    {
      id: 'summary-4',
      text: '모듈화된 컴포넌트 설계로 <highlight>확장성과 유지보수성</highlight>을 확보하여 새로운 프로젝트 추가 및 콘텐츠 업데이트 용이',
    },
    {
      id: 'summary-5',
      text: '<highlight>모듈화된 컴포넌트 구조를 설계</highlight>해 새로운 프로젝트나 콘텐츠 추가 시에도 손쉽게 유지보수 및 확장 가능하도록 구성',
    },
  ],

  // 트러블슈팅 항목 - 빈 객체로 설정하여 표시되지 않도록 함
  troubleshootItems: {},

  // 인사이트
  insight: `이 포트폴리오 프로젝트는 개인 프로젝트였던 만큼 기획, 디자인, 개발 전반에 있어 높은 자유도를 가지고 설계할 수 있었고, 그 과정에서 저의 스타일을 자연스럽게 담을 수 있었습니다.  

특히 제가 중요하게 생각하는 반응형 UI와 사용자 경험(UX)에 대한 기준을, 어떤 제약 없이 스스로 정의하고 구현해볼 수 있는 경험이였습니다.

또한 이전에는 다뤄보지 않았던 SSG(Static Site Generation) 렌더링 방식을 적용해보며, 정적 렌더링의 성능적인 장점을 직접 체감할 수 있었습니다.

무엇보다도 이 프로젝트는 제가 현재 가지고 있는 역량과 스타일을 가장 직접적이고 자유롭게 보여줄 수 있는 결과물이 된 것 같습니다.`,
};

export default projectData;
