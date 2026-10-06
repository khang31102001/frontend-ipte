"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Controller,
  FormProvider,
  get,
  useFormContext,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { slugify } from "@/shared/lib/format";
import { Button, Checkbox, Input, Label, Select, Switch, Textarea } from "@/shared/ui";

/** Khung form: cung cấp context cho các `Form*` field và xử lý submit. */
export function Form<TIn extends FieldValues, TOut extends FieldValues>({
  form,
  onSubmit,
  className,
  children,
  id,
}: {
  form: UseFormReturn<TIn, unknown, TOut>;
  onSubmit: (values: TOut) => void | Promise<void>;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <FormProvider {...(form as unknown as UseFormReturn<FieldValues>)}>
      <form
        id={id}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", className)}
      >
        <FormRootError />
        {children}
      </form>
    </FormProvider>
  );
}

export function FormRootError() {
  const {
    formState: { errors },
  } = useFormContext();
  const message = errors.root?.server?.message;
  if (typeof message !== "string") return null;
  return (
    <div role="alert" className="rounded-lg border border-error-300 bg-error-50 px-4 py-3 text-sm text-error-700">
      {message}
    </div>
  );
}

interface FieldShellProps {
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

export function FieldShell({ label, hint, required, error, htmlFor, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="ml-0.5 text-error-500">*</span>}
        </Label>
      )}
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-theme-xs text-error-500">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-theme-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}

function useFieldError(name: string): string | undefined {
  const {
    formState: { errors },
  } = useFormContext();
  const err = get(errors, name) as { message?: unknown } | undefined;
  return typeof err?.message === "string" ? err.message : undefined;
}

interface BaseFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  className,
  numeric,
  ...props
}: BaseFieldProps<T> &
  Omit<React.ComponentProps<"input">, "name" | "className" | "required"> & {
    /** Chuyển giá trị thành số (rỗng ⇒ undefined). */
    numeric?: boolean;
  }) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell label={label} hint={hint} required={required} error={error} htmlFor={name} className={className}>
      <Input
        id={name}
        invalid={Boolean(error)}
        {...props}
        {...register(name, numeric ? { setValueAs: (v) => (v === "" || v == null ? undefined : Number(v)) } : undefined)}
      />
    </FieldShell>
  );
}

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  className,
  ...props
}: BaseFieldProps<T> & Omit<React.ComponentProps<"textarea">, "name" | "className" | "required">) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell label={label} hint={hint} required={required} error={error} htmlFor={name} className={className}>
      <Textarea id={name} invalid={Boolean(error)} {...props} {...register(name)} />
    </FieldShell>
  );
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  className,
  options,
  placeholder,
  numeric,
  ...props
}: BaseFieldProps<T> &
  Omit<React.ComponentProps<"select">, "name" | "className" | "required"> & {
    options: readonly { value: string | number; label: string }[];
    placeholder?: string;
    /** Giá trị option là số: form nhận number thay vì chuỗi. */
    numeric?: boolean;
  }) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell label={label} hint={hint} required={required} error={error} htmlFor={name} className={className}>
      {/* Lựa chọn rỗng ("— Chưa chọn —") được coi như không có giá trị (undefined). */}
      <Select
        id={name}
        invalid={Boolean(error)}
        {...props}
        {...register(name, { setValueAs: (v) => (v === "" || v == null ? undefined : numeric ? Number(v) : v) })}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={String(o.value)} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </FieldShell>
  );
}

export function FormSwitch<T extends FieldValues>({
  name,
  label,
  hint,
  className,
}: Pick<BaseFieldProps<T>, "name" | "hint" | "className"> & { label: string }) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell hint={hint} error={error} className={className}>
      <Switch label={label} {...register(name)} />
    </FieldShell>
  );
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  hint,
  className,
}: Pick<BaseFieldProps<T>, "name" | "hint" | "className"> & { label: string }) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell hint={hint} error={error} className={className}>
      <Checkbox label={label} {...register(name)} />
    </FieldShell>
  );
}

/** Nhập danh sách chuỗi cách nhau bằng dấu phẩy (tag, từ khóa…). Giá trị form là string[]. */
export function FormTagsInput<T extends FieldValues>({
  name,
  label,
  hint = "Cách nhau bằng dấu phẩy",
  required,
  className,
  placeholder,
}: BaseFieldProps<T> & { placeholder?: string }) {
  const { control } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FieldShell label={label} hint={hint} required={required} error={error} htmlFor={name} className={className}>
          <TagsText
            id={name}
            value={Array.isArray(field.value) ? (field.value as string[]) : []}
            onChange={field.onChange}
            onBlur={field.onBlur}
            invalid={Boolean(error)}
            placeholder={placeholder}
          />
        </FieldShell>
      )}
    />
  );
}

