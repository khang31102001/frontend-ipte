"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/config/routes";
import { EntityDetailPage } from "@/shared/crud";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { PageHeader } from "@/shared/ui";
import { useArticle, useDeleteArticle } from "../hooks/use-articles";
import type { Article } from "../types";
import { ArticleForm } from "./article-form";

export function ArticleCreatePage() {
  const router = useRouter();
  return (
    <RequirePermission permission="article.create">
      <PageHeader title="Viết bài mới" breadcrumbs={[{ label: "Bài viết", href: ROUTES.articles.list }, { label: "Thêm mới" }]} />
      <ArticleForm onSaved={(a) => router.replace(ROUTES.articles.detail(a.id))} onCancel={() => router.push(ROUTES.articles.list)} />
    </RequirePermission>
  );
}

export function ArticleDetailPage({ articleId }: { articleId: string }) {
  return (
    <EntityDetailPage<Article>
      id={articleId}
      resource="article"
      noun="bài viết"
      listHref={ROUTES.articles.list}
      listLabel="Bài viết"
      useEntity={useArticle}
      useRemove={useDeleteArticle}
      title={(a) => a?.title ?? "Bài viết"}
      crumb={(a) => a?.slug ?? "…"}
    >
      {(article) => <ArticleForm article={article} />}
    </EntityDetailPage>
  );
}
