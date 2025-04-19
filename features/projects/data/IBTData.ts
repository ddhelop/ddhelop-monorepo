import type { ProjectItemData } from '../../../types/projectType';

const projectData: ProjectItemData = {
  meta: {
    title: 'IBT 웹사이트',
    duration: '2024.01 ~ 2024.02',
    links: {
      website: 'https://www.rocketibt.co.kr/', // 실제 URL로 교체 필요
      github: 'https://github.com/ddhelop/IBT_Homepage-Web', // 비공개 외주 프로젝트일 경우 비워둘 수 있음
    },
    logo: '/logos/ibt_logo.svg',
  },

  theme: {
    bgColor: 'bg-green-50/15',
    textColor: 'text-gray-800',
  },

  introduction: {
    description: [
      'IBT는 스타트업 브랜드의 비전과 ESG 가치를 전달하는 정적 웹사이트 구축 프로젝트입니다.',
      '브랜드의 정체성을 시각적으로 표현하는 <highlight>스냅 스크롤 기반 인터랙티브 랜딩 페이지</highlight>를 구현하고, 다국어 지원 및 반응형 웹 환경에 중점을 두었습니다.',
      '1개월 간의 외주 협업 프로젝트로, <highlight>기획자와 소통하며 기획, 설계, 개발 전반</highlight>에 참여했습니다.',
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
        '정적 페이지 기반으로 빠른 로딩 속도와 배포 효율성을 확보하고, 일부 페이지에는 SSR을 적용해 동적 콘텐츠의 최신성과 SEO를 강화했습니다.',
    },
    {
      id: 'tech-2',
      tech: 'Framer Motion',
      reason:
        '브랜드 아이덴티티를 강조하기 위한 스냅 스크롤 기반 인터랙션 및 애니메이션 구현에 최적이었습니다.',
    },
    {
      id: 'tech-3',
      tech: 'TailwindCSS',
      reason:
        '정적 사이트에 필요한 일관된 디자인 시스템을 빠르게 구축하고 반응형 디자인에 유리했습니다.',
    },
    {
      id: 'tech-4',
      tech: 'Recoil',
      reason:
        '다국어 지원 환경을 위한 글로벌 상태 관리에 용이하고, 전역 상태를 단순하고 직관적으로 제어할 수 있어 빠르게 다국어 전환 기능을 구현할 수 있었습니다.',
    },
  ],

  roleItems: [{ id: 'role-1', text: '프론트엔드 개발' }],

  summary: [
    {
      id: 'summary-1',
      text: '<highlight>일부 페이지에 SSR을 적용</highlight>해 브랜드 콘텐츠의 최신성과 SEO 반영을 동시에 달성했습니다.',
    },
    {
      id: 'summary-2',
      text: '<highlight>스크롤 인터랙션 기반 랜딩 페이지</highlight>를 구현',
    },
    {
      id: 'summary-3',
      text: '<highlight>Recoil을 이용한 글로벌 상태 관리</highlight>를 통해 다국어 지원 환경을 구축.',
    },
    {
      id: 'summary-4',
      text: '모든 페이지에 <highlight>반응형 웹 디자인</highlight>을 적용해 다양한 디바이스에서 일관된 사용자 경험을 제공',
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
          text: '초기에는 JavaScript 기반 강제 스크롤 방식(window.scrollTop 등)을 사용하여 화면 전환이 부자연스럽고 버벅이는 문제가 발생',
        },
        {
          id: 'snap-3',
          text: '기기별 해상도에 따라 이동 거리 계산이 달라져 일관된 UX 제공에 어려움이 있었음',
        },
      ],
      solution: [
        'CSS 기반 <highlight>scroll-snap-type</highlight>을 적용해 자연스러운 snap scroll 구현',
        '<highlight>TailwindCSS의 snap-scroll</highlight> 유틸리티를 사용하여 각 섹션을 정렬하고 자바스크립트 코드를 최소화',
        '디바이스 별 화면 높이에 맞춰 각 섹션 크기를 동적으로 조절하여 UX 일관성 확보',
      ],
      results: [
        '자연스러운 스크롤 애니메이션으로 브랜드 메시지 전달 효과 증가',
        '스크롤 성능 개선 및 크로스 디바이스 호환성 향상',
        '개발 코드의 간결성 확보 및 유지보수 비용 감소',
      ],
      highlight: ['scroll-snap', 'TailwindCSS snap-scroll', 'UX 향상'],
    },
  },

  insight: `개발 경험이 많지 않던 시점에 참여한 외주 프로젝트였기에, 정적인 콘텐츠 중심의 반응형 UI 구현에 많은 시간을 투자하며 실질적인 화면 구현 역량을 크게 향상시킬 수 있었습니다.  
특히 다양한 기기에서의 레이아웃 대응, 모션 구현, 콘텐츠 배치 등 실제 서비스 수준의 구현 경험을 통해 구조적인 UI 설계 감각을 익혔고,  
디자이너 및 클라이언트와의 실무 협업 과정을 거치며 책임감 있는 커뮤니케이션과 피드백 반영의 중요성을 몸소 체득할 수 있었습니다.`,
};

export default projectData;
