"use client";

import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { Badge } from "@/shared/ui";
import { useCreateRoom, useDeleteRoom, useRooms, useUpdateRoom } from "../hooks/use-branches";
import { roomSchema, type RoomFormValues } from "../schemas";
import { ROOM_STATUS_LABELS, ROOM_TYPE_LABELS, type Room, type RoomQuery } from "../types";

const F = createFormFields<RoomFormValues>();

type FilterKey = "type" | "status";

function useRoomsList(query: ListParams<FilterKey>) {
  return useRooms(query as RoomQuery);
}

const columns: Column<Room>[] = [
  { key: "name", header: "Phòng", sortKey: "name", cell: (r) => <span className="font-medium text-gray-800 dark:text-white/90">{r.name}</span> },
  { key: "type", header: "Loại", hideBelow: "sm", cell: (r) => ROOM_TYPE_LABELS[r.type] },
  { key: "capacity", header: "Sức chứa", sortKey: "capacity", align: "center", cell: (r) => `${r.capacity} chỗ` },
  { key: "equipment", header: "Thiết bị", hideBelow: "md", cell: (r) => (r.equipment.length ? r.equipment.join(", ") : "—") },
  { key: "status", header: "Trạng thái", cell: (r) => <Badge color={r.status === "available" ? "success" : "warning"}>{ROOM_STATUS_LABELS[r.status]}</Badge> },
];

function RoomDialog({ branchId, room, open, onClose }: { branchId: string; room: Room | null; open: boolean; onClose: () => void }) {
  const create = useCreateRoom();
  const update = useUpdateRoom();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: roomSchema,
    entity: room,
    defaults: { branchId, name: "", capacity: 20, type: "classroom", status: "available", equipment: [] },
    toValues: (r) => ({ branchId: r.branchId, name: r.name, capacity: r.capacity, type: r.type, status: r.status, equipment: r.equipment }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa phòng học" : "Thêm phòng học"} formId="room-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="room-form">
        <F.Input name="name" label="Tên phòng" required />
        <div className="grid grid-cols-2 gap-5">
          <F.Select name="type" label="Loại phòng" options={toOptions(ROOM_TYPE_LABELS)} />
          <F.Input name="capacity" label="Sức chứa" type="number" numeric required min={1} />
        </div>
        <F.Select name="status" label="Trạng thái" options={toOptions(ROOM_STATUS_LABELS)} />
        <F.Tags name="equipment" label="Thiết bị" placeholder="Máy chiếu, Điều hòa" />
      </Form>
    </FormModal>
  );
}

/** Danh sách phòng học của một cơ sở (nhúng trong trang chi tiết cơ sở). */
export function RoomsPanel({ branchId }: { branchId: string }) {
  const dialog = useDialogState<Room>();
  const filters: FilterDef<FilterKey>[] = [
    { key: "type", label: "Loại", options: toOptions(ROOM_TYPE_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(ROOM_STATUS_LABELS) },
  ];
  return (
    <>
      <CrudListPage<Room, FilterKey>
        embedded
        title="Phòng học"
        resource="branch"
        noun="phòng học"
        useList={useRoomsList}
        useRemove={useDeleteRoom}
        columns={columns}
        filters={filters}
        fixedQuery={{ branchId }}
        defaultSort={{ sortBy: "name", sortOrder: "asc" }}
        getRowLabel={(r) => r.name}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <RoomDialog branchId={branchId} room={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
