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
            key={id}
            className="pte-ipass-card rounded-t-3xl  relative bg-[#FDD835]"
        >
            <div className=" p-8 flex items-end justify-center min-h-[320px] h-[340px]">
                <Image
                    src={ image || "/placeholder.svg"}
                    alt={name}
                    width={340}
                    height={340}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="bg-[#001F3F] rounded-t-3xl text-white p-6">
                <h3 className="font-bold text-lg mb-3">{name}</h3>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl font-bold text-[#FDD835]">{overallScore}</span>
                    <span className="text-base font-medium">IELTS Overall</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-[#4FC3F7] font-bold text-xl">{listening}</span>
                        <span className="text-white">Listening</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#4FC3F7] font-bold text-xl">{reading}</span>
                        <span className="text-white">Reading</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#4FC3F7] font-bold text-xl">{speaking}</span>
                        <span className="text-white">Speaking</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#4FC3F7] font-bold text-xl">{writing}</span>
                        <span className="text-white">Writing</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfilesCard;