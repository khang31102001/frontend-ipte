import AboutPTEiPass from "@/components/pte-ipass/about/about-pte-ipass";
import FacilitiesSection from "@/components/pte-ipass/about/facilities-section";
import IPTEAudienceSection from "@/components/pte-ipass/about/IPTEAudienceSection";
import MapSection from "@/components/pte-ipass/about/map-section";
import MissionSection from "@/components/pte-ipass/about/mission-section";

interface AboutPageProps {
  data?: any[];
}

const AboutPage = ({ data }: AboutPageProps) => {
  return (
    <div className='bg-background text-foreground'>
        <AboutPTEiPass />
        <MissionSection />
         <IPTEAudienceSection />
        <MapSection />
        <FacilitiesSection />
       
    </div>
  )
}

export default AboutPage