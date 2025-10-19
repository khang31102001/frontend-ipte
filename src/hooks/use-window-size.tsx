import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Hàm xử lý khi resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Gọi lần đầu để cập nhật kích thước ban đầu
    handleResize();

    // Cleanup để tránh memory leak
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
