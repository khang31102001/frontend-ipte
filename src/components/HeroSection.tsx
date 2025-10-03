import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <section className="relative w-full">
            <div className="w-full">
                <Image
                    src="/images/banner_home.png"
                    alt="PTE Hero Banner"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                    priority
                />
            </div>
        </section>
    )
}

export default HeroSection