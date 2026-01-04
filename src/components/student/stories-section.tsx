import { IMediaItem } from "@/types/media"
import exp from "constants"
import { ArrowRight } from "lucide-react"
import Image from "next/image"


interface StoriesSectionProps {
  title?: string
  description?: string
  stories?: IMediaItem[]
}

const  StoriesSection =({
  title = "Những câu chuyện truyền cảm hứng",
  description = "Khám phá hành trình thành công của các học viên đã đạt điểm cao cùng iPTEPASS.",
  stories = []
}: StoriesSectionProps)=> {

  if (!stories || stories.length === 0) return null;
  return (
    <section className="w-full section sm:section--sm lg:section--lg bg-gradient-to-b from-purple-50 to-blue-50 ">
      <div className="mx-auto w-full max-w-6xl px-4 8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-hero-gradient mb-2 text-pretty min-h-16">
           {title}
          </h2>
          <p className="text-lg text-hero-gradient min-h-8">{description}</p>
        </div>

        {/* Grid of Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <Image
                src={story?.imageUrl || "/placeholder.svg"}
                alt={story?.imageName ?? "PTE IPASS"}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <button className="bg-hero-gradient hover:opacity-90 text-white rounded-full font-semibold">
            <a href="#" className="w-full px-8 py-3 flex items-center gap-2">
              Xem thêm
              <span className="text-lg"><ArrowRight className="ml-3 w-4 h-4"/></span>
            </a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default StoriesSection