function TagsText({
  id,
  value,
  onChange,
  onBlur,
  invalid,
  placeholder,
}: {
  id: string;
  value: string[];
  onChange: (next: string[]) => void;
  onBlur: () => void;
  invalid: boolean;
  placeholder?: string;
}) {
  const [text, setText] = useState(value.join(", "));
  const joined = value.join("\u0000");
  // Đồng bộ khi form bị reset/đặt giá trị từ ngoài; không ghi đè khi người dùng đang gõ.
  useEffect(() => {
    setText((current) => {
      const parsed = current.split(",").map((s) => s.trim()).filter(Boolean).join("\u0000");
      return parsed === joined ? current : value.join(", ");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined]);
  return (
    <Input
      id={id}
      value={text}
      invalid={invalid}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean));
      }}
    />
  );
}

/** Nhập danh sách chuỗi, mỗi dòng một mục (dùng cho câu dài có dấu phẩy). Giá trị form là string[]. */
export function FormLinesInput<T extends FieldValues>({
  name,
  label,
  hint = "Mỗi dòng một mục",
  required,
  className,
  rows = 4,
  placeholder,
}: BaseFieldProps<T> & { rows?: number; placeholder?: string }) {
  const { control } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FieldShell label={label} hint={hint} required={required} error={error} htmlFor={name} className={className}>
          <LinesText
            id={name}
            value={Array.isArray(field.value) ? (field.value as string[]) : []}
            onChange={field.onChange}
            onBlur={field.onBlur}
            invalid={Boolean(error)}
            rows={rows}
            placeholder={placeholder}
          />
        </FieldShell>
      )}
    />
  );
}

function LinesText({
  id,
  value,
  onChange,
  onBlur,
  invalid,
  rows,
  placeholder,
}: {
  id: string;
  value: string[];
  onChange: (next: string[]) => void;
  onBlur: () => void;
  invalid: boolean;
  rows: number;
  placeholder?: string;
}) {
  const [text, setText] = useState(value.join("\n"));
  const joined = value.join("\u0000");
  useEffect(() => {
    setText((current) => {
      const parsed = current.split("\n").map((s) => s.trim()).filter(Boolean).join("\u0000");
      return parsed === joined ? current : value.join("\n");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined]);
  return (
    <Textarea
      id={id}
      rows={rows}
      value={text}
      invalid={invalid}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean));
      }}
    />
  );
}

/** Chọn nhiều giá trị từ danh sách (checkbox). Giá trị form là string[]. */
export function FormCheckboxGroup<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  className,
  options,
  emptyText = "Chưa có lựa chọn",
}: BaseFieldProps<T> & { options: readonly { value: string; label: string }[]; emptyText?: string }) {
  const { control } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = Array.isArray(field.value) ? (field.value as string[]) : [];
        return (
          <FieldShell label={label} hint={hint} required={required} error={error} className={className}>
            {options.length === 0 ? (
              <p className="text-sm text-gray-400">{emptyText}</p>
            ) : (
              <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label={typeof label === "string" ? label : undefined}>
                {options.map((o) => (
                  <Checkbox
                    key={o.value}
                    label={o.label}
                    checked={selected.includes(o.value)}
                    onChange={(e) =>
                      field.onChange(e.target.checked ? [...selected, o.value] : selected.filter((v) => v !== o.value))
                    }
                  />
                ))}
              </div>
            )}
          </FieldShell>
        );
      }}
    />
  );
}

/**
 * Tự sinh slug từ trường nguồn (ví dụ tên) khi người dùng chưa tự sửa slug.
 * Truyền `enabled = false` khi đang sửa bản ghi có sẵn để không đổi URL đã công bố.
 */
export function useAutoSlug<T extends FieldValues>(
  form: UseFormReturn<T, unknown, FieldValues>,
  sourceName: Path<T>,
  slugName: Path<T>,
  enabled = true,
) {
  const source = form.watch(sourceName) as unknown;
  const slugDirty = get(form.formState.dirtyFields, slugName) === true;
  useEffect(() => {
    if (!enabled || slugDirty || typeof source !== "string") return;
    form.setValue(slugName, slugify(source) as never, { shouldValidate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, enabled, slugDirty]);
}

/**
 * Tạo bộ field đã gắn kiểu cho một form: `const F = createFormFields<MyValues>()`
 * rồi dùng `<F.Input name="email" />` (name được kiểm tra theo MyValues, không phải gõ generic mỗi lần).
 */
export function createFormFields<T extends FieldValues>() {
  return {
    Input: FormInput<T>,
    Textarea: FormTextarea<T>,
    Select: FormSelect<T>,
    Switch: FormSwitch<T>,
    Checkbox: FormCheckbox<T>,
    Tags: FormTagsInput<T>,
    Lines: FormLinesInput<T>,
    CheckboxGroup: FormCheckboxGroup<T>,
  };
}

export function FormActions({
  submitting,
  submitLabel = "Lưu",
  onCancel,
  cancelLabel = "Hủy",
  extra,
}: {
  submitting?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
      {extra}
      {onCancel && (
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          {cancelLabel}
        </Button>
      )}
      <Button type="submit" loading={submitting}>
        {submitLabel}
      </Button>
    </div>
  );
}
