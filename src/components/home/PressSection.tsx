"use client"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules";
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

export default function PressSection() {
  const mediaLogos = [
    {
      name: "Thanh Hóa",
      logo: "/images/bao-thanh-hoa.png",
    },
    {
      name: "Hanoi moi",
      logo: "/images/bao-ha-noi-moi.png",
    },
    {
      name: "Bao Phu Tho",
      logo: "/images/bao-phu-tho.png",
    },
    {
      name: "Thai Nguyen",
      logo: "/images/bao-thai-nguyen.png",
    },
    {
      name: "Thai Nguyen",
      logo: "/images/bao-thai-nguyen.png",
    },
    {
      name: "Thai Nguyen",
      logo: "/images/bao-thai-nguyen.png",
    },
    {
      name: "Thai Nguyen",
      logo: "/images/bao-thai-nguyen.png",
    },
    {
      name: "Thai Nguyen",
      logo: "/images/bao-thai-nguyen.png",
    },
    {
      name: "Thai Nguyen",
      logo: "/images/bao-thai-nguyen.png",
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-8">
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Main heading */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4">
              <span className="text-brandBlue-900">Báo chí viết về </span>
              <span className="text-amber-500">chúng tôi</span>
            </h2>
            {/* Decorative underline */}
            <div className="flex justify-center">
              <svg width="120" height="20" viewBox="0 0 120 20" className="text-amber-500" fill="none">
                <path
                  d="M5 15C20 5, 40 5, 60 10C80 15, 100 5, 115 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Media logos grid */}
          <div className="w-full px-4 py-6 overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3 }, // sm
                768: { slidesPerView: 4 }, // md
                1024: { slidesPerView: 5 }, // lg
                1280: { slidesPerView: 6 }, // xl
              }}
              className="py-6"
            >
              {mediaLogos.map((media, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center p-6 bg-white rounded-xl w-full h-[100px] shadow-sm">
                    <Image
                      src={media.logo || "/placeholder.svg"}
                      alt={`${media.name} logo`}
                      width={240}
                      height={80}
                      className="max-w-full max-h-full object-contain  transition-all duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

    </section>
  )
}
