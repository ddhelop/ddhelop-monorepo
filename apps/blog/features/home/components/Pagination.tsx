import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
}

export function Pagination({
  currentPage,
  totalPages,
  createPageUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10">
      <nav className="inline-flex items-center">
        {currentPage > 1 && (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="px-3 py-1 rounded-md mr-2 bg-gray-100 hover:bg-gray-200"
          >
            이전
          </Link>
        )}

        <div className="flex space-x-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <Link
                key={`page-${pageNumber}`}
                href={createPageUrl(pageNumber)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>

        {currentPage < totalPages && (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="px-3 py-1 rounded-md ml-2 bg-gray-100 hover:bg-gray-200"
          >
            다음
          </Link>
        )}
      </nav>
    </div>
  );
}
