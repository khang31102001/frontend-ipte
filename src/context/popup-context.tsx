"use client";

import PopupComponent from "@/components/shared/PopupComponent";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";


type PopupState = {
  open: boolean;
  title?: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
};

type PopupContextValue = {
  showPopup: (title: string, description?: string, status?: PopupState["status"]) => void;
  closePopup: () => void;
};

const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popupState, setPopupState] = useState<PopupState>({
    open: false,
    title: "",
    description: "",
  });

  const closePopup = useCallback(() => {
    setPopupState((prev) => ({ ...prev, open: false }));
  }, []);

  const showPopup = useCallback((title: string, description?: string, status?: PopupState["status"]) => {
    setPopupState({
      open: true,
      title,
      description,
      status,
    });
  }, []);

  const value = useMemo(() => ({ showPopup, closePopup }), [showPopup, closePopup]);

  return (
    <PopupContext.Provider value={value}>
      {children}
      <PopupComponent
        isOpen={popupState.open}
        onClose={closePopup}
        title={popupState.title}
        description={popupState.description}
        status={popupState.status}
        primaryAction={{
          label: "Đóng",
          onClick: closePopup,
        }}
      />
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within <PopupProvider />");
  return ctx;
}
