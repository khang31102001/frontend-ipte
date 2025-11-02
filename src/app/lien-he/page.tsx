import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import ContactPage from "@/pages/contact/contact-page";
import { aboutMeService } from "@/services/about-me/aboutMeService";

export default async function ContactIndex (){
     const aboutMeData = await aboutMeService.getAboutMe({ category: "BRANCH", about_id: 1 }).then(res => res?.items || []);
     console.log("aboutMeData:", aboutMeData);
    return(
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />
            <ContactPage aboutData={aboutMeData ?? []}/>

        </div>   
    );
}