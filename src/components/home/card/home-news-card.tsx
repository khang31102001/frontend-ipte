"use client";

import { News } from "@/types/news";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

interface NewsCardProps {
  item: News;
  className?: string;
  enableImg?: boolean;
  heightImg?: string; 
  href?: string;      
}

const HomeNewsCard = ({
  item,
  className = "",
  enableImg = true,
  heightImg = "h-[260px]",
  href,
}: NewsCardProps) => {
  const image = item?.image || "/images/teacher-placeholder.png";

  // Bạn chỉnh lại theo field thực tế trong type News của bạn
  const computedHref = useMemo(() => {
    if (href) return href;
    if (item?.slug) return `/tin-tuc-pte-ipass/${item.slug}`;
    if (item?.newsId) return `/tin-tuc-pte-ipass/${item.newsId}`;
    return "/tin-tuc-pte-ipass";
  }, [href, item]);

  const desc =
    item?.description ||
    item?.content ||
    item?.title ||
    "";

  return (
    <article
      className={[
        "group h-full overflow-hidden rounded-2xl bg-white",
        "border border-slate-200/80",
        "shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)]",
        "focus-within:ring-2 focus-within:ring-brandBlue-500/40",
        className,
      ].join(" ")}
    >
      <Link href={computedHref} className="block h-full">
        <div className="flex h-full flex-col">
          {/* Image */}
          {enableImg && (
            <div className={`relative w-full ${heightImg} overflow-hidden`}>
              <Image
                src={image}
                alt={item?.title ?? "PTE iPASS"}
                width={800}
                height={520}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-[18px] font-semibold leading-snug text-slate-900 line-clamp-2">
              {item?.title}
            </h3>

            <p className="text-[14px] leading-relaxed text-slate-600 line-clamp-3">
              {desc}
            </p>

            {/* CTA */}
            <div className="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold text-brandBlue-500">
              <span className="transition-colors group-hover:text-brandBlue-900">
                Đọc tiếp
              </span>
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default HomeNewsCard;
