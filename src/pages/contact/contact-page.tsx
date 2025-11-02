
import ContactInfor from '@/components/contact/contact-infor'
import LocationInfor from '@/components/contact/location-infor'
import ConsultationForm from '@/components/form/consultation-form'
import { About } from '@/types/about';
import React from 'react'
interface ContactPageProps{
  aboutData?: About[]
}
const ContactPage =  ({
  aboutData = []
}:ContactPageProps) => {
 
  return (
    <div>
        <ContactInfor data={aboutData[0] ?? {}}/>
        <LocationInfor data={aboutData?.length > 1 ? aboutData.slice(1) : aboutData} />
        <ConsultationForm/>
    </div>
  )
}

export default ContactPage