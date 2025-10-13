import React from "react";
import Link from "next/link";
import { userService } from "@/services/course/courseService";

// ---- Types matching your API shape ----
export type CourseItem = {
  course_id: number;
  course_code: string;
  course_name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  level: string | null;
  mode: string | null;
  language: string | null;
  price: string | number | null;
  duration_hours: number | null;
  start_date: string | null;
  end_date: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  version: number | null;
  category: "BASIS" | "ADVANCE" | "IPASS" | string;
};

export type CoursesResponse = {
  items: CourseItem[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

// ---- Helpers ----
function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatPrice(price: string | number | null) {
  if (price === null || price === undefined) return "—";
  const n = typeof price === "string" ? Number(price) : price;
  if (!Number.isFinite(n)) return String(price);
  if (n === 0) return "Miễn phí";
  return n.toLocaleString("vi-VN") + "₫";
}

// ---- Data fetching ----
async function getCourses(): Promise<CoursesResponse> {
  try {
    console.log("Fetching IPT Cơ bản courses...");
    const res = await userService.getCourses({ category: "IPASS", page: 1, page_size: 20 });
    console.log("Fetched IPT Cơ bản courses:", res);
    return res as CoursesResponse;
  } catch (err) {
    console.warn("[ipt-co-ban] Using fallback sample due to fetch error:", err);
    return {
      items: [],
      page: 1,
      page_size: 20,
      total: 0,
      total_pages: 1,
    } satisfies CoursesResponse;
  }
}

// ---- UI badges ----
function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
      {label}
    </span>
  );
}

function CategoryBadge({ category }: { category: CourseItem["category"] }) {
  const map: Record<string, string> = {
    BASIS: "Cơ bản",
    ADVANCE: "Nâng cao",
    IPASS: "iPass",
  };
  return <Pill label={`Học phần: ${map[category] ?? category}`} />;
}

function LevelBadge({ level }: { level: string | null }) {
  if (!level) return null;
  return <Pill label={`Level: ${level}`} />;
}

function ModeBadge({ mode }: { mode: string | null }) {
  if (!mode) return null;
  return <Pill label={mode === "ONLINE" ? "Học online" : mode} />;
}

// ---- Page ----
export const metadata = {
  title: "IPT Cơ bản | Khóa học",
  description: "Danh sách khóa học IPT cơ bản (BASIS) với lộ trình rõ ràng và cam kết đầu ra.",
};

export default async function Page() {
  const data = await getCourses();
  const items = data.items ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">Trang chủ</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/khoa-hoc" className="hover:underline">Khóa học</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">IPT cơ bản</li>
        </ol>
      </nav>

      {/* Heading */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">IPT cơ bản</h1>
        <p className="mt-2 text-gray-600">
          Các khóa học thuộc nhóm <span className="font-semibold">BASIS</span> – phù hợp người mới hoặc cần củng cố nền tảng.
        </p>
      </header>

      {/* Summary */}
      <section className="mb-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Tìm thấy <span className="font-semibold text-gray-900">{data.total}</span> khóa học
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((c) => (
          <article key={c.course_id} className="rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <CategoryBadge category={c.category} />
                <LevelBadge level={c.level} />
                <ModeBadge mode={c.mode} />
                {c.language && <Pill label={`Ngôn ngữ: ${c.language.toUpperCase()}`} />}
              </div>

              <h2 className="text-xl font-semibold leading-snug">
                <Link href={`/khoa-hoc/${c.slug}`} className="hover:underline">
                  {c.course_name}
                </Link>
              </h2>
              {c.short_description && (
                <p className="text-gray-700">{c.short_description}</p>
              )}

              <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-gray-500">Mã khóa</dt>
                  <dd className="font-medium">{c.course_code}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Học phí</dt>
                  <dd className="font-medium">{formatPrice(c.price)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Thời lượng</dt>
                  <dd className="font-medium">{c.duration_hours ?? 0} giờ</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Khai giảng</dt>
                  <dd className="font-medium">{formatDate(c.start_date)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/khoa-hoc/${c.slug}`}
                  className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  Xem chi tiết
                </Link>
                <Link
                  href={`/dang-ky?course=${c.slug}`}
                  className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination (simple, hidden if only 1 page) */}
      {data.total_pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 text-sm">
          <span>Trang</span>
          <span className="font-semibold">{data.page}</span>
          <span>/ {data.total_pages}</span>
        </div>
      )}
    </main>
  );
}
