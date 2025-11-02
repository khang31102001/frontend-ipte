"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { PTETips } from "@/types/PTETips"

interface PTETipProps {
  data?: PTETips[]
}
const PTETip = ({ data }: PTETipProps) => {
  // const [currentIndex, setCurrentIndex] = useState(0)

  // const handlePrevious = () => {
  //   setCurrentIndex((prev) => (prev > 0 ? prev - 1 : articles.length - 1))
  // }

  // const handleNext = () => {
  //   setCurrentIndex((prev) => (prev < articles.length - 1 ? prev + 1 : 0))
  // }
  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative h-64 w-full">
            <Image src={item.image || "/placeholder.svg"} alt={item.title ?? "pte ipass"} fill className="object-cover" />
            {item.category && (
              <div className="absolute top-4 left-4">
                <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>
            )}

          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title ?? "pte ipass"}
                  fill
                  className="object-cover"
                />
              </div>
              {item.authorname &&(
                <span className="text-sm text-gray-600">{item.authorname}</span>
              )}
              
            </div>

            <time className="text-sm text-gray-600 block mb-3">20/10/2025</time>

            <h3 className="text-xl font-bold mb-3 leading-tight text-balance text-gray-900">{item.title}</h3>

            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PTETip