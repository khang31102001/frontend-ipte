// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import type { ApiFieldError, ApiMeta } from "@/core/api";
import { QUESTION_TYPES } from "@/shared/domain/pte";
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

async function call(method: string, path: string, opts: { role?: string; body?: unknown; query?: string } = {}) {
  const req = new Request(`http://localhost:3000/api${path}${opts.query ?? ""}`, {
    method,
    headers: { "Content-Type": "application/json", "x-mock-role": opts.role ?? "role-admin" },
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  const res = await handle(req, path.split("/").filter(Boolean));
  return { status: res.status, body: (await res.json()) as Body };
}

describe("Mock API – Students", () => {
  it("danh sách có thông tin tính toán (branchName, assignedToName, targetScore)", async () => {
    const res = await call("GET", "/students", { query: "?pageSize=5" });
    const first = (res.body.data as { branchName?: string; assignedToName?: string; targetScore?: number }[])[0];
    expect(first?.branchName).toBeTruthy();
    expect(first?.assignedToName).toBeTruthy();
    expect(first?.targetScore).toBeGreaterThan(0);
  });

  it("lọc theo giai đoạn + mục đích học (lọc theo hồ sơ)", async () => {
    const res = await call("GET", "/students", { query: "?stage=learn&pageSize=100" });
    const items = res.body.data as { stage: string }[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((s) => s.stage === "learn")).toBe(true);
    const migration = await call("GET", "/students", { query: "?purpose=migration&pageSize=100" });
    expect((migration.body.data as unknown[]).length).toBeGreaterThan(0);
  });

  it("tạo học viên sinh mã HV-, giai đoạn lead và sự kiện đầu tiên; xóa dọn dữ liệu con", async () => {
    const created = await call("POST", "/students", {
      body: { fullName: "Học Viên Mới", gender: "female", email: "moi.hv@example.com", phone: "0901234567", source: "facebook", status: "active", tags: [] },
    });
    expect(created.status).toBe(201);
    const student = created.body.data as { id: string; code: string; stage: string };
    expect(student.code).toMatch(/^HV-\d{5}$/);
    expect(student.stage).toBe("lead");

    const journey = await call("GET", `/students/${student.id}/journey`);
    expect((journey.body.data as { events: unknown[] }).events).toHaveLength(1);

    expect((await call("DELETE", `/students/${student.id}`)).status).toBe(200);
    expect((await call("GET", `/students/${student.id}/journey`)).status).toBe(404);
  });

  it("hồ sơ PTE: null khi chưa có, PUT tạo mới rồi trả lại; validate điểm", async () => {
    const created = await call("POST", "/students", {
      body: { fullName: "Có Hồ Sơ", gender: "male", email: "hoso@example.com", phone: "0907654321", source: "website", status: "active" },
    });
    const id = (created.body.data as { id: string }).id;
    expect((await call("GET", `/students/${id}/profile`)).body.data).toBeNull();

    const bad = await call("PUT", `/students/${id}/profile`, { body: { currentLevel: "none", targetScore: 5, purpose: "work", preferredMode: "online" } });
    expect(bad.status).toBe(422);
    expect(bad.body.errors.map((e) => e.field)).toContain("targetScore");

    const ok = await call("PUT", `/students/${id}/profile`, { body: { currentLevel: "none", targetScore: 50, purpose: "work", preferredMode: "online" } });
    expect(ok.status).toBe(200);
    expect(((await call("GET", `/students/${id}`)).body.data as { targetScore: number }).targetScore).toBe(50);
  });

  it("hành trình chỉ được chuyển tiếp, kèm điều kiện theo giai đoạn", async () => {
    const created = await call("POST", "/students", {
      body: { fullName: "Hành Trình", gender: "female", email: "hanhtrinh@example.com", phone: "0908887777", source: "zalo", status: "active" },
    });
    const id = (created.body.data as { id: string }).id;

    const noDate = await call("POST", `/students/${id}/journey/advance`, { body: { stage: "exam" } });
    expect(noDate.status).toBe(422);
    expect(noDate.body.errors[0]?.field).toBe("examDate");

    expect((await call("POST", `/students/${id}/journey/advance`, { body: { stage: "learn", note: "Đã đóng học phí" } })).status).toBe(201);
    const back = await call("POST", `/students/${id}/journey/advance`, { body: { stage: "test" } });
    expect(back.status).toBe(409);
    expect(((await call("GET", `/students/${id}`)).body.data as { stage: string }).stage).toBe("learn");
  });

  it("quyền: Teacher xem được nhưng không sửa/xuất; Sales xuất được", async () => {
    expect((await call("GET", "/students", { role: "role-teacher" })).status).toBe(200);
    expect((await call("DELETE", "/students/stu-001", { role: "role-teacher" })).status).toBe(403);
    expect((await call("GET", "/students/export", { role: "role-teacher" })).status).toBe(403);
    const exported = await call("GET", "/students/export", { role: "role-sales" });
    expect(exported.status).toBe(200);
    expect((exported.body.data as unknown[]).length).toBeGreaterThan(20);
  });
});

describe("Mock API – Courses / Lessons / Paths / Materials", () => {
  it("khóa học có categoryName, teacherNames, lessonCount; lọc theo mục tiêu", async () => {
    const res = await call("GET", "/courses", { query: "?targetScore=50&status=published" });
    const items = res.body.data as { targetScore: number; categoryName?: string; teacherNames?: string[]; lessonCount: number }[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((c) => c.targetScore === 50)).toBe(true);
    expect(items[0]?.categoryName).toBeTruthy();
    expect(items[0]?.teacherNames?.length).toBeGreaterThan(0);
    expect(items[0]?.lessonCount).toBeGreaterThan(0);
  });

  it("slug/mã khóa học trùng bị từ chối theo field; xóa khóa học xóa luôn bài học", async () => {
    const input = {
      code: "TEST-01", name: "Khóa thử", slug: "khoa-thu", categoryId: "cat-002", type: "target_score", entryLevel: "none", mode: "online",
      durationWeeks: 4, sessionsCount: 8, tuition: 0, teacherIds: [], summary: "Mô tả", outcomes: [], audience: [], status: "draft", isFeatured: false,
    };
    const created = await call("POST", "/courses", { body: input });
    expect(created.status).toBe(201);
    const id = (created.body.data as { id: string }).id;
    const dup = await call("POST", "/courses", { body: input });
    expect(dup.status).toBe(422);
    expect(dup.body.errors.map((e) => e.field).sort()).toEqual(["code", "slug"]);

    const lesson = await call("POST", "/lessons", { body: { courseId: id, title: "Bài 1", order: 1, type: "video", durationMinutes: 30, status: "draft" } });
    expect(lesson.status).toBe(201);
    expect(((await call("GET", `/courses/${id}`)).body.data as { lessonCount: number }).lessonCount).toBe(1);
    await call("DELETE", `/courses/${id}`);
    expect(((await call("GET", "/lessons", { query: `?courseId=${id}` })).body.data as unknown[]).length).toBe(0);
  });

  it("không xóa danh mục còn khóa học (409)", async () => {
    expect((await call("DELETE", "/course-categories/cat-003")).status).toBe(409);
  });

  it("sinh lộ trình: ít bước nhất, tuần tự, cảnh báo khi trễ hạn", async () => {
    const res = await call("POST", "/learning-paths/generate", {
      body: { currentLevel: "36", targetScore: 65, deadline: "2026-12-01", startDate: "2026-10-10", weeklyHours: 6 },
    });
    const data = res.body.data as { steps: { startDate: string; endDate: string; targetScore: number }[]; feasible: boolean; warnings: string[] };
    expect(data.steps.length).toBeGreaterThanOrEqual(2);
    expect(data.steps.at(-1)?.targetScore).toBe(65);
    for (let i = 1; i < data.steps.length; i++) expect((data.steps[i] as { startDate: string }).startDate > (data.steps[i - 1] as { endDate: string }).endDate).toBe(true);
    expect(data.feasible).toBe(false);
    expect(data.warnings.join(" ")).toMatch(/trễ hạn/);
  });

  it("lộ trình có progress tính từ các bước hoàn thành", async () => {
    const list = await call("GET", "/learning-paths", { query: "?pageSize=50" });
    const items = list.body.data as { steps: { status: string }[]; progress: number; studentName?: string }[];
    expect(items.length).toBeGreaterThan(0);
    for (const p of items) {
      const done = p.steps.filter((s) => s.status === "done").length;
      expect(p.progress).toBe(Math.round((done / p.steps.length) * 100));
      expect(p.studentName).toBeTruthy();
    }
  });

  it("học liệu lọc theo khóa học và đếm trên bài học", async () => {
    const mats = await call("GET", "/learning-materials", { query: "?courseId=cou-004&pageSize=100" });
    const items = mats.body.data as { courseId: string; lessonId?: string }[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((m) => m.courseId === "cou-004")).toBe(true);
  });
});

describe("Mock API – Teachers / Question Bank / Lookups", () => {
  it("không xóa giáo viên đang phụ trách khóa học", async () => {
    const res = await call("DELETE", "/teachers/tch-001");
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/phụ trách/);
  });

  it("validate khung giờ rảnh (giờ kết thúc sau giờ bắt đầu)", async () => {
    const res = await call("POST", "/teachers", {
      body: { fullName: "GV Thử", email: "gv.thu@pteipass.vn", yearsExperience: 1, status: "active", availability: [{ day: 1, from: "20:00", to: "19:00", mode: "online" }] },
    });
    expect(res.status).toBe(422);
    expect(res.body.errors[0]?.field).toBe("availability.0.to");
  });

  it("ngân hàng câu hỏi phủ đủ 22 dạng; MC bắt buộc có đáp án đúng", async () => {
    const all = await call("GET", "/questions", { query: "?pageSize=200" });
    const types = new Set((all.body.data as { type: string }[]).map((q) => q.type));
    expect(types.size).toBe(QUESTION_TYPES.length);

    const bad = await call("POST", "/questions", {
      body: { skill: "reading", type: "reading_mc_single", prompt: "Q?", difficulty: "easy", status: "draft", options: [{ text: "A", isCorrect: false }, { text: "B", isCorrect: false }], tags: [] },
    });
    expect(bad.status).toBe(422);
    expect(bad.body.errors[0]?.field).toBe("options");

    const mismatch = await call("POST", "/questions", { body: { skill: "writing", type: "read_aloud", prompt: "Q?", difficulty: "easy", status: "draft", options: [], tags: [] } });
    expect(mismatch.status).toBe(422);
    expect(mismatch.body.errors[0]?.field).toBe("type");
  });

  it("lookups trả {value,label} và lọc theo q / parentId", async () => {
    const branches = await call("GET", "/lookups/branches");
    expect((branches.body.data as { value: string; label: string }[]).every((o) => o.value && o.label)).toBe(true);
    const lessons = await call("GET", "/lookups/lessons", { query: "?parentId=cou-004" });
    expect((lessons.body.data as { value: string }[]).every((o) => o.value.startsWith("les-004"))).toBe(true);
    const search = await call("GET", "/lookups/courses", { query: "?q=cap%20toc" });
    expect((search.body.data as unknown[]).length).toBeGreaterThan(0);
  });
});
