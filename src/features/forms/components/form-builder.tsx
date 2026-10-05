"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { usePermissions } from "@/core/rbac";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormActions, createFormFields, useAutoSlug, useEntityForm } from "@/shared/form";
import { Button, Card, CardBody, CardHeader } from "@/shared/ui";
import { useCreateForm, useUpdateForm } from "../hooks/use-forms";
import { formDefinitionSchema, type FormDefinitionFormValues } from "../schemas";
import { FIELD_TYPE_LABELS, FORM_STATUS_LABELS, FORM_TYPE_LABELS, type FieldType, type FormDefinition } from "../types";

const F = createFormFields<FormDefinitionFormValues>();

const DEFAULTS: Partial<FormDefinitionFormValues> = {
  name: "",
  slug: "",
  type: "consultation",
  description: "",
  fields: [
    { key: "fullName", label: "Họ và tên", type: "text", required: true, placeholder: "", options: [] },
    { key: "phone", label: "Số điện thoại", type: "phone", required: true, placeholder: "", options: [] },
  ],
  submitLabel: "Gửi đăng ký",
  successMessage: "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.",
  notifyEmails: [],
  status: "active",
};

function toValues(f: FormDefinition): Partial<FormDefinitionFormValues> {
  return {
    name: f.name,
    slug: f.slug,
    type: f.type,
    description: f.description ?? "",
    fields: f.fields.map((x) => ({ ...x, placeholder: x.placeholder ?? "" })),
    submitLabel: f.submitLabel,
    successMessage: f.successMessage,
    notifyEmails: f.notifyEmails,
    status: f.status,
  };
}

/** Trình dựng biểu mẫu: khai báo các trường hiển thị trên website và nơi nhận thông báo. */
export function FormBuilder({ definition, onSaved, onCancel }: { definition?: FormDefinition; onSaved?: (f: FormDefinition) => void; onCancel?: () => void }) {
  const create = useCreateForm();
  const update = useUpdateForm();
  const { can } = usePermissions();

  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: formDefinitionSchema,
    entity: definition,
    defaults: DEFAULTS,
    toValues,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved,
  });
  useAutoSlug(form, "name", "slug", !isEdit);
  const fields = useFieldArray({ control: form.control, name: "fields" });
  const canWrite = can(isEdit ? "form.edit" : "form.create");
  const fieldsError = form.formState.errors.fields;
  const fieldsMessage = (fieldsError?.root?.message ?? (typeof fieldsError?.message === "string" ? fieldsError.message : undefined)) as string | undefined;

  return (
    <Form form={form} onSubmit={onSubmit} id="form-builder">
      <fieldset disabled={!canWrite || isSubmitting} className="space-y-5">
        <Card>
          <CardHeader title="Thông tin biểu mẫu" />
          <CardBody className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <F.Input name="name" label="Tên biểu mẫu" required />
            <F.Input name="slug" label="Slug" required hint="Website gửi dữ liệu tới /public/forms/<slug>/submit" />
            <F.Select name="type" label="Loại" options={toOptions(FORM_TYPE_LABELS)} />
            <F.Select name="status" label="Trạng thái" options={toOptions(FORM_STATUS_LABELS)} />
            <F.Textarea name="description" label="Mô tả" rows={2} className="md:col-span-2" />
            <F.Input name="submitLabel" label="Nhãn nút gửi" required />
            <F.Tags name="notifyEmails" label="Email nhận thông báo" hint="Cách nhau bằng dấu phẩy" />
            <F.Textarea name="successMessage" label="Thông báo sau khi gửi" required rows={2} className="md:col-span-2" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Các trường"
            description="Thứ tự hiển thị từ trên xuống"
            actions={
              canWrite && (
                <Button
                  variant="outline"
                  size="sm"
                  startIcon={<Plus className="size-4" />}
                  onClick={() => fields.append({ key: "", label: "", type: "text", required: false, placeholder: "", options: [] })}
                >
                  Thêm trường
                </Button>
              )
            }
          />
          <CardBody className="space-y-4">
            {fieldsMessage && <p role="alert" className="text-sm text-error-500">{fieldsMessage}</p>}
            {fields.fields.map((field, index) => {
              const type = form.watch(`fields.${index}.type`) as FieldType;
              return (
                <div key={field.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-brand-500">Trường {index + 1}</p>
                    {canWrite && (
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" aria-label="Chuyển lên" disabled={index === 0} onClick={() => fields.move(index, index - 1)}>
                          <ArrowUp className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Chuyển xuống" disabled={index === fields.fields.length - 1} onClick={() => fields.move(index, index + 1)}>
                          <ArrowDown className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Xóa trường" onClick={() => fields.remove(index)}>
                          <Trash2 className="size-4 text-error-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <F.Input name={`fields.${index}.label`} label="Nhãn hiển thị" required />
                    <F.Input name={`fields.${index}.key`} label="Khóa dữ liệu" required placeholder="fullName" />
                    <F.Select name={`fields.${index}.type`} label="Kiểu" options={toOptions(FIELD_TYPE_LABELS)} />
                    <F.Input name={`fields.${index}.placeholder`} label="Placeholder" className="md:col-span-2" />
                    <F.Switch name={`fields.${index}.required`} label="Bắt buộc" className="self-end pb-2" />
                    {type === "select" && <F.Lines name={`fields.${index}.options`} label="Các lựa chọn" className="md:col-span-3" rows={3} />}
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </fieldset>
      {canWrite && <FormActions submitting={isSubmitting} submitLabel={isEdit ? "Lưu thay đổi" : "Tạo biểu mẫu"} onCancel={onCancel} />}
    </Form>
  );
}
