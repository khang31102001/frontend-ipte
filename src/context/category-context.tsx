"use client";

import { CategoryItem } from "@/types/category";
import { createContext, useContext } from "react";

interface CategoryContextValue {
  category: CategoryItem;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({
  value,
  children,
}: {
  value: CategoryContextValue;
  children: React.ReactNode;
}) {
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategory must be used within CategoryProvider");
  }
  return ctx;
}
