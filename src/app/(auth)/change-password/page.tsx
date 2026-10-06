"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { authApi, getAccessToken } from "@/core/auth";
import { isApiError } from "@/core/api";
import { Button, Input, Label } from "@/shared/ui";

/** Đổi mật khẩu (bắt buộc ở lần đăng nhập đầu bằng mật khẩu tạm). Đổi xong phải đăng nhập lại. */
export default function ChangePasswordPage() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await authApi.changePassword(token, current, next);
      toast.success("Đã đổi mật khẩu, vui lòng đăng nhập lại");
      router.replace("/login");
    } catch (err) {
      setError(isApiError(err) ? (err.errors[0]?.message ?? err.message) : "Không đổi được mật khẩu");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-md dark:border-gray-800 dark:bg-gray-900">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Đổi mật khẩu</h1>
          <p className="mt-1 text-sm text-gray-500">Mật khẩu mới tối thiểu 10 ký tự, gồm chữ hoa, chữ thường và số.</p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="current">Mật khẩu hiện tại</Label>
          <Input id="current" type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="next">Mật khẩu mới</Label>
          <Input id="next" type="password" autoComplete="new-password" required value={next} onChange={(e) => setNext(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Nhập lại mật khẩu mới</Label>
          <Input id="confirm" type="password" autoComplete="new-password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        {error && (
          <p role="alert" className="rounded-lg bg-error-50 px-3 py-2 text-sm text-error-600">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" loading={loading}>
          Đổi mật khẩu
        </Button>
      </form>
    </main>
  );
}
