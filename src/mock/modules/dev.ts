import { resetDb } from "../engine/db";
import { ok } from "../engine/responses";
import { addRoutes, describeRoutes } from "../engine/router";

/** Route tiện ích chỉ có ở Mock API (không có ở backend thật). */
export function registerDevModule(): void {
  addRoutes(
    {
      method: "GET",
      pattern: "/__mock/routes",
      permission: "public",
      anonymous: true,
      handler: () => ok(describeRoutes()),
    },
    {
      method: "POST",
      pattern: "/__mock/reset",
      permission: "public",
      anonymous: true,
      handler: () => {
        resetDb();
        return ok(null, { message: "Đã đặt lại dữ liệu mock về trạng thái ban đầu" });
      },
    },
  );
}
