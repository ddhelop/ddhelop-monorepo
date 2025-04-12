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
