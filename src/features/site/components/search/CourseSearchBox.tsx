"use client";

import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchCourses } from "@/features/public-api";
import { ROUTES, courseHref } from "../../config/routes";
import { analytics } from "../../lib/analytics";
import { formatVND } from "../../utils/currency";
import type { NavItem } from "../../types/nav";
import SearchPopup, { type SearchPopupData, type SearchSuggestionItem } from "./SearchPopup";

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

interface CourseSearchBoxProps {
  /** Gợi ý mặc định khi chưa nhập (thường là danh mục khóa học). */
  suggestions?: NavItem[];
}

export default function CourseSearchBox({ suggestions = [] }: CourseSearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaults: SearchSuggestionItem[] = suggestions.map((s) => ({ id: s.href, label: s.label, href: s.href, kind: "search" }));
  const [results, setResults] = useState<SearchPopupData | null>(null);
  const debouncedQuery = useDebouncedValue(query);
  const keyword = query.trim();

  useEffect(() => {
    const term = debouncedQuery.trim();
    if (!term) return;
    const controller = new AbortController();
    searchCourses(term, { pageSize: 6, signal: controller.signal })
      .then((res) => {
        setResults({
          recentTitle: "Gợi ý tìm kiếm",
          suggestions: defaults.filter((s) => s.label.toLowerCase().includes(term.toLowerCase())),
          products: res.items.map((c) => ({
            id: c.id,
            title: c.name,
            href: courseHref(c),
            imageUrl: c.thumbnailUrl,
            price: c.tuition > 0 ? formatVND(c.tuition) : "Liên hệ tư vấn",
            meta: `⏱ ${c.durationWeeks} tuần • 📍 ${c.mode}`,
          })),
          total: res.total,
          viewAllHref: `${ROUTES.courses}?q=${encodeURIComponent(term)}`,
        });
        setLoading(false);
        setOpen(true);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setResults({ recentTitle: "Gợi ý tìm kiếm", suggestions: [], products: [], total: 0 });
        setLoading(false);
        setOpen(true);
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const data: SearchPopupData = keyword && results ? results : { recentTitle: "Gợi ý tìm kiếm", suggestions: defaults, products: [], total: 0 };

  const goSearch = () => {
    if (!keyword) return;
    analytics.search(keyword);
    setOpen(false);
    router.push(`${ROUTES.courses}?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <SearchPopup
      query={query}
      data={data}
      loading={loading}
      open={open}
      onOpenChange={setOpen}
      onPickSuggestion={(text) => {
        setQuery(text);
        setOpen(true);
      }}
      onPickProduct={() => setOpen(false)}
      onViewAll={(href) => {
        setOpen(false);
        router.push(href);
      }}
    >
      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLoading(Boolean(e.target.value.trim()));
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter") goSearch();
          }}
          placeholder="Tìm khóa học…"
          aria-label="Tìm khóa học"
          className="w-[350px] max-w-[60vw] h-9 px-4 rounded-xl border border-gray-200 relative focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
        />
        <div className="absolute right-1 h-8 w-8 top-1/2 -translate-y-1/2 flex items-center justify-center bg-blue-500 hover:bg-blue-400 rounded-xl">
          {loading ? (
            <Loader2 className="w-4 h-6 animate-spin text-black" />
          ) : (
            <button type="button" className="cursor-pointer" onClick={goSearch} aria-label="Tìm kiếm">
              <Search className="w-4 h-6 text-black" />
            </button>
          )}
        </div>
      </div>
    </SearchPopup>
  );
}
