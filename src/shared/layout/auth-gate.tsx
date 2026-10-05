"use client";

import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/core/auth";
import { Button, ErrorState, PageLoading } from "@/shared/ui";

/** Chỉ render nội dung khi đã có phiên. Xử lý các trạng thái đang tải / chưa đăng nhập / lỗi kết nối. */
export function AuthGate({ children }: { children: ReactNode }) {
  const { status, refresh, adapter } = useAuth();

  if (status === "loading") return <PageLoading label="Đang xác thực…" />;

  if (status === "error") {
    return (
      <div className="mx-auto max-w-lg py-24">
        <ErrorState
          title="Không kết nối được máy chủ"
          description="Không lấy được thông tin phiên đăng nhập. Kiểm tra NEXT_PUBLIC_API_BASE_URL và trạng thái API."
          onRetry={() => void refresh()}
        />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-24 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Lock className="size-7" />
        </div>
        <h1 className="text-lg font-semibold">Chưa đăng nhập</h1>
        <p className="mt-1 text-sm text-gray-500">Phiên đăng nhập đã hết hạn hoặc chưa được thiết lập.</p>
        <Button className="mt-5" onClick={() => void refresh()}>
          Thử lại ({adapter.name})
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
