"use client";

import { FileText, Image as ImageIcon, Music, Video } from "lucide-react";
import type { ReactNode } from "react";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge } from "@/shared/ui";
import { useCreateMedia, useDeleteMedia, useMedia, useUpdateMedia } from "../hooks/use-media";
import { mediaSchema, type MediaFormValues } from "../schemas";
import { MEDIA_KIND_LABELS, type MediaItem, type MediaKind, type MediaQuery } from "../types";

const F = createFormFields<MediaFormValues>();

type FilterKey = "kind";

function useMediaList(query: ListParams<FilterKey>) {
  return useMedia(query as MediaQuery);
}

const KIND_ICON: Record<MediaKind, ReactNode> = {
  image: <ImageIcon className="size-4" />,
  video: <Video className="size-4" />,
  audio: <Music className="size-4" />,
  document: <FileText className="size-4" />,
};

function formatSize(kb?: number) {
  if (!kb) return "—";
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

const columns: Column<MediaItem>[] = [
  {
    key: "name",
    header: "Tệp",
    sortKey: "name",
    className: "min-w-[260px]",
    cell: (m) => (
      <span className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-25 text-brand-500">
          {m.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.url} alt={m.altText ?? m.name} className="size-10 object-cover" loading="lazy" />
          ) : (
            KIND_ICON[m.kind]
          )}
        </span>
        <span className="min-w-0">
          <a href={m.url} target="_blank" rel="noreferrer" className="block truncate font-medium text-gray-800 hover:text-brand-500 dark:text-white/90">
            {m.name}
          </a>
          <span className="block text-theme-xs text-gray-500">{m.mimeType}</span>
        </span>
      </span>
    ),
  },
  { key: "kind", header: "Loại", sortKey: "kind", hideBelow: "md", cell: (m) => <Badge color="primary">{MEDIA_KIND_LABELS[m.kind]}</Badge> },
  { key: "folder", header: "Thư mục", hideBelow: "md", cell: (m) => m.folder },
  { key: "size", header: "Dung lượng", sortKey: "sizeKb", align: "right", hideBelow: "sm", cell: (m) => formatSize(m.sizeKb) },
  { key: "dims", header: "Kích thước", hideBelow: "lg", cell: (m) => (m.width && m.height ? `${m.width}×${m.height}` : "—") },
  { key: "createdAt", header: "Ngày tạo", sortKey: "createdAt", hideBelow: "lg", cell: (m) => formatDate(m.createdAt) },
];

function MediaDialog({ item, open, onClose }: { item: MediaItem | null; open: boolean; onClose: () => void }) {
  const create = useCreateMedia();
  const update = useUpdateMedia();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: mediaSchema,
    entity: item,
    defaults: { name: "", kind: "image", url: "", mimeType: "", sizeKb: undefined, width: undefined, height: undefined, altText: "", folder: "general", tags: [] },
    toValues: (m) => ({
      name: m.name,
      kind: m.kind,
      url: m.url,
      mimeType: m.mimeType ?? "",
      sizeKb: m.sizeKb,
      width: m.width,
      height: m.height,
      altText: m.altText ?? "",
      folder: m.folder,
      tags: m.tags,
    }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa tệp media" : "Thêm tệp media"} description="Lưu metadata và URL. Tệp thật được tải lên kho lưu trữ của backend." size="lg" formId="media-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="media-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <F.Input name="name" label="Tên tệp" required />
          <F.Select name="kind" label="Loại" options={toOptions(MEDIA_KIND_LABELS)} />
          <F.Input name="url" label="Đường dẫn (URL)" required className="md:col-span-2" placeholder="https://…" />
          <F.Input name="folder" label="Thư mục" required />
          <F.Input name="mimeType" label="MIME type" placeholder="image/jpeg" />
          <F.Input name="sizeKb" label="Dung lượng (KB)" type="number" numeric min={1} />
          <F.Input name="altText" label="Mô tả (alt)" />
          <F.Input name="width" label="Chiều rộng (px)" type="number" numeric min={1} />
          <F.Input name="height" label="Chiều cao (px)" type="number" numeric min={1} />
          <F.Tags name="tags" label="Tag" className="md:col-span-2" />
        </div>
      </Form>
    </FormModal>
  );
}

export function MediaPage() {
  const dialog = useDialogState<MediaItem>();
  const filters: FilterDef<FilterKey>[] = [{ key: "kind", label: "Loại", options: toOptions(MEDIA_KIND_LABELS) }];
  return (
    <>
      <CrudListPage<MediaItem, FilterKey>
        title="Thư viện media"
        description="Hình ảnh, video, âm thanh, tài liệu dùng chung cho website"
        resource="media"
        noun="tệp"
        useList={useMediaList}
        useRemove={useDeleteMedia}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "createdAt", sortOrder: "desc" }}
        searchPlaceholder="Tìm theo tên, tag…"
        getRowLabel={(m) => m.name}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <MediaDialog item={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
