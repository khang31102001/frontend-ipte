"use client";

import Image from "next/image";

type HeroBannerProps = {
  src?: string | null;
  alt?: string;
  priority?: boolean;
};

export function HeroBanner({ src, alt, priority }: HeroBannerProps) {
  if (!src) return null;
  
  return (
    <section
      className="relative w-full"
    >
      <Image
        src={src}
        alt={alt || "PTE IPASS"}
        width={1920}
        height={720}
        priority={priority}
        sizes="100vw"
        className="w-full h-auto"
      />
    </section>
  );
}
