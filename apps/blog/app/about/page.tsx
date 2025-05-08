import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개 | 김동혁의 블로그',
  description:
    '프로덕트 엔지니어 김동혁의 소개 페이지입니다. 기술 스택, 경력, 프로젝트 경험에 대한 정보를 확인하실 수 있습니다.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">소개</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">김동혁</h2>
        <p className="text-gray-700 mb-6">
          안녕하세요, 프로덕트 엔지니어 김동혁입니다. 사용자 중심의 웹
          애플리케이션을 설계하고 개발하는 것을 좋아합니다. 프론트엔드와
          백엔드를 아우르는 풀스택 개발 경험을 바탕으로 완성도 높은 제품을
          만들기 위해 노력하고 있습니다.
        </p>
        <div className="flex space-x-4 mb-6">
          <Link
            href="https://github.com/ddhelop"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/ddhelop"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">기술 스택</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">프론트엔드</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>React, Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">백엔드</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Node.js</li>
              <li>Prisma</li>
              <li>Supabase</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">DevOps</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Docker</li>
              <li>GitHub Actions</li>
              <li>Vercel</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">이 블로그에 대하여</h2>
        <p className="text-gray-700 mb-4">
          이 블로그는 웹 개발, 프로그래밍, 그리고 제가 배우고 경험한 것들을
          공유하는 공간입니다. 주로 다음과 같은 주제를 다룹니다:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>프론트엔드 개발 경험과 팁</li>
          <li>React와 Next.js 관련 튜토리얼</li>
          <li>웹 개발 베스트 프랙티스</li>
          <li>개발자 성장 이야기</li>
        </ul>
        <p className="text-gray-700">
          블로그 콘텐츠나 협업 제안에 관한 문의는 언제든지 환영합니다.
        </p>
      </section>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
