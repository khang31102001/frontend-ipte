"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/core/auth";
import { Avatar } from "@/shared/ui";

export function UserMenu() {
  const { session, signOut } = useAuth();
  if (!session) return null;
  return (
    <div className="flex items-center gap-3">
      <Avatar name={session.user.name} src={session.user.avatarUrl} />
      <div className="hidden text-left sm:block">
        <p className="text-sm leading-tight font-medium text-gray-800 dark:text-white/90">{session.user.name}</p>
        <p className="text-theme-xs text-gray-500">{session.role.name}</p>
      </div>
      <button
        type="button"
        onClick={() => void signOut()}
        aria-label="Đăng xuất"
        title="Đăng xuất"
        className="flex size-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
}
