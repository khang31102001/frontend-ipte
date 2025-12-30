import AboutDetail from "@/components/about/about-detail";
import { aboutService } from "@/lib/service/about";

type PageProps = {
  params: {
    slug?: string;
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: PageProps) {
    const {slug } = params ?? null;
    const aboutData: any[] = await aboutService.getAboutMeList({}).then((result)=> result.items);
    if(!slug) return;

    const abouts = aboutData.find((i)=> i.slug === slug);
    // console.log("check detail:", abouts);

 return <AboutDetail about={abouts}/>
}
