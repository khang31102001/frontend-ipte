import { CircleAlert, Inbox, Lock, LoaderCircle, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Button } from "./button";

export function Spinner({ className, label = "Đang tải" }: { className?: string; label?: string }) {
  return <LoaderCircle role="status" aria-label={label} className={cn("size-5 animate-spin text-brand-500", className)} />;
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-800", className)} />;
}

export function PageLoading({ label = "Đang tải dữ liệu…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm text-gray-500">
      <Spinner className="size-8" label={label} />
      {label}
    </div>
  );
}

interface StateProps {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

function StateShell({ icon, title, description, action, className, tone = "gray" }: StateProps & { icon: ReactNode; tone?: "gray" | "error" }) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-14 text-center", className)}>
      <div
        className={cn(
          "mb-4 flex size-14 items-center justify-center rounded-full",
          tone === "error" ? "bg-error-50 text-error-500" : "bg-gray-100 text-gray-400 dark:bg-gray-800",
        )}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function EmptyState({ title = "Chưa có dữ liệu", ...rest }: Partial<StateProps>) {
  return <StateShell icon={<Inbox className="size-7" />} title={title} {...rest} />;
}

export function ErrorState({
  title = "Không tải được dữ liệu",
  description,
  onRetry,
  ...rest
}: Partial<StateProps> & { onRetry?: () => void }) {
  return (
    <StateShell
      tone="error"
      icon={<CircleAlert className="size-7" />}
      title={title}
      description={description ?? "Vui lòng kiểm tra kết nối rồi thử lại."}
      action={
        onRetry && (
          <Button variant="outline" size="sm" startIcon={<RefreshCw className="size-4" />} onClick={onRetry}>
            Thử lại
          </Button>
        )
      }
      {...rest}
    />
  );
}

export function ForbiddenState({ description }: { description?: ReactNode }) {
  return (
    <StateShell
      tone="error"
      icon={<Lock className="size-7" />}
      title="Bạn không có quyền truy cập"
      description={description ?? "Liên hệ quản trị viên để được cấp quyền phù hợp."}
    />
  );
}
