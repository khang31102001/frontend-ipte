/**
 * RBAC theo dạng Resource + Action → "student.view", "course.approve"...
 * Đây là danh mục quyền DUY NHẤT: FE (guard), mock backend và màn hình Roles đều dùng chung.
 * Thêm module mới ⇒ khai báo resource ở đây.
 */

export const ACTIONS = ["view", "create", "edit", "delete", "approve", "export"] as const;
export type Action = (typeof ACTIONS)[number];

export const RESOURCE_ACTIONS = {
  student: ["view", "create", "edit", "delete", "export"],
  course: ["view", "create", "edit", "delete", "approve"],
  lesson: ["view", "create", "edit", "delete"],
  learning_path: ["view", "create", "edit", "delete"],
  learning_material: ["view", "create", "edit", "delete"],
  question: ["view", "create", "edit", "delete", "export"],
  teacher: ["view", "create", "edit", "delete"],
  page: ["view", "create", "edit", "delete", "approve"],
  article: ["view", "create", "edit", "delete", "approve"],
  taxonomy: ["view", "create", "edit", "delete"],
  form: ["view", "create", "edit", "delete"],
  form_submission: ["view", "edit", "delete", "export"],
  testimonial: ["view", "create", "edit", "delete", "approve"],
  site_config: ["view", "edit"],
  banner: ["view", "create", "edit", "delete"],
  media: ["view", "create", "edit", "delete"],
  branch: ["view", "create", "edit", "delete"],
  user: ["view", "create", "edit", "delete", "export"],
  role: ["view", "create", "edit", "delete"],
  audit_log: ["view", "export"],
  setting: ["view", "edit"],
  notification_template: ["view", "create", "edit", "delete"],
  dashboard: ["view"],
  report: ["view", "export"],
} as const satisfies Record<string, readonly Action[]>;

export type Resource = keyof typeof RESOURCE_ACTIONS;

export type Permission = {
  [R in Resource]: `${R}.${(typeof RESOURCE_ACTIONS)[R][number]}`;
}[Resource];

export const RESOURCES = Object.keys(RESOURCE_ACTIONS) as Resource[];

export const ALL_PERMISSIONS: readonly Permission[] = RESOURCES.flatMap((resource) =>
  (RESOURCE_ACTIONS[resource] as readonly Action[]).map((action) => `${resource}.${action}` as Permission),
);

export const permission = <R extends Resource>(
  resource: R,
  action: (typeof RESOURCE_ACTIONS)[R][number],
): Permission => `${resource}.${action}` as Permission;

export function isPermission(value: string): value is Permission {
  return (ALL_PERMISSIONS as readonly string[]).includes(value);
}

export function parsePermission(value: Permission): { resource: Resource; action: Action } {
  const [resource, action] = value.split(".") as [Resource, Action];
  return { resource, action };
}

export const ACTION_LABELS: Record<Action, string> = {
  view: "Xem",
  create: "Tạo",
  edit: "Sửa",
  delete: "Xóa",
  approve: "Duyệt",
  export: "Xuất",
};

export const RESOURCE_LABELS: Record<Resource, string> = {
  student: "Học viên",
  course: "Khóa học",
  lesson: "Bài học",
  learning_path: "Lộ trình học",
  learning_material: "Học liệu",
  question: "Ngân hàng câu hỏi",
  teacher: "Giáo viên",
  page: "Trang (CMS)",
  article: "Bài viết",
  taxonomy: "Danh mục & Tag",
  form: "Biểu mẫu",
  form_submission: "Dữ liệu biểu mẫu",
  testimonial: "Cảm nhận / Thành công",
  site_config: "Cấu hình website",
  banner: "Banner",
  media: "Thư viện media",
  branch: "Cơ sở & phòng học",
  user: "Người dùng",
  role: "Vai trò & quyền",
  audit_log: "Nhật ký hoạt động",
  setting: "Cài đặt hệ thống",
  notification_template: "Mẫu thông báo",
  dashboard: "Dashboard",
  report: "Báo cáo",
};

/** Kiểm tra quyền thuần (không phụ thuộc React) — dùng được ở cả guard và mock backend. */
export function hasPermission(granted: ReadonlySet<string> | readonly string[], required: Permission): boolean {
  const set = granted instanceof Set ? granted : new Set(granted);
  return set.has(required);
}
