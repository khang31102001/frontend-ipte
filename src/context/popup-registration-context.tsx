"use client";

import React, { createContext, useContext } from "react";

type PopupRegistrationContextValue = {
  openRegistration: () => void;
  closeRegistration: () => void;
};

const PopupRegistrationContext = createContext<PopupRegistrationContextValue | null>(null);

export function PopupRegistrationProvider({
  value,
  children,
}: {
  value: PopupRegistrationContextValue;
  children: React.ReactNode;
}) {
  return (
    <PopupRegistrationContext.Provider value={value}>
      {children}
    </PopupRegistrationContext.Provider>
  );
}

export function usePopupRegistration() {
  const ctx = useContext(PopupRegistrationContext);
  if (!ctx) throw new Error("usePopupRegistration must be used within PopupRegistrationProvider");
  return ctx;
}
