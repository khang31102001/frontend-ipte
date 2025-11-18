// components/PteIssues.tsx
import { url } from "inspector";
import Image from "next/image";

interface CardItem {
    title: string;
    icon?: string;
    description: string;
}
interface ProblemsAndSolutionItemProps {
    title?: string;
    data?: CardItem[];
    img: string;
    backgroundImage?: string;
}
export default function ProblemsAndSolutionItem({
    title = "Vấn đề học viên PTE thường gặp phải",
    backgroundImage,
    img,
    data
}: ProblemsAndSolutionItemProps) {

  
    const positionClasses = [
        "pte-issues__card--top-left",
        "pte-issues__card--top-right",
        "pte-issues__card--bottom-left",
        "pte-issues__card--bottom-right"
    ];


    return (
        <section className="pte-issues" >
            <div className="pte-issues__inner">
                <h2 className="pte-issues__title">
                    {title}
                </h2>

                <div className="pte-issues__content">
              
                    {data?.map((item, index) => {
                        return (
                            <article key={index}
                                className={`
                                    pte-issues__card 
                                    ${positionClasses[index % positionClasses.length]}
                                `}
                            >
                                <div className="pte-issues__card-icon">✖</div>
                                <div className="pte-issues__card-body">
                                    <h3 className="pte-issues__card-title">
                                        {item.title}
                                    </h3>
                                    <p className="pte-issues__card-text">
                                        {item.description}
                                    </p>
                                </div>
                            </article>
                        )
                    })}

                    {/* Center image */}
                    <div className="pte-issues__center">
                        <div className="pte-issues__center-img-frame">
                            <Image
                                src={img}
                                alt="Học viên PTE lo lắng"
                                fill
                                sizes="(max-width: 852px) 220px, 320px"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
