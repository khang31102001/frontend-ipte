"use client";

import { Calendar, MessageCircle, Phone } from "lucide-react";
import type { PublicSiteConfig } from "@/features/public-api";
import { analytics } from "../../lib/analytics";
import { useSite } from "../../providers/site-provider";
import { FacebookIcon } from "../ui/brand-icons";
import FloatingContact from "./floating-contact";

interface SiteFloatingContactProps {
  config: PublicSiteConfig;
}

/** Nút liên hệ nổi: đặt lịch học thử, Zalo, Messenger, gọi hotline — theo cấu hình website. */
export default function SiteFloatingContact({ config }: SiteFloatingContactProps) {
  const { openRegistration, hasRegistrationForm } = useSite();
  const { chat, contact, social } = config;

  const zaloHref = contact.zalo ? `https://zalo.me/${contact.zalo.replace(/\D/g, "")}` : social.zaloOa;

  const actions = [
    hasRegistrationForm && {
      id: "book",
      type: "book",
      label: "Đặt lịch học thử miễn phí",
      href: "#book-trial",
      onClick: openRegistration,
      icon: <Calendar className="w-5 h-5" />,
      priority: 1,
    },
    chat.zalo.enabled &&
      zaloHref && {
        id: "zalo",
        type: "zalo",
        label: "Chat Zalo với tư vấn viên",
        href: zaloHref,
        icon: <MessageCircle className="w-5 h-5" />,
        priority: 2,
      },
    chat.messenger.enabled &&
      chat.messenger.pageId && {
        id: "messenger",
        type: "messenger",
        label: "Chat Messenger",
        href: `https://m.me/${chat.messenger.pageId}`,
        icon: <FacebookIcon size={20} />,
        priority: 3,
      },
    {
      id: "call",
      type: "call",
      label: "Gọi hotline",
      href: `tel:${contact.hotlineVN.replace(/\s/g, "")}`,
      icon: <Phone className="w-5 h-5" />,
      priority: 4,
    },
  ].filter((a): a is NonNullable<typeof a> & object => Boolean(a)) as Parameters<typeof FloatingContact>[0]["actions"];

  return <FloatingContact actions={actions} onEvent={(name) => analytics.ctaClick(name)} />;
}
