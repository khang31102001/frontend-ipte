import { BreadcrumbItem } from "@/types/breadcrumbs";
import { CategoryItem } from "@/types/category";

const API = process.env.NEXT_PUBLIC_URL_API!;

/** Tách các segment từ path có/không có "/" */
const toSegments = (p?: string | null) => (p ?? '').split('/').filter(Boolean);
/** Lấy segment cuối cùng: "/a/b" -> "b" */
const lastSegment = (p?: string | null) => toSegments(p).slice(-1)[0] ?? '';

/**
 * Duyệt cây theo mảng segment (params.slug), ví dụ:
 *  URL: /khoa-hoc/pte-ipass/khoa-hoc-pte-36
 *  -> slugs = ["khoa-hoc", "pte-ipass", "khoa-hoc-pte-36"]
 *
 * Mỗi bước: tìm node tại "currentLevel" có segment cuối
 *   trùng s (so sánh với lastSegment(slug) hoặc lastSegment(url))
 * Nếu không thấy -> 404
 */
export async function checkCategoryBySlugs(categoryTree: CategoryItem[] ,slugs: string[] = []):Promise<{
  found: CategoryItem | null;
  breadcrumbs: BreadcrumbItem[];
}> {
  // console.log("checkCategoryBySlugs:", categoryTree);
  let currentLevel = categoryTree ? categoryTree : [];
  let found: CategoryItem | null = null;
  const breadcrumbs: BreadcrumbItem[] = [];
  const accSegments: string[] = [];

  // danh mục cấp một 1
  for (const s of slugs) {
    found = (currentLevel || []).find((i) => {
      const segment = lastSegment(i.slug) || lastSegment(i.url);
      //  console.log("Comparing segment:", { segment, s });
      return segment === s;
    }) || null;

    // không match ở cấp hiện tại -> 404
    if (!found) return { found: null, breadcrumbs };
    // cập nhật breadcrumb + xuống cấp con
    const seg = lastSegment(found.slug || found.url);
    // console.log("Found segment:", seg);
    if (seg) accSegments.push(seg);
    const href = '/' + accSegments.join('/');
    breadcrumbs.push({ name: found.name, href: href });

    // tiếp tục kiểm tra cấp con
    currentLevel = found.children || [];
  }



  // console.log("Resolved node by slugs:", { slugs, found });
  return { found, breadcrumbs };
}

/** leaf = không có children hoặc children rỗng */
export const isChildren = (node?: CategoryItem | null) => !!node && (!node.children || node.children.length === 0);
