import type { Branch } from "@/features/branches/types";
import type { Course } from "@/features/courses/types";
import { teacherSchema, type TeacherInput } from "@/features/teachers/schemas";
import type { Teacher } from "@/features/teachers/types";
import { collection, registerCollection } from "../engine/db";
import { registerLookup } from "../engine/lookups";
import { defineResource } from "../engine/resource";
import { conflict } from "../engine/responses";
import { addRoutes } from "../engine/router";
import { createRng, emailFor, isoDaysAgo, pad, phoneFor } from "../seed/random";
import { COLLECTIONS } from "../collections";

const TEACHERS = COLLECTIONS.teachers;
const COURSES = COLLECTIONS.courses;
const BRANCHES = COLLECTIONS.branches;

const SLOTS = (days: number[], from: string, to: string, mode: "online" | "offline" | "both") =>
  days.map((day) => ({ day: day as 0 | 1 | 2 | 3 | 4 | 5 | 6, from, to, mode }));

function seedTeachers(): Teacher[] {
  const rng = createRng(31);
  const rows: Pick<Teacher, "fullName" | "headline" | "pteScore" | "yearsExperience" | "specialties" | "qualifications" | "branchId" | "status" | "availability" | "bio">[] = [
    {
      fullName: "Nguyễn Thu Hà",
      headline: "Giảng viên PTE Speaking & Pronunciation",
      pteScore: 90,
      yearsExperience: 9,
      specialties: ["speaking", "listening"],
      qualifications: ["PTE 90 overall", "Pearson Certified Trainer", "TESOL"],
      branchId: "br-001",
      status: "active",
      availability: [...SLOTS([0, 2, 4], "18:30", "21:00", "both"), ...SLOTS([5], "09:00", "12:00", "offline")],
      bio: "9 năm kinh nghiệm luyện thi PTE, từng đồng hành cùng hơn 2.000 học viên đạt mục tiêu 65–79.",
    },
    {
      fullName: "Trần Minh Khôi",
      headline: "Chuyên gia Writing & Reading",
      pteScore: 89,
      yearsExperience: 7,
      specialties: ["writing", "reading"],
      qualifications: ["PTE 89 overall", "CELTA"],
      branchId: "br-001",
      status: "active",
      availability: [...SLOTS([1, 3], "19:00", "21:30", "online"), ...SLOTS([6], "08:00", "11:00", "online")],
      bio: "Tập trung chiến lược Summarize Written Text, Essay và Fill in the Blanks.",
    },
    {
      fullName: "Lê Phương Anh",
      headline: "Giảng viên PTE nền tảng",
      pteScore: 85,
      yearsExperience: 5,
      specialties: ["speaking", "writing", "reading", "listening"],
      qualifications: ["PTE 85 overall", "IELTS 8.0"],
      branchId: "br-002",
      status: "active",
      availability: [...SLOTS([0, 1, 2, 3, 4], "14:00", "17:00", "both")],
      bio: "Dạy lớp nền tảng cho học viên mới bắt đầu, xây phát âm và từ vựng học thuật.",
    },
    {
      fullName: "Phạm Quốc Bảo",
      headline: "Giảng viên luyện thi cấp tốc",
      pteScore: 90,
      yearsExperience: 8,
      specialties: ["listening", "reading"],
      qualifications: ["PTE 90 overall", "Pearson Certified Trainer"],
      branchId: "br-002",
      status: "on_leave",
      availability: [],
      bio: "Chuyên các lớp cấp tốc 58/65/79 theo lộ trình mock test hàng tuần.",
    },
    {
      fullName: "Vũ Ngọc Trâm",
      headline: "Giảng viên Brisbane – PTE Core & PR",
      pteScore: 88,
      yearsExperience: 6,
      specialties: ["speaking", "writing"],
      qualifications: ["PTE 88 overall", "MA Applied Linguistics"],
      branchId: "br-003",
      status: "active",
      availability: [...SLOTS([2, 4], "17:00", "20:00", "online"), ...SLOTS([5], "10:00", "13:00", "offline")],
      bio: "Hỗ trợ học viên định cư Úc/Canada cần điểm PTE/PTE Core.",
    },
    {
      fullName: "Đỗ Hoàng Nam",
      headline: "Kèm 1-1 & sửa phát âm",
      pteScore: 84,
      yearsExperience: 4,
      specialties: ["speaking"],
      qualifications: ["PTE 84 overall"],
      branchId: "br-001",
      status: "inactive",
      availability: [],
      bio: "Đã ngưng hợp tác từ tháng 6/2026.",
    },
  ];
  return rows.map((r, i) => ({
    ...r,
    id: `tch-${pad(i + 1)}`,
    code: `GV-${pad(i + 1)}`,
    email: emailFor(r.fullName, i + 1, "pteipass.vn"),
    phone: phoneFor(rng),
    avatarUrl: null,
    branchName: undefined,
    courses: [],
    createdAt: isoDaysAgo(700 - i * 40),
    updatedAt: isoDaysAgo(rng.int(5, 60)),
  }));
}

export function registerTeachersModule(): void {
  registerCollection<Teacher>(TEACHERS, seedTeachers);

  registerLookup("teachers", () =>
    collection<Teacher>(TEACHERS)
      .filter((t) => t.status !== "inactive")
      .map((t) => ({ value: t.id, label: t.fullName })),
  );

  const coursesOf = (id: string) =>
    collection<Course>(COURSES)
      .filter((c) => c.teacherIds.includes(id))
      .map((c) => ({ id: c.id, name: c.name }));
  const branchName = (id?: string) => (id ? collection<Branch>(BRANCHES).find((b) => b.id === id)?.name : undefined);

  addRoutes(
    ...defineResource<Teacher, TeacherInput>({
      path: "/teachers",
      permission: "teacher",
      collection: TEACHERS,
      idPrefix: "tch",
      label: "giáo viên",
      entityName: (t) => `${t.code} – ${t.fullName}`,
      createSchema: teacherSchema,
      list: {
        searchFields: ["fullName", "email", "code", "headline"],
        filters: { status: "status", branchId: "branchId", specialty: "specialties" },
        sortable: ["fullName", "code", "pteScore", "yearsExperience", "createdAt", "status"],
        defaultSort: { sortBy: "fullName", sortOrder: "asc" },
      },
      unique: [{ field: "email", message: "Email đã được sử dụng" }],
      build: (input, base) => {
        const max = collection<Teacher>(TEACHERS).reduce((m, t) => Math.max(m, Number(t.code.replace(/\D/g, "")) || 0), 0);
        return { ...input, ...base, code: `GV-${pad(max + 1)}`, avatarUrl: null, courses: [] };
      },
      merge: (current, input) => ({ ...current, ...input }),
      present: (t) => ({ ...t, branchName: branchName(t.branchId), courses: coursesOf(t.id) }),
      beforeDelete: (t) => {
        const active = coursesOf(t.id);
        return active.length > 0
          ? conflict(`Giáo viên đang phụ trách ${active.length} khóa học (${active.map((c) => c.name).join(", ")}). Hãy chuyển phụ trách trước khi xóa.`)
          : undefined;
      },
    }),
  );
}
