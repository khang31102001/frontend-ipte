"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { isApiError } from "@/core/api";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        // Chỉ thử lại lỗi mạng/máy chủ; lỗi 4xx (validation, 404, 403...) là kết quả cuối.
        retry: (failureCount, error) =>
          failureCount < 2 && (!isApiError(error) || error.isRetryable),
      },
      mutations: { retry: false },
    },
  });
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(makeQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
