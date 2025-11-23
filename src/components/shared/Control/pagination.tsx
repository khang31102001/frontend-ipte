
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
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <button
                onClick={() => onPageChange((prev: any) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-full  transition-colors hover:bg-gray-400 p-3"
            >
                <ChevronLeft className="h-5 w-5 " />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`bg-hero-gradient rounded-full w-10 h-10 ${currentPage === page ? "bg-[#001F3F] text-white hover:bg-[#001F3F]/90" : "hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange((prev:any) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className=" rounded-full  transition-colors hover:bg-gray-400 p-3"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    )
}

export default CirclePagination