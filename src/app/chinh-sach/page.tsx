import HeroBanner from "@/components/banner/hero-banner";
import PolicyPage from "@/pages/policy/policy-page";

export default function PolicyIndex () {
    return(
        <div>
            <HeroBanner img="/images/hero-banner-chinh-sach.png" className="mb-12"/>
            <PolicyPage/>
        </div>
    )
}