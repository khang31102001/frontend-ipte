import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Badge */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
          <span className="font-semibold">404</span>
          <span className="opacity-70">Không tìm thấy trang</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Oops! Trang bạn tìm không tồn tại
        </h1>

        {/* Description */}
        <p className="mt-3 text-base opacity-80">
          Có thể đường dẫn bị sai, trang đã được đổi tên hoặc nội dung đã được cập nhật.
          Bạn có thể quay về trang chủ hoặc khám phá các khóa học PTE.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Về trang chủ
          </Link>

          <Link
            href="/khoa-hoc"
            className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-black/5"
          >
            Xem khóa học PTE
          </Link>

          <Link
            href="/lien-he"
            className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-black/5"
          >
            Liên hệ hỗ trợ
          </Link>
        </div>

        {/* Help cards */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-left">
            <p className="text-sm font-semibold">Bạn muốn thi mục tiêu 65+?</p>
            <p className="mt-1 text-sm opacity-75">
              Xem lộ trình học theo kỹ năng.
            </p>
          </div>
          <div className="rounded-xl border p-4 text-left">
            <p className="text-sm font-semibold">Cần tài liệu & tips?</p>
            <p className="mt-1 text-sm opacity-75">
              Ghé mục Knowledge để luyện nhanh.
            </p>
          </div>
          <div className="rounded-xl border p-4 text-left">
            <p className="text-sm font-semibold">Muốn học 1:1?</p>
            <p className="mt-1 text-sm opacity-75">
              Đặt lịch tư vấn miễn phí ngay.
            </p>
          </div>
        </div>

        {/* Small note */}
        <p className="mt-8 text-xs opacity-60">
          Nếu bạn nghĩ đây là lỗi hệ thống, hãy gửi link cho team để kiểm tra.
        </p>
      </div>
    </main>
  );
}
