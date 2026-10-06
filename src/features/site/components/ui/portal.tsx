"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

/**
 * Render ra `document.body`. Bọc trong `.site` (display: contents) để các style của website
 * (được giới hạn trong `.site`) vẫn áp dụng cho nội dung portal.
 */
export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="site" style={{ display: "contents", minHeight: 0 }}>
      {children}
    </div>,
    document.body,
  );
}
