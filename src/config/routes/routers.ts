

import { joinPath } from "@/lib/helper";


// const NEWS_BASE = "/tin-tuc-pte-ipass";
// const COURSES_BASE = "/khoa-hoc";
// const KNOWLEDGE_BASE = "/kiem-tra-mien-phi"; 
// const TEACHER_BASE = "/doi-ngu-giao-vien";

// type Path = string | string[];

// export const ROUTERS = {
//   NEWS: {
//     index: () => NEWS_BASE,

//     category: (categoryPath: Path) =>
//       Array.isArray(categoryPath)
//         ? joinPath(NEWS_BASE, ...categoryPath)
//         : joinPath(NEWS_BASE, categoryPath),

//     detail: (slug: string, categoryPath?: Path) =>
//       categoryPath
//         ? Array.isArray(categoryPath)
//           ? joinPath(NEWS_BASE, ...categoryPath, slug)
//           : joinPath(NEWS_BASE, categoryPath, slug)
//         : joinPath(NEWS_BASE, slug),
//   },

//   COURSES: {
//     index: () => COURSES_BASE,

//     category: (categoryPath: Path) =>
//       Array.isArray(categoryPath)
//         ? joinPath(COURSES_BASE, ...categoryPath)
//         : joinPath(COURSES_BASE, categoryPath),

//     detail: (slug: string, categoryPath?: Path) =>
//       categoryPath
//         ? Array.isArray(categoryPath)
//           ? joinPath(COURSES_BASE, ...categoryPath, slug)
//           : joinPath(COURSES_BASE, categoryPath, slug)
//         : joinPath(COURSES_BASE, slug),
//   },

//   KNOWLEDGE: {
//     index: () => KNOWLEDGE_BASE,

//     category: (categoryPath: Path) =>
//       Array.isArray(categoryPath)
//         ? joinPath(KNOWLEDGE_BASE, ...categoryPath)
//         : joinPath(KNOWLEDGE_BASE, categoryPath),

//     detail: (slug: string, categoryPath?: Path) =>
//       categoryPath
//         ? Array.isArray(categoryPath)
//           ? joinPath(KNOWLEDGE_BASE, ...categoryPath, slug)
//           : joinPath(KNOWLEDGE_BASE, categoryPath, slug)
//         : joinPath(KNOWLEDGE_BASE, slug),
//   },

//    TEACHER: {
//     index: () => TEACHER_BASE,

//     category: (categoryPath: Path) =>
//       Array.isArray(categoryPath)
//         ? joinPath(TEACHER_BASE, ...categoryPath)
//         : joinPath(TEACHER_BASE, categoryPath),

//     detail: (slug: string, categoryPath?: Path) =>
//       categoryPath
//         ? Array.isArray(categoryPath)
//           ? joinPath(TEACHER_BASE, ...categoryPath, slug)
//           : joinPath(TEACHER_BASE, categoryPath, slug)
//         : joinPath(TEACHER_BASE, slug),
//   },
// } as const;

export const NEWS_BASE = "/tin-tuc-pte-ipass";
export const ABOUT_BASE = "/ve-pte-ipass"
export const COURSES_BASE = "/khoa-hoc";
export const KNOWLEDGE_BASE = "/kiem-tra-mien-phi";
export const TEACHER_BASE = "/doi-ngu-giao-vien"

type Path = string | string[];

function isFullUrl(s: string) {
  return /^https?:\/\//i.test(s);
}

function toStringPath(p?: Path): string {
  return Array.isArray(p) ? p.join("/") : (p ?? "");
}

function splitParts(s: string): string[] {
  return s.split("/").filter(Boolean);
}

function startsWithParts(parts: string[], prefix: string[]) {
  return prefix.length > 0 && prefix.every((seg, i) => parts[i] === seg);
}


function normalizeAbsPath(s: string) {
  const parts = splitParts(s.trim());
  return parts.length ? `/${parts.join("/")}` : "";
}

/**
 * Category rule:
 * - p empty => base
 * - p absolute (startsWith "/") => dùng luôn p (không prepend base)
 * - p relative => base + p
 */
export function buildCategory(base: string, p?: Path) {
  const raw = toStringPath(p).trim();
  const safeBase = normalizeAbsPath(base);
  if (!raw) return safeBase;
  if (raw.startsWith("/")) return normalizeAbsPath(raw);
  return joinPath(safeBase, raw);
}


/**
 * Detail rule:
 * - nếu có p: resolve cateHref trước rồi append slug
 * - nếu không có p: base + slug
 */
export function buildDetail(base: string, slug: string, p?: Path) {
  const safeSlug = splitParts(slug).join("-"); 
  const cateHref = buildCategory(base, p);     
  return joinPath(cateHref, safeSlug);
}

export const ROUTERS = {
  NEWS: {
    index: (base: string) => normalizeAbsPath(base),
    category: (base: string, p: Path) => buildCategory(base, p),
    detail: (base: string, slug: string, p?: Path) => buildDetail(base, slug, p),
  },
  COURSES: {
    index: (base: string) => normalizeAbsPath(base),
    category: (base: string, p: Path) => buildCategory(base, p),
    detail: (base: string, slug: string, p?: Path) => buildDetail(base, slug, p),
  },
  KNOWLEDGE: {
    index: (base: string) => normalizeAbsPath(base),
    category: (base: string, p: Path) => buildCategory(base, p),
    detail: (base: string, slug: string, p?: Path) => buildDetail(base, slug, p),
  },
  TEACHER: {
    index: (base: string) => normalizeAbsPath(base),
    category: (base: string, p: Path) => buildCategory(base, p),
    detail: (base: string, slug: string, p?: Path) => buildDetail(base, slug, p),
  },
} as const;
