"use client";

import { useState } from "react";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { LEARNING_PURPOSE_LABELS } from "@/shared/domain/pte";
import { formatDate } from "@/shared/lib/format";
import { Avatar, Badge, Tabs } from "@/shared/ui";
import { useDeleteStudent, useStudent, useStudentProfile } from "../hooks/use-students";
import type { Student } from "../types";
import { StageBadge, StudentStatusBadge } from "./stage-badge";
import { StudentForm } from "./student-form";
import { StudentJourney } from "./student-journey";
import { StudentProfileForm } from "./student-profile-form";

type TabKey = "info" | "profile" | "journey";

const TABS = [
  { key: "info", label: "Thông tin" },
  { key: "profile", label: "Hồ sơ PTE" },
  { key: "journey", label: "Hành trình" },
] as const;

function StudentDetail({ student }: { student: Student }) {
  const [tab, setTab] = useState<TabKey>("info");
  const { data: profile } = useStudentProfile(student.id);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <Avatar name={student.fullName} className="size-14 text-base" />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-gray-800 dark:text-white/90">{student.fullName}</p>
          <p className="text-sm text-gray-500">
            {student.code} · {student.phone} · {student.email}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StageBadge stage={student.stage} />
            <StudentStatusBadge status={student.status} />
            {student.tags.map((t) => (
              <Badge key={t} color="gray">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="text-right text-sm text-gray-600">
          {profile ? (
            <>
              <p className="font-semibold text-gray-800 dark:text-white/90">Mục tiêu PTE {profile.targetScore}</p>
              <p>
                {LEARNING_PURPOSE_LABELS[profile.purpose]} · Hạn {formatDate(profile.examDeadline)}
              </p>
            </>
          ) : (
            <p className="text-gray-400">Chưa có hồ sơ PTE</p>
          )}
          <p className="text-theme-xs text-gray-500">Phụ trách: {student.assignedToName ?? "—"}</p>
        </div>
      </div>

      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />
      {tab === "info" && <StudentForm student={student} />}
      {tab === "profile" && <StudentProfileForm studentId={student.id} />}
      {tab === "journey" && <StudentJourney studentId={student.id} />}
    </>
  );
}

export function StudentDetailPage({ studentId }: { studentId: string }) {
  return (
    <EntityDetailPage<Student>
      id={studentId}
      resource="student"
      noun="học viên"
      listHref={ROUTES.students.list}
      listLabel="Học viên"
      useEntity={useStudent}
      useRemove={useDeleteStudent}
      title={(s) => s?.fullName ?? "Học viên"}
      crumb={(s) => s?.code ?? "…"}
      deleteDescription={(s) => `Bạn sắp xóa "${s.fullName}" cùng hồ sơ PTE và hành trình. Thao tác này không thể hoàn tác.`}
    >
      {(student) => <StudentDetail student={student} />}
    </EntityDetailPage>
  );
}
