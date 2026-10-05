import type { PublicPage } from "@/features/public-api";

export type PublicSection = PublicPage["sections"][number];
export type SectionType = PublicSection["type"];

/** Khối đầu tiên theo loại (trang landing/CMS). */
export function findSection(page: PublicPage | null | undefined, type: SectionType): PublicSection | undefined {
  return page?.sections.find((s) => s.type === type);
}

/** Tách một dòng item dạng "A | B | C" thành các phần đã cắt khoảng trắng. */
export function splitItem(item: string): string[] {
  return item.split("|").map((part) => part.trim());
}

/** Dòng "Tiêu đề | Mô tả | Link tùy chọn" → object. */
export function parseTitledItems(items: string[]): { title: string; description: string; href?: string }[] {
  return items.map((raw) => {
    const [title = "", description = "", href] = splitItem(raw);
    return { title, description, href: href || undefined };
  });
}
