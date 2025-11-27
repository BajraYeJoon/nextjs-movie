'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const buildPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {hasPrev ? (
        <Link
          href={buildPageLink(currentPage - 1) as any}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-opacity hover:opacity-90 inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Previous
        </button>
      )}

      <span className="page text-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={buildPageLink(currentPage + 1) as any}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-opacity hover:opacity-90 inline-flex items-center gap-2"
        >
          Next
          <ArrowRight size={18} />
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed inline-flex items-center gap-2"
        >
          Next
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
