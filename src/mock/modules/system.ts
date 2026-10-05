import type { Branch } from "@/features/branches/types";
import type { Course } from "@/features/courses/types";
import type {
  CountByKey,
  DailyPoint,
  DashboardSummary,
  EnrollmentGroupBy,
  EnrollmentReport,
  FunnelReport,
  FunnelStep,
  LeadSourceReport,
} from "@/features/dashboard/types";
import type { LearningPath } from "@/features/learning-paths/types";
import type { FormSubmission } from "@/features/forms/types";
import { FORM_TYPE_LABELS } from "@/features/forms/types";
import {
  globalSettingsSchema,
  integrationSettingsSchema,
  notificationTemplateSchema,
  type NotificationTemplateInput,
} from "@/features/settings/schemas";
import type {
  GlobalSettings,
  IntegrationSettings,
  NotificationTemplate,
} from "@/features/settings/types";
import { LEAD_SOURCE_LABELS, type JourneyEvent, type LeadSource, type Student } from "@/features/students/types";
import { JOURNEY_STAGES, type JourneyStage } from "@/shared/domain/pte";
import { COLLECTIONS } from "../collections";
import { writeAudit } from "../engine/audit";
import { collection, registerCollection, nowIso } from "../engine/db";
import { defineResource } from "../engine/resource";
import { ok } from "../engine/responses";
import { addRoutes } from "../engine/router";
import type { MockRequest } from "../engine/types";
import { validateBody } from "../engine/validate";
import { isoDaysAgo, pad } from "../seed/random";

const C = COLLECTIONS;

// ── Cài đặt (singleton theo nhóm) ───────────────────────────────────────────
interface SettingsDoc {
  id: string;
  group: "global" | "integration";
  value: GlobalSettings | (IntegrationSettings & { _secrets?: { smtpPassword?: string; recaptchaSecret?: string } });
  updatedAt: string;
  updatedByName?: string;
}

function seedSettings(): SettingsDoc[] {
  const global: GlobalSettings = {
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
    dateFormat: "dd/MM/yyyy",
    currency: "VND",
    defaultPageSize: 20,
    maintenanceMode: false,
    leadFollowUpDays: 2,
  };
  const integration: IntegrationSettings & { _secrets?: { smtpPassword?: string; recaptchaSecret?: string } } = {
    smtp: { enabled: true, host: "smtp.pteipass.vn", port: 587, username: "no-reply@pteipass.vn", fromName: "PTE iPASS", fromEmail: "no-reply@pteipass.vn", secure: true, hasPassword: true },
    recaptcha: { enabled: true, siteKey: "6LcDEMO-site-key", hasSecret: true },
    crm: { enabled: false, provider: "none", webhookUrl: undefined },
    storage: { provider: "cloudinary", bucket: "pteipass", publicBaseUrl: "https://res.cloudinary.com/pteipass" },
    _secrets: { smtpPassword: "demo-password", recaptchaSecret: "demo-secret" },
  };
  return [
    { id: "set-global", group: "global", value: global, updatedAt: isoDaysAgo(20), updatedByName: "Nguyễn Quản Trị" },
    { id: "set-integration", group: "integration", value: integration, updatedAt: isoDaysAgo(8), updatedByName: "Nguyễn Quản Trị" },
  ];
}

