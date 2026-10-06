"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Card, CardBody, CardHeader, PageHeader } from "@/shared/ui";
import { useDeleteTeacher, useTeacher } from "../hooks/use-teachers";
import type { Teacher } from "../types";
import { TeacherForm } from "./teacher-form";
import { TeacherStatusBadge } from "./teachers-list-page";

export function TeacherCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="teacher.create">
      <PageHeader title="Thêm giáo viên" breadcrumbs={[{ label: "Giáo viên", href: ROUTES.teachers.list }, { label: "Thêm mới" }]} />
      <TeacherForm onSaved={(t) => router.replace(ROUTES.teachers.detail(t.id))} onCancel={() => router.push(ROUTES.teachers.list)} />
    </RequirePermission>
  );
}

export function TeacherDetailPage({ teacherId }: { teacherId: string }) {
  return (
    <EntityDetailPage<Teacher>
      id={teacherId}
      resource="teacher"
      noun="giáo viên"
      listHref={ROUTES.teachers.list}
      listLabel="Giáo viên"
      useEntity={useTeacher}
      useRemove={useDeleteTeacher}
      title={(t) => t?.fullName ?? "Giáo viên"}
      crumb={(t) => t?.code ?? "…"}
    >
      {(teacher) => (
        <div className="space-y-5">
          <Card>
            <CardHeader title="Phụ trách" description="Các khóa học giáo viên đang phụ trách" actions={<TeacherStatusBadge status={teacher.status} />} />
            <CardBody>
              {teacher.courses.length === 0 ? (
                <p className="text-sm text-gray-500">Chưa phụ trách khóa học nào.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {teacher.courses.map((c) => (
                    <li key={c.id}>
                      <Link href={ROUTES.courses.detail(c.id)} className="inline-flex rounded-full bg-brand-25 px-3 py-1 text-sm text-brand-600 hover:bg-brand-50">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
          <TeacherForm teacher={teacher} />
        </div>
      )}
    </EntityDetailPage>
  );
}
