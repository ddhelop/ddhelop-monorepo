import type { SkillsItemData } from '../../../types/skillsType';

const skillsData: SkillsItemData = {
  title: '기술 스택',
  items: [
    {
      id: 'skills-frontend',
      name: '프론트엔드',
      description: [
        'React, Next.js: SSR/CSR 이해 및 최적화',
        'TypeScript: 정적 타입 시스템 활용',
        'TanStack Query: 효율적인 서버 상태 관리',
        'Zustand: 전역 상태 관리',
        'Tailwind CSS: 유틸리티 기반 스타일링',
        'Storybook: 컴포넌트 문서화 및 테스트',
      ],
    },
    {
      id: 'skills-backend',
      name: '백엔드',
      description: [
        'Node.js, Express: 기본적인 API 서버 구현',
        'MongoDB: NoSQL 데이터베이스 활용',
        'Firebase: 인증, 실시간 DB, Firestore',
      ],
    },
    {
      id: 'skills-tools',
      name: '개발 도구 및 방법론',
      description: [
        'Git, GitHub: 버전 관리 및 협업',
        'Docker: 컨테이너화 기초',
        'CI/CD: GitHub Actions, Vercel 배포 자동화',
        'Agile, Scrum: 협업 방법론',
      ],
    },
  ],
};

export default skillsData;
