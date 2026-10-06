"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import type { PublicBranch } from "@/features/public-api";
import { toGoogleMapsEmbedUrl } from "../../lib/helper";
import { cn } from "../../lib/utils";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";

interface MapSectionProps {
  branches: PublicBranch[];
}

const MapSection = ({ branches }: MapSectionProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(branches[0]?.id);
  const selected = useMemo(() => branches.find((b) => b.id === selectedId) ?? branches[0], [branches, selectedId]);
  const embedUrl = useMemo(() => toGoogleMapsEmbedUrl(selected?.mapUrl ?? selected?.address), [selected]);

  if (!selected) return null;

  return (
    <Section className="branches bg-slate-700">
      <PageContent>
        <div className="branches__grid">
          <div className="branches__left">
            <h2 className="branches__title">Các chi nhánh</h2>
            <div className="branches__underline" />
            <div className="branches__list">
              {branches.map((branch) => (
                <button key={branch.id} onClick={() => setSelectedId(branch.id)} className={cn("branches__item", selected.id === branch.id && "branches__item--active")}>
                  <MapPin className="branches__icon" />
                  <span className="branches__address">{branch.address}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="branches__right">
            <div className="branches__map-frame">
              <div className="branches__info">
                <div className="branches__info-title">{selected.name}</div>
                {selected.openingHours && <div className="branches__info-desc">{selected.openingHours}</div>}
                <div className="branches__info-list">
                  <a className="branches__info-row" href={`tel:${selected.phone.replace(/\s/g, "")}`}>
                    <Phone size={12} />
                    <span>Phone: {selected.phone}</span>
                  </a>
                  {selected.email && (
                    <a className="branches__info-row" href={`mailto:${selected.email}`}>
                      <Mail size={16} />
                      <span>{selected.email}</span>
                    </a>
                  )}
                </div>
              </div>
              <iframe key={selected.id} src={embedUrl} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="branches__map" title={`Bản đồ ${selected.name}`} />
            </div>
          </div>
        </div>
      </PageContent>
    </Section>
  );
};

export default MapSection;
