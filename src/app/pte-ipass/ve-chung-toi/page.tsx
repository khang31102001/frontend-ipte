import HeroBanner from '@/components/banner/hero-banner'
import AboutPage from '@/pages/pte-ipass/about/about-page'

export default function IndexAbout() {
    return (
        <div>
            <HeroBanner img="/banner-team-teacher.jpg" className="mb-12 " />
            <AboutPage data={[]} />
        </div>
    )
}
