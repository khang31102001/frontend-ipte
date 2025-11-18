// app/components/HeroImage.tsx
import Image from "next/image";

type Position = "center" | "top" | "bottom" | "left" | "right";
type Preset = "soft" | "cinematic" | "warm" | "cool" | "mono";

interface HeroImageProps {
    src: string;
    alt?: string;                    // nếu ảnh trang trí: để "" (empty)
    objectPosition?: Position;       // crop focus
    heightClass?: string;            // điều khiển chiều cao hero: VD "min-h-[56vh]"
    preset?: Preset;                 // chọn filter nhanh
    priority?: boolean;
    className?: string;
}

const FILTERS: Record<Preset, string> = {
    // nhẹ nhàng, tăng chi tiết
    soft: "brightness-[0.9] contrast-110 saturate-110",
    // cinematic nhẹ + làm tối viền từ overlay (ở dưới)
    cinematic: "brightness-[0.85] contrast-115 saturate-[1.05]",
    // tone ấm
    warm: "brightness-[0.92] contrast-110 saturate-[1.15] hue-rotate-[10deg]",
    // tone mát
    cool: "brightness-[0.92] contrast-110 saturate-[1.1] hue-rotate-[-8deg]",
    // đơn sắc sang
    mono: "brightness-[0.9] contrast-[1.2] saturate-0",
};

const HeroImage = ({
    src,
    alt = "",
    objectPosition = "center",
    heightClass = "",
    preset = "warm",
    priority = true,
    className = "",
}: HeroImageProps) => {
    const objectPositionCss =
        objectPosition === "top" ? "top" :
            objectPosition === "bottom" ? "bottom" :
                objectPosition === "left" ? "left" :
                    objectPosition === "right" ? "right" : "center";

    return (
        <section className={`relative w-full ${heightClass} ${className}`}>
            {/* Ảnh nền full-bleed */}
            <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                priority={priority}
                style={{ objectFit: "fill", objectPosition: objectPositionCss }}
                className={FILTERS[preset]}
            />
        </section>
    );
};

export default HeroImage;
