"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Article {
  id: string
  category: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
  title: string
  description: string
}

const articles: Article[] = [
  {
    id: "1",
    category: "Listening",
    image: "/lecture-hall-with-students.jpg",
    author: {
      name: "create by author",
      avatar: "/professional-headshot.png",
    },
    date: "04 June 2023",
    title: "5 Exercises Basketball Players Should Be Using To Develop Strength",
    description:
      "This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles.",
  },
  {
    id: "2",
    category: "Reading",
    image: "/modern-library-with-large-windows.jpg",
    author: {
      name: "create by author",
      avatar: "/professional-headshot.png",
    },
    date: "03 June 2023",
    title: "Golden Knights out to fulfill owner's quest to win Stanley Cup in 6th year",
    description: "The Vegas Golden Knights will play the Florida Panthers in the Stanley Cup Final beginning Saturday.",
  },
  {
    id: "3",
    category: "Writing",
    image: "/students-on-outdoor-stairs.jpg",
    author: {
      name: "create by author",
      avatar: "/professional-headshot.png",
    },
    date: "01 June 2023",
    title: "'Outdoor' Badminton Gets Support From Local Federation",
    description:
      "The Badminton World Federation is developing Air Badminton and the country's governing body, Philippine Badminton Association.",
  },
]
interface PTETipProps {
  data?: any[]
}
const PTETip = ({ data }: PTETipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : articles.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < articles.length - 1 ? prev + 1 : 0))
  }
 if(!data || data.length === 0)  return null;
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative h-64 w-full">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                {item.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={item.authorAvatar || "/placeholder.svg"}
                  alt={item.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-gray-600">{item.authorName}</span>
            </div>

            <time className="text-sm text-gray-600 block mb-3">{item.date}</time>

            <h3 className="text-xl font-bold mb-3 leading-tight text-balance text-gray-900">{item.title}</h3>

            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PTETip