import Image from "next/image";

type HeroBannerProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function HeroBanner({ src, alt, priority }: HeroBannerProps) {
  return (
    <section className="hero">
      <div className="hero__media">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
           sizes="100vw"    
          className="hero__img"
        />
      </div>
    </section>
  );
}
