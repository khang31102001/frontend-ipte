"use client";

import { usePermissions } from "@/core/rbac";
import { PTE_LEVEL_LABELS, PTE_TARGET_SCORES, STUDY_MODE_LABELS, toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useAutoSlug, useEntityForm } from "@/shared/form";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateCourse, useUpdateCourse } from "../hooks/use-courses";
import { courseSchema, type CourseFormValues } from "../schemas";
import { COURSE_STATUS_LABELS, COURSE_TYPE_LABELS, type Course } from "../types";

const F = createFormFields<CourseFormValues>();

const DEFAULTS: Partial<CourseFormValues> = {
  code: "",
  name: "",
  slug: "",
  categoryId: "",
  type: "target_score",
  targetScore: undefined,
  entryLevel: "none",
  mode: "online",
  durationWeeks: 12,
  sessionsCount: 36,
  tuition: 0,
  teacherIds: [],
  summary: "",
  description: "",
  outcomes: [],
  audience: [],
  status: "draft",
  isFeatured: false,
  thumbnailUrl: "",
  metaTitle: "",
  metaDescription: "",
};

function toValues(c: Course): Partial<CourseFormValues> {
  return {
    code: c.code,
    name: c.name,
    slug: c.slug,
    categoryId: c.categoryId,
    type: c.type,
    targetScore: c.targetScore,
    entryLevel: c.entryLevel,
    mode: c.mode,
    durationWeeks: c.durationWeeks,
    sessionsCount: c.sessionsCount,
    tuition: c.tuition,
    teacherIds: c.teacherIds,
    summary: c.summary,
    description: c.description ?? "",
    outcomes: c.outcomes,
    audience: c.audience,
    status: c.status,
    isFeatured: c.isFeatured,
    thumbnailUrl: c.thumbnailUrl ?? "",
    metaTitle: c.metaTitle ?? "",
    metaDescription: c.metaDescription ?? "",
  };
}

export function CourseForm({
  course,
  onSaved,
  onCancel,
}: {
  course?: Course;
  onSaved?: (course: Course) => void;
  onCancel?: () => void;
}) {
  const create = useCreateCourse();
  const update = useUpdateCourse();
  const categories = useLookup("course-categories");
  const teachers = useLookup("teachers");
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: courseSchema,
    entity: course,
    defaults: DEFAULTS,
    toValues,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved,
  });
  useAutoSlug(form, "name", "slug", !isEdit);

  const canWrite = can(isEdit ? "course.edit" : "course.create");
  const canApprove = can("course.approve");
  const statusOptions = toOptions(COURSE_STATUS_LABELS).filter((o) => canApprove || o.value === "draft" || o.value === form.watch("status"));

  return (
    <Form form={form} onSubmit={onSubmit} id="course-form">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin chung" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="code" label="Mã khóa học" required placeholder="PTE-50" />
            <F.Input name="name" label="Tên khóa học" required />
            <F.Input name="slug" label="Slug (URL)" required hint="Tự sinh từ tên, có thể chỉnh sửa" />
            <F.Select name="categoryId" label="Danh mục" required options={categories.options} placeholder="— Chọn danh mục —" />
            <F.Select name="type" label="Loại khóa" options={toOptions(COURSE_TYPE_LABELS)} />
            <F.Select
              name="status"
              label="Trạng thái"
              options={statusOptions}
              hint={canApprove ? undefined : "Cần quyền Duyệt để xuất bản khóa học"}
            />
            <F.Switch name="isFeatured" label="Khóa học nổi bật (hiển thị trang chủ website)" className="md:col-span-2" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Chương trình & học phí" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <F.Select
              name="targetScore"
              label="Điểm PTE mục tiêu"
              numeric
              options={PTE_TARGET_SCORES.map((s) => ({ value: s, label: `PTE ${s}` }))}
              placeholder="— Không áp dụng —"
            />
            <F.Select name="entryLevel" label="Trình độ đầu vào" options={toOptions(PTE_LEVEL_LABELS)} />
            <F.Select name="mode" label="Hình thức" options={toOptions(STUDY_MODE_LABELS)} />
            <F.Input name="durationWeeks" label="Thời lượng (tuần)" type="number" numeric required min={1} />
            <F.Input name="sessionsCount" label="Số buổi" type="number" numeric required min={1} />
            <F.Input name="tuition" label="Học phí (VND)" type="number" numeric required min={0} step={100000} hint="0 = hiển thị “Liên hệ tư vấn”" />
            <F.CheckboxGroup name="teacherIds" label="Giáo viên phụ trách" options={teachers.options} className="md:col-span-3" emptyText="Chưa có giáo viên" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Nội dung giới thiệu" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Textarea name="summary" label="Mô tả ngắn" required rows={3} className="md:col-span-2" />
            <F.Textarea name="description" label="Mô tả chi tiết" rows={6} className="md:col-span-2" />
            <F.Lines name="outcomes" label="Kết quả đạt được" placeholder="Đạt PTE 65+ sau khóa học" />
            <F.Lines name="audience" label="Đối tượng phù hợp" placeholder="Học viên cần điểm cho visa 189/190" />
            <F.Input name="thumbnailUrl" label="Ảnh đại diện (URL)" className="md:col-span-2" placeholder="https://…" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="SEO" description="Hiển thị trên Google khi website đọc dữ liệu khóa học" />
          <CardBody className="grid grid-cols-1 gap-5">
            <F.Input name="metaTitle" label="Meta title" hint="Tối đa 70 ký tự" />
            <F.Textarea name="metaDescription" label="Meta description" rows={3} hint="Tối đa 170 ký tự" />
          </CardBody>
        </Card>
      </fieldset>

      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo khóa học"} onCancel={onCancel} />}
    </Form>
  );
}
