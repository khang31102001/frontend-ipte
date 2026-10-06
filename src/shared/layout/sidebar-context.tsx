"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface SidebarContextValue {
  /** Desktop: sidebar mở rộng cố định. */
  isExpanded: boolean;
  /** Desktop: đang thu gọn nhưng rê chuột vào nên tạm mở. */
  isHovered: boolean;
  /** Mobile: drawer đang mở. */
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  setIsHovered: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar phải nằm trong <SidebarProvider>");
  return ctx;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = useCallback(() => setIsExpanded((v) => !v), []);
  const toggleMobileSidebar = useCallback(() => setIsMobileOpen((v) => !v), []);
  const closeMobileSidebar = useCallback(() => setIsMobileOpen(false), []);

  const value = useMemo<SidebarContextValue>(
    () => ({
      isExpanded: isMobile ? false : isExpanded,
      isHovered,
      isMobileOpen,
      toggleSidebar,
      toggleMobileSidebar,
      closeMobileSidebar,
      setIsHovered,
    }),
    [isMobile, isExpanded, isHovered, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
