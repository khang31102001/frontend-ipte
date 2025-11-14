import exp from "constants"
import Image from "next/image"

interface StoryCard {
  id: number
  image: string
  alt: string
}

interface StoriesSectionProps {
  title?: string
  description?: string
  stories?: StoryCard[]
}

const  StoriesSection =({
  title = "Những câu chuyện truyền cảm hứng",
  description = "Khám phá hành trình thành công của các học viên đã đạt điểm cao cùng iPTEPASS.",
  stories = []
}: StoriesSectionProps)=> {

  if (!stories || stories.length === 0) return null;
  return (
    <section className="w-full bg-gradient-to-b from-purple-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 text-pretty">
           {title}
          </h2>
          <p className="text-lg text-blue-600">{description}</p>
        </div>

        {/* Grid of Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <Image
                src={story.image || "/placeholder.svg"}
                alt={story.alt}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2">
            Xem thêm
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default StoriesSection