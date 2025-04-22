import type { ProjectItemData } from '../../../types/projectType';

const projectData: ProjectItemData = {
  meta: {
    title: 'IBT 웹사이트',
    duration: '2024.01 ~ 2024.02',
    links: {
      website: 'https://www.rocketibt.co.kr/',
      github: 'https://github.com/ddhelop/IBT_Homepage-Web',
    },
    logo: '/logos/IBT_logo.svg',
  },

  theme: {
    bgColor: 'bg-green-50/15',
    textColor: 'text-gray-800',
  },

  introduction: {
    description: [
      'IBT는 스타트업 브랜드의 비전과 ESG 가치를 전달하는 정적 웹사이트 구축 프로젝트입니다.',
      '브랜드의 정체성을 시각적으로 표현하는 <sb>스냅 스크롤 기반 인터랙티브 랜딩 페이지</sb>를 구현하고, 다국어 지원 및 반응형 웹 환경에 중점을 두었습니다.',
      '1개월 간의 외주 협업 프로젝트로, <sb>기획자와 소통하며 기획, 설계, 개발 전반</sb>에 참여했습니다.',
    ],
  },

  members: '프론트엔드(3)',

  contributionAreas: [
    {
      id: 'contrib-1',
      area: '프론트엔드 개발',
      percentage: 33,
      details:
        '정적 페이지 구조 설계, 스냅 스크롤 인터랙션 구현, 다국어 지원 환경 구성, 반응형 UI',
    },
  ],

  techStack: [
    'Next.js',
    'TypeScript',
    'Framer Motion',
    'TailwindCSS',
    'Recoil',
    'Vercel',
  ],

  techReasons: [
    {
      id: 'tech-1',
      tech: 'Next.js',
      reason:
        'SSG 기반의 빠른 페이지 로딩과 SSR을 혼합해 브랜드 콘텐츠의 신뢰성과 SEO 성능을 모두 확보',
    },
    {
      id: 'tech-2',
      tech: 'Framer Motion',
      reason:
        '브랜드 아이덴티티를 강조하기 위한 스냅 스크롤 기반 인터랙션 및 애니메이션 구현에 최적',
    },
    {
      id: 'tech-3',
      tech: 'TailwindCSS',
      reason:
        '정적 사이트에 필요한 일관된 디자인 시스템을 빠르게 구축하고 반응형 디자인에 유리',
    },
    {
      id: 'tech-4',
      tech: 'Recoil',
      reason:
        '다국어 상태 전환 등 글로벌 상태 관리가 필요한 부분에서 직관적이고 효율적인 구조를 제공',
    },
  ],

  roleItems: [{ id: 'role-1', text: '프론트엔드 개발' }],

  summary: [
    {
      id: 'summary-1',
      text: '스타트업 브랜드의 ESG 및 정체성을 전달하는 SSG 정적 웹사이트 구축',
    },
    {
      id: 'summary-2',
      text: 'Framer Motion + scroll-snap으로 스크롤 인터랙션 중심 랜딩 페이지 구현',
    },
    {
      id: 'summary-3',
      text: 'Recoil을 활용한 글로벌 상태 관리로 다국어 전환 기능 개발',
    },
    {
      id: 'summary-4',
      text: 'TailwindCSS 기반 반응형 UI로 전 디바이스 일관된 UX 제공',
    },
    {
      id: 'summary-5',
      text: '디자이너 및 클라이언트와 협업하며 실무 커뮤니케이션 및 피드백 수용 역량 향상',
    },
  ],

  troubleshootItems: {
    snapScroll: {
      id: 'trouble-1',
      title: '랜딩 페이지 snap scroll 구현 시 UX 및 성능 문제',
      problem: [
        {
          id: 'snap-1',
          text: '클라이언트 요구사항으로 각 섹션이 전체 화면에 꽉 차도록 스크롤 시 한 화면씩 이동해야 했음',
        },
        {
          id: 'snap-2',
          text: '초기에는 JavaScript 기반의 강제 스크롤 로직으로 UX 부자연스러움 발생',
        },
        {
          id: 'snap-3',
          text: '디바이스 해상도별 화면 정렬 불일치로 UX 일관성 저하',
        },
      ],
      solution: [
        'CSS 기반 <sb>scroll-snap-type</sb>을 적용해 자연스러운 snap scroll 구현',
        '<sb>TailwindCSS의 snap-scroll</sb> 유틸리티를 사용하여 각 섹션을 정렬하고 자바스크립트 코드를 최소화',
      ],
      results: [
        '스크롤 렉 및 전환 부자연스러움 해결',
        '인터랙션 완성도 및 사용자 몰입도 상승',
        '개발 코드의 간결성 확보 및 유지보수 비용 감소',
      ],
      highlight: [''],
    },
  },

  insight: `개발 경험이 많지 않던 시점에 참여한 외주 프로젝트였기에, 정적인 콘텐츠 중심의 반응형 UI 구현에 많은 시간을 투자하며 실질적인 화면 구현 역량을 크게 향상시킬 수 있었습니다.  
특히 다양한 기기에서의 레이아웃 대응, 모션 구현, 콘텐츠 배치 등 실제 서비스 수준의 구현 경험을 통해 구조적인 UI 설계 감각을 익혔고,  
디자이너 및 클라이언트와의 실무 협업 과정을 거치며 책임감 있는 커뮤니케이션과 피드백 반영의 중요성을 몸소 체득할 수 있었습니다.`,
};

export default projectData;
