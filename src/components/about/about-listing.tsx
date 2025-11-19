import AboutPTEiPass from "@/components/about/about-pte-ipass";

import IPTEAudienceSection from "@/components/about/IPTEAudienceSection";
import MapSection from "@/components/about/map-section";
import MissionSection from "@/components/about/mission-section";
import PTEcosystem from "@/components/about/pte-ecosystem";
import { About, AboutItem } from "@/types/about";
import { PTEEcosystem } from "@/types/ecosystem";
import { FacilityGallery } from "./FacilityGallery";

interface AboutPageProps {
 data: AboutItem
}

const AboutListing = ({ 
 data
}: AboutPageProps) => {
  const dataEcosystem = data ? data.items.filter((i)=>i.category === "ABOUT_ME"): [];
  const dataBranches = data ? data.items.filter((i)=> i.category === "BRANCH") : [];
  const dataAudiences = data ? data.items.filter((i)=> i.category === "AUDIENCE"): [];
  return (
    <section>
        <AboutPTEiPass />
        <MissionSection />
        <IPTEAudienceSection data={dataAudiences} />
        <MapSection data={dataBranches}/>
        {/* <FacilitiesSection /> */}
        <FacilityGallery/>
        <PTEcosystem data={dataEcosystem as any} />
    </section>
  )
}

export default AboutListing