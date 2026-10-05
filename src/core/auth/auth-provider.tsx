"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { apiClient, isApiError } from "@/core/api";
import { PermissionProvider } from "@/core/rbac";
import type { AuthAdapter, AuthStatus, Session } from "./types";

interface AuthContextValue {
  status: AuthStatus;
  session: Session | null;
  adapter: AuthAdapter;
  /**
   * Tải lại phiên (ví dụ sau khi đổi vai trò dev hoặc sửa quyền của vai trò hiện tại).
   * `silent = true`: giữ nguyên giao diện, không chuyển sang trạng thái "loading".
   */
  refresh: (silent?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ adapter, children }: { adapter: AuthAdapter; children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const adapterRef = useRef(adapter);
  adapterRef.current = adapter;

  // Nối adapter vào API client: token, header, refresh, xử lý 401.
  useEffect(() => {
    apiClient.configure({
      getAccessToken: () => adapter.getAccessToken?.() ?? null,
      refreshSession: adapter.refreshSession?.bind(adapter),
      onUnauthorized: () => {
        setSession(null);
        setStatus("unauthenticated");
        adapter.onUnauthorized?.();
      },
    });
    const remove = apiClient.addHeaderProvider(() => adapter.getRequestHeaders?.());
    return () => {
      remove();
      apiClient.configure({});
    };
  }, [adapter]);

  const load = useCallback(async (signal?: AbortSignal, silent = false) => {
    if (!silent) setStatus("loading");
    try {
      const next = await adapterRef.current.getSession(signal);
      if (signal?.aborted) return;
      setSession(next);
      setStatus(next ? "authenticated" : "unauthenticated");
    } catch (error) {
      if (signal?.aborted) return;
      setSession(null);
      setStatus(isApiError(error) && error.isUnauthorized ? "unauthenticated" : "error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, adapter]);

  const refresh = useCallback((silent = false) => load(undefined, silent), [load]);

  const signOut = useCallback(async () => {
    await adapterRef.current.signOut?.();
    setSession(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, session, adapter, refresh, signOut }),
    [status, session, adapter, refresh, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      <PermissionProvider permissions={session?.permissions ?? []}>{children}</PermissionProvider>
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải nằm trong <AuthProvider>");
  return ctx;
}
