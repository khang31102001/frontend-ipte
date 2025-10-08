import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Tab {
    id: string | number;
    label: string;
}

interface TabScrollProps {
    tabs: Tab[];
    navigation: boolean,
    activeTab?: string | number;
    setActiveTab?: (id: string | number) => void;
}

const TabScroll = ({ tabs, navigation=false }: TabScrollProps) => {
    const scrollRef = useRef<HTMLUListElement | null>(null);
    const [activeTab, setActiveTab] = useState<number | string>("writing");
    const onMouseDown = (e: React.MouseEvent) => {
        const slider = scrollRef.current;
        if (!slider) return;

        const startX = e.pageX - slider.offsetLeft;
        const scrollLeft = slider.scrollLeft;

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2; // tốc độ kéo
            slider.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div className="flex items-center justify-center mb-12">
            {/* Left Arrow */}
            {navigation && (
                <button className="hidden md:inline-flex mr-4 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-4">
                    <ChevronLeft className="h-5 w-5" />
                </button>
            )}

            {/* Tabs */}
            <ul
                ref={scrollRef}
                onMouseDown={onMouseDown}
                className="
                flex gap-2 overflow-x-auto md:overflow-x-visible 
                snap-x snap-mandatory
                no-scrollbar
                px-2 md:px-0
                max-w-full md:max-w-none
                cursor-grab active:cursor-grabbing
                "
            >
                {tabs.map((tab) => (
                    <li key={tab.id} className="flex-shrink-0 snap-start">
                        <button
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                rounded-tl-sm rounded-tr-sm font-medium transition-all
                                text-sm md:text-base lg:text-lg
                                px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-3
                                flex-1 md:flex-none text-center
                                ${activeTab === tab.id
                                                    ? "bg-brandBlue-500 text-white hover:bg-brandBlue-900"
                                                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Right Arrow */}
            {navigation && (
                <button className="hidden md:inline-flex ml-4 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-4">
                    <ChevronRight className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};

export default TabScroll;
