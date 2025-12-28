"use client";

import React from "react";
import { ClientQueryProvider } from "@/providers/ClientQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { PopupProvider } from "@/context/popup-context";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <PopupProvider>
          {children}
        </PopupProvider>
      </ThemeProvider>
    </ClientQueryProvider>
  );
}
