import type { Course, Lesson } from "@/features/courses/types";
import { learningPathSchema, generatePathSchema, type LearningPathInput } from "@/features/learning-paths/schemas";
import type { GeneratedPath, LearningPath, PathStep } from "@/features/learning-paths/types";
import { materialSchema, type MaterialInput } from "@/features/learning-materials/schemas";
import type { LearningMaterial, MaterialType } from "@/features/learning-materials/types";
import type { Student } from "@/features/students/types";
import type { PteLevel } from "@/shared/domain/pte";
import { COLLECTIONS } from "../collections";
import { collection, registerCollection } from "../engine/db";
import { defineResource } from "../engine/resource";
import { ok } from "../engine/responses";
import { addRoutes } from "../engine/router";
import { validateBody } from "../engine/validate";
import { createRng, dateOnlyAhead, isoDaysAgo, pad } from "../seed/random";

const MATERIALS = COLLECTIONS.materials;
const PATHS = COLLECTIONS.learningPaths;
const COURSES = COLLECTIONS.courses;
const LESSONS = COLLECTIONS.lessons;
const STUDENTS = COLLECTIONS.students;

const addDays = (date: string, days: number) => new Date(Date.parse(date) + days * 86_400_000).toISOString().slice(0, 10);
const levelScore = (l: PteLevel) => (l === "none" ? 20 : Number(l));

/**
 * Thuật toán gợi ý lộ trình (mô phỏng backend):
 * chọn các khóa đang mở có mốc điểm nằm giữa trình độ hiện tại và mục tiêu, xếp tuần tự theo mốc điểm,
 * điều chỉnh thời lượng theo số giờ học/tuần, rồi kiểm tra có kịp hạn chứng chỉ không.
 */
export function generatePath(input: {
  currentLevel: PteLevel;
  targetScore: number;
  deadline?: string;
  startDate: string;
  weeklyHours: number;
}): GeneratedPath {
  const from = levelScore(input.currentLevel);
  const published = collection<Course>(COURSES).filter((c) => c.status === "published");
  const stepCourses = published.filter(
    (c) => (c.type === "target_score" || c.type === "preparation") && c.targetScore !== undefined,
  );

  // Tham lam: ở mỗi chặng chọn khóa có mục tiêu cao nhất mà trình độ đầu vào còn phù hợp
  // (cho phép lệch tối đa 6 điểm), cho tới khi chạm mục tiêu ⇒ ít bước nhất.
  let chosen: Course[] = [];
  let score = from;
  if (input.currentLevel === "none") {
    const pre = published.find((c) => c.type === "preparation");
    if (pre) {
      chosen.push(pre);
      score = pre.targetScore ?? 30;
    }
  }
  while (score < input.targetScore) {
    const next = stepCourses
      .filter((c) => (c.targetScore ?? 0) > score && (c.targetScore ?? 0) <= input.targetScore && levelScore(c.entryLevel) <= score + 6)
      .sort((a, b) => (b.targetScore ?? 0) - (a.targetScore ?? 0))[0];
    if (!next) break;
    chosen.push(next);
    score = next.targetScore ?? score;
  }
  chosen = chosen.filter((c, i) => chosen.findIndex((x) => x.id === c.id) === i);
  // Không có khóa theo từng mốc: dùng khóa cấp tốc phù hợp mục tiêu.
  if (chosen.length === 0) {
    const fast = published
      .filter((c) => c.type === "intensive" && (c.targetScore ?? 0) >= input.targetScore)
      .sort((a, b) => (a.targetScore ?? 0) - (b.targetScore ?? 0))[0];
    if (fast) chosen = [fast];
  }

  const warnings: string[] = [];
  if (chosen.length === 0) warnings.push("Chưa có khóa học phù hợp với mục tiêu này. Hãy thêm bước thủ công.");

  let cursor = input.startDate;
  const steps: PathStep[] = chosen.map((c) => {
    // Khóa được thiết kế cho ~10 giờ/tuần; học ít giờ hơn thì kéo dài tương ứng.
    const weeks = Math.max(c.durationWeeks, Math.ceil((c.durationWeeks * 10) / input.weeklyHours));
    const endDate = addDays(cursor, weeks * 7 - 1);
    const step: PathStep = {
      title: c.name,
      courseId: c.id,
      courseName: c.name,
      targetScore: c.targetScore,
      startDate: cursor,
      endDate,
      status: "pending",
    };
    cursor = addDays(endDate, 1);
    return step;
  });

  const endDate = steps.length ? (steps[steps.length - 1] as PathStep).endDate : input.startDate;
  const estimatedWeeks = Math.round((Date.parse(endDate) - Date.parse(input.startDate)) / (7 * 86_400_000)) + (steps.length ? 1 : 0);
  let feasible = true;
  if (input.deadline && steps.length) {
    feasible = endDate <= input.deadline;
    if (!feasible) {
      const lateWeeks = Math.ceil((Date.parse(endDate) - Date.parse(input.deadline)) / (7 * 86_400_000));
      warnings.push(`Dự kiến hoàn thành ${endDate}, trễ hạn chứng chỉ khoảng ${lateWeeks} tuần. Cân nhắc tăng giờ học/tuần hoặc chọn khóa cấp tốc.`);
    }
  }
  if (input.weeklyHours < 5) warnings.push("Dưới 5 giờ/tuần thường khó đạt tiến bộ ổn định.");

  return { steps, estimatedWeeks, endDate, feasible, warnings };
}

