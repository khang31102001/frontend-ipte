import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

type PopupAction = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "warning";
  type?: "button" | "submit" | "reset";
  className?: string;
};

type PopupStatus = "success" | "error" | "warning" | "info";

interface PopupComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction?: PopupAction;
  secondaryAction?: PopupAction;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
  status?: PopupStatus;
  showStatusIcon?: boolean;
}

function IconSuccess(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconError(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWarning(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 9v4m0 4h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 16v-4m0-4h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function getStatusMeta(status?: PopupStatus) {
  if (!status) return null;

  switch (status) {
    case "success":
      return {
        label: "Success",
        wrapClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        Icon: IconSuccess,
      };
    case "error":
      return {
        label: "Error",
        wrapClass: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
        Icon: IconError,
      };
    case "warning":
      return {
        label: "Warning",
        wrapClass: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        Icon: IconWarning,
      };
    case "info":
      return {
        label: "Info",
        wrapClass: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
        Icon: IconInfo,
      };
  }
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  closeOnBackdrop = true,
  showCloseButton = true,
  className,

  status,
  showStatusIcon = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statusMeta = getStatusMeta(status);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !closeOnBackdrop) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeOnBackdrop, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const content = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="absolute inset-0 bg-black/45" onClick={closeOnBackdrop ? onClose : undefined} />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? statusMeta?.label ?? "Popup"}
        className={cn(
          "relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-700 dark:bg-slate-900",
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}

        {(title || description || (statusMeta && showStatusIcon)) && (
          <div className="mb-4">
            <div className="flex items-start gap-3">
              {statusMeta && showStatusIcon && (
                <div
                  className={cn(
                    "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    statusMeta.wrapClass,
                  )}
                  aria-label={statusMeta.label}
                >
                  <statusMeta.Icon className="h-5 w-5" />
                </div>
              )}

              <div className="min-w-0">
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                )}
                {description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {children && <div className="space-y-4">{children}</div>}

        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {secondaryAction && (
              <button
                type={secondaryAction.type ?? "button"}
                onClick={secondaryAction.onClick}
                className={cn("justify-center sm:min-w-[120px]", secondaryAction.className)}
              >
                {secondaryAction.label}
              </button>
            )}

            {primaryAction && (
              <button
                type={primaryAction.type ?? "button"}
                onClick={primaryAction.onClick}
                className={cn("justify-center sm:min-w-[120px]", primaryAction.className)}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default PopupComponent;
