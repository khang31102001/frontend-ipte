import type { Resource } from "@/core/rbac";
import { forbidden } from "./responses";
import type { MockActor, MockResult } from "./types";

/**
 * Quy tắc phê duyệt: chuyển sang trạng thái "published" cần quyền `<resource>.approve`.
 * Đây là kiểm tra phía backend, độc lập với việc FE ẩn lựa chọn "Đã đăng".
 */
export function publishGuard<T extends { status: string }>(resource: Resource) {
  return ({ input, current, actor }: { input: { status?: string }; current?: T; actor: MockActor | null }): MockResult | undefined => {
    const becomingPublished = input.status === "published" && current?.status !== "published";
    if (becomingPublished && !actor?.permissions.has(`${resource}.approve`)) {
      return forbidden("Bạn cần quyền Duyệt để xuất bản nội dung này");
    }
    return undefined;
  };
}
