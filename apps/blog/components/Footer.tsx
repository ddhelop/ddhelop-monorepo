import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-12 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-6 mb-2">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              블로그
            </Link>
            <Link
              href="https://github.com/ddhelop"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
          <p className="text-sm text-gray-500">© {currentYear} 김동혁</p>
        </div>
      </div>
    </footer>
  );
}
