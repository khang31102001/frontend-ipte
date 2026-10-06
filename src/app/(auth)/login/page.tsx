"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { authApi } from "@/core/auth";
import { isApiError } from "@/core/api";
import { Button, Input, Label } from "@/shared/ui";

/** Chỉ cho phép quay về đường dẫn nội bộ của khu quản trị (chống open-redirect). */
const safeNext = (next: string | null) => (next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const session = await authApi.login(email.trim(), password);
      router.replace(session.user.mustChangePassword ? "/change-password" : safeNext(params.get("next")));
    } catch (err) {
      setError(isApiError(err) ? err.message : "Không đăng nhập được, vui lòng thử lại");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-md dark:border-gray-800 dark:bg-gray-900">
        <div>
          <p className="text-xl font-bold text-brand-500">
            PTE <span className="text-gray-800 dark:text-white">iPASS</span>
          </p>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white/90">Đăng nhập quản trị</h1>
          <p className="mt-1 text-sm text-gray-500">Dùng tài khoản nhân sự được cấp.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-error-50 px-3 py-2 text-sm text-error-600">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Đăng nhập
        </Button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
