"use client";

import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { Form, FormModal, createFormFields, useAutoSlug, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { Badge } from "@/shared/ui";
import {
  useCourseCategories,
  useCreateCourseCategory,
  useDeleteCourseCategory,
  useUpdateCourseCategory,
} from "../hooks/use-courses";
import { courseCategorySchema, type CourseCategoryFormValues } from "../schemas";
import type { CourseCategory, CourseCategoryQuery } from "../types";

const F = createFormFields<CourseCategoryFormValues>();

type FilterKey = "isActive";

function useCategoriesList(query: ListParams<FilterKey>) {
  return useCourseCategories(query as CourseCategoryQuery);
}

const columns: Column<CourseCategory>[] = [
  { key: "sortOrder", header: "#", sortKey: "sortOrder", className: "w-14", cell: (c) => c.sortOrder },
  {
    key: "name",
    header: "Danh mục",
    sortKey: "name",
    className: "min-w-[220px]",
    cell: (c) => (
      <span>
        <span className="block font-medium text-gray-800 dark:text-white/90">{c.name}</span>
        <span className="block text-theme-xs text-gray-500">/{c.slug}</span>
      </span>
    ),
  },
  { key: "description", header: "Mô tả", hideBelow: "lg", cell: (c) => <span className="line-clamp-2 max-w-md">{c.description ?? "—"}</span> },
  { key: "courseCount", header: "Số khóa học", sortKey: "courseCount", align: "center", cell: (c) => c.courseCount },
  { key: "isActive", header: "Trạng thái", cell: (c) => <Badge color={c.isActive ? "success" : "gray"}>{c.isActive ? "Đang dùng" : "Ẩn"}</Badge> },
];

function CategoryDialog({ category, open, onClose }: { category: CourseCategory | null; open: boolean; onClose: () => void }) {
  const create = useCreateCourseCategory();
  const update = useUpdateCourseCategory();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: courseCategorySchema,
    entity: category,
    defaults: { name: "", slug: "", description: "", parentId: "", sortOrder: 1, isActive: true },
    toValues: (c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      parentId: c.parentId ?? "",
      sortOrder: c.sortOrder,
      isActive: c.isActive,
    }),
    resetKey: open,
    create: (values) => create.mutateAsync(values),
    update: (id, values) => update.mutateAsync({ id, input: values }),
    onSaved: onClose,
  });
  useAutoSlug(form, "name", "slug", !isEdit);

  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa danh mục" : "Thêm danh mục"} formId="course-category-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="course-category-form">
        <F.Input name="name" label="Tên danh mục" required />
        <F.Input name="slug" label="Slug" required />
        <F.Textarea name="description" label="Mô tả" rows={3} />
        <F.Input name="sortOrder" label="Thứ tự hiển thị" type="number" numeric required min={0} />
        <F.Switch name="isActive" label="Đang sử dụng" />
      </Form>
    </FormModal>
  );
}

export function CourseCategoriesPage() {
  const dialog = useDialogState<CourseCategory>();
  const filters: FilterDef<FilterKey>[] = [
    {
      key: "isActive",
      label: "Trạng thái",
      options: [
        { value: "true", label: "Đang dùng" },
        { value: "false", label: "Ẩn" },
      ],
    },
  ];

  return (
    <>
      <CrudListPage<CourseCategory, FilterKey>
        title="Danh mục khóa học"
        description="Phân loại khóa học theo level / điểm mục tiêu"
        resource="course"
        noun="danh mục"
        useList={useCategoriesList}
        useRemove={useDeleteCourseCategory}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "sortOrder", sortOrder: "asc" }}
        getRowLabel={(c) => c.name}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <CategoryDialog category={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
