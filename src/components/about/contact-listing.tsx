
import React from 'react'
import ContactInfor from './contact-infor';
import MapSection from './map-section';
import ConsultationForm from '../form/consultation-form';
import { HeroBanner } from '../../shared/banner/hero-banner';
interface ContactListingProps {
    socialData: any[] | [];
    brandData: any[] | [];
}
const ContactListing = ({
    socialData = [],
    brandData = [],
}: ContactListingProps) => {
    return (
        <>
            <HeroBanner
                alt="Trang chủ pte ipass"
                src="/images/banner/about-us-banner.png"
                priority={true}
            />
            <ContactInfor data={socialData} />
            <MapSection data={brandData} />
            <ConsultationForm />
        </>
    );
}

export default ContactListing