
import IPTEAudienceSection from "@/components/about/IPTEAudienceSection";
import MissionSection from "@/components/about/mission-section";
import PTEcosystem from "@/components/about/pte-ecosystem";
import { FacilityGallery } from "./facility-gallery";
import MapSection from "./map-section";
import ContactInfor from "./contact-infor";
import ConsultationForm from "../form/consultation-form";
import AboutSection from "./about-section";
import { IAbout, IAboutItem, SocialItem } from "@/types/about";
import { HeroBanner } from "../../shared/banner/hero-banner";


interface AboutPageProps {
  aboutData: IAbout;
  branhData: IAbout[];
  socialData: SocialItem[];

}

const AboutListing = ({
  aboutData,
  branhData,
  socialData
}: AboutPageProps) => {



  return (
    <main className="bg-slate-50">
      <HeroBanner
        alt="Trang chủ pte ipass"
        src="/images/banner/about-us-banner.png"
        priority={true}
      />
      <AboutSection layout="grid-2" data={aboutData} />
      <MissionSection mission={aboutData?.mission ?? ""} vision={aboutData?.vision} />
      <IPTEAudienceSection data={[]} />
      <MapSection data={branhData} />
      {/* <FacilityGallery /> */}
      {/* <PTEcosystem data={null} /> */}
      <ContactInfor data={socialData} />
      <ConsultationForm className="rounded-3xl border border-slate-200 bg-slate-900  text-white shadow-sm" />
      
    </main>
  )
}

export default AboutListing