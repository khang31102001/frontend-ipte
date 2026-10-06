"use client";

import type { ReactNode } from "react";
import { Button, Modal, type ModalProps } from "@/shared/ui";

/** Modal chứa form: footer có nút Hủy / Lưu gắn với form qua thuộc tính `form`. */
export function FormModal({
  formId,
  submitting,
  submitLabel = "Lưu",
  onClose,
  children,
  ...modal
}: Omit<ModalProps, "footer" | "children" | "onClose"> & {
  formId: string;
  submitting?: boolean;
  submitLabel?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Modal
      {...modal}
      onClose={submitting ? () => undefined : onClose}
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={submitting}>
            Hủy
          </Button>
          <Button type="submit" form={formId} size="sm" loading={submitting}>
            {submitLabel}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
