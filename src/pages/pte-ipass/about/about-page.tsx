import AboutPTEiPass from "@/components/pte-ipass/about/about-pte-ipass";
// import FacilitiesSection from "@/components/pte-ipass/about/facilities-section";
import IPTEAudienceSection from "@/components/pte-ipass/about/IPTEAudienceSection";
import MapSection from "@/components/pte-ipass/about/map-section";
import MissionSection from "@/components/pte-ipass/about/mission-section";
import PTEcosystem from "@/components/pte-ipass/about/pte-ecosystem";
import { About } from "@/types/about";
import { PTEEcosystem } from "@/types/ecosystem";

interface AboutPageProps {
  dataEcosystem?: PTEEcosystem[];
  branches?: About[];
}

const AboutPage = ({ 
  dataEcosystem, branches
}: AboutPageProps) => {
  return (
    <div className='bg-background text-foreground'>
        <AboutPTEiPass />
        <MissionSection />
        <IPTEAudienceSection />
        <MapSection data={branches ?? []}/>
        {/* <FacilitiesSection /> */}
        <PTEcosystem data={dataEcosystem ?? []} />
       
    </div>
  )
}

export default AboutPage