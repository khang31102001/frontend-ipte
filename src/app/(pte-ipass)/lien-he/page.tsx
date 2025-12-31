import ContactListing from "@/components/about/contact-listing";
import { aboutService } from "@/lib/service/about";


// import ContactPage from "@/pages/contact/contact-page";


export default async function ContactIndex() {
  const [
    socialRes,
    branhRes,

  ] = await Promise.all([
    aboutService.getSocialList(), 
    aboutService.getBranchList(), 
  ]);

   const socialData = socialRes?.items ?? [];
    const branchData = branhRes?.items ?? [];
    //  console.log("items[0]:", items[0]);
    return <ContactListing socialData={socialData} brandData={branchData} />
}