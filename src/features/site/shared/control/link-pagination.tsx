import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface LinkPaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  /** Tham số truy vấn giữ nguyên khi chuyển trang (ví dụ q). */
  query?: Record<string, string | undefined>;
  className?: string;
}

function hrefFor(basePath: string, page: number, query: LinkPaginationProps["query"]) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query ?? {})) if (v) params.set(k, v);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/** Phân trang dạng liên kết (SEO-friendly, chạy trên Server Component). */
export default function LinkPagination({ page, totalPages, basePath, query, className = "" }: LinkPaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={`pagination ${className}`} aria-label="Phân trang">
      {page > 1 ? (
        <Link href={hrefFor(basePath, page - 1, query)} className="pagination__nav" aria-label="Trang trước" rel="prev">
          <ChevronLeft className="pagination__icon" />
        </Link>
      ) : (
        <span className="pagination__nav" aria-disabled="true">
          <ChevronLeft className="pagination__icon" />
        </span>
      )}

      <div className="pagination__pages">
        {pages.map((p) => (
          <Link key={p} href={hrefFor(basePath, p, query)} className={`pagination__page ${p === page ? "is-active" : ""}`} aria-current={p === page ? "page" : undefined} aria-label={`Trang ${p}`}>
            {p}
          </Link>
        ))}
      </div>

      {page < totalPages ? (
        <Link href={hrefFor(basePath, page + 1, query)} className="pagination__nav" aria-label="Trang sau" rel="next">
          <ChevronRight className="pagination__icon" />
        </Link>
      ) : (
        <span className="pagination__nav" aria-disabled="true">
          <ChevronRight className="pagination__icon" />
        </span>
      )}
    </nav>
  );
}
