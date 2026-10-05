"use client";

import { Button } from "./button";
import { Modal } from "./modal";
import type { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={loading ? () => undefined : onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={destructive ? "danger" : "primary"} size="sm" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {description && <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>}
    </Modal>
  );
}
