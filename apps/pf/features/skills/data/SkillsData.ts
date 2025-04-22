import type { SkillsItemData } from '../../../types/skillsType';

const skillsData: SkillsItemData = {
  title: '기술 스택',
  items: [
    {
      id: 'skills-overall',
      name: 'Overall',
      description: [
        '디자인 시안 없이도 AI 도구를 활용해 화면 설계부터 UI 개발까지 빠르게 구현할 수 있습니다.',
        '주어진 요구사항을 기능이 아닌 사용자 경험 중심으로 해석하고, 구조적 흐름을 설계하는 데 익숙합니다.',
        '단순 구현을 넘어서 “왜 만들고 누구를 위한 것인지”에 대한 고민을 바탕으로 UI/UX를 개선해왔습니다.',
        '문제 상황에서 주도적으로 분석하고, 데이터 기반으로 개선 솔루션을 제안할 수 있습니다.',
      ],
    },
    {
      id: 'skills-frontend',
      name: 'Frontend',
      description: [
        'React와 Next.js에 능숙하며, SSR/CSR/ISR 전략을 상황에 맞게 분리 적용할 수 있습니다.',
        'TypeScript 기반 프로젝트에서 타입을 적극적으로 활용해 예측 가능한 코드를 작성합니다.',
        'React Query(TanStack Query)를 통한 서버 상태 관리와 prefetchQuery를 활용한 성능 최적화 경험이 있습니다.',
        'Zustand를 이용해 실시간 기능(WebSocket)에서도 안정적인 상태 관리를 구성할 수 있습니다.',
        'TailwindCSS와 Shadcn UI로 디자인 시스템 기반의 일관된 UI를 구성할 수 있습니다.',
        '브라우저 reflow 발생을 고려한 컴포넌트 구조 설계 및 최적화를 경험했습니다.',
        'Framer Motion 기반 인터랙션을 통해 섬세한 사용자 경험을 구현할 수 있습니다.',
        '디자인 시안과 구현물의 미세한 차이(1px 단위)도 인지하고 조율할 수 있는 감각이 있습니다.',
        '반응형 UI와 접근성을 고려한 구조 설계와 개발에 익숙합니다.',
      ],
    },
    {
      id: 'skills-devops',
      name: 'Devops',
      description: [
        'Vercel을 통한 빠른 배포와 SSR 기반 SEO 최적화 경험이 있습니다.',
        'pnpm + Turbo 기반 모노레포 구조를 구성하고, 공통 훅 패키지를 분리 관리할 수 있습니다.',
      ],
    },
    {
      id: 'skills-collab',
      name: 'Communication',
      description: [
        '협업 시 내가 맡은 작업 외에도 전체 맥락을 이해하고, 주변 작업 흐름에도 관심을 가집니다.',
        '문제가 생겼을 때 혼자 오래 붙잡기보다 먼저 공유하고, 함께 해결하는 커뮤니케이션을 중요하게 생각합니다.',
        '팀의 방향성과 목표에 동의한다면 주도적으로 아이디어나 개선사항을 제안합니다.',
        '내가 한 결정이나 의견에 대해서는 책임감 있게 수행합니다.',
        '팀 내에 침묵보다 불편한 진실이 낫다고 생각하며, 건설적인 피드백 문화를 지향합니다.',
      ],
    },
  ],
};

export default skillsData;
