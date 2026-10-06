import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Avatar({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700", className)} {...props} />;
}
