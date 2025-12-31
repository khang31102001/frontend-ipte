import { Teacher } from "@/types/teacher";
import Image from "next/image"


interface TeacherProfilesCardProps {
    data: Teacher;
}
const TeacherProfilesCard = ({ 
    data 
}: TeacherProfilesCardProps) => {

    return (
        <div
            className="teacher-card rounded-t-3xl relative bg-[#FDD835]"
        >
            <div className="teacher-card__img-area p-8 flex items-center justify-center rounded-sm min-h-[320px]">
                <div className="teacher-card__img-frame relative">
                    <Image
                        src={data.image || "/placeholder.svg"}
                        alt={data.name ?? "PTE IPASS"}
                        fill
                        className="teacher-card__img object-contain object-center"
                    />
                </div>
            </div>

            <div className="teacher-card__body bg-[#001F3F] rounded-t-3xl text-white p-6">
                <h3 className="teacher-card__name font-bold text-lg mb-3">{data.name}</h3>

                <div className="teacher-card__overall flex items-center gap-3 mb-4">
                    <span className="teacher-card__overall-score text-5xl font-bold text-[#FDD835]">
                        {data.overallScore}
                    </span>
                    <span className="teacher-card__overall-label text-base font-medium">
                        IELTS Overall
                    </span>
                </div>

                <div className="teacher-card__skills grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">
                            {data.listeningScore}
                        </span>
                        <span className="teacher-card__skill-label text-white">Listening</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">
                            {data.readingScore}
                        </span>
                        <span className="teacher-card__skill-label text-white">Reading</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">
                            {data.speakingScore}
                        </span>
                        <span className="teacher-card__skill-label text-white">Speaking</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">
                            {data.writingScore}
                        </span>
                        <span className="teacher-card__skill-label text-white">Writing</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TeacherProfilesCard;