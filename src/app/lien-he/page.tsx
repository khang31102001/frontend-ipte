import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import ContactPage from "@/pages/contact/contact-page";

export default function ContactIndex(){
    return(
        <div>
            <HeroBanner
            img="/images/hero-banner-primary.png"
            className="mb-12"
            />
             
            <ContactPage/>

        </div>   
    );
}