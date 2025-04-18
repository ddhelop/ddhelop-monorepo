# 포트폴리오 웹사이트

개인 포트폴리오 웹사이트 프로젝트입니다. Next.js, React 19, TypeScript, TailwindCSS를 활용하여 모던한 개발 기술을 선보이는 웹사이트입니다.

## 🚀 기술 스택

- **프레임워크**: Next.js 15.3.0
- **UI 라이브러리**: React 19
- **스타일링**: TailwindCSS 4
- **언어**: TypeScript
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **코드 품질 관리**: Biome
- **UI 개발 환경**: Storybook

## 📋 주요 기능

- 소개 페이지
- 프로젝트 포트폴리오 전시
- 기술 스택 소개
- 연락처 정보

## 📝 커스텀 텍스트 포맷팅

이 프로젝트에서는 간편한 텍스트 스타일링을 위해 커스텀 태그를 사용합니다:

```
<highlight>강조하고 싶은 텍스트</highlight> - 텍스트 강조 표시
<code>인라인 코드 텍스트</code> - 인라인 코드 스타일 적용
<link href="https://example.com">링크 텍스트</link> - 외부 링크 생성
```

이 태그들은 `useFormattedText` 훅을 통해 처리되며, 마크다운 없이도 텍스트에 스타일을 간편하게 적용할 수 있습니다.

## 🛠️ 프로젝트 구조

```
ddhrepo/
├── .next/             # Next.js 빌드 결과물
├── .storybook/        # Storybook 설정
├── public/            # 정적 파일
├── src/               # 소스 코드
│   ├── app/           # Next.js App Router
│   ├── components/    # 공통 컴포넌트
│   ├── features/      # 기능별 컴포넌트
│   │   ├── intro/     # 소개 섹션
│   │   ├── projects/  # 프로젝트 섹션
│   │   ├── skills/    # 기술 스택 섹션
│   │   └── contact/   # 연락처 섹션
│   ├── lib/           # 유틸리티 함수
│   │   ├── formatting/  # 텍스트 포맷팅 유틸리티
│   │   └── hooks/      # 커스텀 훅
│   ├── shared/        # 공유 리소스
│   └── types/         # 타입 정의
└── styles/            # 전역 스타일
```

## ⚙️ 설치 및 실행

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 프로덕션 빌드

```bash
pnpm build
```

### 프로덕션 서버 실행

```bash
pnpm start
```

### Storybook 실행

```bash
pnpm storybook
```

## 🧪 코드 품질 관리

```bash
pnpm lint
```

## 📝 작업 중인 기능

- 프로젝트 섹션 완성
- 트러블슈팅 섹션 추가
- 반응형 디자인 개선

## 🤝 기여하기

이슈와 풀 리퀘스트는 언제나 환영합니다!

## 📄 라이센스

이 프로젝트는 개인 포트폴리오 목적으로 만들어진 프로젝트입니다.
