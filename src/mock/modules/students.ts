import { collection, findById, insert, newId, nowIso, registerCollection, removeById } from "../engine/db";
import { writeAudit } from "../engine/audit";
import { queryList } from "../engine/list";
import { registerLookup } from "../engine/lookups";
import { defineResource } from "../engine/resource";
import { conflict, created, notFound, ok } from "../engine/responses";
import { addRoutes } from "../engine/router";
import { validateBody } from "../engine/validate";
import { createRng, dateOnlyAhead, emailFor, isoDaysAgo, pad, phoneFor, vietnameseName, type Rng } from "../seed/random";
import { JOURNEY_STAGES, JOURNEY_STAGE_LABELS, LEARNING_PURPOSES, STUDY_MODES, type JourneyStage, type PteLevel } from "@/shared/domain/pte";
import {
  LEAD_SOURCES,
  type JourneyEvent,
  type Student,
  type StudentJourney,
  type StudentProfile,
} from "@/features/students/types";
import {
  advanceJourneySchema,
  journeyNoteSchema,
  studentProfileSchema,
  studentSchema,
  type StudentInput,
} from "@/features/students/schemas";
import type { Branch } from "@/features/branches/types";
import type { User } from "@/features/users/types";
import { BRANCHES } from "./branches";

export const STUDENTS = "students";
export const STUDENT_PROFILES = "student-profiles";
export const JOURNEY_EVENTS = "student-journey-events";

const STAGE_PLAN: [JourneyStage, number][] = [
  ["lead", 12],
  ["test", 8],
  ["enroll", 6],
  ["learn", 12],
  ["mock", 4],
  ["exam", 3],
  ["result", 5],
];
const SALES_IDS = ["usr-002", "usr-007", "usr-008"];
const BRANCH_IDS = ["br-001", "br-002", "br-003"];
const BAND_LEVELS: PteLevel[] = ["none", "30", "36", "42", "50", "58"];
const TARGETS = [36, 42, 50, 50, 58, 58, 65, 65, 79];
const TAGS = ["VIP", "Cần gọi lại", "Học bổng", "Visa 190", "Visa 491", "Du học Úc", "Giới thiệu bởi HV cũ"];

interface SeedBundle {
  students: Student[];
  profiles: StudentProfile[];
  events: JourneyEvent[];
}

function stageEvent(rng: Rng, s: Student, stage: JourneyStage, at: string, p: StudentProfile): JourneyEvent {
  const data: JourneyEvent["data"] = {};
  let note: string | undefined;
  if (stage === "test") {
    data.score = rng.int(20, 58);
    note = `Kết quả test đầu vào: ${data.score} điểm`;
  } else if (stage === "mock") {
    data.score = Math.max(10, p.targetScore - rng.int(0, 8));
    note = `Thi thử lần ${rng.int(1, 3)}`;
  } else if (stage === "exam") {
    data.examDate = isoDaysAgo(rng.int(1, 20)).slice(0, 10);
    note = "Đăng ký lịch thi tại trung tâm Pearson";
  } else if (stage === "result") {
    data.score = p.targetScore + rng.int(-6, 8);
    data.passed = data.score >= p.targetScore;
    note = data.passed ? "Đạt mục tiêu" : "Chưa đạt, cần thi lại";
  } else if (stage === "enroll") {
    note = "Ghi danh khóa học và đóng học phí";
  } else if (stage === "learn") {
    note = "Bắt đầu học theo lộ trình";
  } else {
    note = `Nguồn: ${s.source}`;
  }
  return {
    id: newId("jev"),
    studentId: s.id,
    kind: "stage",
    stage,
    title: `Chuyển sang giai đoạn "${JOURNEY_STAGE_LABELS[stage]}"`,
    note,
    data: Object.keys(data).length ? data : undefined,
    createdByName: s.assignedToName ?? "Hệ thống",
    occurredAt: at,
    createdAt: at,
    updatedAt: at,
  };
}

