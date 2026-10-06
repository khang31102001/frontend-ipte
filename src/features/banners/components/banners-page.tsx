"use client";

import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { toOptions } from "@/shared/domain/pte";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { useDialogState } from "@/shared/hooks/use-dialog-state";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate } from "@/shared/lib/format";
import { Badge, type BadgeColor } from "@/shared/ui";
import { useBanners, useCreateBanner, useDeleteBanner, useUpdateBanner } from "../hooks/use-banners";
import { bannerSchema, type BannerFormValues } from "../schemas";
import { BANNER_PLACEMENT_LABELS, BANNER_STATUS_LABELS, type Banner, type BannerQuery, type BannerStatus } from "../types";

const F = createFormFields<BannerFormValues>();

type FilterKey = "placement" | "status";

function useBannersList(query: ListParams<FilterKey>) {
  return useBanners(query as BannerQuery);
}

const STATUS_COLOR: Record<BannerStatus, BadgeColor> = { draft: "warning", active: "success", inactive: "gray" };

const columns: Column<Banner>[] = [
  {
    key: "title",
    header: "Banner",
    sortKey: "title",
    className: "min-w-[260px]",
    cell: (b) => (
      <span className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b.imageUrl} alt={b.altText ?? b.title} className="h-10 w-20 rounded-md bg-gray-100 object-cover" loading="lazy" />
        <span>
          <span className="block font-medium text-gray-800 dark:text-white/90">{b.title}</span>
          <span className="block text-theme-xs text-gray-500">{b.linkUrl ?? "Không có liên kết"}</span>
        </span>
      </span>
    ),
  },
  { key: "placement", header: "Vị trí", sortKey: "placement", hideBelow: "md", cell: (b) => BANNER_PLACEMENT_LABELS[b.placement] },
  { key: "period", header: "Thời gian hiển thị", sortKey: "startAt", hideBelow: "lg", cell: (b) => `${formatDate(b.startAt)} → ${b.endAt ? formatDate(b.endAt) : "Không giới hạn"}` },
  { key: "sortOrder", header: "Thứ tự", sortKey: "sortOrder", align: "center", hideBelow: "sm", cell: (b) => b.sortOrder },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (b) => <Badge color={STATUS_COLOR[b.status]}>{BANNER_STATUS_LABELS[b.status]}</Badge> },
];

function BannerDialog({ banner, open, onClose }: { banner: Banner | null; open: boolean; onClose: () => void }) {
  const create = useCreateBanner();
  const update = useUpdateBanner();
  const { form, onSubmit, isEdit, isSubmitting } = useEntityForm({
    schema: bannerSchema,
    entity: banner,
    defaults: { title: "", placement: "home_hero", imageUrl: "", mobileImageUrl: "", linkUrl: "", altText: "", startAt: "", endAt: "", status: "draft", sortOrder: 1 },
    toValues: (b) => ({
      title: b.title,
      placement: b.placement,
      imageUrl: b.imageUrl,
      mobileImageUrl: b.mobileImageUrl ?? "",
      linkUrl: b.linkUrl ?? "",
      altText: b.altText ?? "",
      startAt: b.startAt ?? "",
      endAt: b.endAt ?? "",
      status: b.status,
      sortOrder: b.sortOrder,
    }),
    resetKey: open,
    create: (v) => create.mutateAsync(v),
    update: (id, v) => update.mutateAsync({ id, input: v }),
    onSaved: onClose,
  });
  return (
    <FormModal open={open} onClose={onClose} title={isEdit ? "Sửa banner" : "Thêm banner"} size="lg" formId="banner-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="banner-form">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <F.Input name="title" label="Tiêu đề" required className="md:col-span-2" />
          <F.Select name="placement" label="Vị trí hiển thị" options={toOptions(BANNER_PLACEMENT_LABELS)} />
          <F.Select name="status" label="Trạng thái" options={toOptions(BANNER_STATUS_LABELS)} />
          <F.Input name="imageUrl" label="Ảnh banner (URL)" required className="md:col-span-2" placeholder="https://…" />
          <F.Input name="mobileImageUrl" label="Ảnh mobile (URL)" className="md:col-span-2" />
          <F.Input name="linkUrl" label="Liên kết khi bấm" placeholder="/lien-he" />
          <F.Input name="altText" label="Mô tả ảnh (alt)" />
          <F.Input name="startAt" label="Bắt đầu hiển thị" type="date" />
          <F.Input name="endAt" label="Kết thúc hiển thị" type="date" />
          <F.Input name="sortOrder" label="Thứ tự" type="number" numeric required min={0} />
        </div>
      </Form>
    </FormModal>
  );
}

export function BannersPage() {
  const dialog = useDialogState<Banner>();
  const filters: FilterDef<FilterKey>[] = [
    { key: "placement", label: "Vị trí", options: toOptions(BANNER_PLACEMENT_LABELS) },
    { key: "status", label: "Trạng thái", options: toOptions(BANNER_STATUS_LABELS) },
  ];
  return (
    <>
      <CrudListPage<Banner, FilterKey>
        title="Banner"
        description="Banner theo vị trí hiển thị trên website, có lịch hiển thị"
        resource="banner"
        noun="banner"
        useList={useBannersList}
        useRemove={useDeleteBanner}
        columns={columns}
        filters={filters}
        defaultSort={{ sortBy: "sortOrder", sortOrder: "asc" }}
        getRowLabel={(b) => b.title}
        onCreate={dialog.openCreate}
        onEdit={dialog.openEdit}
      />
      <BannerDialog banner={dialog.editing} open={dialog.open} onClose={dialog.close} />
    </>
  );
}
