"use client"

import { useState } from "react"

import { ChevronRight } from "lucide-react"
import ImageLightbox from "@/components/ui/image-lightbox"
import Image from "next/image"
import Button from "@/components/button/Button"

const images = [
  {
    id: 1,
    src: "/images/co-so-vat-chat-1.png",
    alt: "Student studying with flashcards",

  },
  {
    id: 2,
    src: "/images/co-so-vat-chat-.png",
    alt: "Teacher at whiteboard",

  },
  {
    id: 3,
    src: "/images/co-so-vat-chat-3.png",
    alt: "Student working on laptop",

  },
  {
    id: 4,
    src: "/images/student-4.jpg",
    alt: "Person writing notes",

  },
  {
    id: 5,
    src: "/images/co-so-vat-chat-1.png",
    alt: "Teacher at chalkboard",

  },
]

export default function FacilitiesSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid  grid-cols-3 grid-rows-2 gap-4">

        <div className="row-span-2 gap-4">
          <h2 className="text-5xl lg:text-[4.75rem] font-bold text-[#4318FF] leading-tight">Cơ sở vật chất</h2>

          <button
            key={images[0].id}
            // onClick={() => setSelectedImageIndex(1)}
            className="relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4318FF] focus:ring-offset-2 "
          >
            <div className="">
              <Image
                src={images[0].src || "/placeholder.svg"}
                alt={images[0].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={300}
                height={448}
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        </div>
        <div className="row-span-2">
          <button
            key={images[1].id}
            // onClick={() => setSelectedImageIndex(1)}
            className="relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4318FF] focus:ring-offset-2 h-[448px] w-[300px]"
          >
            <div className="">
              <Image
                src={images[1].src || "/placeholder.svg"}
                alt={images[1].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={300}
                height={448}
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
          <button
            key={images[2].id}
            // onClick={() => setSelectedImageIndex(1)}
            className="relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4318FF] focus:ring-offset-2 h-[448px] w-[300px]"
          >
            <div className="">
              <Image
                src={images[2].src || "/placeholder.svg"}
                alt={images[2].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={300}
                height={448}
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>

        </div>

        <div className="row-span-2">
          <button
            key={images[3].id}
            // onClick={() => setSelectedImageIndex(1)}
            className="relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4318FF] focus:ring-offset-2 ]"
          >
            <div className="">
              <Image
                src={images[3].src || "/placeholder.svg"}
                alt={images[3].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={300}
                height={448}
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
          <button
            key={images[4].id}
            // onClick={() => setSelectedImageIndex(1)}
            className="relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4318FF] focus:ring-offset-2 "
          >
            <div className="">
              <Image
                src={images[4].src || "/placeholder.svg"}
                alt={images[4].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={300}
                height={448}
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>

        </div>
      </div>
      {/* See More Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => console.log("See more clicked")}
          className="flex items-center bg-[#4318FF] hover:bg-[#3612CC] text-white rounded-full px-8 py-4 text-base font-medium"
          rightIcon={<ChevronRight className="ml-2 h-5 w-5" />}
        >
          Xem thêm

        </Button>
      </div>
      {/* Image Lightbox */}
      {selectedImageIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </section>
  )
}
