import type { ResumeItemData } from '../../../types/resumeType';

interface ContributionArea {
  id: string;
  area: string;
  percentage?: number;
  details?: string;
}

interface ProjectWithLinks extends ResumeItemData {
  items: Array<{
    id: string;
    name: string;
    period?: string;
    position?: string;
    description?: string | string[];
    links?: {
      github?: string;
      websites?: Array<{
        name: string;
        url: string;
      }>;
    };
    technologies?: string[];
    logo?: string;
    members?: string; // 팀 프로젝트일 경우 팀원 수
    contributionAreas?: ContributionArea[]; // 기여 영역
  }>;
}

const projectsData: ProjectWithLinks = {
  title: '프로젝트',
  items: [
    {
      id: 'project-linkit',
      name: '링킷(Linkit)',
      period: '2024.05 - 진행 중',
      position: '개인 프로젝트',
      members: '4인(기획 1, 디자인 1, 백엔드 1, 프론트엔드 1)',
      links: {
        github: 'https://github.com/ddhelop/Linkit_disclosure',
        websites: [
          {
            name: 'linkit.im',
            url: 'https://linkit.im',
          },
        ],
      },
      logo: '/logos/linkit_logo.svg',
      technologies: [
        'Next.js',
        'React',
        'TanStack Query',
        'Zustand',
        'TailwindCSS',
        'Vercel',
      ],
      contributionAreas: [
        {
          id: 'linkit-front',
          area: '프론트엔드 개발',
          percentage: 100,
          details: '전체 UI 구현 및 상태 관리',
        },
      ],
      description: [
        '<bsb>대학생부터 스타트업 대표까지 많은 사람들이 겪는 팀빌딩의 어려움을 해결하고자 만든 서비스입니다.</bsb> 프론트엔드 개발을 단독으로 담당하고 기획부터 디자인에 폭넓게 관여하며 다양한 경험치를 쌓게 해준 프로덕트입니다.',
        'Next.js, TypeScript 기반으로 30개 이상 화면과 50개 이상의 컴포넌트 설계 및 개발',
        '60개 이상 API 연동을 통해 복잡한 상태 흐름 안정적 설계 및 유지보수 가능한 구조 구축',
        '페이지별 SSR과 CSR에 맞는 렌더링 전략을 분리 적용 ---주요 5개 페이지는 SSR 기반 데이터 패칭을 통해 초기 로딩 속도 및 SEO 점수 향상 ---나머지 CSR 페이지는 TanStack Query의 <code>prefetchQuery</code>를 활용해 콘텐츠 깜빡임 및 초기 로딩 지연 문제 해결 ---SEO 점수 84 → 100, FCP 1.6s → 0.4s로 개선 (Lighthouse 기준) --- <link href="https://www.ddhelop.com/11">관련 블로그 포스트</link>',
        'Infinite Query와 리스트 가상화를 결합하여 무한 스크롤 구현 ---첫 콘텐츠 로딩 시간 1.5s -> 0.3s, 체류 시간 20% 증가 --- <link href="https://www.ddhelop.com/12">관련 블로그 포스트</link>',
        'WebSocket과 STOMP를 활용한 실시간 채팅 및 알림 시스템 구현 ---Zustand 상태 캐싱과 자동 재연결 로직을 통해 안정성과 사용자 경험 개선',
        'Feature-Sliced Design 아키텍처로 관심사 분리와 코드 가독성 향상',
        '디자이너 없이 다양한 디바이스에 대응하는 반응형 UI를 직접 구현',
      ],
    },
    // 개인 모노레포
    {
      id: 'project-portfolio',
      name: '이력서/포트폴리오 모노레포',
      period: '2025.04 - 현재',
      position: '개인 프로젝트',
      members: '1인',
      links: {
        github: 'https://github.com/ddhelop/ddhelop-monorepo',
        websites: [
          {
            name: 'pf-website',
            url: 'https://pf.ddhelop.com',
          },
          {
            name: 'rs-website',
            url: 'https://rs.ddhelop.com',
          },
        ],
      },
      logo: '/logos/my_logo.svg',
      technologies: [
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'Shadcn/UI',
        'biome',
        'Vercel',
        'pnpm',
        'Turbo',
      ],
      contributionAreas: [
        {
          id: 'portfolio-full',
          area: '전체',
          percentage: 100,
        },
      ],
      description: [
        '<bsb>이력서(rs)와 포트폴리오(pf)를 Turbo 기반 모노레포로 통합 관리한 개인 프로젝트.</bsb>\n 지금 보고 계신 이력서도 이것을 기반으로 만들어졌습니다.',
        '이력서와 포트폴리오를 각각 독립된 앱으로 운영하는 Turbo 기반 모노레포 환경 설계 --- <code>/rs</code>, <code>/pf</code> 을 하위 도메인으로 분리.',
        '정적 사이트 생성(SSG)기반의 웹사이트',
        '반응형 레이아웃 설계로 모든 디바이스에서 일관된 UI/UX를 제공 ---디자인 없이 CursorAI를 활용해 빠르게 UI를 설계 및 구현.',
        '모듈화된 컴포넌트 구조 설계 ---새로운 프로젝트나 콘텐츠 추가 시에도 손쉽게 유지보수 및 확장 가능하도록 구성.',
        '커스텀 마크업을 React 엘리먼트로 변환해주는 텍스트 파서 훅을 구현.',
      ],
    },

    {
      id: 'project-ibt',
      name: 'IBT 웹사이트',
      period: '2024.01 - 2024.02',
      position: '팀 프로젝트 (프론트엔드 개발)',
      members: '3인 (프론트엔드 3)',
      links: {
        github: 'https://github.com/ddhelop/IBT_Homepage-Web',
        websites: [
          {
            name: 'Website',
            url: 'https://www.rocketibt.co.kr/',
          },
        ],
      },
      logo: '/logos/IBT_logo.svg',
      technologies: [
        'Next.js',
        'TypeScript',
        'Framer Motion',
        'TailwindCSS',
        'Recoil',
        'Vercel',
      ],
      contributionAreas: [
        {
          id: 'ibt-frontend',
          area: '프론트엔드 개발',
          percentage: 33,
          details: '메인 페이지 및 반응형 구현',
        },
      ],
      description: [
        '스타트업의 브랜드 아이덴티티와 ESG 가치를 전달하는 인터랙티브 정적 웹사이트 구축 프로젝트입니다.',
        'Framer Motion 활용 부드러운 인터랙션 구현',
        'Next.js SSR SSG 부분 적용 및 SEO 구성',
        '랜딩 페이지 CSS scroll-snap을 적용해 사용자 중심의 직관적인 스크롤 흐름을 구현',
        '다국어 환경을 위해 Recoil 기반 글로벌 상태 관리 구조를 설계',
        'PC 디자인 시안에 맞춰 모든 페이지 반응형 웹 디자인 적용.',
      ],
    },
    {
      id: 'project-moa',
      name: '모아 커뮤니티',
      period: '2025.04 - 현재',
      position: '개인 프로젝트',
      members: '1',
      links: {
        github: 'https://github.com/ddhelop/moa-community',
        websites: [
          {
            name: 'Demo',
            url: 'https://www.mo-a.kr',
          },
        ],
      },
      logo: '/logos/moa_logo.svg',
      technologies: [
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'Supabase',
        'Vercel',
        'React Hook Form',
        'Shadcn UI',
      ],
      contributionAreas: [
        {
          id: 'moa-frontend',
          area: '전체',
          percentage: 100,
        },
      ],
      description: [
        '익명 게시판, 동네 인증, 게시판 생성 요청 기능 등 하이퍼로컬 커뮤니티 기능을 중심으로, 바이브 코딩 기반으로 빠르게 설계·개발 중인 지역 커뮤니티 플랫폼 MVP입니다.',
        'Cursor AI를 활용해 Figma 없이 UI를 바로 구현.',
        'Next.js + Supabase 기반의 서버리스 구조로, 비용 효율적인 개발 환경 구성',
      ],
    },
  ],
};

export default projectsData;
