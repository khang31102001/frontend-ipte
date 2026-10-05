import type { PublicArticleCategory, PublicCourseCategory } from "@/features/public-api";
import { ARTICLE_SECTIONS, ROUTES, courseCategoryHref, sectionCategoryPath } from "../config/routes";
import type { NavItem } from "../types/nav";

/** Menu chính của website, dựng từ cấu hình chuyên mục + danh mục lấy từ API. */
export function buildMainNav(courseCategories: PublicCourseCategory[], articleCategories: PublicArticleCategory[]): NavItem[] {
  const articleChildren = (key: keyof typeof ARTICLE_SECTIONS): NavItem[] => {
    const section = ARTICLE_SECTIONS[key];
    return articleCategories
      .filter((c) => section.categorySlugs.includes(c.slug))
      .map((c) => ({ label: c.name, href: sectionCategoryPath(section, c.slug) }));
  };
  const withChildren = (label: string, href: string, children: NavItem[]): NavItem =>
    children.length > 1 ? { label, href, children } : { label, href };

  return [
    { label: "Trang chủ", href: ROUTES.home },
    { label: "Về PTE iPASS", href: ROUTES.about },
    withChildren(
      "Khóa học",
      ROUTES.courses,
      courseCategories.map((c) => ({ label: c.name, href: courseCategoryHref(c.slug) })),
    ),
    { label: "Giáo viên", href: ROUTES.teachers },
    { label: "Học viên review", href: ROUTES.reviews },
    withChildren("Kiến thức PTE", ARTICLE_SECTIONS.knowledge.base, articleChildren("knowledge")),
    withChildren("Tin tức", ARTICLE_SECTIONS.news.base, articleChildren("news")),
    { label: "PTE đại học", href: ARTICLE_SECTIONS.university.base },
    { label: "Du học & định cư", href: ARTICLE_SECTIONS.studyAbroad.base },
    { label: "Liên hệ", href: ROUTES.contact },
  ];
}
