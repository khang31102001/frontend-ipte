import PTETip from '@/components/pte-ipass/news/pte-tip'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface NewsTipListProps {
  data?: any[]
}

const NewsTipList = ({ data }: NewsTipListProps) => {

  if (!data || data.length === 0) return null;
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#5B4FE8]">Mẹo đạt PTE cao</h2>

        <PTETip data={data} />

        <div className="flex justify-center gap-4">
          <button

            className="rounded-full h-12 w-12 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
            aria-label="Previous articles"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button

            className="rounded-full h-12 w-12 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
            aria-label="Next articles"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewsTipList