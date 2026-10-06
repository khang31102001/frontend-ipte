import { CONTENT_STATUS_LABELS, type ContentStatus } from "@/shared/domain/content";
import { Badge, type BadgeColor } from "./badge";

const COLORS: Record<ContentStatus, BadgeColor> = { draft: "gray", review: "warning", published: "success", archived: "gray" };

/** Trạng thái vòng đời nội dung CMS (Nháp / Chờ duyệt / Đã đăng / Lưu trữ). */
export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  return <Badge color={COLORS[status]}>{CONTENT_STATUS_LABELS[status]}</Badge>;
}
