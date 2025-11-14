"use client";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import PopupRegistrationForm from "@/components/popup/form/popup-registration-form";
import { useFirstVisitPopup } from "@/hooks/use-visit-popup";
import MainLayout from "./main-layout";
import FloatingChat from "@/components/Layout/FloatingChat";
// import { main_menu_categories } from "@/data/category";
import { CategoryItem } from '@/types/category'

export default function ClientRoot({ children, navMenuData=[] }: { children: React.ReactNode, navMenuData: CategoryItem[]; }) {

  const { isOpen, close } = useFirstVisitPopup({
    storageKey: "popup:reg:v5",
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
      <MainLayout
        menu={navMenuData}
      >
        {children}
      </MainLayout>
      <FloatingChat />

      <PopupRegistrationForm isPopup={isOpen} onClose={close} />
    </ThemeProvider>
  );
}
