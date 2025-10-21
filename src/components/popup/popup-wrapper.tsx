"use client"
import React, { ReactNode, useEffect } from "react";

interface PopperWrapperProps {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}

const PopupWrapper: React.FC<PopperWrapperProps> = ({
    children,
    className,
    onClose
}) => {
    //  Đóng popup khi nhấn ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    //  Khóa cuộn nền khi popup mở
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) return onClose?.();
            }}
            className={className}
        >
            <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl
                   outline-none ring-1 ring-black/5
                   animate-[fadeIn_150ms_ease-out,scaleIn_150ms_ease-out]
                   focus-visible:ring-2 focus-visible:ring-amber-400"
            >
                {children}

            </div>
        </div>
    )
};

export default PopupWrapper;
