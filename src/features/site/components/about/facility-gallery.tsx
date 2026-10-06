"use client";
import Image from "next/image";
import { useState } from "react";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import ImageLightbox from "../ui/image-lightbox";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface FacilityGalleryProps {
  heading?: string;
  description?: string;
  images: GalleryImage[];
}

export const FacilityGallery = ({ heading, description, images }: FacilityGalleryProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <Section className="facility-gallery">
      <PageContent>
        <div className="facility-gallery__header">
          {heading && <h2 className="facility-gallery">{heading}</h2>}
          {description && <p>{description}</p>}
        </div>

        <div className="facility-gallery__grid">
          {images.map((img, index) => (
            <div className="facility-gallery__item" key={img.src}>
              <button onClick={() => setSelected(index)} className="facility-gallery__btn" aria-label={`Xem ảnh: ${img.alt}`}>
                <Image src={img.src} alt={img.alt} width={800} height={600} className="facility-gallery__image" />
              </button>
            </div>
          ))}
        </div>

        {selected !== null && <ImageLightbox images={images.map((img, id) => ({ id, ...img }))} currentIndex={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />}
      </PageContent>
    </Section>
  );
};
