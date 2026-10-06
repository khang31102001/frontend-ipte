import type { Metadata } from "next";
import { orFallback, publicApi } from "@/features/public-api/server";
import ConsultationForm from "../components/form/consultation-form";
import StudentComment from "../components/student/student-comment";
import { VideoSwiper } from "../components/student/video-swiper";
import { ROUTES } from "../config/routes";
import { breadcrumbJsonLd, buildMetadata } from "../lib/seo";
import { HeroBanner } from "../shared/banner/hero-banner";
import PageShell from "../shared/page/page-shell";

export const reviewsMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: "Học viên review PTE iPASS",
    description: "Cảm nhận và câu chuyện thành công của học viên PTE iPASS: từ PTE 36 lên 65, 79+ cho du học và định cư Úc.",
    path: ROUTES.reviews,
  });

export default async function ReviewsView() {
  const [result, banners] = await Promise.all([
    orFallback(publicApi.testimonials({ pageSize: 50 }), null),
    orFallback(publicApi.banners("home_secondary"), []),
  ]);
  const testimonials = result?.items ?? [];
  const videos = testimonials
    .filter((t) => t.videoUrl)
    .map((t) => ({ id: t.id, title: `${t.studentName} – ${t.headline}`, description: t.quote, imageUrl: t.avatarUrl, videoUrl: t.videoUrl }));
  const banner = banners[0];

  return (
    <PageShell jsonLd={breadcrumbJsonLd([{ name: "Trang chủ", href: ROUTES.home }, { name: "Học viên review", href: ROUTES.reviews }])}>
      <HeroBanner src={banner?.imageUrl ?? "/images/hero-img-hoc-vien-review.png"} alt={banner?.altText ?? "Học viên review PTE iPASS"} priority />
      <h1 className="sr-only">Học viên review PTE iPASS</h1>
      <VideoSwiper videos={videos} />
      <StudentComment comments={testimonials} />
      <ConsultationForm />
    </PageShell>
  );
}
