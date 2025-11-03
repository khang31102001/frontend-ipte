"use client"
import { useState } from "react"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { About } from "@/types/about"
interface MapSectionProps{
  data?: About[]
}
const MapSection = ({
  data = []
}:MapSectionProps) => {
  const [selectedBranch, setSelectedBranch] = useState<About>(data[0] ?? null);
  if(!data || data.length === 0) return null;
  return (
    <section className="bg-[#3a3a3a] py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Addresses */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3">Các chi nhánh</h2>
            <div className="w-24 h-1 bg-[#fbbf24] mb-12" />

            <div className="space-y-6">
              {data?.map((branch: any) => (
                <button
                  key={branch.about_id}
                  onClick={() => setSelectedBranch(branch)}
                  className={cn(
                    "flex items-start gap-4 text-left w-full p-4 rounded-lg transition-all",
                    "hover:bg-white/5",
                    selectedBranch.about_id === branch.about_id && "bg-white/10",
                  )}
                >
                  <MapPin
                    className={cn(
                      "w-6 h-6 flex-shrink-0 mt-1 transition-colors",
                      selectedBranch.about_id === branch.about_id ? "text-[#fbbf24]" : "text-[#fbbf24]/70",
                    )}
                  />
                  <span
                    className={cn(
                      "text-base lg:text-lg transition-colors",
                      selectedBranch.about_id === branch.about_id ? "text-white" : "text-white/80",
                    )}
                  >
                    {branch.address}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Map */}
          <div className="relative">
            <div className="border-4 border-dashed border-[#fbbf24] rounded-lg overflow-hidden aspect-[4/3]">
              <iframe
                key={selectedBranch.about_id}
                src={selectedBranch.map_url ?? "#"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default MapSection
