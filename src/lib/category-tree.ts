import { CategoryItem } from "@/types/category";

type ApiCategory = {
  category_id: number;
  icon: string | null;
  name: string;
  slug: string | null;
  description: string | null;
  parent_id: number | null;
  category_type: string | null;
  meta_title: string | null;
  meta_description: string | null;
  h1_heading: string | null;
  seo_content_top: string | null;
  seo_content_bottom: string | null;
  canonical_url: string | null;
  noindex: boolean;
  created_at: string ;
  updated_at: string;
  version: number | null;
  url: string | null;
  level: number | null;
};

function normalize(api: ApiCategory): CategoryItem {
  return {
    category_id: api.category_id,
    icon: api.icon ?? undefined,
    name: api.name,
    slug: api.slug ?? undefined,
    url: api.url ?? undefined,
    description: api.description ?? undefined,
    parent_id: api.parent_id,
    category_type: api.category_type ?? undefined,
    meta_title: api.meta_title ??  undefined,
    meta_description: api.meta_description ?? undefined,
    h1_heading: api.h1_heading ?? undefined,
    seo_content_top: api.seo_content_top ?? undefined,
    seo_content_bottom: api.seo_content_bottom ?? undefined,
    canonical_url: api.canonical_url ?? undefined,
    noindex: api.noindex,
    created_at: api.created_at,
    updated_at: api.updated_at,
    version: api.version,
    level: api.level,
    children: [],
  };
}

// comparator để sort children (tuỳ chỉnh theo nhu cầu)
function sortCategories(a: CategoryItem, b: CategoryItem) {
  // ưu tiên level tăng dần (nếu có)
  const la = a.level ?? 9999;
  const lb = b.level ?? 9999;
  if (la !== lb) return la - lb;

  // rồi theo created_at (cũ → mới)
  if (a.created_at && b.created_at) {
    const da = new Date(a.created_at).getTime();
    const db = new Date(b.created_at).getTime();
    if (da !== db) return da - db;
  }

  // cuối cùng theo name (A → Z)
  return a.name.localeCompare(b.name, 'vi');
}

/**
 * Xây dựng cây từ mảng phẳng
 * @param rows mảng từ API .items
 * @param filterHeaderOnly chỉ giữ HEADER_MENU (tuỳ chọn)
 */
export function buildCategoryTree(
  rows: ApiCategory[],
  filterHeaderOnly = true
): CategoryItem[] {
  const items = (filterHeaderOnly
    ? rows.filter(r => r.category_type === 'HEADER_MENU')
    : rows
  ).map(normalize);

  const byId = new Map<number, CategoryItem>();
  items.forEach(it => byId.set(it.category_id, it));

  const roots: CategoryItem[] = [];

  for (const it of items) {
    if (it.parent_id && byId.has(it.parent_id)) {
      const parent = byId.get(it.parent_id)!;
      parent.children = parent.children ?? [];
      parent.children.push(it);
    } else {
      // parent_id null hoặc không tìm thấy parent -> coi như root
      roots.push(it);
    }
  }

  // Đệ quy sort children
  const sortRecursively = (node: CategoryItem) => {
    if (node.children && node.children.length > 0) {
      node.children.sort(sortCategories);
      node.children.forEach(sortRecursively);
    }
  };

  roots.sort(sortCategories);
  roots.forEach(sortRecursively);

  return roots;
}