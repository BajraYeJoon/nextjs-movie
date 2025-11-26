'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(pageNum));
    return `${pathname}?${params.toString()}`;
  };

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {hasPrevious ? (
        <Link
          href={createPageUrl(currentPage - 1) as any}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          ← Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
        >
          ← Previous
        </button>
      )}

      <span className="text-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={createPageUrl(currentPage + 1) as any}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Next →
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
        >
          Next →
        </button>
      )}
    </div>
  );
}
