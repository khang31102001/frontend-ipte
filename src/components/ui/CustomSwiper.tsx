"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type NavRef = React.RefObject<HTMLElement>;
interface CustomSwiperProps {
    children: React.ReactNode; // thay items bằng children
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
    slidesPerView,
    spaceBetween,
    autoplay = false,
    loop = false,
    navigation = false,
    pagination = false,
    className = "",
    breakpoint
}: CustomSwiperProps) => {
    // Nếu children là array thì map, nếu không thì bọc 1 cái
    const slides = Array.isArray(children) ? children : [children];

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            loop={loop}
            autoplay={autoplay ? { delay: 2500, disableOnInteraction: false } : false}
            breakpoints={breakpoint}
            navigation={
                typeof navigation == "boolean"
                    ? navigation
                    : {
                        prevEl: navigation?.prevEl?.current ?? undefined,
                        nextEl: navigation?.nextEl?.current ?? undefined,
                    }
            }
            pagination={pagination ? { clickable: true } : false}
            onBeforeInit={(swiper: any) => {
                // Nếu navigation là object refs, gán trực tiếp cho swiper.params trước init
                if (typeof navigation !== "boolean" && navigation) {
                    swiper.params.navigation.prevEl = navigation.prevEl?.current;
                    swiper.params.navigation.nextEl = navigation.nextEl?.current;
                }
            }}
            onSwiper={(swiper) => {
                // đảm bảo init/update navigation sau khi DOM đã mount
                // setTimeout 0 để defer cho React set refs hoàn tất
                setTimeout(() => {
                    if (swiper.navigation) {
                        try {
                            swiper.navigation.init();
                            swiper.navigation.update();
                        } catch (e) {
                            // safe guard
                            // console.warn("Swiper navigation init error", e);
                        }
                    }
                }, 0);
            }}
            className={`w-full ${className}`}

        >
            {slides.map((child, index) => (
                <SwiperSlide key={index} className="!flex !justify-center !items-stretch !px-2 !py-6">
                    <div className="w-full h-full ">{child}</div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CustomSwiper;
