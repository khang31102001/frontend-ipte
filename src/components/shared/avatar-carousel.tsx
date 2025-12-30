"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type AvatarItem = {
    id: number | string;
    name: string;
    image?: string | null;
};

type AvatarCarouselProps = {
    items: AvatarItem[];
    selectedId?: AvatarItem["id"];
    onSelect?: (id: AvatarItem["id"]) => void;

    /** UI */
    itemSize?: number; // px, default 64
    gap?: number; // px, default 8
    className?: string;

    /** Behavior */
    scrollStep?: "item" | "page"; // default "page"
    autoScrollToSelected?: boolean; // default true
};

export default function AvatarCarousel({
    items,
    selectedId,
    onSelect,
    itemSize = 64,
    gap = 8,
    className = "",
    scrollStep = "page",
    autoScrollToSelected = true,
}: AvatarCarouselProps) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const itemPx = itemSize + gap;

    const updateNavState = () => {
        const el = trackRef.current;
        if (!el) return;

        // nhỏ xíu để tránh lỗi float
        const atStart = el.scrollLeft <= 1;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        setCanPrev(!atStart);
        setCanNext(!atEnd);
    };

    const stepPx = useMemo(() => {
        const el = trackRef.current;
        if (!el) return itemPx * 4;

        if (scrollStep === "item") return itemPx;
        // "page": scroll gần bằng chiều rộng container để cảm giác giống swiper
        return Math.max(el.clientWidth - itemPx, itemPx * 3);
    }, [scrollStep, itemPx]);

    const scrollByPx = (delta: number) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: delta, behavior: "smooth" });
    };

    // cập nhật trạng thái nút khi scroll/resize
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        updateNavState();
        const onScroll = () => updateNavState();

        el.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(() => updateNavState());
        ro.observe(el);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
        };
    }, []);

    // auto scroll tới item đang chọn
    useEffect(() => {
        if (!autoScrollToSelected) return;
        if (!selectedId) return;

        const el = trackRef.current;
        if (!el) return;

        const selected = el.querySelector<HTMLElement>(`[data-id="${String(selectedId)}"]`);
        selected?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, [selectedId, autoScrollToSelected]);

    // drag to scroll (mượt, không cần library)
    // useEffect(() => {
    //     const el = trackRef.current;
    //     if (!el) return;

    //     let isDown = false;
    //     // let isDragging = false;
    //     let startX = 0;
    //     let startLeft = 0;

    //     const onPointerDown = (e: PointerEvent) => {
    //         isDown = true;
    //         // isDragging = false;
    //         startX = e.clientX;
    //         startLeft = el.scrollLeft;
    //         el.setPointerCapture(e.pointerId);
    //     };

    //     const onPointerMove = (e: PointerEvent) => {
    //         if (!isDown) return;
    //         const dx = e.clientX - startX;
    //         if (Math.abs(dx) > 6) isDragging = true; // threshold
    //         el.scrollLeft = startLeft - dx;
    //     };

    //     const onPointerUp = (e: PointerEvent) => {
    //         isDown = false;
    //         try { el.releasePointerCapture(e.pointerId); } catch { }
    //     };
    //     el.addEventListener("pointerdown", onPointerDown);
    //     el.addEventListener("pointermove", onPointerMove);
    //     el.addEventListener("pointerup", onPointerUp);
    //     el.addEventListener("pointercancel", onPointerUp);

    //     return () => {
    //         el.removeEventListener("pointerdown", onPointerDown);
    //         el.removeEventListener("pointermove", onPointerMove);
    //         el.removeEventListener("pointerup", onPointerUp);
    //         el.removeEventListener("pointercancel", onPointerUp);
    //     };
    // }, []);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                type="button"
                onClick={() => scrollByPx(-stepPx)}
                disabled={!canPrev}
                aria-label="Previous"
                className="rounded-full text-white hover:bg-white/30 bg-transparent p-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {/* bạn có thể thay icon ở parent */}
                <span className="sr-only">Prev</span>
                <ChevronLeft className="h-8 w-8" />
            </button>

            <div
                ref={trackRef}
                className="flex-1 overflow-x-auto scroll-smooth no-scrollbar select-none"
                style={{
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-x",
                }}
            >
                <div
                    className="flex items-center"
                    style={{
                        gap,
                        paddingBottom: 2,
                        scrollSnapType: "x mandatory",
                    }}
                >
                    {items.map((item) => {
                        const isActive = item.id === selectedId;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                data-id={String(item.id)}
                                onClick={() => onSelect?.(item.id)}
                                className={`relative rounded-full overflow-hidden shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                                    }`}
                                style={{
                                    width: itemSize,
                                    height: itemSize,
                                    scrollSnapAlign: "center",
                                }}
                                aria-label={item.name}
                            >
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    sizes={`${itemSize}px`}
                                    className="object-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            </div>

            <button
                type="button"
                onClick={() => scrollByPx(stepPx)}
                disabled={!canNext}
                aria-label="Next"
                className="rounded-full text-white hover:bg-white/30 bg-transparent p-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-8 w-8" />
            </button>
        </div>
    );
}