function buildBundle(): SeedBundle {
  const rng = createRng(4242);
  const students: Student[] = [];
  const profiles: StudentProfile[] = [];
  const events: JourneyEvent[] = [];
  let n = 0;

  for (const [stage, count] of STAGE_PLAN) {
    for (let i = 0; i < count; i++) {
      n += 1;
      const { fullName, gender } = vietnameseName(rng);
      const createdDaysAgo = rng.int(10, 150);
      const createdAt = isoDaysAgo(createdDaysAgo);
      const targetScore = rng.pick(TARGETS);
      const purpose = rng.pick(LEARNING_PURPOSES);
      const currentLevel = rng.pick(BAND_LEVELS);
      const currentScore = currentLevel === "none" ? undefined : Number(currentLevel) + rng.int(-2, 4);
      const student: Student = {
        id: `stu-${pad(n)}`,
        code: `HV-${pad(n, 5)}`,
        fullName,
        gender,
        dateOfBirth: `${rng.int(1988, 2005)}-${pad(rng.int(1, 12), 2)}-${pad(rng.int(1, 28), 2)}`,
        email: emailFor(fullName, n),
        phone: phoneFor(rng),
        zalo: rng.chance(0.6) ? phoneFor(rng) : undefined,
        city: rng.pick(["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Brisbane"]),
        source: rng.pick(LEAD_SOURCES),
        branchId: rng.pick(BRANCH_IDS),
        assignedTo: rng.pick(SALES_IDS),
        status: stage === "result" ? "closed" : rng.chance(0.08) ? "paused" : "active",
        stage,
        tags: rng.pickMany(TAGS, 0, 2),
        notes: rng.chance(0.3) ? "Học viên quan tâm lộ trình cấp tốc, ưu tiên lớp tối." : undefined,
        createdAt,
        updatedAt: isoDaysAgo(Math.max(0, createdDaysAgo - rng.int(1, 9))),
      };
      const profile: StudentProfile = {
        id: student.id,
        studentId: student.id,
        currentLevel,
        currentScore,
        skillScores: currentScore
          ? {
              speaking: Math.max(10, currentScore + rng.int(-6, 6)),
              writing: Math.max(10, currentScore + rng.int(-6, 6)),
              reading: Math.max(10, currentScore + rng.int(-6, 6)),
              listening: Math.max(10, currentScore + rng.int(-6, 6)),
            }
          : undefined,
        targetScore,
        purpose,
        purposeDetail: purpose === "migration" ? "Xét visa tay nghề, cần tối thiểu 65 mỗi kỹ năng" : undefined,
        targetCountry: purpose === "study_abroad" || purpose === "migration" ? rng.pick(["AU", "AU", "NZ", "CA", "UK"] as const) : undefined,
        examDeadline: stage === "result" ? undefined : dateOnlyAhead(rng.int(20, 200)),
        studyHoursPerWeek: rng.int(4, 20),
        preferredMode: rng.pick(STUDY_MODES),
        preferredSchedule: rng.pick(["Tối T2-4-6", "Sáng T3-5-7", "Cuối tuần", "Linh hoạt"]),
        createdAt,
        updatedAt: student.updatedAt,
      };
      students.push(student);
      profiles.push(profile);

      // Sự kiện: mỗi giai đoạn đã đi qua một mốc thời gian tăng dần.
      const reached = JOURNEY_STAGES.slice(0, JOURNEY_STAGES.indexOf(stage) + 1);
      reached.forEach((st, idx) => {
        const at = new Date(Date.parse(createdAt) + idx * rng.int(3, 12) * 86_400_000).toISOString();
        events.push(stageEvent(rng, student, st, at, profile));
      });
    }
  }
  return { students, profiles, events };
}

const nextCode = () => {
  const max = collection<Student>(STUDENTS).reduce((m, s) => Math.max(m, Number(s.code.replace(/\D/g, "")) || 0), 0);
  return `HV-${pad(max + 1, 5)}`;
};

