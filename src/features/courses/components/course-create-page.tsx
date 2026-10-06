"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { CourseForm } from "./course-form";

export function CourseCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="course.create">
      <PageHeader
        title="Thêm khóa học"
        description="Tạo khóa học mới. Bài học và học liệu được thêm ở trang chi tiết."
        breadcrumbs={[{ label: "Khóa học", href: ROUTES.courses.list }, { label: "Thêm mới" }]}
      />
      <CourseForm onSaved={(c) => router.replace(ROUTES.courses.detail(c.id))} onCancel={() => router.push(ROUTES.courses.list)} />
    </RequirePermission>
  );
}
