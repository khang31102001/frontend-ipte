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
  dataBranches?: About[];
  dataAudiences?: About[];
}

const AboutPage = ({ 
  dataEcosystem, 
  dataBranches,
  dataAudiences
}: AboutPageProps) => {
  return (
    <div className='bg-background text-foreground'>
        <AboutPTEiPass />
        <MissionSection />
        {/* lỗi nằm ở<IPTEAudienceSection /> */}
        <IPTEAudienceSection data={dataAudiences} />
        <MapSection data={dataBranches}/>
        {/* <FacilitiesSection /> */}
        <PTEcosystem data={dataEcosystem } />
       
    </div>
  )
}

export default AboutPage