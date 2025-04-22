export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            © {currentYear} 김동혁. All rights reserved.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/ddhelop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ddhelop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:clfgnm9@naver.com"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
