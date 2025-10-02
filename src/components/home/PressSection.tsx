import Image from "next/image"

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
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-8">

        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Main heading */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4">
              <span className="text-indigo-600">Báo chí viết về </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {mediaLogos.map((media, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded  w-full max-w-[250px] h-[100px]"
              >
                <Image
                  src={media.logo || "/placeholder.svg"}
                  alt={`${media.name} logo`}
                  width={240}
                  height={80}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
