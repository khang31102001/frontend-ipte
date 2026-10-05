"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { StudentForm } from "./student-form";

export function StudentCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="student.create">
      <PageHeader
        title="Thêm học viên"
        description="Tạo hồ sơ master. Mục tiêu PTE và hành trình được cập nhật ở trang chi tiết."
        breadcrumbs={[{ label: "Học viên", href: ROUTES.students.list }, { label: "Thêm mới" }]}
      />
      <StudentForm
        onSaved={(student) => router.replace(ROUTES.students.detail(student.id))}
        onCancel={() => router.push(ROUTES.students.list)}
      />
    </RequirePermission>
  );
}
