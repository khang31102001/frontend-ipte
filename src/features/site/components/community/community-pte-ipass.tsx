import { Globe, MessageCircle } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { PublicSiteConfig } from "@/features/public-api";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, YoutubeIcon } from "../ui/brand-icons";
import CommunityCard from "./community-card";

interface CommunityProps {
  social: PublicSiteConfig["social"];
  heading?: string;
  description?: string;
}

interface CommunityLink {
  key: string;
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
  bgColor: string;
}

/** Danh sách kênh cộng đồng dựng từ cấu hình mạng xã hội (chỉ hiển thị kênh đã nhập). */
export function communityLinks(social: PublicSiteConfig["social"]): CommunityLink[] {
  const icon = "h-6 w-6 text-white";
  const rows: (Omit<CommunityLink, "url"> & { url?: string })[] = [
    { key: "community", title: "Nhóm cộng đồng", description: "Hỏi đáp, chia sẻ kinh nghiệm thi PTE cùng hàng nghìn học viên.", url: social.communityUrl, icon: <Globe className={icon} />, bgColor: "#111827" },
    { key: "facebook", title: "Fanpage Facebook", description: "Cập nhật lịch khai giảng, ưu đãi và mẹo làm bài mỗi ngày.", url: social.facebook, icon: <FacebookIcon size={24} className="text-white" />, bgColor: "#1877F2" },
    { key: "zalo", title: "Zalo OA", description: "Nhắn tin trực tiếp để được tư vấn lộ trình nhanh nhất.", url: social.zaloOa, icon: <MessageCircle className={icon} />, bgColor: "#0068FF" },
    { key: "youtube", title: "Kênh YouTube", description: "Video hướng dẫn từng dạng câu hỏi PTE từ giáo viên điểm cao.", url: social.youtube, icon: <YoutubeIcon size={24} className="text-white" />, bgColor: "#FF0000" },
    { key: "tiktok", title: "TikTok", description: "Mẹo PTE ngắn gọn, dễ nhớ trong 60 giây.", url: social.tiktok, icon: <TiktokIcon size={24} className="text-white" />, bgColor: "#000000" },
    { key: "instagram", title: "Instagram", description: "Hình ảnh lớp học và câu chuyện học viên.", url: social.instagram, icon: <InstagramIcon size={24} className="text-white" />, bgColor: "#C13584" },
    { key: "linkedin", title: "LinkedIn", description: "Kết nối nghề nghiệp và học bổng du học.", url: social.linkedin, icon: <LinkedinIcon size={24} className="text-white" />, bgColor: "#0A66C2" },
  ];
  return rows.filter((r): r is CommunityLink => Boolean(r.url));
}

const CommunityPTE = ({
  social,
  heading = "Cộng đồng học tập",
  description = "Tham gia cộng đồng học tập của chúng tôi để kết nối với những người học khác, chia sẻ kinh nghiệm và nhận hỗ trợ trong hành trình chinh phục PTE.",
}: CommunityProps) => {
  const links = communityLinks(social);
  if (links.length === 0) return null;

  return (
    <Section className="w-full">
      <PageContent>
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="relative h-full">
            <div className="relative h-full max-w-md mx-auto">
              <Image src="/images/img-comunity.png" alt="Cộng đồng học viên PTE iPASS" width={600} height={700} className="h-full object-cover rounded" />
            </div>
          </div>

          <div className="space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-4 p-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-brandBlue-900 leading-tight">{heading}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-col gap-4 w-full h-full py-4 max-h-96 overflow-y-auto no-scrollbar">
              {links.map((item) => (
                <CommunityCard key={item.key} icon={item.icon} href={item.url} title={item.title} description={item.description} bgColor={item.bgColor} className="shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </PageContent>
    </Section>
  );
};

export default CommunityPTE;
