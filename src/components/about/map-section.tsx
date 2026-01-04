"use client"
import { useState } from "react"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { IAbout } from "@/types/about";


interface LocationInforProps {
  data: IAbout[] | [];
  backgroundImage?: string;
}
const MapSection = ({
  data = [],
  backgroundImage = "/images/bg/bg-map-section.png"
}: LocationInforProps) => {
  const [selectedBranch, setSelectedBranch] = useState<IAbout>(data[0] ?? null);

  const styleBackground = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

  };
  if (!data || data.length === 0) return null;
  return (

    <section className="branches section sm:section--sm lg:section--lg bg-slate-700 " >
      <div className="branches__container">
        <div className="branches__grid">
          {/* Left side - Addresses */}
          <div className="branches__left">
            <h2 className="branches__title">Các chi nhánh</h2>
            <div className="branches__underline" />

            <div className="branches__list">
              {data?.map((branch, index) => (
                <button
                  key={branch.aboutId ?? index}
                  onClick={() => setSelectedBranch(branch)}
                  className={cn(
                    "branches__item",
                    selectedBranch.aboutId === branch.aboutId && "branches__item--active",
                  )}
                >
                  <MapPin className="branches__icon" />

                  <span className="branches__address">
                    {branch.address}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Map */}
          <div className="branches__right">
            <div className="branches__map-frame">
              <iframe
                key={selectedBranch.aboutId}
                src={selectedBranch.mapUrl ?? "#"}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="branches__map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
