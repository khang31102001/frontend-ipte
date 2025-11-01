// import CommunityPTEiPass from '@/components/community/community-pte-ipass'
import ContactInfor from '@/components/contact/contact-infor'
import LocationInfor from '@/components/contact/location-infor'
import ConsultationForm from '@/components/form/consultation-form'
// import MapSection from '@/components/pte-ipass/about/map-section'
import { aboutMeService } from '@/services/about-me/aboutMeService';
import React from 'react'

const ContactPage = async () => {
  const aboutMeData = await aboutMeService.getAboutMe({ category: "BRANCH", about_id: 1 }).then(res => res?.items || []);
  return (
    <div>
        <ContactInfor data={aboutMeData[0]}/>
        <LocationInfor branches={aboutMeData.length > 1 ? aboutMeData.slice(1) : aboutMeData} />
        <ConsultationForm/>
    </div>
  )
}

export default ContactPage