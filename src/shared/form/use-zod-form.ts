"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { isApiError } from "@/core/api";

/**
 * Form có validate bằng zod. Schema là hợp đồng dùng chung với Mock API/backend,
 * nên rule ở FE và BE không thể lệch nhau.
 */
export function useZodForm<TSchema extends z.ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
  options: { defaultValues?: DefaultValues<z.input<TSchema>>; values?: z.input<TSchema> } = {},
): UseFormReturn<z.input<TSchema>, unknown, z.output<TSchema>> {
  return useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    // @ts-expect-error — resolvers v5 + zod v4: kiểu input/output của resolver được suy ra đúng khi chạy
    resolver: zodResolver(schema),
    mode: "onTouched",
    ...options,
  });
}

/**
 * Áp lỗi validation từ server (`errors[]`) vào từng field của form.
 * Trả true nếu lỗi đã được xử lý ở form (không cần toast).
 */
export function applyServerErrors<T extends FieldValues>(form: UseFormReturn<T, unknown, FieldValues>, error: unknown): boolean {
  if (!isApiError(error) || !error.isValidation) return false;
  if (error.errors.length === 0) {
    form.setError("root.server", { type: "server", message: error.message });
    return true;
  }
  for (const e of error.errors) {
    form.setError(e.field as Path<T>, { type: "server", message: e.message });
  }
  return true;
}
