"use client";

import Link from "next/link";

type ErrorProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
};

export default function AppError({ error, reset }: ErrorProps) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-sm sm:p-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
          <span className="font-semibold">Có lỗi</span>
          <span className="opacity-70">Hệ thống tạm thời gián đoạn</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Hệ thống đang bận hoặc máy chủ không phản hồi
        </h1>

        {/* Message */}
        <p className="mt-3 text-base leading-relaxed opacity-80">
          Bạn có thể thử tải lại trang, hoặc quay về trang chủ và tiếp tục khám phá lộ trình học PTE iPASS.
        </p>

        {/* Error detail (dev only) */}
        {!isProd && (
          <div className="mt-6 rounded-xl border bg-neutral-50 p-4">
            <p className="text-xs font-semibold opacity-70">Debug</p>
            <p className="mt-2 break-words font-mono text-xs leading-relaxed">
              {error?.message}
            </p>
            {error?.digest ? (
              <p className="mt-2 break-words font-mono text-xs opacity-70">
                digest: {error.digest}
              </p>
            ) : null}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => reset?.()}
            className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Thử lại
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
          >
            Về trang chủ
          </Link>

          <Link
            href="/khoa-hoc"
            className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
          >
            Xem khóa học
          </Link>
        </div>

        {/* Support */}
        <p className="mt-6 text-sm opacity-70">
          Nếu lỗi vẫn tiếp tục, vui lòng thử lại sau vài phút hoặc liên hệ bộ phận hỗ trợ.
        </p>
      </section>
    </main>
  );
}
