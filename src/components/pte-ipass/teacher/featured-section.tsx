import { UserCheck, FileText, GraduationCap } from "lucide-react"

type FeatureListProps = {
  data?: {
    icon: any;
    title: string;
    description: string;
  }[];
}

export function FeaturesSection({ data }: FeatureListProps) {
  if(!data || data.length === 0) return null;
  // strictly use only 3 icons
  const icons = [UserCheck, FileText, GraduationCap];

  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-[#4338ca] md:text-4xl lg:text-5xl mb-16 text-balance">
          Đội ngũ giáo viên chuyên môn cao 100% đạt chứng chỉ PTE Trainer của Pearson
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {data?.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-white p-4">
                  <Icon className="h-16 w-16 text-[#4338ca]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#4338ca]">{feature.title}</h3>
                <p className="text-base leading-relaxed text-foreground/80">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
