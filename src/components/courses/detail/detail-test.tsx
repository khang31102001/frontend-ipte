import React from "react";
import DOMPurify from "isomorphic-dompurify";

/**
 * PTE Course Detail – Demo Page
 * --------------------------------------------------------------
 * ✅ Drop into a Next.js project or run in React preview.
 * ✅ Tailwind-only (no external UI libs) – clean, modern layout.
 * ✅ Safe HTML rendering (sanitize + responsive media embeds).
 *
 * Notes:
 * - Replace the mock `card` with your fetched data.
 * - If you use Next.js <Image>, swap <img> with <Image> + sizes.
 */

// ---- Types ----
type Card = {
  id: number;
  author_id: number;
  img?: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // raw HTML from CMS
};

// ---- Mock Data (demo) ----
const card: Card = {
  id: 1,
  author_id: 101,
  img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
  title: "PTE Intensive – Speaking & Writing Mastery (65–79+)",
  slug: "pte-intensive-speaking-writing",
  summary:
    "Khóa PTE tập trung 4 tuần: Speaking, Writing, Listening, Reading – kèm template và chấm chữa cá nhân hóa.",
  content: `
    <h2 id="gioi-thieu">Giới thiệu khóa học</h2>
    <p>Chương trình luyện PTE dành cho học viên mục tiêu <strong>65–79+</strong>. Nội dung tối ưu theo format 2025, tập trung điểm cao ở <em>Speaking</em> và <em>Writing</em> với checklist thực hành.</p>

    <h3 id="lo-trinh">Lộ trình 4 tuần</h3>
    <ul>
      <li>Tuần 1: Speaking – Read Aloud, Repeat Sentence; Writing – SWT</li>
      <li>Tuần 2: Speaking – Describe Image, Retell Lecture; Writing – WFD</li>
      <li>Tuần 3: Listening hotspots – WFD, HIW, SST; Reading – FIB</li>
      <li>Tuần 4: Mock test, chữa chi tiết theo tiêu chí máy chấm</li>
    </ul>

    <figure class="image">
      <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt="PTE class demo" />
      <figcaption>Buổi thực hành mô phỏng test center</figcaption>
    </figure>

    <h3 id="tai-lieu">Tài liệu & Template</h3>
    <p>Tải miễn phí bộ <a href="#" target="_blank" rel="noopener">PTE Writing & Speaking Templates</a> và checklist theo từng task.</p>

    <h3 id="video">Video demo bài giảng</h3>
    <p>Xem nhanh cách áp dụng template cho Describe Image và Retell Lecture:</p>
    <div class="embed">
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="PTE Demo" allowfullscreen loading="lazy"></iframe>
    </div>

    <h2 id="dang-ky">Đăng ký & Lịch học</h2>
    <table>
      <thead><tr><th>Lớp</th><th>Lịch</th><th>Hình thức</th><th>Học phí</th></tr></thead>
      <tbody>
        <tr><td>Intensive 65+</td><td>Tối 2-4-6</td><td>Online</td><td>5.900.000đ</td></tr>
        <tr><td>Intensive 79+</td><td>Tối 3-5-CN</td><td>Offline (Darwin)</td><td>7.900.000đ</td></tr>
      </tbody>
    </table>

    <blockquote>
      <p>“Điểm mạnh của khóa là lộ trình ngắn gọn, chữa bài chi tiết, template bám sát tiêu chí – rất phù hợp người bận rộn.”</p>
    </blockquote>

    <p>Liên hệ hotline <a href="tel:+61000000000">+61 000 000 000</a> hoặc nhấn nút đăng ký bên phải.</p>
  `,
};

// ---- Helpers ----
function sanitizeHtml(raw: string) {
  // allow target/rel on links, allow allowfullscreen on iframe
  return DOMPurify.sanitize(raw, {
    ADD_ATTR: ["target", "rel", "allow", "allowfullscreen", "loading", "title"],
  });
}

