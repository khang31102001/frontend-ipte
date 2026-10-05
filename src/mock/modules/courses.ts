import {
  courseCategorySchema,
  courseSchema,
  lessonSchema,
  type CourseCategoryInput,
  type CourseInput,
  type LessonInput,
} from "@/features/courses/schemas";
import type { Course, CourseCategory, CourseStatus, CourseType, Lesson, LessonType } from "@/features/courses/types";
import type { LearningMaterial } from "@/features/learning-materials/types";
import type { Teacher } from "@/features/teachers/types";
import type { PteLevel, PteSkill, PteTargetScore, StudyMode } from "@/shared/domain/pte";
import { collection, registerCollection } from "../engine/db";
import { publishGuard } from "../engine/guards";
import { registerLookup } from "../engine/lookups";
import { defineResource } from "../engine/resource";
import { conflict } from "../engine/responses";
import { addRoutes } from "../engine/router";
import { createRng, isoDaysAgo, pad, stripVietnamese } from "../seed/random";
import { COLLECTIONS } from "../collections";

const COURSE_CATEGORIES = COLLECTIONS.courseCategories;
const COURSES = COLLECTIONS.courses;
const LESSONS = COLLECTIONS.lessons;
const MATERIALS = COLLECTIONS.materials;
const TEACHERS = COLLECTIONS.teachers;

