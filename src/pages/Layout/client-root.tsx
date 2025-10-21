"use client";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import PopupRegistrationForm from "@/components/popup/form/popup-registration-form";
import { useFirstVisitPopup } from "@/hooks/use-visit-popup";
import MainLayout from "./main-layout";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
   const { isOpen, close } = useFirstVisitPopup({
    storageKey: "popup:reg:v2", 
    cooldownDays: 0.33333,
    delayMs: 200,
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MainLayout>
        {children}
      </MainLayout>

      <PopupRegistrationForm isPopup={isOpen} onClose={close} />
    </ThemeProvider>
  );
}
