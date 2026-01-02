
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: any) => void
    className?: string
}
const CirclePagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className = "",

}: PaginationProps) => {
    return (
        <div className={`pagination ${className ?? ""}`}>
            <button
                onClick={() => onPageChange((prev: number) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination__nav"
                aria-label="Previous page"
            >
                <ChevronLeft className="pagination__icon" />
            </button>

            <div className="pagination__pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`pagination__page ${currentPage === page ? "is-active" : ""
                            }`}
                        aria-current={currentPage === page ? "page" : undefined}
                        aria-label={`Page ${page}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange((prev: number) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination__nav"
                aria-label="Next page"
            >
                <ChevronRight className="pagination__icon" />
            </button>
        </div>
    )
}

export default CirclePagination