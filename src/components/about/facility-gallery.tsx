"use client"
import { useState } from "react";
import ImageLightbox from "../ui/image-lightbox";

interface FacilityGalleryProps {
    title?: string;
    desc?: string;
    imgItems?: any[];
}

const images = [
  {
    id: 1,
    src: "/images/facility-1.jpg",
    alt: "Student studying with flashcards",

  },
  {
    id: 2,
    src: "/images/facility-2.jpg",
    alt: "Teacher at whiteboard",

  },
  {
    id: 3,
    src:   "/images/facility-3.jpg",
    alt: "Student working on laptop",

  },
  {
    id: 4,
    src: "/images/facility-4.jpg",
    alt: "Person writing notes",

  },
  
]
export const FacilityGallery = ({
    title = "Cơ sở vật chất",
    desc,
    imgItems

}: FacilityGalleryProps) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  return (
    <section className="facility-gallery">
      <div className="facility-gallery__header">
        <h2 className="facility-gallery">{title}</h2>
        <p>
         {desc}
        </p>
      </div>

      <div className="facility-gallery__grid">
        {images.map((img, index) => (
          <div className="facility-gallery__item" key={index}>
            <button onClick={()=>setSelectedImageIndex(index)} className="facility-gallery__btn">
                <img src={img.src} alt={`facility-${index}`} />
            </button>
          </div>
        ))}
      </div>
      {selectedImageIndex !== null && (
              <ImageLightbox
                images={images}
                currentIndex={selectedImageIndex}
                onClose={() => setSelectedImageIndex(null)}
                onNavigate={setSelectedImageIndex}
              />
            )}
    </section>
  );
};
