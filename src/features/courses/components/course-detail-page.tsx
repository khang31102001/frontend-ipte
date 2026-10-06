"use client";

import { useState } from "react";
import { ROUTES } from "@/core/config/routes";
import { MaterialsPanel } from "@/features/learning-materials";
import { EntityDetailPage } from "@/shared/crud";
import { formatVnd } from "@/shared/lib/format";
import { Badge, Tabs } from "@/shared/ui";
import { useCourse, useDeleteCourse } from "../hooks/use-courses";
import { COURSE_TYPE_LABELS, type Course } from "../types";
import { CourseStatusBadge } from "./course-badges";
import { CourseForm } from "./course-form";
import { LessonsPanel } from "./lessons-panel";

type TabKey = "info" | "lessons" | "materials";
const TABS = [
  { key: "info", label: "Thông tin" },
  { key: "lessons", label: "Bài học" },
  { key: "materials", label: "Học liệu" },
] as const;

function CourseDetail({ course }: { course: Course }) {
  const [tab, setTab] = useState<TabKey>("info");
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <CourseStatusBadge status={course.status} />
        <Badge color="primary">{COURSE_TYPE_LABELS[course.type]}</Badge>
        {course.targetScore && <Badge color="info">Mục tiêu PTE {course.targetScore}</Badge>}
        <span className="text-sm text-gray-600">
          {course.durationWeeks} tuần · {course.sessionsCount} buổi · {course.tuition > 0 ? formatVnd(course.tuition) : "Liên hệ"}
        </span>
        <span className="ml-auto text-sm text-gray-500">
          {course.lessonCount} bài học · {course.enrolledCount} học viên · GV: {course.teacherNames?.join(", ") || "—"}
        </span>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />
      {tab === "info" && <CourseForm course={course} />}
      {tab === "lessons" && <LessonsPanel courseId={course.id} />}
      {tab === "materials" && <MaterialsPanel courseId={course.id} />}
    </>
  );
}

export function CourseDetailPage({ courseId }: { courseId: string }) {
  return (
    <EntityDetailPage<Course>
      id={courseId}
      resource="course"
      noun="khóa học"
      listHref={ROUTES.courses.list}
      listLabel="Khóa học"
      useEntity={useCourse}
      useRemove={useDeleteCourse}
      title={(c) => c?.name ?? "Khóa học"}
      crumb={(c) => c?.code ?? "…"}
      deleteDescription={(c) => `Bạn sắp xóa "${c.name}" cùng toàn bộ bài học. Thao tác này không thể hoàn tác.`}
    >
      {(course) => <CourseDetail course={course} />}
    </EntityDetailPage>
  );
}
