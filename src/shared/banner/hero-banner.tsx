import Image from "next/image";

type HeroBannerProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function HeroBanner({ src, alt, priority }: HeroBannerProps) {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl max-w-none bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width:1400px) 100vw, 1200px"
            className="object-cover"
            priority={priority}
          />
        </div>
      </div>
    </section>
  );
}