// ---- Main Component ----
export default function PteCourseDetailDemo() {
  // sanitize + ensure responsive embeds
  let safe = sanitizeHtml(card.content)
    .replaceAll("<iframe", '<div class="embed"><iframe')
    .replaceAll("</iframe>", "</iframe></div>");

  return (
    <article className="min-h-screen bg-white text-gray-900">
      {/* Top bar / breadcrumb */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <a href="#" className="hover:underline">Home</a>
          <span className="mx-1">/</span>
          <a href="#" className="hover:underline">PTE</a>
          <span className="mx-1">/</span>
          <span aria-current="page" className="text-gray-700 font-medium">{card.title}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{card.title}</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">{card.summary}</p>
        <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
          <img src="https://i.pravatar.cc/64?img=5" alt="Giảng viên" className="w-9 h-9 rounded-full object-cover" />
          <span>Giảng viên đội PTE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <time dateTime={new Date().toISOString()}>Cập nhật hôm nay</time>
        </div>
      </header>

      {/* Cover */}
      {card.img && (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
          <figure className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
            <img src={card.img} alt={card.title} className="w-full h-auto object-cover" />
          </figure>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
        {/* Body */}
        <div className="text-[1.05rem] leading-8" aria-label="Article body">
          <ArticleBody html={safe} />
        </div>

        {/* Sidebar */}
        <aside className="relative">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Thông tin khóa PTE</h3>
                <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 text-[0.96rem]">
                  <dt className="text-gray-500">Cấp độ</dt><dd className="text-gray-800">65–79 (Proficient)</dd>
                  <dt className="text-gray-500">Lịch học</dt><dd className="text-gray-800">Tối 2-4-6</dd>
                  <dt className="text-gray-500">Hình thức</dt><dd className="text-gray-800">Online/Offline</dd>
                  <dt className="text-gray-500">Học phí</dt><dd className="text-gray-800">Liên hệ</dd>
                </dl>
                <a href="#dang-ky" className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-gray-900 px-4 py-2.5 text-sm font-semibold hover:bg-gray-900 hover:text-white transition">Đăng ký học</a>
              </div>
            </div>

            <nav className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4" aria-label="Table of contents">
              <h3 className="font-semibold text-gray-900">Mục lục</h3>
              <ol className="mt-2 list-decimal pl-5 space-y-1 text-[0.96rem]">
                <li><a className="hover:underline" href="#gioi-thieu">Giới thiệu</a></li>
                <li><a className="hover:underline" href="#lo-trinh">Lộ trình</a></li>
                <li><a className="hover:underline" href="#tai-lieu">Tài liệu</a></li>
                <li><a className="hover:underline" href="#video">Video demo</a></li>
                <li><a className="hover:underline" href="#dang-ky">Đăng ký</a></li>
              </ol>
            </nav>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4">
              <h3 className="font-semibold text-gray-900">Khóa liên quan</h3>
              <ul className="mt-2 list-disc pl-5 text-[0.96rem]">
                <li><a className="hover:underline" href="#">PTE Speaking Tips</a></li>
                <li><a className="hover:underline" href="#">PTE Writing Templates</a></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">PTE</span>
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">Speaking</span>
          <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-sm">Template</span>
        </div>
        <button className="text-sm font-medium underline underline-offset-4">Chia sẻ</button>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-100 p-3 shadow-lg lg:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="text-sm">
            <div className="font-semibold">Đăng ký khóa PTE</div>
            <div className="text-gray-500">Nhận tư vấn lộ trình phù hợp</div>
          </div>
          <a href="#dang-ky" className="inline-flex items-center justify-center rounded-full border border-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white transition">Đăng ký ngay</a>
        </div>
      </div>

      {/* Style overrides for sanitized HTML */}
      <style>{`
        .image { text-align:center; }
        .image figcaption { color:#6b7280; font-size:.9rem; margin-top:.25rem; }
        .embed { position:relative; width:100%; aspect-ratio:16/9; border-radius:14px; overflow:hidden; border:1px solid #eef2f7; background:#000; }
        .embed iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }
        .article-body h2 { font-size:1.5rem; margin-top:1.5rem; font-weight:800; }
        .article-body h3 { font-size:1.15rem; margin-top:1.25rem; font-weight:700; }
        .article-body a { color:#1d4ed8; text-decoration:underline; }
        .article-body a:hover { color:#1e40af; }
        .article-body blockquote { border-left:4px solid #e5e7eb; padding:.5rem 1rem; color:#374151; background:#fafafa; border-radius:8px; margin:1rem 0; }
        .article-body table { width:100%; border-collapse:collapse; font-size:.98rem; margin:1rem 0; }
        .article-body th, .article-body td { border:1px solid #e5e7eb; padding:.6rem .7rem; }
        .article-body th { background:#f9fafb; font-weight:600; }
        .article-body tr:nth-child(even) td { background:#fcfcfd; }
      `}</style>
    </article>
  );
}

// Renders sanitized HTML with consistent typography
function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-body [&>*+*]:mt-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
