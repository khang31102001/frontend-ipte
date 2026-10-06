// home-banner.tsx
import React from 'react'
import Image from 'next/image'

type ContentItem = {
    text: string
}

type OptionItem = {
    label: string
}

export type HomeBannerProps = {
    title: string
    description: string
    content: ContentItem[] // 4 dòng checklist
    options: OptionItem[] // row trắng phía dưới
}

export default function HomeBanner({
    title,
    description,
    content,
    options,
}: HomeBannerProps) {
    return (
        <section className="w-full bg-gradient-to-r from-[#FFC600] to-[#FFB800]">
            <div
                className="mx-auto py-6 sm:w-[var(--width-container-sm)] md:w-[var(--width-container-md)] lg:w-[var(--width-container-lg)] xl:w-[var(--width-container-xl)] sm:px-[var(--padding-x-container-sm)] md:px-[var(--padding-x-container-md)] lg:px-[var(--padding-x-container-lg)] xl:px-[var(--padding-x-container-xl)]"
            >
                <div className="grid sm:gap-5 md:gap-10 md:grid-cols-2 md:items-center">
                    {/* LEFT */}
                    <div>
                        <h1 className="font-extrabold text-[#2E1B7A] sm:text-3xl md:text-5xl">
                            {title}
                        </h1>

                        <p className="mt-3 font-semibold text-white sm:text-2xl md:text-3xl">
                            {description}
                        </p>

                        {/* underline decor */}
                        <div className="mt-2 h-6 w-40">
                            <svg viewBox="0 0 180 30" fill="none">
                                <path
                                    d="M10 18C35 26 55 6 80 14C103 22 115 24 145 14C160 9 170 14 175 18"
                                    stroke="#2E1B7A"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* CONTENT – 4 dòng */}
                        <ul className="mt-6 space-y-3">
                            {content.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-white"
                                >
                                    <span className="md:mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="h-5 w-5 text-[#2E1B7A]"
                                        >
                                            <path
                                                d="M5 10l3 3 7-7"
                                                stroke="currentColor"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>

                                    <span className="leading-relaxed text-[#2E1B7A] sm:text-xl md:text-2xl font-semibold">
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT – placeholder image */}
                    <div className="flex justify-center md:justify-end">
                        <div className="h-48 w-full max-w-md rounded-2xl bg-white/20 md:h-64">
                            <Image
                                src="/images/img-comunity.png"
                                alt="Banner Illustration"
                                width={400}
                                height={300}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* OPTIONS – bottom row */}
                <div className="mt-12 rounded-xl bg-white px-4 py-3">
                    <div className="grid grid-cols-2 gap-4 text-sm text-[#2E1B7A] sm:grid-cols-4">
                        {options.map((opt, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 font-semibold text-xl"
                            >
                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        className="h-5 w-5 text-[#2E1B7A]"
                                    >
                                        <path
                                            d="M5 10l3 3 7-7"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
