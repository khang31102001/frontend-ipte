import HeroImage from "@/components/banner/banner";
import HeroBanner from "@/components/banner/hero-banner";
import PolicyPage from "@/pages/policy/policy-page";

export default function PolicyIndex () {
    return(
        <div>
            {/* <HeroBanner img="/images/hero-banner-chinh-sach.png" className="mb-12"/> */}
            <HeroImage
                src="/images/hero-banner-chinh-sach.png"
                objectPosition="center"
                preset="soft"
                className="hero--fullscreen"
            />
            <PolicyPage/>
        </div>
    )
}