const MATERIAL_URL: Record<MaterialType, (slug: string) => string> = {
  video: (s) => `https://cdn.pteipass.vn/videos/${s}.mp4`,
  pdf: (s) => `https://cdn.pteipass.vn/docs/${s}.pdf`,
  document: (s) => `https://cdn.pteipass.vn/docs/${s}.docx`,
  link: (s) => `https://pteipass.vn/tai-lieu/${s}`,
  worksheet: (s) => `https://cdn.pteipass.vn/worksheets/${s}.pdf`,
};

function seedMaterials(): LearningMaterial[] {
  const rng = createRng(909);
  const lessons = collection<Lesson>(LESSONS);
  const out: LearningMaterial[] = [];
  let n = 0;
  for (const lesson of lessons) {
    if (lesson.status !== "published" || !rng.chance(0.7)) continue;
    const types = rng.pickMany<MaterialType>(["video", "pdf", "worksheet"], 1, 2);
    for (const type of types) {
      n += 1;
      const slug = `${lesson.id}-${type}`;
      out.push({
        id: `mat-${pad(n)}`,
        title: `${lesson.title} – ${type === "video" ? "Bài giảng" : type === "pdf" ? "Slide tổng hợp" : "Bài tập"}`,
        type,
        url: MATERIAL_URL[type](slug),
        description: "Học liệu đi kèm bài học, dùng ôn tập sau buổi học.",
        skill: lesson.skill,
        courseId: lesson.courseId,
        lessonId: lesson.id,
        fileSizeKb: type === "video" ? undefined : rng.int(300, 8000),
        durationSeconds: type === "video" ? rng.int(600, 3600) : undefined,
        tags: rng.pickMany(["chiến lược", "bài tập", "từ vựng", "mẹo thi", "đề mẫu"], 1, 3),
        visibility: "enrolled",
        status: "published",
        createdAt: isoDaysAgo(rng.int(20, 300)),
        updatedAt: isoDaysAgo(rng.int(1, 20)),
      });
    }
  }
  // Tài liệu công khai làm lead magnet.
  const publicItems: [string, MaterialType, LearningMaterial["skill"]][] = [
    ["Tổng hợp từ khóa Summarize Spoken Text", "pdf", "listening"],
    ["Mẹo phát âm Read Aloud", "pdf", "speaking"],
    ["Bảng quy đổi điểm PTE – IELTS", "pdf", undefined],
    ["Template Essay 200 từ", "document", "writing"],
  ];
  publicItems.forEach(([title, type, skill], i) => {
    n += 1;
    out.push({
      id: `mat-${pad(n)}`,
      title,
      type,
      url: MATERIAL_URL[type](`public-${i + 1}`),
      description: "Tài liệu miễn phí, đổi lấy thông tin liên hệ.",
      skill,
      fileSizeKb: rng.int(200, 2500),
      tags: ["miễn phí", "lead magnet"],
      visibility: "public",
      status: "published",
      createdAt: isoDaysAgo(100 + i * 10),
      updatedAt: isoDaysAgo(10 + i),
    });
  });
  return out;
}

