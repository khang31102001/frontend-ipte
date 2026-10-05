import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { orFallback, publicApi } from "@/features/public-api/server";
import ConsultationForm from "../components/form/consultation-form";
import { ROUTES, policyHref } from "../config/routes";
import { breadcrumbJsonLd, buildMetadata } from "../lib/seo";
import { sanitizeHtml, toHtml } from "../lib/sanitize";
import PageContent from "../shared/page/page-content";
import PageShell from "../shared/page/page-shell";
import { Section } from "../shared/page/section";

export async function policyMetadata(key?: string): Promise<Metadata> {
  const config = await orFallback(publicApi.siteConfig(), null);
  const policy = config?.policies.find((p) => p.key === key);
  return buildMetadata({
    title: policy ? policy.title : "Chính sách",
    description: "Chính sách học phí, hoàn/đổi khóa học, bảo mật thông tin, điều khoản sử dụng và quy định học viên tại PTE iPASS.",
    path: key ? policyHref(key) : ROUTES.policy,
    noindex: true,
  });
}

export async function PolicyRoute({ policyKey }: { policyKey?: string }) {
  const config = await orFallback(publicApi.siteConfig(), null);
  const policies = config?.policies ?? [];
  if (policies.length === 0) notFound();
  if (!policyKey) redirect(policyHref(policies[0]!.key));

  const active = policies.find((p) => p.key === policyKey);
  if (!active) notFound();
  // Chính sách trỏ sang địa chỉ ngoài/nội bộ khác → chuyển hướng.
  if (active.url && !active.content) redirect(active.url);

  return (
    <PageShell jsonLd={breadcrumbJsonLd([{ name: "Trang chủ", href: ROUTES.home }, { name: "Chính sách", href: ROUTES.policy }, { name: active.title, href: policyHref(active.key) }])}>
      <header className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Chính sách PTE iPASS</h1>
        <p className="mt-3 max-w-3xl text-base md:text-lg leading-relaxed text-slate-600">Tại PTE iPASS, chúng tôi minh bạch về học phí, hoàn/đổi, bảo mật thông tin và quy định hỗ trợ để đảm bảo quyền lợi tốt nhất cho học viên.</p>
      </header>

      <Section>
        <PageContent>
          <div className="flex gap-4 flex-wrap">
            {policies.map((p) => (
              <Link
                key={p.key}
                href={policyHref(p.key)}
                aria-current={p.key === active.key ? "page" : undefined}
                className={`flex-grow px-6 py-4 rounded-tl-sm rounded-tr-sm text-xl md:text-2xl font-medium transition-all ${p.key === active.key ? "bg-hero-gradient text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {p.title}
              </Link>
            ))}
          </div>
          <article className="prose prose-lg max-w-none bg-white rounded-b p-6 md:p-10 shadow" dangerouslySetInnerHTML={{ __html: sanitizeHtml(toHtml(active.content ?? "")) }} />
        </PageContent>
      </Section>

      <ConsultationForm />
    </PageShell>
  );
}
