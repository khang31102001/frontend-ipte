import { CategoryItem } from "@/types/category";


function normalize(api: CategoryItem): CategoryItem {
  return {
    categoryId: api.categoryId,
    icon: api.icon ?? undefined,
    name: api.name,
    slug: api.slug ?? undefined,
    url: api.url ?? undefined,
    description: api.description ?? undefined,
    parentId: api.parentId,
    categoryType: api.categoryType ?? undefined,
    metaTitle: api.metaTitle ??  undefined,
    metaDescription: api.metaDescription ?? undefined,
    h1Heading: api.h1Heading ?? undefined,
    seoContentTop: api.seoContentTop ?? undefined,
    seoContentBottom: api.seoContentBottom ?? undefined,
    canonicalUrl: api.canonicalUrl ?? undefined,
    noindex: api.noindex,
    createdAt: api.createdAt,
    updatedAt: api.updatedAt,
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
  if (a.createdAt && b.createdAt) {
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
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
  rows: CategoryItem[],
  filterHeaderOnly = true
): CategoryItem[] {
  const items = (filterHeaderOnly
    ? rows.filter(r => r.categoryType === 'HEADER_MENU')
    : rows
  ).map(normalize);

  const byId = new Map<number, CategoryItem>();
  items.forEach(it => byId.set(it.categoryId, it));

  const roots: CategoryItem[] = [];

  for (const it of items) {
    if (it.parentId && byId.has(it.parentId)) {
      const parent = byId.get(it.parentId)!;
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