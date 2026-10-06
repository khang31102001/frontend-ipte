"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { captureAttribution, type PublicForm } from "@/features/public-api";
import PopupRegistrationForm from "../components/popup/form/popup-registration-form";
import { useFirstVisitPopup } from "../hooks/use-visit-popup";

interface SiteContextValue {
  /** Mở popup đăng ký học thử/tư vấn (null khi biểu mẫu chưa cấu hình). */
  openRegistration: () => void;
  closeRegistration: () => void;
  hasRegistrationForm: boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite phải được dùng bên trong <SiteProvider>");
  return ctx;
}

interface SiteProviderProps {
  children: ReactNode;
  registrationForm: PublicForm | null;
}

export function SiteProvider({ children, registrationForm }: SiteProviderProps) {
  const { isOpen, open, close } = useFirstVisitPopup({ storageKey: "popup:reg:v7", cooldownDays: 0.33, delayMs: 8000 });

  useEffect(() => {
    captureAttribution();
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({ openRegistration: open, closeRegistration: close, hasRegistrationForm: registrationForm !== null }),
    [open, close, registrationForm],
  );

  return (
    <SiteContext.Provider value={value}>
      {children}
      {registrationForm && <PopupRegistrationForm form={registrationForm} isPopup={isOpen} onClose={close} />}
    </SiteContext.Provider>
  );
}
