import { UserCheck, FileText, GraduationCap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: UserCheck,
      title: "Chuyên gia PTE có trình độ cao",
      description:
        "100% giảng viên là Tiến sĩ, Thạc sĩ và Cử nhân từ các trường đại học hàng đầu trên thế giới. Với 80% trong số đó được chính British Council và IDP đào tạo nghiệp vụ chấm thi PTE chuyên nghiệp.",
    },
    {
      icon: FileText,
      title: "Nghiệp vụ sư phạm",
      description:
        "Đội ngũ giảng viên sở hữu các chứng chỉ giảng dạy quốc tế uy tín như CELTA, TEFL, DELTA, TESOL. Đảm bảo chất lượng đào tạo và phương pháp sư phạm hiện đại, chuẩn hóa toàn cầu.",
    },
    {
      icon: GraduationCap,
      title: "Nhiều năm kinh nghiệm",
      description:
        "Các giảng viên có nhiều năm kinh nghiệm giảng dạy PTE cho học viên Việt Nam. Thành công đưa hàng nghìn học viên đạt band điểm PTE mong muốn.",
    },
  ]

  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-[#4338ca] md:text-4xl lg:text-5xl mb-16 text-balance">
          Đội ngũ giáo viên chuyên môn cao 100% đạt chứng chỉ PTE Trainer của Pearson
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-white p-4">
                <feature.icon className="h-16 w-16 text-[#4338ca]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#4338ca]">{feature.title}</h3>
              <p className="text-base leading-relaxed text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
