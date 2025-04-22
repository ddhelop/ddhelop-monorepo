import type {
  ProjectImage,
  ProjectItemData,
  TroubleshootImage,
} from '../../../types/projectType';

/**
 * 링킷 프로젝트 데이터
 * 이 파일에서 링킷 프로젝트의 모든 데이터를 정의합니다.
 */

const projectData: ProjectItemData = {
  // 프로젝트 메타 정보
  meta: {
    title: '링킷(Linkit)',
    duration: '24.05 ~ 현재',
    links: {
      website: 'https://www.linkit.im',
      github: 'https://github.com/ddhelop/Linkit_disclosure',
    },
    logo: '/logos/linkit_logo.svg',
  },

  // 테마 설정
  theme: {
    bgColor: 'bg-blue-50/30',
    textColor: 'text-blue-900',
  },

  // 프로젝트 소개
  introduction: {
    description: [
      '링킷은 개인과 팀을 효율적으로 연결하는 <sb>팀 빌딩 및 네트워킹 플랫폼</sb>입니다.',
      '기존 팀 매칭 서비스들의 검색 난이도, 신뢰성 부족, 제한적인 매칭 대상 등의 문제를 해결하고자 시작된 프로젝트입니다.',
      '기존 커뮤니티 기반의 팀 매칭의 한계를 넘어, 기술 스택 기반 매칭, 실시간 채팅, 팀 관리, 포트폴리오 기능까지 포함하여 팀의 시작과 실행을 하나의 흐름으로 연결합니다.',
    ],
    // image: {
    //   src: '/images/projects/linkit/intro.webp',
    //   alt: '링킷 프로젝트 소개 이미지',
    // },
  },

  // 프로젝트 구성원
  members: '기획자(1), 디자이너(1), 프론트엔드(1), 백엔드(1)',

  // 기여도 영역
  contributionAreas: [
    {
      id: 'contrib-1',
      area: '프론트엔드 개발',
      percentage: 100,
      details:
        '전체 프론트엔드 아키텍처 설계 및 구현, 컴포넌트 시스템 정의, UI/UX 최적화',
    },
  ],

  // 기술 스택
  techStack: [
    'Next.js',
    'TypeScript',
    'React Query',
    'Zustand',

    'WebSocket',
    'TailwindCSS',
    'Vercel',
  ],

  // 기술 선정 이유
  techReasons: [
    {
      id: 'tech-1',
      tech: 'Next.js',
      reason:
        '페이지별로 클라이언트 중심의 렌더링 구조를 유연하게 설계할 수 있어, 기능별 데이터 처리 방식에 맞춰 적용하기 적합했습니다.',
    },

    {
      id: 'tech-2',
      tech: 'TypeScript',
      reason:
        '상태 관리와 API 연동이 많은 구조에서, 타입으로 흐름을 통제할 수 있어 안정성과 유지보수에 유리했습니다.',
    },
    {
      id: 'tech-3',
      tech: 'React Query',
      reason:
        '서버 상태 관리와 캐싱을 추상화해, 복잡한 화면에서도 데이터 흐름과 코드를 간결하게 유지할 수 있어 적합했습니다',
    },
    {
      id: 'tech-4',
      tech: 'Zustand',
      reason:
        '서버 상태 관리와 캐싱을 추상화해, 복잡한 화면에서도 데이터 흐름과 코드를 간결하게 유지할 수 있어 적합했습니다.',
    },
    {
      id: 'tech-5',
      tech: 'TailwindCSS',
      reason:
        '클래스 단위로 스타일을 세밀하게 제어할 수 있어 시각적으로 구조를 파악하기 쉬웠고, 개인적인 작업 성향과도 잘 맞았습니다.',
    },
    {
      id: 'tech-6',
      tech: 'WebSocket',
      reason:
        '채팅방 단위의 메시지 구독 구조를 단순하게 구현할 수 있어, WebSocket과 함께 STOMP를 적용했습니다.',
    },

    {
      id: 'tech-7',
      tech: 'Vercel',
      reason:
        'Next.js에 최적화된 환경 덕분에, 빠른 배포와 SSR 대응이 모두 가능해 실 서비스 운영에 적합했습니다.',
    },
  ],

  // Empty roleItems to satisfy type requirements
  roleItems: [],

  // 요약 (성과 및 주요 특징을 통합)
  summary: [
    {
      id: 'summary-1',
      text: '<sb>30개 이상의 실제 서비스 화면과 50개 이상의 재사용 컴포넌트</sb>를 설계 및 구현하고, 전 화면에서 모바일/데스크톱 <sb>반응형 UI</sb>를 완벽하게 대응',
    },
    {
      id: 'summary-2',
      text: '<sb>60개 이상의 API 연동 경험</sb>을 통해 복잡한 비즈니스 로직과 UI 상태를 안정적으로 연결하고, 유지보수 가능한 구조를 설계',
    },
    {
      id: 'summary-3',
      text: '기존 Desktop 위주의 디자인 시안을 <sb>다양한 디바이스 환경에 최적화된 반응형 UI</sb>로 디자인 없이 임의로 구현',
    },
    {
      id: 'summary-4',
      text: '<sb>React Query의 prefetchQuery</sb>로 데이터를 서버에서 선패칭하고 클라이언트 컴포넌트에서 하이드레이션하여,\nCSR 기반 구조에서 발생하던 <sb>초기 로딩 지연과 콘텐츠 깜빡임 문제를 해결</sb>',
    },
    {
      id: 'summary-5',
      text: 'React Query의 <link href="https://ddhelop.tistory.com/12">Infinite Query와 리스트 가상화를 결합해 무한스크롤 구현</link>,  첫 콘텐츠 로딩 시간 1.5s → 0.3s로 약 80% 단축, 페이지 평균 체류 시간 20% 증가 (GA 기준)',
    },
    {
      id: 'summary-6',
      text: '<link href="https://ddhelop.tistory.com/9">Feature-Sliced Design 아키텍처를 도입</link>하여 기능 단위 모듈화와 관심사 분리를 통해 코드 가독성과 유지보수성을 향상',
    },
    {
      id: 'summary-7',
      text: '<code>WebSocket</code> + <code>STOMP</code> 기반의 실시간 채팅 및 알림 시스템 구현,\n<sb>Zustand 상태 캐싱</sb> 전략과 자동 재연결 로직을 통해 안정성과 사용자 경험 개선',
    },
    {
      id: 'summary-8',
      text: 'SEO와 FCP 개선을 위한 렌더링 최적화 적용으로 크롬 Lighthouse SEO 점수 84 → 100, FCP 1.6s → 0.4s로 단축',
    },
    {
      id: 'summary-9',
      text: '<sb>Next.js 13의 중첩 레이아웃 구조</sb>를 활용해 모바일과 PC에서 일관된 채팅 UX 제공, 사용자 전환 행동을 고려한 레이아웃 최적화',
    },
  ],

  // 트러블슈팅 항목
  troubleshootItems: {
    loading: {
      id: 'trouble-1',
      title:
        'CSR 환경의 느린 초기 로딩 속도와 낮은 SEO 점수로 사용자 경험 저하',
      problem: [
        {
          id: 'loading-1',
          text: 'CSR 방식 사용 시 초기 FCP 평균 1.6초로 사용자 체감 속도 저하',
        },
        {
          id: 'loading-2',
          text: '검색 엔진 노출에 불리하여 Lighthouse SEO 점수 84점',
        },
        {
          id: 'loading-3',
          text: '클라이언트에서 모든 데이터를 비동기로 가져오면서 콘텐츠 깜빡임(flickering) 현상 발생',
        },
      ],
      solution: [
        'Next.js App Router 환경에서 <sb>React Query의 prefetchQuery</sb>를 활용해 서버에서 데이터를 선패칭하고, 클라이언트 컴포넌트에서는 <sb>useQuery</sb>를 통한 하이드레이션 방식으로 CSR 기반 렌더링 구조를 최적화했습니다.',
        '데이터 구조와 페이지 흐름에 맞춰 클라이언트 렌더링의 한계를 보완하고, 초기 화면 완성도와 SEO 접근성을 개선했습니다.',
      ],
      results: [
        'SEO 점수 84점 → 100점,',
        'FCP 1.6초 → 0.4초 (약 75% 단축)',
        '콘텐츠 깜빡임 현상 해소 및 비로그인 사용자 대상 초기 접근성 향상',
      ],
      highlight: ['React Query', 'prefetchQuery', 'useQuery'],
      relatedLinks: [
        {
          title: '빈 화면 없이 자연스럽게 데이터 갱신하여 SSR UX 개선하기',
          url: 'https://ddhelop.tistory.com/9',
        },
      ],
    },
    auth: {
      id: 'trouble-2',
      title: 'SSR 환경에서 로컬스토리지 기반 JWT 인증 불가',
      problem: [
        {
          id: 'auth-1',
          text: 'SSR 환경에서는 <code>localStorage</code>에 접근할 수 없어, 클라이언트 저장소 기반 JWT 인증이 동작하지 않음',
        },
        {
          id: 'auth-2',
          text: '로컬스토리지에 저장된 토큰은 XSS 공격에 매우 취약, 보안상 노출 위험 존재',
        },
        {
          id: 'auth-3',
          text: 'SSR과 CSR 간 인증 처리 방식이 달라 코드 중복 및 유지보수 복잡도 증가',
        },
      ],
      solution: [
        'JWT 저장 방식을 <code>HttpOnly 쿠키</code> 기반으로 전환하여 클라이언트에서 접근할 수 없도록 조치',
        'Next.js의 <code>cookies()</code> API를 사용해 SSR 단계에서도 인증 정보를 일관되게 처리',
        '쿠키 기반 인증 체계로 전환하며, CSRF 대응을 위한 <code>SameSite</code> 속성 및 토큰 검증 로직도 함께 적용해 보안 계층 강화',
        '인증 흐름을 클라이언트/서버 공통 구조로 통합하여 코드 중복을 줄이고 유지보수성을 개선',
      ],
      results: [
        'XSS로 인한 클라이언트 토큰 탈취 위험 제거, 보안성 강화',
        '증 흐름 일관성 확보로 CSR/SSR 간 사용자 경험 통합',
        '인증 관련 코드 통합 및 간소화로 유지보수 효율 향상',
      ],
      highlight: ['HttpOnly 쿠키', 'cookies() API', 'SameSite'],
    },
    scroll: {
      id: 'trouble-3',
      title: '무한스크롤 성능 및 UX 개선',
      problem: [
        {
          id: 'scroll-1',
          text: '무한스크롤 데이터 로딩 트리거가 페이지 최하단에 있어 추가 로딩 지연으로 인한 UX 저하',
        },
        {
          id: 'scroll-2',
          text: '대용량 리스트 렌더링으로 인한 메모리 사용량 증가',
        },
        {
          id: 'scroll-3',
          text: '스크롤 위치 복원 문제로 인한 사용자 경험 저하',
        },
      ],
      solution: [
        'React Query의 useInfiniteQuery를 사용하여 페이지네이션 로직을 단순화했습니다.',
        '가상화 기술을 적용하여 DOM에 실제 보이는 항목만 렌더링하도록 최적화했습니다.',
        '데이터 로딩 트리거 지점을 페이지 최하단에서 위로 25% 위치로 조정하여 선로드 전략을 구현했습니다.',
        '사용자 스크롤 위치를 SessionStorage에 저장하여 페이지 이동 후에도 경험이 유지되도록 했습니다.',
      ],
      results: [
        '첫 콘텐츠 로딩 시간 1.5s → 0.3s로 약 80% 단축',
        '메모리 사용량 40% 감소 (크롬 개발자 도구 메모리 프로파일링 기준)',
        '페이지 평균 체류 시간 20% 증가 (Google Analytics 기준)',
        '모바일 기기에서의 스크롤 성능 및 배터리 효율성 개선',
      ],
      highlight: ['선로드 전략', 'useInfiniteQuery', '가상화 기술'],
      relatedLinks: [
        {
          title: 'React Query와 Intersection Observer를 활용한 무한스크롤 구현',
          url: 'https://ddhelop.tistory.com/12',
        },
      ],
    },
    chat: {
      id: 'trouble-4',
      title: '모바일 화면에서 채팅 목록과 채팅창 동시 표시로 가독성 저하',
      problem: [
        {
          id: 'chat-1',
          text: '데스크톱 환경에 최적화된 2단 채팅 UI가 모바일에서는 요소 크기가 작아져 사용성 저하',
        },
        {
          id: 'chat-2',
          text: '모바일에서 채팅 목록과 채팅창 간 전환 시 사용자 경험 불일치',
        },
      ],
      solution: [
        'Next.js 13의 중첩 레이아웃 기능으로 채팅 페이지 구조를 개선했습니다.',
        '반응형 디자인을 적용하여 PC에서는 목록과 채팅창을 동시에 표시하도록 했습니다.',
        '모바일 최적화를 통해 화면 크기에 따라 자동으로 단일 화면으로 전환되는 UI를 구현했습니다.',
        '모바일에서는 직관적인 뒤로가기와 스와이프 액션을 추가하여 자연스러운 화면 전환 경험을 제공했습니다.',
      ],
      results: [],
      highlight: [''],
    },
  },

  // 인사이트
  insight:
    '이 프로젝트를 통해 CSR 중심의 구조에서 React Query의 prefetch를 활용한 클라이언트 렌더링 최적화 전략을 설계하고, 인증 방식과 상태 관리, 데이터 패칭 구조를 서비스 흐름에 맞게 재정립하는 경험을 쌓았습니다.\n\n 특히 기술적 개선이 SEO 점수, FCP, 페이지 체류 시간 등의 실제 사용자 지표 향상으로 이어지는 과정을 직접 측정하고 개선하며, 데이터 기반의 판단력과 실행력을 키울 수 있었습니다. 또한 Feature-Sliced Design 아키텍처를 도입해 기능 단위로 구조화된 모듈 설계 방식을 익히고, 코드 확장성과 유지보수성을 고려한 설계 역량을 강화했습니다.',
};

export default projectData;
