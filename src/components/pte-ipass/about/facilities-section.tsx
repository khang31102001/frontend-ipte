"use client"

import { useState } from "react"

import { ChevronRight } from "lucide-react"
import ImageLightbox from "@/components/ui/image-lightbox"
import Image from "next/image"
import Button from "@/components/button/Button"

const images = [
  {
    id: 1,
    src: "/woman-studying-with-flashcards-at-desk.jpg",
    alt: "Student studying with flashcards",
    className: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "/teacher-presenting-at-whiteboard-in-classroom.jpg",
    alt: "Teacher at whiteboard",
    className: "col-span-2 row-span-1",
  },
  {
    id: 3,
    src: "/student-working-on-laptop-at-desk.jpg",
    alt: "Student working on laptop",
    className: "col-span-2 row-span-2",
  },
  {
    id: 4,
    src: "/person-writing-notes-and-studying.jpg",
    alt: "Person writing notes",
    className: "col-span-2 row-span-1",
  },
  {
    id: 5,
    src: "/teacher-teaching-students-at-chalkboard.jpg",
    alt: "Teacher at chalkboard",
    className: "col-span-2 row-span-3",
  },
]

export default function FacilitiesSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left side - Heading */}
        <div className="lg:col-span-4">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#4318FF] leading-tight">Cơ sở vật chất</h2>
        </div>

        {/* Right side - Image Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-4 auto-rows-[120px] gap-4">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`${image.className} relative overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4318FF] focus:ring-offset-2`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={1000}
                  height={1000}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </button>
            ))}
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => console.log("See more clicked")}
              className="bg-[#4318FF] hover:bg-[#3612CC] text-white rounded-full px-8 py-6 text-base font-medium"
            >
              Xem thêm
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
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
