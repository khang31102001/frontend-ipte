"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button, Modal } from "@/shared/ui";

interface TempPasswordDialogProps {
  /** Mật khẩu tạm vừa cấp; null = đóng. */
  password: string | null;
  userName?: string;
  onClose: () => void;
}

/** Hiển thị mật khẩu tạm MỘT lần: đóng hộp thoại là không xem lại được (chỉ cấp lại được). */
export function TempPasswordDialog({ password, userName, onClose }: TempPasswordDialogProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      /* trình duyệt chặn clipboard: người dùng tự chép */
    }
  }

  return (
    <Modal
      open={password !== null}
      onClose={onClose}
      size="sm"
      title="Mật khẩu tạm"
      description={`Chuyển cho ${userName ?? "người dùng"} qua kênh an toàn. Họ sẽ phải đổi mật khẩu ở lần đăng nhập đầu. Mật khẩu này không hiển thị lại.`}
      footer={<Button onClick={onClose}>Đã lưu, đóng</Button>}
    >
      <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <code className="font-mono text-lg tracking-wide select-all">{password}</code>
        <Button variant="outline" size="sm" onClick={() => void copy()} startIcon={copied ? <Check className="size-4" /> : <Copy className="size-4" />}>
          {copied ? "Đã chép" : "Chép"}
        </Button>
      </div>
    </Modal>
  );
}
