import type { ZodType } from "@/core/validation";
import type { MockResult } from "./types";
import { validation } from "./responses";

export type ParseResult<T> = { ok: true; data: T } | { ok: false; error: MockResult };

/**
 * Validate body bằng đúng schema zod mà FE dùng, rồi chuyển lỗi sang `errors[]` của contract.
 * Đây là nơi chứng minh Mock và backend thật dùng chung một hợp đồng.
 */
export function validateBody<T>(schema: ZodType<T>, body: unknown): ParseResult<T> {
  const result = schema.safeParse(body ?? {});
  if (result.success) return { ok: true, data: result.data };
  return {
    ok: false,
    error: validation(
      result.error.issues.map((issue) => ({
        field: issue.path.map(String).join("."),
        message: issue.message,
      })),
    ),
  };
}
