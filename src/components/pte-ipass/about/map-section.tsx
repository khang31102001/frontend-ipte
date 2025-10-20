"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { aboutMeService } from "@/services/about-me/newsService"

// interface Branch {
//   about_id: number
//   address: string
//   map_url: string
// }

// const branches: Branch[] = [
//   {
//     id: 1,
//     address: "50 Đường số 11, KDC Him Lam, Phường Tân Hưng, Quận 7, Tp.HCM",
//     map_url:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9544!2d106.7!3d10.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzQ4LjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1sen!2s!4v1234567890",
//   },
//   {
//     id: 2,
//     address: "04A Đông Xoài, Phường 13, Quận Tân Bình, Tp.HCM",
//     map_url:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2!2d106.65!3d10.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzI0LjAiTiAxMDbCsDM5JzAwLjAiRQ!5e0!3m2!1sen!2s!4v1234567890",
//   },
//   {
//     id: 3,
//     address: "33 Đ. số 7, Cityland Center Hills, Phường 7, Quận Gò Vấp, Tp.HCM",
//     map_url:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8!2d106.68!3d10.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ5JzEyLjAiTiAxMDbCsDQwJzQ4LjAiRQ!5e0!3m2!1sen!2s!4v1234567890",
//   },
// ]
const MapSection = (props: { branches: any[] }) => {

  const { branches } = props;
  const [selectedBranch, setSelectedBranch] = useState<any>(branches[0] ?? null);

  return (
    <section className="bg-[#3a3a3a] py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Addresses */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3">Các chi nhánh</h2>
            <div className="w-24 h-1 bg-[#fbbf24] mb-12" />

            <div className="space-y-6">
              {branches?.map((branch: any) => (
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
                src={selectedBranch.map_url}
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
