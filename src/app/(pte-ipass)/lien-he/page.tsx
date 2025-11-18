
import ContactInfor from "@/components/contact/contact-infor";
import LocationInfor from "@/components/contact/location-infor";
import ConsultationForm from "@/components/form/consultation-form";
import { aboutService } from "@/lib/service/about";

// import ContactPage from "@/pages/contact/contact-page";


export default async function ContactIndex() {
    const data = await aboutService.getAboutMeList({category:"BRANCH"}).then((res)=> res.items ?? []);
    //  console.log("items[0]:", items[0]);
    return (
        <div>
            <ContactInfor data={data[0]} />
            <LocationInfor data={data} />
            <ConsultationForm />

        </div>
    );
}