"use client";

import { PopupProvider } from "@/context/popup-context";
import React from "react";


export default function PopupProviders({ children }: { children: React.ReactNode }) {
  return <PopupProvider>{children}</PopupProvider>;
}