export function registerStudentsModule(): void {
  registerCollection<Student>(STUDENTS, () => buildBundle().students);
  registerCollection<StudentProfile>(STUDENT_PROFILES, () => buildBundle().profiles);
  registerCollection<JourneyEvent>(JOURNEY_EVENTS, () => buildBundle().events);

  registerLookup("students", () => collection<Student>(STUDENTS).map((s) => ({ value: s.id, label: `${s.code} – ${s.fullName}` })));

  const branchName = (id?: string) => (id ? collection<Branch>(BRANCHES).find((b) => b.id === id)?.name : undefined);
  const staffName = (id?: string) => (id ? collection<User>("users").find((u) => u.id === id)?.fullName : undefined);
  const profileOf = (id: string) => collection<StudentProfile>(STUDENT_PROFILES).find((p) => p.studentId === id);

  const present = (s: Student): Student => {
    const profile = profileOf(s.id);
    return {
      ...s,
      branchName: branchName(s.branchId),
      assignedToName: staffName(s.assignedTo),
      targetScore: profile?.targetScore,
      examDeadline: profile?.examDeadline,
    };
  };

  const eventsOf = (id: string) =>
    collection<JourneyEvent>(JOURNEY_EVENTS)
      .filter((e) => e.studentId === id)
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));

  const listCfg = {
    searchFields: ["fullName", "email", "phone", "code", "zalo"] as const,
    filters: {
      stage: "stage",
      status: "status",
      source: "source",
      branchId: "branchId",
      assignedTo: "assignedTo",
      purpose: (s: Student, v: string) => profileOf(s.id)?.purpose === v,
    },
    sortable: ["fullName", "code", "createdAt", "updatedAt", "stage", "status", "targetScore", "examDeadline"],
    defaultSort: { sortBy: "createdAt", sortOrder: "desc" as const },
  };

  addRoutes(
    // Xuất dữ liệu: phải khai báo trước /students/:id (route tĩnh được ưu tiên bởi router).
    {
      method: "GET",
      pattern: "/students/export",
      permission: "student.export",
      handler: (req) => {
        const res = queryList(collection<Student>(STUDENTS).map(present), { ...req, query: withoutPaging(req.query) }, listCfg);
        writeAudit(req.actor, { action: "export", resource: "student", entityId: "-", entityLabel: "Xuất danh sách học viên" });
        return res;
      },
    },
    ...defineResource<Student, StudentInput>({
      path: "/students",
      permission: "student",
      collection: STUDENTS,
      idPrefix: "stu",
      label: "học viên",
      entityName: (s) => `${s.code} – ${s.fullName}`,
      createSchema: studentSchema,
      list: listCfg,
      unique: [{ field: "email", message: "Email đã tồn tại trong hệ thống" }],
      build: (input, base) => ({ ...input, ...base, code: nextCode(), stage: "lead", tags: input.tags ?? [] }),
      merge: (current, input) => ({ ...current, ...input, tags: input.tags ?? [] }),
      present,
      afterCreate: (student, actor) => {
        const at = nowIso();
        insert<JourneyEvent>(JOURNEY_EVENTS, {
          id: newId("jev"),
          studentId: student.id,
          kind: "stage",
          stage: "lead",
          title: `Tạo hồ sơ học viên (${JOURNEY_STAGE_LABELS.lead})`,
          note: `Nguồn: ${student.source}`,
          createdByName: actor?.userName ?? "Hệ thống",
          occurredAt: at,
          createdAt: at,
          updatedAt: at,
        });
      },
      afterDelete: (student) => {
        removeById(STUDENT_PROFILES, student.id);
        const events = collection<JourneyEvent>(JOURNEY_EVENTS);
        for (let i = events.length - 1; i >= 0; i--) if (events[i]?.studentId === student.id) events.splice(i, 1);
      },
    }),

    // ── Hồ sơ PTE ────────────────────────────────────────────────────────
    {
      method: "GET",
      pattern: "/students/:id/profile",
      permission: "student.view",
      handler: (req) => {
        const id = req.params.id ?? "";
        if (!findById<Student>(STUDENTS, id)) return notFound("Không tìm thấy học viên");
        return ok(profileOf(id) ?? null);
      },
    },
    {
      method: "PUT",
      pattern: "/students/:id/profile",
      permission: "student.edit",
      handler: (req) => {
        const id = req.params.id ?? "";
        const student = findById<Student>(STUDENTS, id);
        if (!student) return notFound("Không tìm thấy học viên");
        const parsed = validateBody(studentProfileSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const current = profileOf(id);
        const now = nowIso();
        const next: StudentProfile = {
          ...parsed.data,
          id,
          studentId: id,
          createdAt: current?.createdAt ?? now,
          updatedAt: now,
        };
        const list = collection<StudentProfile>(STUDENT_PROFILES);
        const idx = list.findIndex((p) => p.studentId === id);
        if (idx >= 0) list[idx] = next;
        else list.push(next);
        writeAudit(req.actor, {
          action: current ? "update" : "create",
          resource: "student",
          entityId: id,
          entityLabel: `Hồ sơ PTE – ${student.fullName}`,
          before: current,
          after: next,
        });
        return ok(next);
      },
    },

    // ── Hành trình ───────────────────────────────────────────────────────
    {
      method: "GET",
      pattern: "/students/:id/journey",
      permission: "student.view",
      handler: (req) => {
        const student = findById<Student>(STUDENTS, req.params.id ?? "");
        if (!student) return notFound("Không tìm thấy học viên");
        const journey: StudentJourney = { studentId: student.id, currentStage: student.stage, events: eventsOf(student.id) };
        return ok(journey);
      },
    },
    {
      method: "POST",
      pattern: "/students/:id/journey/advance",
      permission: "student.edit",
      handler: (req) => {
        const student = findById<Student>(STUDENTS, req.params.id ?? "");
        if (!student) return notFound("Không tìm thấy học viên");
        const parsed = validateBody(advanceJourneySchema, req.body);
        if (!parsed.ok) return parsed.error;
        const { stage, note, score, examDate, passed } = parsed.data;
        if (JOURNEY_STAGES.indexOf(stage) <= JOURNEY_STAGES.indexOf(student.stage)) {
          return conflict(`Học viên đang ở giai đoạn "${JOURNEY_STAGE_LABELS[student.stage]}", chỉ được chuyển tiếp sang giai đoạn sau`);
        }
        const at = nowIso();
        const event: JourneyEvent = {
          id: newId("jev"),
          studentId: student.id,
          kind: "stage",
          stage,
          title: `Chuyển sang giai đoạn "${JOURNEY_STAGE_LABELS[stage]}"`,
          note,
          data: score !== undefined || examDate || passed !== undefined ? { score, examDate, passed } : undefined,
          createdByName: req.actor?.userName ?? "Hệ thống",
          occurredAt: at,
          createdAt: at,
          updatedAt: at,
        };
        insert(JOURNEY_EVENTS, event);
        const before = { stage: student.stage };
        student.stage = stage;
        student.updatedAt = at;
        if (stage === "result") student.status = "closed";
        writeAudit(req.actor, {
          action: "update",
          resource: "student",
          entityId: student.id,
          entityLabel: `Hành trình – ${student.fullName}`,
          before,
          after: { stage },
        });
        return created(event);
      },
    },
    {
      method: "POST",
      pattern: "/students/:id/journey/notes",
      permission: "student.edit",
      handler: (req) => {
        const student = findById<Student>(STUDENTS, req.params.id ?? "");
        if (!student) return notFound("Không tìm thấy học viên");
        const parsed = validateBody(journeyNoteSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const at = nowIso();
        const event: JourneyEvent = {
          id: newId("jev"),
          studentId: student.id,
          kind: "note",
          stage: student.stage,
          title: "Ghi chú",
          note: parsed.data.note,
          createdByName: req.actor?.userName ?? "Hệ thống",
          occurredAt: at,
          createdAt: at,
          updatedAt: at,
        };
        insert(JOURNEY_EVENTS, event);
        return created(event);
      },
    },
  );
}

function withoutPaging(q: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(q);
  next.delete("page");
  next.set("pageSize", "200");
  return next;
}
