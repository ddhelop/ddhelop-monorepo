import Link from "next/link";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * 외부 링크 컴포넌트 - 접근성 기능 포함
 */
const ExternalLink = ({
  href,
  children,
  className = "text-xs text-main font-medium inline-flex items-center gap-1 hover:underline",
}: ExternalLinkProps) => (
  <Link href={href} className={className} target="_blank" rel="noopener noreferrer">
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
    <span className="sr-only">(새 창에서 열기)</span>
  </Link>
);

export default ExternalLink;
