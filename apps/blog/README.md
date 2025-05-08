# Blog App

프론트엔드 기술에 관한 블로그 애플리케이션입니다.

## 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따르고 있습니다.

### 디렉토리 구조

```
apps/blog/
├── app/                # Next.js App Router 페이지
├── entities/           # 도메인 엔티티 (Post, Tag 등)
├── features/           # 기능 단위 모듈
│   ├── author/         # 저자 관련 기능
│   ├── home/           # 홈페이지 관련 기능
│   ├── post/           # 포스트 관련 기능
│   └── tag/            # 태그 관련 기능
├── lib/                # 유틸리티 및 라이브러리
├── shared/             # 공유 컴포넌트 및 유틸리티
└── widgets/            # 위젯 (여러 기능을 조합한 UI 블록)
```

### 레이어 설명

- **entities**: 비즈니스 엔티티 (Post, Tag 등)의 타입과 모델을 정의합니다.
- **features**: 특정 기능과 관련된 모든 것을 포함합니다. 각 feature는 다음 구조를 가집니다:
  - **api**: 데이터 가져오기 및 조작 함수
  - **model**: 비즈니스 로직 및 상태 관리
  - **components**: 기능과 관련된 UI 컴포넌트
- **shared**: 여러 기능에서 공유되는 UI 컴포넌트, 유틸리티, 타입 등
- **widgets**: 여러 기능을 조합한 더 큰 UI 블록

## 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- date-fns
- MDX

## 기술 스택

- **프레임워크**: Next.js 15
- **스타일링**: TailwindCSS 4
- **콘텐츠**: MDX (Markdown with JSX)
- **코드 하이라이팅**: rehype-pretty-code + Shiki
- **성능 측정**: Vercel Analytics & Speed Insights
- **서버리스 환경**: Vercel Serverless Functions

## 주요 기능

- **정적 생성(SSG)**: 빠른 로딩 시간을 위해 모든 페이지를 빌드 시간에 정적으로 생성
- **MDX 지원**: 마크다운과 JSX 컴포넌트를 함께 사용 가능
- **코드 하이라이팅**: 구문 강조 및 라인 번호 표시
- **반응형 디자인**: 모바일 및 데스크톱 모두 최적화된 UI
- **SEO 최적화**: 메타태그, OpenGraph, 사이트맵, robots.txt 등 설정
- **성능 최적화**: 이미지 최적화, 웹폰트 최적화, 지연 로딩 등

## 디렉토리 구조

```
blog/
├── app/                 # Next.js App Router
│   ├── blog/            # 블로그 관련 페이지
│   │   ├── [slug]/      # 개별 블로그 포스트 페이지
│   │   └── page.tsx     # 블로그 목록 페이지
│   ├── about/           # 소개 페이지
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 홈페이지
│   ├── robots.ts        # SEO를 위한 robots.txt
│   └── sitemap.ts       # SEO를 위한 sitemap.xml
├── components/          # 재사용 가능한 컴포넌트
│   ├── mdx/             # MDX 렌더링 관련 컴포넌트
│   ├── NavBar.tsx       # 네비게이션 바
│   └── Footer.tsx       # 푸터
├── content/             # 블로그 콘텐츠 (MDX 파일)
│   └── blog/            # 블로그 포스트
├── lib/                 # 유틸리티 함수
│   └── mdx.ts           # MDX 처리 관련 함수
└── public/              # 정적 파일
```

## 로컬 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm --filter blog dev
```

## 배포

```bash
# 배포를 위한 빌드
pnpm --filter blog build
```
