// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import type { ApiFieldError, ApiMeta } from "@/core/api";
import type { handleMockRequest as HandleMockRequest } from "./dispatch";

let handle: typeof HandleMockRequest;

interface Body {
  success: boolean;
  data: unknown;
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

/** API công khai: không gửi vai trò (ẩn danh). */
async function pub(path: string, query = "") {
  const req = new Request(`http://localhost:3000/api${path}${query}`, { headers: { Accept: "application/json" } });
  const res = await handle(req, path.split("/").filter(Boolean));
  return { status: res.status, body: (await res.json()) as Body };
}

const rows = <T>(b: Body) => b.data as T[];

describe("Mock API – public (website)", () => {
  it("không cần đăng nhập và chỉ trả khóa học đã xuất bản, không lộ trường nội bộ", async () => {
    const res = await pub("/public/courses", "?pageSize=100");
    expect(res.status).toBe(200);
    const courses = rows<Record<string, unknown>>(res.body);
    expect(courses.length).toBeGreaterThan(0);
    for (const c of courses) {
      expect(c).not.toHaveProperty("code");
      expect(c).not.toHaveProperty("status");
      expect(c).not.toHaveProperty("teacherIds");
      expect(c).not.toHaveProperty("enrolledCount");
    }
    expect(res.body.meta?.total).toBe(courses.length);
  });

  it("chi tiết khóa học theo slug; slug lạ → 404", async () => {
    const list = rows<{ slug: string; categorySlug: string }>((await pub("/public/courses", "?pageSize=1")).body);
    const first = list[0];
    expect(first).toBeDefined();
    const detail = await pub(`/public/courses/${first!.slug}`);
    expect(detail.status).toBe(200);
    expect((await pub("/public/courses/khong-ton-tai")).status).toBe(404);
  });

  it("lọc khóa học theo danh mục và tìm không dấu", async () => {
    const cats = rows<{ slug: string; courseCount: number }>((await pub("/public/course-categories")).body);
    const withCourses = cats.find((c) => c.courseCount > 0);
    expect(withCourses).toBeDefined();
    const byCat = rows<{ categorySlug: string }>((await pub("/public/courses", `?categorySlug=${withCourses!.slug}`)).body);
    expect(byCat.length).toBe(withCourses!.courseCount);
    expect(byCat.every((c) => c.categorySlug === withCourses!.slug)).toBe(true);
    const search = rows<unknown>((await pub("/public/courses", "?q=nen%20tang")).body);
    expect(search.length).toBeGreaterThan(0);
  });

  it("bài viết: chỉ đã xuất bản, lọc theo nhiều danh mục, chi tiết kèm bài liên quan", async () => {
    const all = rows<{ slug: string; categorySlug: string }>((await pub("/public/articles", "?pageSize=100")).body);
    const two = rows<{ categorySlug: string }>((await pub("/public/articles", "?categorySlugs=kien-thuc-pte,kinh-nghiem-thi&pageSize=100")).body);
    expect(two.length).toBeGreaterThan(0);
    expect(two.length).toBeLessThan(all.length);
    expect(two.every((a) => ["kien-thuc-pte", "kinh-nghiem-thi"].includes(a.categorySlug))).toBe(true);

    const detail = await pub(`/public/articles/${all[0]!.slug}`);
    expect(detail.status).toBe(200);
    expect(Array.isArray((detail.body.data as { related: unknown[] }).related)).toBe(true);
  });

  it("giáo viên: chỉ đang giảng dạy, không lộ email/điện thoại", async () => {
    const teachers = rows<Record<string, unknown>>((await pub("/public/teachers")).body);
    expect(teachers.length).toBeGreaterThan(0);
    for (const t of teachers) {
      expect(t).not.toHaveProperty("email");
      expect(t).not.toHaveProperty("phone");
      expect(t).not.toHaveProperty("availability");
    }
    const slug = (teachers[0] as { slug: string }).slug;
    expect((await pub(`/public/teachers/${slug}`)).status).toBe(200);
  });

  it("cảm nhận, banner, chi nhánh, trang tĩnh, sitemap", async () => {
    expect(rows<unknown>((await pub("/public/testimonials")).body).length).toBeGreaterThan(0);
    const banners = rows<{ placement: string }>((await pub("/public/banners", "?placement=home_hero")).body);
    expect(banners.every((b) => b.placement === "home_hero")).toBe(true);
    expect(rows<unknown>((await pub("/public/branches")).body).length).toBeGreaterThan(0);
    expect((await pub("/public/pages/trang-chu")).status).toBe(200);
    expect((await pub("/public/pages/uu-dai-hoc-phi-thang-10")).status).toBe(404); // đang duyệt
    const sitemap = rows<{ type: string }>((await pub("/public/sitemap")).body);
    expect(new Set(sitemap.map((s) => s.type))).toEqual(new Set(["course", "article", "teacher"]));
  });

  it("gửi lead qua biểu mẫu công khai lưu nguồn và lỗi theo từng trường", async () => {
    const bad = await handle(
      new Request("http://localhost:3000/api/public/forms/lien-he/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: { fullName: "A", phone: "abc" } }) }),
      ["public", "forms", "lien-he", "submit"],
    );
    expect(bad.status).toBe(422);
    const ok = await handle(
      new Request("http://localhost:3000/api/public/forms/lien-he/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { fullName: "Nguyen A", phone: "0912345678" }, source: { utmSource: "facebook", landingPage: "/khoa-hoc" } }),
      }),
      ["public", "forms", "lien-he", "submit"],
    );
    expect(ok.status).toBe(201);
  });
});
