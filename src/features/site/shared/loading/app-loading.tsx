"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppLoading() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Mỗi khi pathname đổi → bật loading
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 500ms -> luôn thấy loading

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="app-loading-overlay">
      <div className="app-loading">
        <div className="app-loading__spinner" />
        <p className="app-loading__text">Đang tải nội dung...</p>
        <p className="app-loading__subtext">PTE iPASS đang chuẩn bị trải nghiệm cho bạn</p>
      </div>
    </div>
  );
}
