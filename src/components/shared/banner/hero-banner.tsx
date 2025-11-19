
import Image from "next/image"
import clsx from "clsx"

interface HeroBannerProps {
  img: string
  className?: string
  height?: string
  width?: string

}
export const HeroBanner = ({ img, className }: HeroBannerProps) => {
  return (
    
    <section className={clsx("hero-image", className)}>
        <Image
          src={img}
          alt="PTE Hero Banner"
          fill
          className="hero-image__img"
          priority
        />

    </section>
  )
}

export default HeroBanner
