
import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import MainHomePage from "@/pages/home/home-page";

export default function Home() {
    return (
        <div className="">
            <HeroBanner
                img="/images/banner_home.png"
                className="mb-12"
            />

         
            <MainHomePage />
        </div>
    );
}
