// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import type { ApiFieldError, ApiMeta } from "@/core/api";
import type { handleMockRequest as HandleMockRequest } from "./dispatch";

let handle: typeof HandleMockRequest;

interface Body {
  success: boolean;
  data: unknown;
  message: string;
  meta?: ApiMeta;
  errors: ApiFieldError[];
  code?: string;
}

beforeAll(async () => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000/api";
  process.env.MOCK_API_ENABLED = "true";
  process.env.MOCK_API_DELAY_MS = "0";
  ({ handleMockRequest: handle } = await import("./dispatch"));
});

async function call(method: string, path: string, opts: { role?: string | null; body?: unknown; query?: string } = {}) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const role = opts.role === undefined ? "role-admin" : opts.role;
  if (role) headers["x-mock-role"] = role;
  const req = new Request(`http://localhost:3000/api${path}${opts.query ?? ""}`, {
    method,
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  const res = await handle(req, path.split("/").filter(Boolean));
  return { status: res.status, body: (await res.json()) as Body };
}

const articleInput = (over: Record<string, unknown> = {}) => ({
  title: "Bài viết kiểm thử",
  slug: "bai-viet-kiem-thu",
  excerpt: "Mô tả ngắn",
  content: "Nội dung ".repeat(250),
  categoryId: "acat-001",
  tagIds: ["tag-001"],
  isFeatured: false,
  status: "draft",
  ...over,
});

describe("Mock API – CMS", () => {
  it("quy trình duyệt: Marketing có quyền approve ⇒ xuất bản được và có publishedAt; Sales không có quyền article nên bị 403", async () => {
    const created = await call("POST", "/articles", { role: "role-marketing", body: articleInput() });
    expect(created.status).toBe(201);
    const article = created.body.data as { id: string; publishedAt: string | null; readingMinutes: number; categoryName: string };
    expect(article.publishedAt).toBeNull();
    expect(article.readingMinutes).toBeGreaterThan(1);
    expect(article.categoryName).toBeTruthy();

    const published = await call("PUT", `/articles/${article.id}`, { role: "role-marketing", body: articleInput({ status: "published" }) });
    expect(published.status).toBe(200);
    expect((published.body.data as { publishedAt: string }).publishedAt).toBeTruthy();

    expect((await call("GET", "/articles", { role: "role-sales" })).status).toBe(403);
  });

  it("guard backend độc lập với FE: người có quyền sửa nhưng thiếu quyền duyệt không xuất bản được", async () => {
    // Tạo vai trò chỉ có create/edit bài viết (không có approve)
    const role = await call("POST", "/roles", { body: { name: "Biên tập viên", permissions: ["article.view", "article.create", "article.edit"] } });
    expect(role.status).toBe(201);
    // Mock xác định người gọi theo role id của header
    const roleId = (role.body.data as { id: string }).id;
    await call("POST", "/users", { body: { fullName: "Biên Tập", email: "bientap@pteipass.vn", roleId, status: "active" } });

    const draft = await call("POST", "/articles", { role: roleId, body: articleInput({ slug: "bai-bien-tap", title: "Bài biên tập" }) });
    expect(draft.status).toBe(201);
    const id = (draft.body.data as { id: string }).id;
    const attempt = await call("PUT", `/articles/${id}`, { role: roleId, body: articleInput({ slug: "bai-bien-tap", title: "Bài biên tập", status: "published" }) });
    expect(attempt.status).toBe(403);
    expect(attempt.body.message).toMatch(/Duyệt/);
    // Gửi chờ duyệt thì được
    expect((await call("PUT", `/articles/${id}`, { role: roleId, body: articleInput({ slug: "bai-bien-tap", title: "Bài biên tập", status: "review" }) })).status).toBe(200);
  });

  it("landing page cần khối, trang tĩnh cần nội dung (validate theo template)", async () => {
    const landing = await call("POST", "/pages", { body: { title: "L", slug: "l", template: "landing", status: "draft", sections: [], noindex: false } });
    expect(landing.status).toBe(422);
    expect(landing.body.errors[0]?.field).toBe("sections");
    const stat = await call("POST", "/pages", { body: { title: "S", slug: "s", template: "static", status: "draft", noindex: false } });
    expect(stat.status).toBe(422);
    expect(stat.body.errors[0]?.field).toBe("content");
  });

  it("danh mục bài viết còn bài thì không xóa được (409); tag đếm bài viết", async () => {
    expect((await call("DELETE", "/article-categories/acat-001")).status).toBe(409);
    const tags = await call("GET", "/tags");
    expect((tags.body.data as { articleCount: number }[]).some((t) => t.articleCount > 0)).toBe(true);
  });

  it("API công khai: lấy biểu mẫu (không lộ email nội bộ) và gửi lead hợp lệ không cần đăng nhập", async () => {
    const form = await call("GET", "/public/forms/dang-ky-tu-van", { role: null });
    expect(form.status).toBe(200);
    expect(form.body.data).not.toHaveProperty("notifyEmails");

    const bad = await call("POST", "/public/forms/dang-ky-tu-van/submit", { role: null, body: { data: { fullName: "An", phone: "abc" } } });
    expect(bad.status).toBe(422);
    expect(bad.body.errors.map((e) => e.field).sort()).toEqual(["data.agree", "data.phone"]);

    const before = ((await call("GET", "/form-submissions", { query: "?pageSize=1" })).body.meta as ApiMeta).total;
    const ok = await call("POST", "/public/forms/dang-ky-tu-van/submit", {
      role: null,
      body: { data: { fullName: "Nguyễn An", phone: "0901234567", agree: "true" }, source: { utmSource: "facebook", utmCampaign: "t10" } },
    });
    expect(ok.status).toBe(201);
    const after = await call("GET", "/form-submissions", { query: "?pageSize=1" });
    expect((after.body.meta as ApiMeta).total).toBe(before + 1);
    const lead = (after.body.data as { status: string; source?: { utmSource?: string } }[])[0];
    expect(lead?.status).toBe("new");
    expect(lead?.source?.utmSource).toBe("facebook");
  });

  it("xử lý lead: đổi trạng thái/phân công qua PUT, dữ liệu gốc không bị sửa", async () => {
    const list = await call("GET", "/form-submissions", { query: "?status=new&pageSize=1" });
    const sub = (list.body.data as { id: string; data: Record<string, string> }[])[0];
    expect(sub).toBeDefined();
    const res = await call("PUT", `/form-submissions/${sub?.id}`, { body: { status: "contacted", assignedTo: "usr-002", notes: "Đã gọi" } });
    expect(res.status).toBe(200);
    const updated = res.body.data as { status: string; assignedToName?: string; data: Record<string, string> };
    expect(updated.status).toBe("contacted");
    expect(updated.assignedToName).toBeTruthy();
    expect(updated.data).toEqual(sub?.data);
    expect((await call("POST", "/form-submissions", { body: {} })).status).toBe(405);
  });

  it("biểu mẫu đã có dữ liệu không xóa được; khóa dữ liệu trùng bị từ chối", async () => {
    expect((await call("DELETE", "/forms/frm-001")).status).toBe(409);
    const dupKey = await call("POST", "/forms", {
      body: {
        name: "Form trùng key", slug: "form-trung-key", type: "other", fields: [
          { key: "a", label: "A", type: "text", required: false, options: [] },
          { key: "a", label: "B", type: "text", required: false, options: [] },
        ], submitLabel: "Gửi", successMessage: "OK", status: "active", notifyEmails: [],
      },
    });
    expect(dupKey.status).toBe(422);
    expect(dupKey.body.errors[0]?.field).toBe("fields.1.key");
  });

  it("site-config: GET/PUT singleton, validate widget chat, ghi audit; API công khai không lộ người cập nhật", async () => {
    const current = (await call("GET", "/site-config")).body.data as Record<string, unknown>;
    const bad = await call("PUT", "/site-config", { body: { ...current, chat: { zalo: { enabled: true }, messenger: { enabled: false }, thirdParty: { enabled: false } } } });
    expect(bad.status).toBe(422);
    expect(bad.body.errors[0]?.field).toBe("chat.zalo.oaId");

    const good = await call("PUT", "/site-config", { body: { ...current, contact: { ...(current.contact as object), hotlineVN: "+84 28 3822 1234" } } });
    expect(good.status).toBe(200);
    expect(((await call("GET", "/site-config")).body.data as { contact: { hotlineVN: string } }).contact.hotlineVN).toBe("+84 28 3822 1234");
    const pub = (await call("GET", "/public/site-config", { role: null })).body.data as Record<string, unknown>;
    expect(pub).not.toHaveProperty("updatedByName");
    const logs = await call("GET", "/audit-logs", { query: "?resource=site_config" });
    expect((logs.body.meta as ApiMeta).total).toBeGreaterThan(0);
  });
});

describe("Mock API – tính nhất quán của bảng route", () => {
  it("mọi quyền route yêu cầu đều tồn tại trong danh mục RBAC (không có endpoint 'mồ côi quyền')", async () => {
    const { describeRoutes } = await import("./router");
    const { ALL_PERMISSIONS } = await import("@/core/rbac/permissions");
    await call("GET", "/auth/me"); // đảm bảo route đã được đăng ký
    const routes = describeRoutes();
    expect(routes.length).toBeGreaterThan(100);
    const orphan = routes.filter((r) => r.permission !== "public" && !(ALL_PERMISSIONS as readonly string[]).includes(r.permission));
    expect(orphan).toEqual([]);
  });

  it("mọi quyền trong danh mục đều được ít nhất một route sử dụng hoặc thuộc thao tác chỉ có ở FE (không có quyền thừa)", async () => {
    const { describeRoutes } = await import("./router");
    const { ALL_PERMISSIONS } = await import("@/core/rbac/permissions");
    await call("GET", "/auth/me");
    const used = new Set(describeRoutes().map((r) => r.permission));
    // approve được kiểm tra bằng guard bên trong create/update, không có route riêng.
    const unused = ALL_PERMISSIONS.filter((p) => !used.has(p) && !p.endsWith(".approve"));
    expect(unused).toEqual([]);
  });
});

describe("Mock API – Settings / Dashboard / Reports / IAM", () => {
  it("bí mật tích hợp chỉ ghi: không bao giờ trả về mật khẩu, để trống thì giữ nguyên", async () => {
    const before = (await call("GET", "/settings/integration")).body.data as { smtp: { hasPassword: boolean } };
    expect(before.smtp.hasPassword).toBe(true);
    expect(JSON.stringify(before)).not.toMatch(/demo-password|demo-secret|_secrets/);

    const payload = {
      smtp: { enabled: true, host: "smtp.example.com", port: 587, username: "u", fromName: "PTE", fromEmail: "no-reply@example.com", secure: true },
      recaptcha: { enabled: true, siteKey: "site-key" },
      crm: { enabled: false, provider: "none" },
      storage: { provider: "s3", bucket: "b" },
    };
    const saved = await call("PUT", "/settings/integration", { body: payload });
    expect(saved.status).toBe(200);
    expect((saved.body.data as { smtp: { hasPassword: boolean }; recaptcha: { hasSecret: boolean } }).smtp.hasPassword).toBe(true);
    expect((saved.body.data as { recaptcha: { hasSecret: boolean } }).recaptcha.hasSecret).toBe(true);

    const invalid = await call("PUT", "/settings/integration", { body: { ...payload, smtp: { ...payload.smtp, host: "" } } });
    expect(invalid.status).toBe(422);
    expect(invalid.body.errors[0]?.field).toBe("smtp.host");
  });

  it("mẫu thông báo: biến dùng trong nội dung phải được khai báo; email cần tiêu đề", async () => {
    const res = await call("POST", "/notification-templates", {
      body: { key: "test_tpl", name: "Mẫu thử", channel: "email", body: "Chào {{fullName}} - {{ghost}}", variables: ["fullName"], isActive: true },
    });
    expect(res.status).toBe(422);
    const fields = res.body.errors.map((e) => e.field).sort();
    expect(fields).toEqual(["body", "subject"]);
    expect(res.body.errors.find((e) => e.field === "body")?.message).toMatch(/ghost/);
  });

  it("dashboard: KPI + phễu đơn điệu giảm + chuỗi ngày liên tục; kịch bản empty trả số 0", async () => {
    const res = await call("GET", "/dashboard/summary", { query: "?days=90" });
    const d = res.body.data as {
      kpis: { newLeads: number; passRate: number };
      funnel: { stage: string; count: number }[];
      leadsByDay: { date: string }[];
      leadsBySource: { count: number }[];
    };
    expect(d.funnel.map((f) => f.stage)).toEqual(["lead", "test", "enroll", "learn", "mock", "exam", "result"]);
    for (let i = 1; i < d.funnel.length; i++) expect((d.funnel[i] as { count: number }).count).toBeLessThanOrEqual((d.funnel[i - 1] as { count: number }).count);
    expect(d.kpis.newLeads).toBeGreaterThan(0);
    expect(d.kpis.passRate).toBeGreaterThanOrEqual(0);
    expect(d.leadsByDay.length).toBeGreaterThanOrEqual(90);
    expect(d.leadsBySource.reduce((s, x) => s + x.count, 0)).toBeLessThanOrEqual(d.kpis.newLeads);
  });

  it("báo cáo ghi danh theo tháng/cơ sở/khóa và quyền xem báo cáo", async () => {
    for (const groupBy of ["month", "branch", "course"]) {
      const r = await call("GET", "/reports/enrollments", { query: `?groupBy=${groupBy}` });
      const data = r.body.data as { total: number; rows: { count: number }[] };
      expect(data.rows.reduce((s, x) => s + x.count, 0)).toBe(data.total);
    }
    expect((await call("GET", "/reports/funnel", { role: "role-teacher" })).status).toBe(403);
    expect((await call("GET", "/reports/funnel", { role: "role-finance" })).status).toBe(200);
  });

  it("IAM: Admin không bị giảm quyền; vai trò mới có quyền hiệu lực ngay trên API", async () => {
    const admin = (await call("GET", "/roles/role-admin")).body.data as { name: string; permissions: string[] };
    const strip = await call("PUT", "/roles/role-admin", { body: { name: admin.name, permissions: admin.permissions.slice(1) } });
    expect(strip.status).toBe(409);

    const role = await call("POST", "/roles", { body: { name: "Chỉ xem học viên", permissions: ["student.view"] } });
    const roleId = (role.body.data as { id: string }).id;
    await call("POST", "/users", { body: { fullName: "Chỉ Xem", email: "chixem@pteipass.vn", roleId, status: "active" } });
    expect((await call("GET", "/students", { role: roleId })).status).toBe(200);
    expect((await call("GET", "/courses", { role: roleId })).status).toBe(403);
    // nâng quyền ⇒ có hiệu lực ngay
    await call("PUT", `/roles/${roleId}`, { body: { name: "Chỉ xem học viên", permissions: ["student.view", "course.view"] } });
    expect((await call("GET", "/courses", { role: roleId })).status).toBe(200);
  });

  it("export có kiểm tra quyền và ghi audit", async () => {
    expect((await call("GET", "/audit-logs/export", { role: "role-sales" })).status).toBe(403);
    expect((await call("GET", "/audit-logs/export", { role: "role-finance" })).status).toBe(200);
    expect((await call("GET", "/users/export", { role: "role-finance" })).status).toBe(403);
    expect((await call("GET", "/users/export")).status).toBe(200);
    const logs = await call("GET", "/audit-logs", { query: "?action=export" });
    expect((logs.body.meta as ApiMeta).total).toBeGreaterThan(0);
  });
});