function seedTemplates(): NotificationTemplate[] {
  const rows: Pick<NotificationTemplate, "key" | "name" | "channel" | "subject" | "body" | "variables" | "isActive">[] = [
    { key: "lead_new", name: "Thông báo lead mới cho tư vấn viên", channel: "email", subject: "Lead mới: {{fullName}}", body: "Có lead mới từ biểu mẫu {{formName}}.\nHọ tên: {{fullName}}\nSĐT: {{phone}}\nVui lòng liên hệ trong {{slaDays}} ngày.", variables: ["fullName", "formName", "phone", "slaDays"], isActive: true },
    { key: "trial_confirmation", name: "Xác nhận đăng ký học thử", channel: "email", subject: "PTE iPASS xác nhận lịch học thử của {{fullName}}", body: "Chào {{fullName}},\nChúng tôi đã nhận đăng ký học thử. Lịch học: {{schedule}}.\nHotline: {{hotline}}.", variables: ["fullName", "schedule", "hotline"], isActive: true },
    { key: "trial_confirmation_sms", name: "SMS nhắc lịch học thử", channel: "sms", body: "PTE iPASS: Chào {{fullName}}, buổi học thử của bạn vào {{schedule}}. Hotline {{hotline}}.", variables: ["fullName", "schedule", "hotline"], isActive: true },
    { key: "consultation_followup", name: "Gửi lộ trình sau tư vấn", channel: "zalo", body: "Chào {{fullName}}, đây là lộ trình gợi ý để đạt PTE {{targetScore}}: {{pathUrl}}", variables: ["fullName", "targetScore", "pathUrl"], isActive: false },
    { key: "exam_reminder", name: "Nhắc lịch thi", channel: "email", subject: "Nhắc lịch thi PTE ngày {{examDate}}", body: "Chào {{fullName}}, bạn có lịch thi vào {{examDate}}. Chúc bạn thi tốt!", variables: ["fullName", "examDate"], isActive: true },
  ];
  return rows.map((r, i) => ({ ...r, id: `ntf-${pad(i + 1)}`, createdAt: isoDaysAgo(200 - i * 10), updatedAt: isoDaysAgo(10 + i) }));
}

// ── Tính toán số liệu từ dữ liệu mock ────────────────────────────────────────
const DAY = 86_400_000;
const dayKey = (iso: string) => iso.slice(0, 10);
const toDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);

function resolveRange(q: URLSearchParams, defaultDays = 90) {
  const to = q.get("to") ? Date.parse(`${q.get("to")}T23:59:59.999Z`) : Date.now();
  const days = Math.max(1, Math.min(730, Number(q.get("days")) || defaultDays));
  const from = q.get("from") ? Date.parse(`${q.get("from")}T00:00:00.000Z`) : to - days * DAY;
  return { fromMs: from, toMs: to, from: toDay(from), to: toDay(to), days: Math.max(1, Math.round((to - from) / DAY)) };
}

const inRange = (iso: string, fromMs: number, toMs: number) => {
  const t = Date.parse(iso);
  return t >= fromMs && t <= toMs;
};

function buildFunnel(students: Student[]): FunnelStep[] {
  const counts = JOURNEY_STAGES.map((_, i) => students.filter((s) => JOURNEY_STAGES.indexOf(s.stage) >= i).length);
  const top = counts[0] ?? 0;
  return JOURNEY_STAGES.map((stage, i) => ({
    stage,
    count: counts[i] ?? 0,
    conversionFromPrevious: i === 0 ? null : (counts[i - 1] ?? 0) === 0 ? 0 : Math.round(((counts[i] ?? 0) / (counts[i - 1] as number)) * 1000) / 10,
    conversionFromTop: top === 0 ? 0 : Math.round(((counts[i] ?? 0) / top) * 1000) / 10,
  }));
}

function countBy<T>(items: T[], key: (item: T) => string, label: (k: string) => string): CountByKey[] {
  const map = new Map<string, number>();
  for (const it of items) map.set(key(it), (map.get(key(it)) ?? 0) + 1);
  return [...map.entries()].map(([k, count]) => ({ key: k, label: label(k), count })).sort((a, b) => b.count - a.count);
}

function dailySeries(isoDates: string[], fromMs: number, toMs: number): DailyPoint[] {
  const map = new Map<string, number>();
  for (const d of isoDates) map.set(dayKey(d), (map.get(dayKey(d)) ?? 0) + 1);
  const points: DailyPoint[] = [];
  for (let t = Math.floor(fromMs / DAY) * DAY; t <= toMs; t += DAY) points.push({ date: toDay(t), count: map.get(toDay(t)) ?? 0 });
  return points;
}

