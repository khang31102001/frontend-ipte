import { joinPath } from "@/lib/helper";


const NEWS_BASE = "/tin-tuc-pte-ipass";
const COURSES_BASE = "/khoa-hoc-pte-ipass";
const KNOWLEDGE_BASE = "/kiem-tra-mien-phi"; 
const TEACHER_BASE = "doi-ngu-giao-vien";

type Path = string | string[];

export const ROUTERS = {
  NEWS: {
    index: () => NEWS_BASE,

    category: (categoryPath: Path) =>
      Array.isArray(categoryPath)
        ? joinPath(NEWS_BASE, ...categoryPath)
        : joinPath(NEWS_BASE, categoryPath),

    detail: (slug: string, categoryPath?: Path) =>
      categoryPath
        ? Array.isArray(categoryPath)
          ? joinPath(NEWS_BASE, ...categoryPath, slug)
          : joinPath(NEWS_BASE, categoryPath, slug)
        : joinPath(NEWS_BASE, slug),
  },

  COURSES: {
    index: () => COURSES_BASE,

    category: (categoryPath: Path) =>
      Array.isArray(categoryPath)
        ? joinPath(COURSES_BASE, ...categoryPath)
        : joinPath(COURSES_BASE, categoryPath),

    detail: (slug: string, categoryPath?: Path) =>
      categoryPath
        ? Array.isArray(categoryPath)
          ? joinPath(COURSES_BASE, ...categoryPath, slug)
          : joinPath(COURSES_BASE, categoryPath, slug)
        : joinPath(COURSES_BASE, slug),
  },

  KNOWLEDGE: {
    index: () => KNOWLEDGE_BASE,

    category: (categoryPath: Path) =>
      Array.isArray(categoryPath)
        ? joinPath(KNOWLEDGE_BASE, ...categoryPath)
        : joinPath(KNOWLEDGE_BASE, categoryPath),

    detail: (slug: string, categoryPath?: Path) =>
      categoryPath
        ? Array.isArray(categoryPath)
          ? joinPath(KNOWLEDGE_BASE, ...categoryPath, slug)
          : joinPath(KNOWLEDGE_BASE, categoryPath, slug)
        : joinPath(KNOWLEDGE_BASE, slug),
  },

   TEACHER: {
    index: () => TEACHER_BASE,

    category: (categoryPath: Path) =>
      Array.isArray(categoryPath)
        ? joinPath(TEACHER_BASE, ...categoryPath)
        : joinPath(TEACHER_BASE, categoryPath),

    detail: (slug: string, categoryPath?: Path) =>
      categoryPath
        ? Array.isArray(categoryPath)
          ? joinPath(TEACHER_BASE, ...categoryPath, slug)
          : joinPath(TEACHER_BASE, categoryPath, slug)
        : joinPath(TEACHER_BASE, slug),
  },
} as const;
