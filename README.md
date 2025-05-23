<div style="display: flex; gap: 16px;">
  <img src="https://github.com/user-attachments/assets/dce34e9d-6bd8-4231-863d-c99ac37400bc" alt="rs" width="100"/>
  <img src="https://github.com/user-attachments/assets/ce66bea6-0046-4648-8fd9-896e9082e14f" alt="pf" width="100"/>
  <img src="https://github.com/user-attachments/assets/59945cb8-14a1-452b-b84a-5ffc7a1c8a4b" alt="blog" width="100"/>
</div>

# ddhelop-monorepo

프론트엔드 개발자 김동혁의 모노레포 프로젝트입니다. 포트폴리오와 이력서 웹사이트를 포함하고 있습니다.

## 📦 모노레포 구조

```
ddhelop-monorepo/
├── apps/                 # 앱 프로젝트
│   ├── pf/               # 포트폴리오 웹사이트
│   ├── rs/               # 이력서 앱
│   └── blog/             # 블로그 앱
├── packages/             # 공유 패키지
│   ├── hooks/            # 공통 React 훅
│   ├── mdx/              # MDX 컴포넌트 및 에디터
│   └── typescript-config/ # 공통 TypeScript 설정
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
- **아이콘**: Heroicons 및 Lucide React
- **데이터베이스**: Supabase
- **인증**: 구글 OAuth
- **에디터**: MDX 에디터 (Monaco Editor 기반)
- **코드 품질 관리**: Biome

## 📋 프로젝트 구성

### 앱 (Apps)

- **pf**: 포트폴리오 웹사이트
  - **주요 기능**: 프로젝트 소개, 기술 스택, 경력 정보, 연락처
  - **특징**: 인터랙티브 UI, 반응형 디자인, 다크 모드 지원
- **rs**: 이력서 앱
  - **주요 기능**: 인적 사항, 프로젝트 경험, 경력, 교육
  - **특징**: 플로팅 네비게이션
- **blog**: 블로그 앱
  - **주요 기능**: MDX 기반 블로그 포스트, 코드 하이라이팅, 태그 시스템, 관리자 대시보드
  - **특징**: SSG 정적 생성, SEO 최적화, 성능 최적화, Supabase 기반 DB 저장소
  - **관리자 기능**: 포스트 작성/편집, 이미지 업로드, 태그 관리, Google OAuth 인증

### 패키지 (Packages)

- **@ddhelop/hooks**: 공통 React 훅

  - useFormattedText: 커스텀 텍스트 포맷팅 훅 (마크다운 스타일 텍스트 지원)

- **@ddhelop/mdx**: MDX 관련 컴포넌트 및 에디터

  - MdxEditor: MDX 에디터 컴포넌트
  - MdxViewer: MDX 렌더링 컴포넌트
  - MdxComponents: 커스텀 MDX 요소 컴포넌트 집합
  - 기타: 이미지, 링크, 콜아웃 등 MDX 확장 컴포넌트

- **@ddhelop/typescript-config**: 공통 TypeScript 설정
  - base: 기본 설정
  - nextjs: Next.js 프로젝트용 설정
  - react-library: React 라이브러리용 설정

## 📝 커스텀 텍스트 포맷팅

이 프로젝트에서는 간편한 텍스트 스타일링을 위해 커스텀 태그를 사용합니다:

```
<md>중요한 텍스트</md> - 중간 강조
<sb>강조하고 싶은 텍스트</sb> - 진한 강조 (회색)
<bsb>브랜드 강조</bsb> - 브랜드 색상으로 강조
<b-sb>큰 브랜드 강조</b-sb> - 큰 폰트 브랜드 강조
<code>인라인 코드 텍스트</code> - 인라인 코드 스타일
<link href="https://example.com">링크 텍스트</link> - 외부 링크
```

**추가 기능**: 서브 텍스트 지원

```
메인 텍스트---서브 텍스트 1---서브 텍스트 2
```

이 형식을 사용하면 메인 텍스트 아래에 서브 텍스트가 들여쓰기되어 표시됩니다.

## 🖨 인쇄 최적화

이력서 앱은 브라우저의 인쇄 기능으로 PDF 추출이 가능하도록 최적화되어 있습니다:

- CSS `@media print` 쿼리를 통한 인쇄 스타일 적용
- 인쇄 시 불필요한 요소(네비게이션, 푸터, 링크 등) 자동 숨김
- 페이지 여백과 페이지 나눔 제어
- 고품질 이미지 및 색상 인쇄 지원

인쇄하려면 브라우저에서 Ctrl+P(Windows) 또는 Cmd+P(Mac)를 누르고 인쇄 또는 PDF로 저장을 선택하세요.

## 🧩 패키지 사용 방법

### 훅 사용하기

```tsx
import { useFormattedText } from '@ddhelop/hooks';

function MyComponent() {
  const { formatText } = useFormattedText();

  return <div>{formatText('이것은 <bsb>강조</bsb>된 텍스트입니다.')}</div>;
}
```

### MDX 에디터 사용하기

```tsx
import { MdxEditor } from '@ddhelop/mdx';

function BlogPostEditor() {
  const [content, setContent] = useState('');

  return (
    <MdxEditor
      value={content}
      onChange={setContent}
      onImageUpload={async (file) => {
        // 이미지 업로드 로직
        return 'https://example.com/images/uploaded-image.jpg';
      }}
    />
  );
}
```

### MDX 렌더링하기

```tsx
import { MdxViewer } from '@ddhelop/mdx';

function BlogPost({ content }) {
  return (
    <article className="prose dark:prose-invert">
      <MdxViewer content={content} />
    </article>
  );
}
```

## 🔐 인증 기능

블로그 앱은 관리자 대시보드에 안전하게 접근하기 위해 Google OAuth 기반 인증을 사용합니다:

- 특정 관리자 이메일만 접근 가능
- 토큰 기반 인증
- 세션 관리 (쿠키 및 localStorage)

## 🖼️ 이미지 업로드

블로그 앱에서는 Supabase Storage를 활용한 이미지 업로드 시스템을 구현했습니다:

- 클라이언트 측 이미지 압축
- 서버 측 인증 확인
- 상대 경로 URL 반환 (API 프록시)
- 이미지 캐싱 및 최적화
