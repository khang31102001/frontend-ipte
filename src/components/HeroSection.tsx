import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <div className="relative w-full h-[780px]">
            <Image
                src="/images/banner_home.png"
                alt="Hero Banner"
                fill
                priority
                className="object-cover"
            />
        </div>
    )
}

export default HeroSection