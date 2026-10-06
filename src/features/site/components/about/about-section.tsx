"use client";
import { ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ROUTES } from "../../config/routes";
import { UniversalVideoPlayer } from "../../shared/media/UniversalVideoPlayer";

interface AboutSectionProps {
  /** Ẩn nút "Xem thêm" (khi đã ở trang giới thiệu). */
  hideMore?: boolean;
  title?: string;
  description?: string;
  image?: string;
  /** Link video giới thiệu (YouTube/Vimeo/file). Bỏ trống thì chỉ hiện ảnh. */
  video?: string;
}

const AboutSection = ({ title, description, image = "/images/about-banner.png", video, hideMore }: AboutSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && videoContainerRef.current) {
        await videoContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn("Fullscreen error:", error);
    }
  };

  return (
    <section className="w-full section">
      <div className="mx-auto py-6 sm:w-[var(--width-container-sm)] md:w-[var(--width-container-md)] lg:w-[var(--width-container-lg)] xl:w-[var(--width-container-xl)] sm:px-[var(--padding-x-container-sm)] md:px-[var(--padding-x-container-md)] lg:px-[var(--padding-x-container-lg)] xl:px-[var(--padding-x-container-xl)]">
        <div ref={videoContainerRef} className={`relative mb-8 ${isFullscreen ? "fixed inset-0 z-50 bg-black flex flex-col items-center justify-center" : ""}`}>
          {isFullscreen && (
            <button onClick={toggleFullscreen} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center hover:scale-110" aria-label="Thoát toàn màn hình">
              <X className="w-6 h-6 text-gray-800" />
            </button>
          )}

          <div className={`relative group rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-2xl ${isFullscreen ? "w-full h-full max-w-6xl" : "w-full"}`}>
            <div className={`w-full ${isFullscreen ? "h-full" : "h-0 pb-[56.25%]"} relative bg-black`}>
              {isPlaying && video ? (
                <UniversalVideoPlayer url={video} poster={image} title="Video giới thiệu" autoPlay muted={false} controls />
              ) : (
                <>
                  <Image src={image} alt={title ?? "PTE iPASS"} fill sizes="(max-width: 1024px) 100vw, 1024px" className="absolute inset-0 w-full h-full object-cover" priority />
                  {video && (
                    <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black/0 group-hover:bg-black/20" aria-label="Phát video giới thiệu">
                      <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-300 scale-100 hover:scale-110">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-black fill-black ml-1" />
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-center">
                <span className="relative text-hero-gradient inline-block pb-4">{title}</span>
              </h2>
            )}
            {description && <p className="mx-auto mt-6 max-w-3xl text-pretty text-base md:text-lg leading-relaxed text-slate-600">{description}</p>}
          </div>
          <div className={`w-full pt-2 flex justify-center my-2 ${hideMore ? "hidden" : ""}`}>
            <Link
              href={ROUTES.about}
              className="group inline-flex items-center justify-center gap-1 bg-gradient-to-r from-brandBlue-900 to-brandBlue-500 text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition duration-300 text-sm sm:text-base md:text-lg"
            >
              Xem thêm
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
