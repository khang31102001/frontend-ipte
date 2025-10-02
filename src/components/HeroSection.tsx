import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <section 
        className="relative w-full border-b border-gray-200 overflow-hidden 
        h-60 sm:h-[400px] md:h-[500px] lg:h-[650px] xl:h-[700px] 2xl:h-[1080px]"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/banner_home.png"
                    alt="Hero banner"
                    className="h-full w-full object-cover object-center"
                    fill
                    priority
                />
            </div>
        </section>
    )
}

export default HeroSection