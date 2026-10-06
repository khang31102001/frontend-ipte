import type { ReactNode } from "react";
import { publicApi, orFallback } from "@/features/public-api/server";
import type { PublicBranch, PublicForm, PublicSiteConfig } from "@/features/public-api";
import Footer from "../components/Layout/footer";
import Header from "../components/Layout/header";
import SiteFloatingContact from "../components/Layout/site-floating-contact";
import ThirdPartyScripts from "../components/Layout/third-party-scripts";
import { REGISTRATION_FORM_SLUG } from "../config/forms";
import { buildMainNav } from "../lib/nav";
import { SiteProvider } from "../providers/site-provider";

/** Cấu hình dự phòng khi API công khai tạm thời không phản hồi (website vẫn hiển thị được). */
const FALLBACK_CONFIG: PublicSiteConfig = {
  updatedAt: new Date(0).toISOString(),
  general: { siteName: "PTE iPASS" },
  contact: { hotlineVN: "" , email: "" },
  social: {},
  policies: [],
  chat: { zalo: { enabled: false }, messenger: { enabled: false }, thirdParty: { enabled: false } },
  tracking: {},
};

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [config, courseCategories, articleCategories, branches, registrationForm] = await Promise.all([
    orFallback(publicApi.siteConfig(), FALLBACK_CONFIG),
    orFallback(publicApi.courseCategories(), []),
    orFallback(publicApi.articleCategories(), []),
    orFallback<PublicBranch[]>(publicApi.branches(), []),
    orFallback<PublicForm | null>(publicApi.form(REGISTRATION_FORM_SLUG), null),
  ]);

  const nav = buildMainNav(courseCategories, articleCategories);

  return (
    <SiteProvider registrationForm={registrationForm}>
      <Header nav={nav} logoUrl={config.general.logoUrl} siteName={config.general.siteName} hotline={config.contact.hotlineVN || undefined} />
      <main className="flex-1 w-full">{children}</main>
      <Footer config={config} branches={branches} />
      <SiteFloatingContact config={config} />
      <ThirdPartyScripts config={config} />
    </SiteProvider>
  );
}
