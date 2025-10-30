import CommunityPTEiPass from '@/components/community/community-pte-ipass'
import ContactInfor from '@/components/contact/contact-infor'
import LocationInfor from '@/components/contact/location-infor'
import ConsultationForm from '@/components/form/consultation-form'
import MapSection from '@/components/pte-ipass/about/map-section'
import React from 'react'

const ContactPage = () => {
  return (
    <div>
        <ContactInfor/>
        <LocationInfor/>
        <ConsultationForm/>
    </div>
  )
}

export default ContactPage