import { X } from "lucide-react"
import Image from "next/image"
import ProblemAndSolutionCard from "./card/PAS-card"
interface CardItem {
  title: string;
  icon?: string;
  description: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
interface SectionData {
  type: 'problem' | 'solution'; // Dùng để xác định loại hiển thị
  img?: string;
  title: string;
  items: CardItem[]; // Mảng các thẻ con
}

interface PteProblemsAndSolutionProps {
  data: SectionData;
}
const PteProblemsAndSolution = ({ data }: PteProblemsAndSolutionProps) => {
  const {type, title,img, items}= data

//  console.log(data)

  if (!data) return null

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-200 py-16 px-4 overflow-hidden">
       <div className="container mx-auto max-w-7xl">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 text-center mb-16 px-4 leading-tight">
                  {title}
                </h1>

                {/* Main content area with image and cards */}
                <div className="relative flex justify-center items-center min-h-[600px] md:min-h-[700px]">
                  {/* Central image */}
                  <div className="relative z-10 w-full max-w-md mx-auto">
                    <Image
                      src={img || ""}
                      alt="Stressed student"
                      width={400}
                      height={600}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>

                  {/* Problem cards - stacked on mobile, positioned on desktop */}
                  <div className="md:absolute md:inset-0 flex flex-col gap-6 md:gap-0 mt-8 md:mt-0">
                    {items.map((item, index) => (
                      <ProblemAndSolutionCard
                        type={type}
                        key={index}
                        data={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
    </section>
  )
}

export default PteProblemsAndSolution
