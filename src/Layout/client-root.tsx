"use client";
import React, { useMemo } from "react";
import PopupRegistrationForm from "@/components/popup/form/popup-registration-form";
import { useFirstVisitPopup } from "@/hooks/use-visit-popup";
// import FloatingChat from "@/components/Layout/FloatingChat";
import { CategoryItem } from '@/types/category'
import MainLayout from "./main-layout";
import { PopupRegistrationProvider } from "@/context/popup-registration-context";


export default function ClientRoot({
  data = [],
  children,

}: { children: React.ReactNode, data: CategoryItem[]; }) {

  const { isOpen, open, close } = useFirstVisitPopup({
    storageKey: "popup:reg:v6",
    cooldownDays: 0.33333,
    delayMs: 200,
  });

  const logoApp = useMemo(() => data.find((i) => i.categoryType === "HEADER_LOGO")?.url, [data]);
  const menuItems = useMemo(() => data.find((i) => i.categoryType === "HEADER_MENU")?.children, [data]);

  // console.log("logoApp", logoApp)

  return (
    <PopupRegistrationProvider value={{ openRegistration: open, closeRegistration: close }}>
      <MainLayout
        headerlogo={logoApp}
        headerMenu={menuItems}
      >
        {children}
      </MainLayout>
      {/* <FloatingChat /> */}
      <PopupRegistrationForm isPopup={isOpen} onClose={close} />
    </PopupRegistrationProvider>
  );
}
