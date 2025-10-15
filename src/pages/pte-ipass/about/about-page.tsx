import AboutPTEiPass from "@/components/pte-ipass/about/about-pte-ipass";
import FacilitiesSection from "@/components/pte-ipass/about/facilities-section";
import IPTEAudienceSection from "@/components/pte-ipass/about/IPTEAudienceSection";
import MapSection from "@/components/pte-ipass/about/map-section";
import MissionSection from "@/components/pte-ipass/about/mission-section";
import PTEcosystem from "@/components/pte-ipass/about/pte-ecosystem";
import { PTEEcosystem } from "@/types/ecosystem";

interface AboutPageProps {
  dataEcosystem?: PTEEcosystem[];
}

const AboutPage = ({ 
  dataEcosystem 
}: AboutPageProps) => {
  return (
    <div className='bg-background text-foreground'>
        <AboutPTEiPass />
        <MissionSection />
        <IPTEAudienceSection />
        <MapSection />
        {/* <FacilitiesSection /> */}
        <PTEcosystem data={dataEcosystem ?? []} />
       
    </div>
  )
}

export default AboutPage