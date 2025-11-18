import AboutPTEiPass from "@/components/about/about-pte-ipass";
// import FacilitiesSection from "@/components/pte-ipass/about/facilities-section";
import IPTEAudienceSection from "@/components/about/IPTEAudienceSection";
import MapSection from "@/components/about/map-section";
import MissionSection from "@/components/about/mission-section";
import PTEcosystem from "@/components/about/pte-ecosystem";
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
    <section>
        <AboutPTEiPass />
        <MissionSection />
        {/* lỗi nằm ở<IPTEAudienceSection /> */}
        <IPTEAudienceSection data={dataAudiences} />
        <MapSection data={dataBranches}/>
        {/* <FacilitiesSection /> */}
        <PTEcosystem data={dataEcosystem } />
    </section>
  )
}

export default AboutPage