
import HeroImage from "@/components/banner/banner";
import MainHomePage from "@/pages/home/home-page";

export default function Home() {
    return (
        <div className="">
            {/* <HeroBanner
                img="/images/banner_home.png"
                className="mb-12"
            /> */}

            <HeroImage
                src="/images/banner_home.png"
                objectPosition="top"
                preset="soft"
                className="hero--fullscreen"
            
            />
            <MainHomePage />
        </div>
    );
}