const slugOf = (s: string) =>
  stripVietnamese(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function seedCategories(): CourseCategory[] {
  const rows: [string, string, string][] = [
    ["PTE Nền tảng (Pre PTE)", "Dành cho học viên mới bắt đầu, xây phát âm, từ vựng và kỹ năng cốt lõi.", "cat-001"],
    ["PTE 30 – 42", "Lộ trình đạt 30–42 điểm cho mục tiêu cơ bản.", "cat-002"],
    ["PTE 50 – 58", "Lộ trình 50–58 điểm: du học, visa 482/485/491.", "cat-003"],
    ["PTE 65 – 79", "Lộ trình 65–79 điểm: định cư (189/190), cạnh tranh điểm cao.", "cat-004"],
    ["PTE Core (Canada)", "Luyện thi PTE Core cho di trú Canada.", "cat-005"],
    ["Kèm 1-1", "Học riêng với giáo viên theo lộ trình cá nhân hóa.", "cat-006"],
    ["Chuyên sâu phát âm", "Sửa phát âm, ngữ điệu, nhịp điệu cho Speaking.", "cat-007"],
    ["Cấp tốc", "Khóa ngắn hạn tăng tốc trước ngày thi.", "cat-008"],
  ];
  return rows.map(([name, description, id], i) => ({
    id,
    name,
    slug: slugOf(name),
    description,
    parentId: null,
    sortOrder: i + 1,
    isActive: true,
    courseCount: 0,
    createdAt: isoDaysAgo(600 - i * 10),
    updatedAt: isoDaysAgo(40 + i),
  }));
}

interface CourseRow {
  code: string;
  name: string;
  cat: string;
  type: CourseType;
  target?: PteTargetScore;
  entry: PteLevel;
  mode: StudyMode;
  weeks: number;
  sessions: number;
  tuition: number;
  teachers: string[];
  status: CourseStatus;
  featured?: boolean;
}

const COURSE_ROWS: CourseRow[] = [
  { code: "PRE-36", name: "Pre PTE – Bổ trợ nền tảng", cat: "cat-001", type: "preparation", target: 36, entry: "none", mode: "online", weeks: 8, sessions: 24, tuition: 6_500_000, teachers: ["tch-003"], status: "published", featured: true },
  { code: "PTE-36", name: "Luyện thi PTE 30–36 cam kết đầu ra", cat: "cat-002", type: "target_score", target: 36, entry: "30", mode: "hybrid", weeks: 10, sessions: 30, tuition: 8_900_000, teachers: ["tch-003", "tch-001"], status: "published" },
  { code: "PTE-42", name: "Luyện thi PTE 42 chuyên sâu", cat: "cat-002", type: "target_score", target: 42, entry: "36", mode: "hybrid", weeks: 12, sessions: 36, tuition: 11_500_000, teachers: ["tch-001", "tch-002"], status: "published" },
  { code: "PTE-50", name: "Luyện thi PTE 50 – Du học & visa 482", cat: "cat-003", type: "target_score", target: 50, entry: "42", mode: "hybrid", weeks: 12, sessions: 36, tuition: 13_500_000, teachers: ["tch-001", "tch-002"], status: "published", featured: true },
  { code: "PTE-58", name: "Luyện thi PTE 58 – Visa 491/485", cat: "cat-003", type: "target_score", target: 58, entry: "50", mode: "online", weeks: 14, sessions: 42, tuition: 16_000_000, teachers: ["tch-002", "tch-004"], status: "published" },
  { code: "PTE-65", name: "Luyện thi PTE 65 – Định cư tay nghề", cat: "cat-004", type: "target_score", target: 65, entry: "58", mode: "online", weeks: 16, sessions: 48, tuition: 19_000_000, teachers: ["tch-001", "tch-004"], status: "published", featured: true },
  { code: "PTE-79", name: "Luyện thi PTE 79+ – Điểm cao cạnh tranh", cat: "cat-004", type: "target_score", target: 79, entry: "65", mode: "online", weeks: 16, sessions: 48, tuition: 22_000_000, teachers: ["tch-001", "tch-002"], status: "published" },
  { code: "FAST-50", name: "Cấp tốc PTE 36/42/50", cat: "cat-008", type: "intensive", target: 50, entry: "36", mode: "online", weeks: 6, sessions: 18, tuition: 9_900_000, teachers: ["tch-004"], status: "published" },
  { code: "FAST-79", name: "Cấp tốc PTE 58/65/79", cat: "cat-008", type: "intensive", target: 79, entry: "58", mode: "online", weeks: 6, sessions: 18, tuition: 14_500_000, teachers: ["tch-004", "tch-002"], status: "published", featured: true },
  { code: "CORE", name: "PTE Core cho di trú Canada", cat: "cat-005", type: "core", entry: "42", mode: "online", weeks: 10, sessions: 30, tuition: 15_000_000, teachers: ["tch-005"], status: "published" },
  { code: "1ON1", name: "Kèm 1-1 theo lộ trình cá nhân", cat: "cat-006", type: "one_on_one", entry: "none", mode: "hybrid", weeks: 8, sessions: 16, tuition: 24_000_000, teachers: ["tch-001"], status: "published" },
  { code: "PRON", name: "Chuyên sâu phát âm PTE Pronunciation", cat: "cat-007", type: "pronunciation", entry: "none", mode: "online", weeks: 4, sessions: 12, tuition: 4_800_000, teachers: ["tch-001"], status: "published" },
  { code: "MOCK-WEEK", name: "Luyện đề Mock Test hàng tuần", cat: "cat-008", type: "target_score", target: 65, entry: "50", mode: "online", weeks: 8, sessions: 8, tuition: 0, teachers: [], status: "draft" },
  { code: "PTE-45-2025", name: "PTE 45 Khai giảng 2025", cat: "cat-003", type: "target_score", target: 42, entry: "36", mode: "offline", weeks: 12, sessions: 36, tuition: 10_900_000, teachers: ["tch-006"], status: "archived" },
];

function seedCourses(): Course[] {
  const rng = createRng(501);
  return COURSE_ROWS.map((r, i) => ({
    id: `cou-${pad(i + 1)}`,
    code: r.code,
    name: r.name,
    slug: slugOf(r.name),
    categoryId: r.cat,
    type: r.type,
    targetScore: r.target,
    entryLevel: r.entry,
    mode: r.mode,
    durationWeeks: r.weeks,
    sessionsCount: r.sessions,
    tuition: r.tuition,
    teacherIds: r.teachers,
    summary: `${r.name}: lộ trình ${r.weeks} tuần, ${r.sessions} buổi, có chấm bài và phản hồi chi tiết từng tuần.`,
    description:
      "Chương trình được thiết kế theo từng kỹ năng Speaking – Writing – Reading – Listening, kết hợp chiến lược làm bài, luyện đề thực tế và thi thử định kỳ.",
    outcomes: [
      r.target ? `Đạt mục tiêu PTE ${r.target}+ sau khóa học` : "Nắm vững chiến lược làm bài PTE",
      "Chấm bài và phản hồi cá nhân hóa mỗi tuần",
      "Thi thử định kỳ với đề sát đề thật",
    ],
    audience: ["Học viên cần chứng chỉ PTE cho du học/định cư", "Người đã học IELTS muốn chuyển sang PTE"],
    status: r.status,
    isFeatured: Boolean(r.featured),
    thumbnailUrl: `/images/featured-course-${(i % 4) + 1}.png`,
    metaTitle: `${r.name} | PTE iPASS`,
    metaDescription: `Khóa ${r.name} tại PTE iPASS: ${r.weeks} tuần, ${r.sessions} buổi, giáo viên PTE 85+.`,
    lessonCount: 0,
    enrolledCount: r.status === "draft" ? 0 : rng.int(25, 320),
    createdAt: isoDaysAgo(500 - i * 25),
    updatedAt: isoDaysAgo(rng.int(3, 90)),
  }));
}

const LESSON_TEMPLATE: [string, LessonType, PteSkill | undefined, number][] = [
  ["Tổng quan PTE & cách tính điểm", "live", undefined, 60],
  ["Speaking: Read Aloud & Repeat Sentence", "video", "speaking", 90],
  ["Speaking: Describe Image & Re-tell Lecture", "video", "speaking", 90],
  ["Writing: Summarize Written Text", "video", "writing", 90],
  ["Writing: Essay – cấu trúc & từ vựng", "live", "writing", 90],
  ["Reading: Fill in the Blanks", "practice", "reading", 75],
  ["Reading: Re-order Paragraphs", "video", "reading", 75],
  ["Listening: Summarize Spoken Text", "video", "listening", 90],
  ["Listening: Write from Dictation", "practice", "listening", 60],
  ["Mock Test & chữa đề", "mock_test", undefined, 120],
  ["Webinar giải đáp & chiến lược ngày thi", "webinar", undefined, 60],
];

function seedLessons(): Lesson[] {
  const courses = seedCourses();
  const lessons: Lesson[] = [];
  courses.forEach((c, ci) => {
    const count = c.status === "draft" ? 3 : c.type === "pronunciation" ? 5 : c.status === "archived" ? 6 : LESSON_TEMPLATE.length;
    LESSON_TEMPLATE.slice(0, count).forEach(([title, type, skill, duration], i) => {
      lessons.push({
        id: `les-${pad(ci + 1)}-${pad(i + 1, 2)}`,
        courseId: c.id,
        title,
        order: i + 1,
        type,
        skill,
        durationMinutes: duration,
        objectives: `Hiểu cấu trúc dạng bài, áp dụng chiến lược và luyện ${skill ?? "toàn diện"} theo mẫu đề thật.`,
        status: c.status === "draft" && i > 0 ? "draft" : "published",
        materialCount: 0,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      });
    });
  });
  return lessons;
}

export function registerCoursesModule(): void {
  registerCollection<CourseCategory>(COURSE_CATEGORIES, seedCategories);
  registerCollection<Course>(COURSES, seedCourses);
  registerCollection<Lesson>(LESSONS, seedLessons);

  registerLookup("course-categories", () =>
    collection<CourseCategory>(COURSE_CATEGORIES)
      .filter((c) => c.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => ({ value: c.id, label: c.name })),
  );
  registerLookup("courses", () =>
    collection<Course>(COURSES)
      .filter((c) => c.status !== "archived")
      .map((c) => ({ value: c.id, label: `${c.code} – ${c.name}` })),
  );
  registerLookup("lessons", ({ parentId }) =>
    collection<Lesson>(LESSONS)
      .filter((l) => !parentId || l.courseId === parentId)
      .sort((a, b) => a.order - b.order)
      .map((l) => ({ value: l.id, label: `${l.order}. ${l.title}` })),
  );

  const categoryName = (id: string) => collection<CourseCategory>(COURSE_CATEGORIES).find((c) => c.id === id)?.name;
  const courseCountOf = (categoryId: string) => collection<Course>(COURSES).filter((c) => c.categoryId === categoryId).length;
  const lessonCountOf = (courseId: string) => collection<Lesson>(LESSONS).filter((l) => l.courseId === courseId).length;
  const teacherNames = (ids: string[]) =>
    ids.map((id) => collection<Teacher>(TEACHERS).find((t) => t.id === id)?.fullName).filter((n): n is string => Boolean(n));
  const materialCountOf = (lessonId: string) => collection<LearningMaterial>(MATERIALS).filter((m) => m.lessonId === lessonId).length;

  addRoutes(
    ...defineResource<CourseCategory, CourseCategoryInput>({
      path: "/course-categories",
      permission: "course",
      collection: COURSE_CATEGORIES,
      idPrefix: "cat",
      label: "danh mục khóa học",
      entityName: (c) => c.name,
      createSchema: courseCategorySchema,
      list: {
        searchFields: ["name", "slug", "description"],
        filters: { isActive: (c, v) => String(c.isActive) === v, parentId: "parentId" },
        sortable: ["name", "sortOrder", "courseCount", "createdAt"],
        defaultSort: { sortBy: "sortOrder", sortOrder: "asc" },
      },
      unique: [
        { field: "name", message: "Tên danh mục đã tồn tại" },
        { field: "slug", message: "Slug đã tồn tại" },
      ],
      build: (input, base) => ({ ...input, ...base, parentId: input.parentId ?? null, courseCount: 0 }),
      merge: (current, input) => ({ ...current, ...input, parentId: input.parentId ?? null }),
      present: (c) => ({
        ...c,
        courseCount: courseCountOf(c.id),
        parentName: c.parentId ? categoryName(c.parentId) : undefined,
      }),
      beforeDelete: (c) => {
        if (courseCountOf(c.id) > 0) return conflict("Danh mục còn khóa học, hãy chuyển khóa học sang danh mục khác trước");
        if (collection<CourseCategory>(COURSE_CATEGORIES).some((x) => x.parentId === c.id)) return conflict("Danh mục còn danh mục con");
        return undefined;
      },
    }),
    ...defineResource<Course, CourseInput>({
      path: "/courses",
      permission: "course",
      collection: COURSES,
      idPrefix: "cou",
      label: "khóa học",
      entityName: (c) => `${c.code} – ${c.name}`,
      createSchema: courseSchema,
      list: {
        searchFields: ["name", "code", "summary", "slug"],
        filters: {
          status: "status",
          type: "type",
          categoryId: "categoryId",
          mode: "mode",
          targetScore: (c, v) => String(c.targetScore) === v,
          isFeatured: (c, v) => String(c.isFeatured) === v,
        },
        sortable: ["name", "code", "tuition", "targetScore", "durationWeeks", "createdAt", "status", "enrolledCount", "lessonCount"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      unique: [
        { field: "code", message: "Mã khóa học đã tồn tại" },
        { field: "slug", message: "Slug đã tồn tại" },
      ],
      guard: publishGuard<Course>("course"),
      build: (input, base) => ({ ...input, ...base, lessonCount: 0, enrolledCount: 0 }),
      merge: (current, input) => ({ ...current, ...input }),
      present: (c) => ({
        ...c,
        categoryName: categoryName(c.categoryId),
        teacherNames: teacherNames(c.teacherIds),
        lessonCount: lessonCountOf(c.id),
      }),
      afterDelete: (c) => {
        const lessons = collection<Lesson>(LESSONS);
        for (let i = lessons.length - 1; i >= 0; i--) if (lessons[i]?.courseId === c.id) lessons.splice(i, 1);
      },
    }),
    ...defineResource<Lesson, LessonInput>({
      path: "/lessons",
      permission: "lesson",
      collection: LESSONS,
      idPrefix: "les",
      label: "bài học",
      entityName: (l) => l.title,
      createSchema: lessonSchema,
      list: {
        searchFields: ["title", "objectives"],
        filters: { courseId: "courseId", type: "type", status: "status" },
        sortable: ["order", "title", "durationMinutes", "createdAt"],
        defaultSort: { sortBy: "order", sortOrder: "asc" },
      },
      build: (input, base) => ({ ...input, ...base, materialCount: 0 }),
      merge: (current, input) => ({ ...current, ...input }),
      present: (l) => ({ ...l, materialCount: materialCountOf(l.id) }),
      beforeDelete: (l) => (materialCountOf(l.id) > 0 ? conflict("Bài học còn học liệu, hãy gỡ học liệu trước khi xóa") : undefined),
    }),
  );
}
