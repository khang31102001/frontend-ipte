import Image from "next/image"

interface TeacherProfile {
    id: number;
    name: string;
    image: string;
    overallScore: number;
    listening: number;
    reading: number;
    speaking: number;
    writing: number;
}
interface TeacherProfilesCardProps {
    data: TeacherProfile;
}
const TeacherProfilesCard = ({ data }: TeacherProfilesCardProps) => {
    const { id, name, image, overallScore, listening, reading, speaking, writing } = data;
    return (
        <div
            className="teacher-card rounded-t-3xl relative bg-[#FDD835]"
        >
            <div className="teacher-card__img-area p-8 flex items-center justify-center rounded-sm min-h-[320px]">
                <div className="teacher-card__img-frame relative">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={name}
                        fill
                        className="teacher-card__img object-contain object-center"
                    />
                </div>
            </div>

            <div className="teacher-card__body bg-[#001F3F] rounded-t-3xl text-white p-6">
                <h3 className="teacher-card__name font-bold text-lg mb-3">{name}</h3>

                <div className="teacher-card__overall flex items-center gap-3 mb-4">
                    <span className="teacher-card__overall-score text-5xl font-bold text-[#FDD835]">
                        {overallScore}
                    </span>
                    <span className="teacher-card__overall-label text-base font-medium">
                        IELTS Overall
                    </span>
                </div>

                <div className="teacher-card__skills grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">{listening}</span>
                        <span className="teacher-card__skill-label text-white">Listening</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">{reading}</span>
                        <span className="teacher-card__skill-label text-white">Reading</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">{speaking}</span>
                        <span className="teacher-card__skill-label text-white">Speaking</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="teacher-card__skill-score text-[#4FC3F7] font-bold text-xl">{writing}</span>
                        <span className="teacher-card__skill-label text-white">Writing</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TeacherProfilesCard;