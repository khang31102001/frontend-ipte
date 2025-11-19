import AboutPTEiPass from "@/components/about/about-pte-ipass";
import IPTEAudienceSection from "@/components/about/IPTEAudienceSection";
import MissionSection from "@/components/about/mission-section";
import PTEcosystem from "@/components/about/pte-ecosystem";
import { About, AboutItem } from "@/types/about";
import { PTEEcosystem } from "@/types/ecosystem";
import { FacilityGallery } from "./facility-gallery";
import MapSection from "./map-section";
import ContactInfor from "./contact-infor";
import ConsultationForm from "../form/consultation-form";
import HeroBanner from "../shared/banner/hero-banner";

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
        {/* <HeroBanner img="/images/banner/about-us-banner.png"/> */}
        <AboutPTEiPass />
        <MissionSection />
        <IPTEAudienceSection data={dataAudiences} />
        <MapSection data={dataBranches}/>
        <FacilityGallery/>
        <PTEcosystem data={dataEcosystem as any} />
        <ContactInfor data={dataBranches[0] as any ?? []}/>
        <ConsultationForm/>
    </section>
  )
}

export default AboutListing