"use client";

import { useCallback, useState } from "react";

/**
 * Trạng thái dialog tạo/sửa: `openCreate()` mở form trống, `openEdit(item)` mở form với bản ghi.
 * Dùng cùng `CrudListPage` (`onCreate={openCreate}`, `onEdit={openEdit}`) và form modal.
 */
export function useDialogState<T>() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);

  const openCreate = useCallback(() => {
    setEditing(null);
    setOpen(true);
  }, []);
  const openEdit = useCallback((item: T) => {
    setEditing(item);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return { open, editing, openCreate, openEdit, close };
}
