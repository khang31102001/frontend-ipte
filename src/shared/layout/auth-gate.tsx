"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/core/auth";
import { ErrorState, PageLoading } from "@/shared/ui";

/**
 * Chỉ render nội dung khi đã có phiên. Chưa đăng nhập ⇒ chuyển tới /login (kèm đường dẫn để quay lại);
 * đang dùng mật khẩu tạm ⇒ chuyển tới /change-password; lỗi kết nối ⇒ báo và cho thử lại.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const { status, session, refresh } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const mustChange = status === "authenticated" && session?.user.mustChangePassword === true;

  useEffect(() => {
    if (status === "unauthenticated") router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    else if (mustChange) router.replace("/change-password");
  }, [status, mustChange, pathname, router]);

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

  if (status !== "authenticated" || mustChange) return <PageLoading label="Đang xác thực…" />;
  return <>{children}</>;
}
