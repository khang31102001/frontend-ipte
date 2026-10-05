"use client";

import { Children, type ReactNode, type RefObject } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type NavRef = RefObject<HTMLElement | null>;

interface CustomSwiperProps {
  children: ReactNode;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  autoplay?: boolean;
  loop?: boolean;
  navigation?: boolean | { prevEl?: NavRef; nextEl?: NavRef };
  pagination?: boolean;
  className?: string;
  breakpoint?: Record<number, { slidesPerView?: number; spaceBetween?: number }>;
}

const CustomSwiper = ({
  children,
  slidesPerView = 4,
  spaceBetween,
  autoplay = false,
  loop = false,
  navigation = false,
  pagination = false,
  className = "",
  breakpoint,
}: CustomSwiperProps) => {
  const slides = Children.toArray(children);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      autoplay={autoplay ? { delay: 2500, disableOnInteraction: false } : false}
      breakpoints={breakpoint}
      navigation={typeof navigation === "boolean" ? navigation : { prevEl: navigation.prevEl?.current ?? undefined, nextEl: navigation.nextEl?.current ?? undefined }}
      pagination={pagination ? { clickable: true } : false}
      onBeforeInit={(swiper) => {
        // Nút điều hướng là ref ngoài Swiper: gán trước khi init để Swiper bắt sự kiện.
        const params = swiper.params.navigation;
        if (typeof navigation !== "boolean" && params && typeof params !== "boolean") {
          params.prevEl = navigation.prevEl?.current ?? null;
          params.nextEl = navigation.nextEl?.current ?? null;
        }
      }}
      onSwiper={(swiper) => {
        // Defer để React gán xong ref rồi mới khởi tạo navigation.
        setTimeout(() => {
          if (!swiper.navigation || swiper.destroyed) return;
          try {
            swiper.navigation.init();
            swiper.navigation.update();
          } catch (error) {
            console.warn("Swiper navigation init error", error);
          }
        }, 0);
      }}
      className={`w-full ${className}`}
    >
      {slides.map((child, index) => (
        <SwiperSlide key={index} className="!flex !justify-center !items-stretch !py-4">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
