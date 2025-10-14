import { X } from "lucide-react"
import Image from "next/image"

interface ProblemCardProps {
  title: string
  description: string
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

function ProblemCard({ title, description, position }: ProblemCardProps) {
  const positionClasses = {
    "top-left": "md:absolute md:top-8 md:left-8 lg:left-16",
    "top-right": "md:absolute md:top-8 md:right-8 lg:right-16",
    "bottom-left": "md:absolute md:bottom-8 md:left-8 lg:left-16",
    "bottom-right": "md:absolute md:bottom-8 md:right-8 lg:right-16",
  }

  const borderClasses = {
    "top-left": "border-2 border-purple-600",
    "top-right": "border-2 border-purple-600",
    "bottom-left": "border-2 border-orange-400",
    "bottom-right": "border-2 border-orange-400",
  }

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg max-w-sm ${positionClasses[position]} ${borderClasses[position]}`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-2 leading-tight">{title}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function PteProblemsSection() {
  const problems = [
    {
      title: "Không biết bắt đầu từ đâu",
      description: "Kiến thức IELTS rộng lớn, tài liệu lại quá nhiều, cần 1 lộ trình hiệu quả.",
      position: "top-left" as const,
    },
    {
      title: "Kẹt band, mất động lực",
      description: "Làm đề liên tục nhưng không tăng band, không tự tin đi thi, chán nản, muốn bỏ cuộc.",
      position: "top-right" as const,
    },
    {
      title: "Không ai theo sát, dễ bỏ cuộc",
      description: "Tự học không ai nhắc nhở, không ai chỉnh lỗi, không biết học đúng hay sai.",
      position: "bottom-left" as const,
    },
    {
      title: "Phương pháp học chưa hiệu quả",
      description:
        'Học tích lũy kiểu cũ thì quá tốn sức mà không hiệu quả; học mẹo học tủ thì gặp đề lạ, khó là "tạch band".',
      position: "bottom-right" as const,
    },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-200 py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 text-center mb-16 px-4 leading-tight">
          Vấn đề học viên PTE thường gặp phải
        </h1>

        {/* Main content area with image and cards */}
        <div className="relative flex justify-center items-center min-h-[600px] md:min-h-[700px]">
          {/* Central image */}
          <div className="relative z-10 w-full max-w-md mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171274865-OvoJMTmqJQfAjNEuaDHDO1in8UbPP2.png"
              alt="Stressed student"
              width={400}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Problem cards - stacked on mobile, positioned on desktop */}
          <div className="md:absolute md:inset-0 flex flex-col gap-6 md:gap-0 mt-8 md:mt-0">
            {problems.map((problem, index) => (
              <ProblemCard
                key={index}
                title={problem.title}
                description={problem.description}
                position={problem.position}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
