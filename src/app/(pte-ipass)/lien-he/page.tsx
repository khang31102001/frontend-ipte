
import ContactInfor from "@/components/about/contact-infor";
import MapSection from "@/components/about/map-section";
import LocationInfor from "@/components/about/map-section";
import ConsultationForm from "@/components/form/consultation-form";
import { aboutService } from "@/lib/service/about";

// import ContactPage from "@/pages/contact/contact-page";


export default async function ContactIndex() {
    const data = await aboutService.getAboutMeList({category:"BRANCH"}).then((res)=> res.items ?? []);
    //  console.log("items[0]:", items[0]);
    return (
        <div>
            <ContactInfor data={data[0]} />
            <MapSection data={data} />
            <ConsultationForm />
        </div>
    );
}