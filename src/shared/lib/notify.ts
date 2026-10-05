import { toast } from "sonner";
import { getErrorMessage, isApiError } from "@/core/api";

/**
 * Toast lỗi API chuẩn. Bỏ qua lỗi validation vì form đã hiển thị tại từng field.
 */
export function notifyApiError(error: unknown): void {
  if (isApiError(error) && error.isValidation) return;
  toast.error(getErrorMessage(error));
}
