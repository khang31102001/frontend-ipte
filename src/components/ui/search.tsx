import React, { useState, FormEvent } from "react";
import clsx from "clsx";

interface SearchLayoutProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  defaultValue?: string;
  onSearch: (keyword: string) => void;
  actionsSlot?: React.ReactNode;
  filtersSlot?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const SearchLayout: React.FC<SearchLayoutProps> = ({
  title = "Tìm kiếm",
  subtitle,
  placeholder = "Nhập từ khóa để tìm kiếm...",
  defaultValue = "",
  onSearch,
  actionsSlot,
  filtersSlot,
  children,
  className,
}) => {
  const [keyword, setKeyword] = useState<string>(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <section
      className={clsx(
        "w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
        className
      )}
    >
      {/* Header */}
      <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm sm:text-base text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions bên phải: nút "Thêm mới", "Export"… */}
        {actionsSlot && (
          <div className="flex items-center gap-2">{actionsSlot}</div>
        )}
      </header>

      {/* Thanh Search */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm sm:text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            placeholder={placeholder}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* Icon search */}
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            {/* dùng lucide-react Search nếu có, còn không thì text/icon đơn giản */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
              />
            </svg>
          </span>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Tìm kiếm
        </button>
      </form>

      {/* Filters (nếu có) */}
      {filtersSlot && (
        <div className="mb-4 sm:mb-6 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-3 sm:px-4 sm:py-3">
          {filtersSlot}
        </div>
      )}

      {/* Kết quả / children */}
      <div>{children}</div>
    </section>
  );
};

export default SearchLayout;


// vd:
  // <SearchLayout
  //     title="Tìm khóa học PTE"
  //     subtitle="Lọc theo kỹ năng, mục tiêu điểm, hoặc từ khóa cụ thể."
  //     placeholder="Ví dụ: PTE 65+, speaking, writing…"
  //     onSearch={handleSearch}
  //     actionsSlot={
  //       <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
  //         + Thêm khóa học
  //       </button>
  //     }
  //     filtersSlot={
  //       <div className="flex flex-wrap items-center gap-2 text-sm">
  //         <span className="font-medium text-slate-700">Bộ lọc:</span>
  //         <button className="rounded-full border border-slate-300 px-3 py-1 hover:bg-white">
  //           Beginner
  //         </button>
  //         <button className="rounded-full border border-slate-300 px-3 py-1 hover:bg-white">
  //           Target 65+
  //         </button>
  //         <button className="rounded-full border border-slate-300 px-3 py-1 hover:bg-white">
  //           Target 79+
  //         </button>
  //       </div>
  //     }
  //   ></SearchLayout>