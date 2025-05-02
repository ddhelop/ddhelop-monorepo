import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 py-8 mt-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} 김동혁. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              블로그
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              소개
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
