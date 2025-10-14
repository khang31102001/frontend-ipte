"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import Button from "../button/Button";
import Image from "next/image";


interface ImageLightboxProps {
  images: Array<{ id: number; src: string; alt: string }>
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    // Reset zoom and rotation when image changes
    setScale(1)
    setRotation(0)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  const handlePrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }

  const handleNext = () => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <Button
       
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Navigation Buttons */}
      <Button
       
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
      >
        <ChevronLeft className="h-8 w-8" />
        <span className="sr-only">Previous image</span>
      </Button>

      <Button
       
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
      >
        <ChevronRight className="h-8 w-8" />
        <span className="sr-only">Next image</span>
      </Button>

      {/* Zoom and Rotate Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full p-2 z-10">
        <Button
          
          onClick={handleZoomOut}
          disabled={scale <= 0.5}
          className="text-white hover:bg-white/20 disabled:opacity-50"
        >
          <ZoomOut className="h-5 w-5" />
          <span className="sr-only">Zoom out</span>
        </Button>

        <span className="text-white text-sm font-medium min-w-[60px] text-center">{Math.round(scale * 100)}%</span>

        <Button
          
          onClick={handleZoomIn}
          disabled={scale >= 3}
          className="text-white hover:bg-white/20 disabled:opacity-50"
        >
          <ZoomIn className="h-5 w-5" />
          <span className="sr-only">Zoom in</span>
        </Button>

        <div className="w-px h-6 bg-white/30 mx-1" />

        <Button  onClick={handleRotate} className="text-white hover:bg-white/20">
          <RotateCw className="h-5 w-5" />
          <span className="sr-only">Rotate</span>
        </Button>
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center p-16">
        <Image
          src={currentImage.src || "/placeholder.svg"}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
          }}
          width={1000}
          height={1000}
        />
      </div>
    </div>
  )
}
