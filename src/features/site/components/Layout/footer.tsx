import { Clock, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicBranch, PublicSiteConfig } from "@/features/public-api";
import { policyHref } from "../../config/routes";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, YoutubeIcon } from "../ui/brand-icons";

export interface FooterProps {
  config: PublicSiteConfig;
  branches: PublicBranch[];
}

interface SocialLink {
  key: string;
  label: string;
  url: string;
  icon: ReactNode;
  bg: string;
}

function socialLinks(social: PublicSiteConfig["social"]): SocialLink[] {
  const rows: (Omit<SocialLink, "url"> & { url?: string })[] = [
    { key: "facebook", label: "Facebook", url: social.facebook, icon: <FacebookIcon size={20} />, bg: "#1877F2" },
    { key: "tiktok", label: "TikTok", url: social.tiktok, icon: <TiktokIcon size={20} />, bg: "#000000" },
    { key: "youtube", label: "YouTube", url: social.youtube, icon: <YoutubeIcon size={20} />, bg: "#FF0000" },
    { key: "instagram", label: "Instagram", url: social.instagram, icon: <InstagramIcon size={20} />, bg: "#C13584" },
    { key: "linkedin", label: "LinkedIn", url: social.linkedin, icon: <LinkedinIcon size={20} />, bg: "#0A66C2" },
    { key: "zalo", label: "Zalo", url: social.zaloOa, icon: <MessageCircle size={20} />, bg: "#0068FF" },
    { key: "community", label: "Cộng đồng", url: social.communityUrl, icon: <Globe size={20} />, bg: "#111827" },
  ];
  return rows.filter((r): r is SocialLink => Boolean(r.url));
}

const Footer = ({ config, branches }: FooterProps) => {
  const { general, contact, social, policies } = config;
  const socials = socialLinks(social);

  return (
    <footer className="bg-slate-700 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="block w-[120px] h-[60px] rounded overflow-hidden">
              <Image src="/images/logo/log-5.jpg" alt={general.siteName} width={220} height={240} className="object-cover w-full h-full" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {general.tagline ?? "Trung tâm luyện thi PTE với phương pháp đã được chứng minh qua hàng ngàn học viên thành công."}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: s.bg }}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Các chi nhánh hiện tại</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {branches.map((b) => (
                <div key={b.id} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{b.address}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Chính sách</h3>
            <div className="space-y-2 text-sm">
              {policies.map((p) => (
                <Link key={p.key} href={policyHref(p.key)} className="block text-gray-300 hover:text-white">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-3 text-sm text-gray-300">
              {contact.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{contact.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${contact.hotlineVN.replace(/\s/g, "")}`}>Hotline: {contact.hotlineVN}</a>
              </div>
              {contact.hotlineAU && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href={`tel:${contact.hotlineAU.replace(/\s/g, "")}`}>Australia: {contact.hotlineAU}</a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              {contact.workingHours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{contact.workingHours}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-8 pt-10">
          <p className="text-center text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} {general.siteName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
