# ddhelop-monorepo

프론트엔드 개발자 김동혁의 모노레포 프로젝트입니다. 포트폴리오 웹사이트와 향후 확장될 앱들을 포함하고 있습니다.

## 📦 모노레포 구조

```
ddhelop-monorepo/
├── apps/                 # 앱 프로젝트
│   ├── pf/               # 포트폴리오 웹사이트
│   └── rs/               # 향후 추가될 앱 (예정)
├── packages/             # 공유 패키지
│   ├── ui/               # 공통 UI 컴포넌트
│   ├── hooks/            # 공통 React 훅
│   └── assets/           # 공통 에셋 (로고, 이미지 등)
├── styles/               # 전역 스타일
├── pnpm-workspace.yaml   # PNPM 워크스페이스 설정
└── turbo.json            # Turborepo 설정
```

## 🔧 기술 스택

- **패키지 관리**: PNPM 워크스페이스
- **모노레포 관리**: Turborepo
- **프레임워크**: Next.js 15.3.0
- **UI 라이브러리**: React 19
- **스타일링**: TailwindCSS 4
- **언어**: TypeScript
- **애니메이션**: Framer Motion
- **인쇄 기능**: 브라우저 내장 인쇄 API 활용
- **아이콘**: Lucide React
- **코드 품질 관리**: Biome

## 📋 프로젝트 구성

### 앱 (Apps)

- **pf**: 포트폴리오 웹사이트 - 개인 프로젝트와 기술 스택을 소개하는 사이트
- **주요 기능**: 소개, 프로젝트
- **rs**: (향후 추가 예정) - 아력서 공간

### 패키지 (Packages)

- **@ddhelop/ui**: 공통 UI 컴포넌트

  - FloatingNav: 플로팅 네비게이션 컴포넌트
  - Footer: 푸터 컴포넌트
  - ScrollProgressBar: 스크롤 진행률 표시바
  - ExternalLink: 외부 링크 컴포넌트
  - SectionHeader: 섹션 헤더 컴포넌트
  - ImageSection: 이미지 섹션 컴포넌트

- **@ddhelop/hooks**: 공통 React 훅

  - useFormattedText: 커스텀 텍스트 포맷팅 훅

- **@ddhelop/assets**: 공통 에셋
  - 로고 및 이미지 파일
  - 에셋 경로 상수

## ⚙️ 시작하기

### 저장소 클론

```bash
git clone https://github.com/ddhelop/ddhelop-monorepo.git
cd ddhelop-monorepo
```

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# 모든 앱 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter my-portfolio dev
```

### 프로덕션 빌드

```bash
# 모든 앱 빌드
pnpm build

# 특정 앱만 빌드
pnpm --filter my-portfolio build
```

### 코드 품질 관리

```bash
# 모든 프로젝트 린트
pnpm lint

# 특정 앱/패키지만 린트
pnpm --filter @ddhelop/ui lint
```

## 📝 커스텀 텍스트 포맷팅

이 프로젝트에서는 간편한 텍스트 스타일링을 위해 커스텀 태그를 사용합니다:

```
<highlight>강조하고 싶은 텍스트</highlight> - 텍스트 강조 표시
<code>인라인 코드 텍스트</code> - 인라인 코드 스타일 적용
<link href="https://example.com">링크 텍스트</link> - 외부 링크 생성
```

이 태그들은 `@ddhelop/hooks` 패키지의 `useFormattedText` 훅을 통해 처리됩니다.

## 🧩 패키지 사용 방법

### 훅 사용하기

```tsx
import { useFormattedText } from '@ddhelop/hooks';

function MyComponent() {
  const { formatText } = useFormattedText();

  return (
    <div>
      {formatText('이것은 <highlight>강조</highlight>된 텍스트입니다.')}
    </div>
  );
}
```
