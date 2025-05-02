import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          ddhelop.dev
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="https://ddhelop.dev"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
