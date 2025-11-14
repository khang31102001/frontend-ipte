"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Maximize2, X } from "lucide-react"


interface VideoItem {
  id: string | number | null;
  title: string
  description: string
  thumbnail: string
  author: string
}

interface VideoSwiperProps {
  videos: VideoItem[]
  autoplay?: boolean
  autoplayInterval?: number
}

export function VideoSwiper({ 
  videos = [], 
  autoplay = false, 
  autoplayInterval = 5000 
}: VideoSwiperProps) {
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout>()

  const currentVideo = videos[currentIndex]

  useEffect(() => {
    if (autoplay && !isPlaying) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length)
      }, autoplayInterval)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, autoplayInterval, isPlaying, videos.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
  }

  const handleFullscreenClick = async () => {
    try {
      if (!document.fullscreenElement && videoContainerRef.current) {
        await videoContainerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Fullscreen error:", error)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen()
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [isFullscreen]);
  
  if(!videos || videos.length === 0) return null;
  return (
    <div ref={containerRef} className="w-full bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4 md:px-8">
      <div className={`${isFullscreen ? "max-w-full" : "max-w-6xl"} mx-auto`}>
        {/* Video Container */}
        <div
          ref={videoContainerRef}
          className={`relative mb-8 ${isFullscreen ? "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center" : ""}`}
        >
          {/* Exit fullscreen button */}
          {isFullscreen && (
            <button
              onClick={handleFullscreenClick}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center hover:scale-110"
              aria-label="Exit fullscreen"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          )}

          <div
            className={`relative group rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-2xl ${
              isFullscreen ? "w-full h-full max-w-6xl" : "w-full"
            }`}
          >
            <div className={`w-full ${isFullscreen ? "h-full" : "h-0 pb-[56.25%]"} relative bg-black`}>
              {/* Thumbnail */}
              <img
                src={currentVideo.thumbnail || "/placeholder.svg"}
                alt={currentVideo.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Play Button Overlay */}
              <button
                onClick={handlePlayClick}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isPlaying ? "bg-black/0" : "bg-black/0 group-hover:bg-black/20"
                }`}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-300 ${
                    isPlaying ? "scale-0" : "scale-100 hover:scale-110"
                  }`}
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-black fill-black ml-1" />
                </div>
              </button>

              <button
                onClick={handleFullscreenClick}
                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all flex items-center justify-center hover:scale-110"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <X className="w-5 h-5 text-gray-800" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-gray-800" />
                )}
              </button>
            </div>
          </div>

          {/* {!isFullscreen && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center hover:scale-110"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center hover:scale-110"
                aria-label="Next video"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )} */}


        </div>

        {!isFullscreen && (
          <>
            {/* Video Information */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 text-balance">{currentVideo.title}</h2>

              {/* Author */}
              <p className="text-sm text-gray-400">{currentVideo.author}</p>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{currentVideo.description}</p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-12">
              {/* Left Arrow Button */}
              <button
                onClick={goToPrevious}
                className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center hover:scale-110"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>

              {/* Pagination Dots */}
              {/* <div className="flex gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex ? "bg-yellow-400 w-3 h-3" : "bg-gray-500 w-2 h-2 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div> */}

              {/* Right Arrow Button */}
              <button
                onClick={goToNext}
                className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center hover:scale-110"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            <div className="text-center mt-8 text-gray-400">
              <p className="text-sm">
                {currentIndex + 1} / {videos.length}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
