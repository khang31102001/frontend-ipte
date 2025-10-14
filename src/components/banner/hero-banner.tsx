
import { Plane, BookOpen, GraduationCap, Globe } from "lucide-react"
import Button from "../button/Button"
import Image from "next/image"

interface HeroBannerProps {
  img: string
  className?: string
  height?: string
  width?: string

}
export const HeroBanner = ({ img, className }: HeroBannerProps) => {
  return (
    <section className={`relative w-full ${className}`}>
      <div className="w-full">
        <Image
          src={img}
          alt="PTE Hero Banner"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />

      </div>

    </section>
  )
}

export default HeroBanner
