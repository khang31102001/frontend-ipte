"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/core/config/routes";
import { CrudListPage, type FilterDef } from "@/shared/crud";
import type { Column } from "@/shared/data-table";
import { CONTENT_STATUS_LABELS } from "@/shared/domain/content";
import { toOptions } from "@/shared/domain/pte";
import type { ListParams } from "@/shared/hooks/use-list-params";
import { formatDate, formatNumber } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { Badge, ContentStatusBadge } from "@/shared/ui";
import { useArticles, useDeleteArticle } from "../hooks/use-articles";
import type { Article, ArticleQuery } from "../types";

type FilterKey = "status" | "categoryId" | "authorId" | "tagId";

function useArticlesList(query: ListParams<FilterKey>) {
  return useArticles(query as ArticleQuery);
}

const columns: Column<Article>[] = [
  {
    key: "title",
    header: "Bài viết",
    sortKey: "title",
    className: "min-w-[280px]",
    cell: (a) => (
      <Link href={ROUTES.articles.detail(a.id)} className="block hover:text-brand-500">
        <span className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-white/90">
          {a.title}
          {a.isFeatured && <Star className="size-3.5 fill-warning-500 text-warning-500" aria-label="Nổi bật" />}
        </span>
        <span className="block text-theme-xs text-gray-500">
          /{a.slug} · {a.readingMinutes} phút đọc
        </span>
      </Link>
    ),
  },
  { key: "category", header: "Danh mục", hideBelow: "md", cell: (a) => a.categoryName ?? "—" },
  {
    key: "tags",
    header: "Tag",
    hideBelow: "lg",
    cell: (a) => (
      <span className="flex max-w-[220px] flex-wrap gap-1">
        {a.tagNames?.slice(0, 3).map((t) => (
          <Badge key={t} color="gray">
            {t}
          </Badge>
        ))}
      </span>
    ),
  },
  { key: "author", header: "Tác giả", hideBelow: "lg", cell: (a) => a.authorName ?? "—" },
  { key: "views", header: "Lượt xem", sortKey: "viewCount", align: "right", hideBelow: "xl", cell: (a) => formatNumber(a.viewCount) },
  { key: "status", header: "Trạng thái", sortKey: "status", cell: (a) => <ContentStatusBadge status={a.status} /> },
  { key: "publishedAt", header: "Ngày đăng", sortKey: "publishedAt", hideBelow: "md", cell: (a) => formatDate(a.publishedAt) },
];

export function ArticlesListPage() {
  const categories = useLookup("article-categories");
  const staff = useLookup("staff");
  const tags = useLookup("tags");
  const filters: FilterDef<FilterKey>[] = [
    { key: "status", label: "Trạng thái", options: toOptions(CONTENT_STATUS_LABELS) },
    { key: "categoryId", label: "Danh mục", options: categories.options },
    { key: "tagId", label: "Tag", options: tags.options },
    { key: "authorId", label: "Tác giả", options: staff.options },
  ];
  return (
    <CrudListPage<Article, FilterKey>
      title="Bài viết"
      description="Blog / kiến thức PTE, tin tức, câu chuyện học viên"
      resource="article"
      noun="bài viết"
      useList={useArticlesList}
      useRemove={useDeleteArticle}
      columns={columns}
      filters={filters}
      defaultSort={{ sortBy: "updatedAt", sortOrder: "desc" }}
      searchPlaceholder="Tìm theo tiêu đề, mô tả, slug…"
      getRowLabel={(a) => a.title}
      createHref={ROUTES.articles.create}
      viewHref={(a) => ROUTES.articles.detail(a.id)}
      editHref={(a) => ROUTES.articles.detail(a.id)}
    />
  );
}