function seedPaths(): LearningPath[] {
  const rng = createRng(1212);
  const students = collection<Student>(STUDENTS).filter((s) => ["enroll", "learn", "mock"].includes(s.stage)).slice(0, 8);
  const levels: PteLevel[] = ["none", "30", "36", "42", "50"];
  return students.map((s, i) => {
    const currentLevel = rng.pick(levels);
    const targetScore = rng.pick([50, 58, 65, 79]);
    const startDate = isoDaysAgo(rng.int(10, 60)).slice(0, 10);
    const weeklyHours = rng.int(6, 14);
    const deadline = dateOnlyAhead(rng.int(60, 240));
    const generated = generatePath({ currentLevel, targetScore, deadline, startDate, weeklyHours });
    const steps: PathStep[] = generated.steps.map((st, idx) => ({
      ...st,
      status: idx === 0 ? "in_progress" : "pending",
    }));
    if (steps.length > 1 && s.stage === "mock") steps[0] = { ...(steps[0] as PathStep), status: "done" };
    return {
      id: `lp-${pad(i + 1)}`,
      studentId: s.id,
      title: `Lộ trình ${s.fullName} → PTE ${targetScore}`,
      currentLevel,
      targetScore,
      deadline,
      startDate,
      weeklyHours,
      status: "active" as const,
      steps,
      progress: 0,
      createdAt: isoDaysAgo(rng.int(5, 60)),
      updatedAt: isoDaysAgo(rng.int(1, 10)),
    };
  });
}

export function registerLearningModule(): void {
  registerCollection<LearningMaterial>(MATERIALS, seedMaterials);
  registerCollection<LearningPath>(PATHS, seedPaths);

  const courseName = (id?: string) => (id ? collection<Course>(COURSES).find((c) => c.id === id)?.name : undefined);
  const lessonTitle = (id?: string) => (id ? collection<Lesson>(LESSONS).find((l) => l.id === id)?.title : undefined);
  const student = (id: string) => collection<Student>(STUDENTS).find((s) => s.id === id);

  addRoutes(
    ...defineResource<LearningMaterial, MaterialInput>({
      path: "/learning-materials",
      permission: "learning_material",
      collection: MATERIALS,
      idPrefix: "mat",
      label: "học liệu",
      entityName: (m) => m.title,
      createSchema: materialSchema,
      list: {
        searchFields: ["title", "description", "tags"],
        filters: { type: "type", skill: "skill", courseId: "courseId", lessonId: "lessonId", visibility: "visibility", status: "status" },
        sortable: ["title", "type", "createdAt", "updatedAt", "status"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      merge: (current, input) => ({ ...current, ...input }),
      present: (m) => ({ ...m, courseName: courseName(m.courseId), lessonTitle: lessonTitle(m.lessonId) }),
    }),
    {
      method: "POST",
      pattern: "/learning-paths/generate",
      permission: "learning_path.view",
      handler: (req) => {
        const parsed = validateBody(generatePathSchema, req.body);
        if (!parsed.ok) return parsed.error;
        return ok(generatePath(parsed.data));
      },
    },
    ...defineResource<LearningPath, LearningPathInput>({
      path: "/learning-paths",
      permission: "learning_path",
      collection: PATHS,
      idPrefix: "lp",
      label: "lộ trình học",
      entityName: (p) => p.title,
      createSchema: learningPathSchema,
      list: {
        searchFields: ["title"],
        searchText: (p) => `${student(p.studentId)?.fullName ?? ""} ${student(p.studentId)?.code ?? ""}`,
        filters: { status: "status", studentId: "studentId" },
        sortable: ["title", "createdAt", "targetScore", "progress", "status", "deadline"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      build: (input, base) => ({ ...input, ...base, progress: 0 }),
      merge: (current, input) => ({ ...current, ...input }),
      present: (p) => {
        const done = p.steps.filter((s) => s.status === "done").length;
        const st = student(p.studentId);
        return {
          ...p,
          studentName: st?.fullName,
          studentCode: st?.code,
          progress: p.steps.length ? Math.round((done / p.steps.length) * 100) : 0,
          steps: p.steps.map((s) => ({ ...s, courseName: courseName(s.courseId) ?? s.courseName })),
        };
      },
    }),
  );
}
