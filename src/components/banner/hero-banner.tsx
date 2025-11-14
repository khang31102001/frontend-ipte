
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
        <Image
          src={img}
          alt="PTE Hero Banner"
          fill
          className="w-full h-auto object-cover object-center opacity-90"
          priority
        />

    </section>
  )
}

export default HeroBanner