const sourceOf = (s: FormSubmission): string => s.source?.utmSource ?? (s.source?.referrer ? "referral" : "direct");
const SOURCE_LABELS: Record<string, string> = { ...LEAD_SOURCE_LABELS, direct: "Trực tiếp", referral: "Giới thiệu / Referral" };
const sourceLabel = (k: string) => SOURCE_LABELS[k as LeadSource] ?? SOURCE_LABELS[k] ?? k;

function leadsIn(fromMs: number, toMs: number) {
  return collection<FormSubmission>(C.formSubmissions).filter((s) => s.status !== "spam" && inRange(s.createdAt, fromMs, toMs));
}
function eventsIn(stage: JourneyStage, fromMs: number, toMs: number) {
  return collection<JourneyEvent>(C.journeyEvents).filter((e) => e.kind === "stage" && e.stage === stage && inRange(e.occurredAt, fromMs, toMs));
}

function studentsFor(req: MockRequest, fromMs: number, toMs: number) {
  const branchId = req.query.get("branchId");
  return collection<Student>(C.students).filter((s) => inRange(s.createdAt, fromMs, toMs) && (!branchId || s.branchId === branchId));
}

export function registerSystemModule(): void {
  registerCollection<SettingsDoc>(C.settings, seedSettings);
  registerCollection<NotificationTemplate>(C.notificationTemplates, seedTemplates);

  const doc = (group: SettingsDoc["group"]) => collection<SettingsDoc>(C.settings).find((d) => d.group === group) as SettingsDoc;

  addRoutes(
    // ── Cài đặt toàn cục ──────────────────────────────────────────────────
    { method: "GET", pattern: "/settings/global", permission: "setting.view", handler: () => ok({ ...doc("global").value, updatedAt: doc("global").updatedAt, updatedByName: doc("global").updatedByName }) },
    {
      method: "PUT",
      pattern: "/settings/global",
      permission: "setting.edit",
      handler: (req) => {
        const parsed = validateBody(globalSettingsSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const d = doc("global");
        const before = structuredClone(d.value);
        d.value = parsed.data;
        d.updatedAt = nowIso();
        d.updatedByName = req.actor?.userName;
        writeAudit(req.actor, { action: "update", resource: "setting", entityId: d.id, entityLabel: "Cài đặt chung", before, after: d.value });
        return ok({ ...d.value, updatedAt: d.updatedAt, updatedByName: d.updatedByName });
      },
    },

    // ── Tích hợp (bí mật chỉ ghi, không bao giờ trả về) ────────────────────
    {
      method: "GET",
      pattern: "/settings/integration",
      permission: "setting.view",
      handler: () => {
        const d = doc("integration");
        const { _secrets, ...value } = d.value as IntegrationSettings & { _secrets?: unknown };
        void _secrets;
        return ok({ ...value, updatedAt: d.updatedAt, updatedByName: d.updatedByName });
      },
    },
    {
      method: "PUT",
      pattern: "/settings/integration",
      permission: "setting.edit",
      handler: (req) => {
        const parsed = validateBody(integrationSettingsSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const d = doc("integration");
        const prev = d.value as IntegrationSettings & { _secrets?: { smtpPassword?: string; recaptchaSecret?: string } };
        const secrets = { ...prev._secrets };
        const { password, ...smtp } = parsed.data.smtp;
        const { secret, ...recaptcha } = parsed.data.recaptcha;
        if (password) secrets.smtpPassword = password;
        if (secret) secrets.recaptchaSecret = secret;
        const next: IntegrationSettings & { _secrets?: typeof secrets } = {
          smtp: { ...smtp, hasPassword: Boolean(secrets.smtpPassword) },
          recaptcha: { ...recaptcha, hasSecret: Boolean(secrets.recaptchaSecret) },
          crm: parsed.data.crm as IntegrationSettings["crm"],
          storage: parsed.data.storage,
          _secrets: secrets,
        };
        const { _secrets: _before, ...beforePublic } = prev;
        void _before;
        d.value = next;
        d.updatedAt = nowIso();
        d.updatedByName = req.actor?.userName;
        const { _secrets: _after, ...afterPublic } = next;
        void _after;
        writeAudit(req.actor, { action: "update", resource: "setting", entityId: d.id, entityLabel: "Cài đặt tích hợp", before: beforePublic, after: afterPublic });
        return ok({ ...afterPublic, updatedAt: d.updatedAt, updatedByName: d.updatedByName });
      },
    },

    // ── Mẫu thông báo ─────────────────────────────────────────────────────
    ...defineResource<NotificationTemplate, NotificationTemplateInput>({
      path: "/notification-templates",
      permission: "notification_template",
      collection: C.notificationTemplates,
      idPrefix: "ntf",
      label: "mẫu thông báo",
      entityName: (t) => t.name,
      createSchema: notificationTemplateSchema,
      list: {
        searchFields: ["name", "key", "body"],
        filters: { channel: "channel", isActive: (t, v) => String(t.isActive) === v },
        sortable: ["name", "key", "channel", "updatedAt"],
        defaultSort: { sortBy: "name", sortOrder: "asc" },
      },
      unique: [{ field: "key", message: "Định danh đã tồn tại" }],
      merge: (current, input) => ({ ...current, ...input }),
    }),

    // ── Dashboard ─────────────────────────────────────────────────────────
    {
      method: "GET",
      pattern: "/dashboard/summary",
      permission: "dashboard.view",
      handler: (req) => {
        const r = resolveRange(req.query, 90);
        const span = r.toMs - r.fromMs;
        const leads = leadsIn(r.fromMs, r.toMs);
        const prevLeads = leadsIn(r.fromMs - span, r.fromMs - 1);
        const students = collection<Student>(C.students);
        const results = eventsIn("result", r.fromMs, r.toMs);
        const passed = results.filter((e) => e.data?.passed).length;
        const events = collection<JourneyEvent>(C.journeyEvents);
        const gains = results
          .map((e) => {
            const test = events.find((x) => x.studentId === e.studentId && x.stage === "test" && typeof x.data?.score === "number");
            return typeof e.data?.score === "number" && typeof test?.data?.score === "number" ? e.data.score - test.data.score : undefined;
          })
          .filter((g): g is number => g !== undefined);
        const converted = leads.filter((l) => l.status === "converted").length;
        const summary: DashboardSummary = {
          range: { from: r.from, to: r.to, days: r.days },
          kpis: {
            newLeads: leads.length,
            newLeadsDeltaPct: prevLeads.length === 0 ? (leads.length > 0 ? 100 : 0) : Math.round(((leads.length - prevLeads.length) / prevLeads.length) * 1000) / 10,
            leadConversionRate: leads.length === 0 ? 0 : Math.round((converted / leads.length) * 1000) / 10,
            enrollments: eventsIn("enroll", r.fromMs, r.toMs).length,
            activeLearners: students.filter((s) => s.stage === "learn" || s.stage === "mock").length,
            examResults: results.length,
            passRate: results.length === 0 ? 0 : Math.round((passed / results.length) * 1000) / 10,
            avgScoreGain: gains.length === 0 ? 0 : Math.round((gains.reduce((a, b) => a + b, 0) / gains.length) * 10) / 10,
          },
          funnel: buildFunnel(students),
          leadsByDay: dailySeries(leads.map((l) => l.createdAt), r.fromMs, r.toMs),
          leadsBySource: countBy(leads, sourceOf, sourceLabel).slice(0, 6),
          recentLeads: [...collection<FormSubmission>(C.formSubmissions)]
            .filter((s) => s.status !== "spam")
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .slice(0, 6)
            .map((s) => ({ id: s.id, fullName: s.fullName ?? "(không tên)", phone: s.phone, formName: s.formName, createdAt: s.createdAt, status: s.status })),
          upcomingExams: students
            .filter((s) => s.stage === "exam" || s.stage === "mock")
            .slice(0, 6)
            .map((s) => {
              const exam = events.find((e) => e.studentId === s.id && e.stage === "exam");
              return { studentId: s.id, studentName: s.fullName, studentCode: s.code, examDate: exam?.data?.examDate, stage: s.stage };
            }),
        };
        if (req.scenario === "empty") {
          summary.kpis = { newLeads: 0, newLeadsDeltaPct: 0, leadConversionRate: 0, enrollments: 0, activeLearners: 0, examResults: 0, passRate: 0, avgScoreGain: 0 };
          summary.leadsByDay = summary.leadsByDay.map((p) => ({ ...p, count: 0 }));
          summary.leadsBySource = [];
          summary.recentLeads = [];
          summary.upcomingExams = [];
          summary.funnel = summary.funnel.map((f) => ({ ...f, count: 0, conversionFromPrevious: f.conversionFromPrevious === null ? null : 0, conversionFromTop: 0 }));
        }
        return ok(summary);
      },
    },

    // ── Báo cáo ───────────────────────────────────────────────────────────
    {
      method: "GET",
      pattern: "/reports/funnel",
      permission: "report.view",
      handler: (req) => {
        const r = resolveRange(req.query, 365);
        const students = studentsFor(req, r.fromMs, r.toMs);
        const report: FunnelReport = {
          range: { from: r.from, to: r.to },
          branchId: req.query.get("branchId") ?? undefined,
          totalStudents: students.length,
          steps: buildFunnel(req.scenario === "empty" ? [] : students),
        };
        return ok(report);
      },
    },
    {
      method: "GET",
      pattern: "/reports/funnel/export",
      permission: "report.export",
      handler: (req) => {
        const r = resolveRange(req.query, 365);
        const steps = buildFunnel(studentsFor(req, r.fromMs, r.toMs));
        writeAudit(req.actor, { action: "export", resource: "report", entityId: "funnel", entityLabel: "Xuất báo cáo phễu chuyển đổi" });
        return ok(steps);
      },
    },
    {
      method: "GET",
      pattern: "/reports/lead-sources",
      permission: "report.view",
      handler: (req) => {
        const r = resolveRange(req.query, 90);
        const leads = req.scenario === "empty" ? [] : leadsIn(r.fromMs, r.toMs);
        const report: LeadSourceReport = {
          range: { from: r.from, to: r.to },
          total: leads.length,
          bySource: countBy(leads, sourceOf, sourceLabel),
          byFormType: countBy(leads, (l) => l.formType, (k) => FORM_TYPE_LABELS[k as keyof typeof FORM_TYPE_LABELS] ?? k),
          byDay: dailySeries(leads.map((l) => l.createdAt), r.fromMs, r.toMs),
        };
        return ok(report);
      },
    },
    {
      method: "GET",
      pattern: "/reports/enrollments",
      permission: "report.view",
      handler: (req) => {
        const r = resolveRange(req.query, 365);
        const groupBy = (["month", "branch", "course"].includes(req.query.get("groupBy") ?? "") ? req.query.get("groupBy") : "month") as EnrollmentGroupBy;
        const enrolls = req.scenario === "empty" ? [] : eventsIn("enroll", r.fromMs, r.toMs);
        const students = collection<Student>(C.students);
        const branches = collection<Branch>(C.branches);
        const paths = collection<LearningPath>(C.learningPaths);
        const courses = collection<Course>(C.courses);
        let rows: CountByKey[];
        if (groupBy === "month") {
          rows = countBy(enrolls, (e) => e.occurredAt.slice(0, 7), (k) => k).sort((a, b) => a.key.localeCompare(b.key));
        } else if (groupBy === "branch") {
          rows = countBy(enrolls, (e) => students.find((s) => s.id === e.studentId)?.branchId ?? "unknown", (k) => branches.find((b) => b.id === k)?.name ?? "Chưa gán cơ sở");
        } else {
          rows = countBy(
            enrolls,
            (e) => paths.find((p) => p.studentId === e.studentId)?.steps[0]?.courseId ?? "unknown",
            (k) => courses.find((c) => c.id === k)?.name ?? "Chưa xác định khóa học",
          );
        }
        const report: EnrollmentReport = { range: { from: r.from, to: r.to }, groupBy, total: enrolls.length, rows };
        return ok(report);
      },
    },
  );
}
