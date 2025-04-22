'use client';

export default function PersonalInfo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-5xl font-bold">김동혁</h1>
        <h2 className="text-2xl text-gray-600">프론트엔드 개발자</h2>
      </div>

      <div className="flex flex-col space-y-1 mt-4">
        <p className="text-lg">clfgnm9@naver.com</p>
        <div className="flex gap-4">
          <a
            href="https://www.ddhelop.com"
            className="text-lg underline hover:text-main-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            href="https://www.linkedin.com/in/ddhelop/"
            className="text-lg underline hover:text-main-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ddhelop"
            className="text-lg underline hover:text-main-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
