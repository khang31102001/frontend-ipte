"use client";

import { useEffect, useRef } from "react";
import type { DefaultValues, FieldValues } from "react-hook-form";
import type { z } from "zod";
import { applyServerErrors, useZodForm } from "./use-zod-form";

interface UseEntityFormOptions<
  TSchema extends z.ZodType<FieldValues, FieldValues>,
  TEntity extends { id: string },
  TResult,
> {
  schema: TSchema;
  /** Bản ghi đang sửa; null/undefined = tạo mới. */
  entity?: TEntity | null;
  /** Giá trị mặc định khi tạo mới (có thể thiếu field số/ngày chưa nhập). */
  defaults: DefaultValues<z.input<TSchema>>;
  /** Chuyển bản ghi sang giá trị form khi sửa (mặc định: dùng chính bản ghi). */
  toValues?: (entity: TEntity) => DefaultValues<z.input<TSchema>>;
  create: (values: z.output<TSchema>) => Promise<TResult>;
  /** Bỏ qua với form chỉ tạo mới (modal ghi chú, chuyển giai đoạn…). */
  update?: (id: string, values: z.output<TSchema>) => Promise<TResult>;
  /** Gọi sau khi lưu thành công, nhận bản ghi server trả về. */
  onSaved?: (result: TResult) => void;
  /** Đổi giá trị này để reset form (ví dụ mở/đóng modal). */
  resetKey?: unknown;
}

/**
 * Logic form tạo/sửa dùng chung: khởi tạo giá trị, reset khi đổi bản ghi,
 * submit gọi create/update và đổ lỗi validation của server vào từng field.
 */
export function useEntityForm<
  TSchema extends z.ZodType<FieldValues, FieldValues>,
  TEntity extends { id: string },
  TResult = unknown,
>({ schema, entity, defaults, toValues, create, update, onSaved, resetKey }: UseEntityFormOptions<TSchema, TEntity, TResult>) {
  const form = useZodForm(schema, { defaultValues: defaults });
  const isEdit = Boolean(entity);

  const defaultsRef = useRef(defaults);
  defaultsRef.current = defaults;
  const toValuesRef = useRef(toValues);
  toValuesRef.current = toValues;

  const entityId = entity?.id;
  const entityVersion = (entity as { updatedAt?: string } | null | undefined)?.updatedAt;
  useEffect(() => {
    const values = entity
      ? toValuesRef.current
        ? toValuesRef.current(entity)
        : (entity as unknown as DefaultValues<z.input<TSchema>>)
      : defaultsRef.current;
    form.reset(values);
    // reset khi đổi bản ghi/phiên bản hoặc resetKey; không phụ thuộc form/entity để tránh vòng lặp
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId, entityVersion, resetKey]);

  const onSubmit = async (values: z.output<TSchema>) => {
    try {
      const result = entityId && update ? await update(entityId, values) : await create(values);
      onSaved?.(result);
    } catch (error) {
      // Lỗi validation của server được đổ vào field; lỗi khác đã được toast bởi mutation hook.
      applyServerErrors(form as never, error);
    }
  };

  return { form, onSubmit, isEdit, isSubmitting: form.formState.isSubmitting };
}
