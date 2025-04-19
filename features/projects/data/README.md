# 프로젝트 데이터 구조

이 디렉토리는 포트폴리오 프로젝트 데이터를 관리하는 파일들을 포함하고 있습니다.

## 파일 구조

- **projectsData.ts**: 모든 프로젝트 데이터가 중앙 집중식으로 저장된 파일입니다.
- **projectTemplate.ts**: 새 프로젝트를 추가할 때 참고할 수 있는 템플릿 파일입니다.

## 데이터 구조

각 프로젝트는 다음과 같은 구조로 데이터를 정의합니다:

```typescript
{
  meta: {
    title: string;
    duration: string;
    links?: {
      github?: string;
      website?: string;
    };
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
  troubleshootItems: {
    [key: string]: {
      id: string;
      title: string;
      problem: { id: string; text: string }[];
      solution: string;
      results: string;
      highlight: string[];
      image?: TroubleshootImage;
      link?: {
        url: string;
        text: string;
      };
      linkText?: {
        text: string;
        url: string;
      }[];
      term_links?: {
        [term: string]: string;
      };
      section_links?: {
        problem?: string;
        solution?: string;
        results?: string;
      };
      section_link_ranges?: {
        problem?: { text: string; url: string }[];
        solution?: { text: string; url: string }[];
        results?: { text: string; url: string }[];
      };
    };
  };
  insight?: string;
}
```

## 새 프로젝트 추가 방법

1. **이미지 준비**: `/public/images/projects/{프로젝트명}/` 경로에 필요한 이미지를 추가합니다.
2. **projectsData.ts 파일 수정**:
   - `projectTemplate.ts` 파일을 참고하여 필요한 데이터 구조를 복사합니다.
   - 새 프로젝트 데이터를 모듈화하여 작성합니다 (각 섹션별 상수 정의).
   - 데이터를 `ProjectItemData` 형식으로 조합합니다.
   - `projects` 객체에 새 프로젝트를 추가합니다.

## 텍스트 내 링크 추가 방법

트러블슈팅 항목에서 텍스트 내 특정 부분에 링크를 추가하는 방법은 다음과 같습니다:

### 1. linkText 속성 사용

`linkText` 속성을 사용하여 solution 텍스트 내 특정 부분에 링크를 추가할 수 있습니다:

```typescript
troubleshootItems: {
  example: {
    // ... 다른 속성들
    solution: "이 문제를 해결하기 위해 React Query의 useInfiniteQuery를 사용했습니다.",
    linkText: [
      {
        text: "React Query의 useInfiniteQuery",
        url: "https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery"
      }
    ]
  }
}
```

이 설정은 "React Query의 useInfiniteQuery" 텍스트에 지정된 URL로 연결되는 링크를 자동으로 생성합니다.

### 2. section_link_ranges 속성 사용

특정 섹션(problem, solution, results) 내의 여러 텍스트 범위에 링크를 추가하려면 `section_link_ranges` 속성을 사용합니다:

```typescript
troubleshootItems: {
  example: {
    // ... 다른 속성들
    section_link_ranges: {
      solution: [
        {
          text: '백오프 알고리즘을 적용',
          url: 'https://example.com/backoff-algorithm',
        },
        {
          text: '메시지 캐싱 시스템',
          url: 'https://example.com/message-caching',
        },
      ];
    }
  }
}
```

### 3. term_links 속성 사용

반복되는 용어에 동일한 링크를 적용하려면 `term_links` 속성을 사용합니다:

```typescript
troubleshootItems: {
  example: {
    // ... 다른 속성들
    highlight: ["WebSocket", "STOMP"],
    term_links: {
      "WebSocket": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
      "STOMP": "https://stomp-js.github.io/"
    }
  }
}
```

## 사용 방법

프로젝트 컴포넌트에서 다음과 같이 사용할 수 있습니다:

```tsx
import { linkit } from './common/data/projectsData';
import ProjectItem from './common/components/ProjectItem';

export default function MyComponent() {
  return <ProjectItem data={linkit} />;
}
```

또는 모든 프로젝트를 가져와서 사용:

```tsx
import { projects, projectIds } from './common/data/projectsData';
import ProjectItem from './common/components/ProjectItem';

export default function ProjectList() {
  return (
    <div>
      {projectIds.map((id) => (
        <ProjectItem key={id} data={projects[id]} />
      ))}
    </div>
  );
}
```

## 유지보수 및 확장

각 프로젝트 데이터는 독립적으로 관리되며, 새로운 프로젝트 추가 시 기존 코드를 변경할 필요 없이 `projectsData.ts` 파일에 새 프로젝트 데이터만 추가하면 됩니다.
