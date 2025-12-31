"use client";

interface SkeletonProps {
  title?: string;
  rows?: number; // số dòng mô phỏng khi loading
}

export default function Skeleton({ title = "Đang tải...", rows = 3 }: SkeletonProps) {
  return (
    <div className="animate-pulse space-y-4 p-6 border border-gray-200 rounded-lg bg-white/30 shadow-sm">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>

      {/* Dãy box giả lập */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-md" />
        ))}
      </div>
    </div>
  );
}
