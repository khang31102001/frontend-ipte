import { BookOpen } from "lucide-react"
import TargetAudienceCard from "./card/TargetAudienceCard"


const IPTEAudienceSection = () => {
    const audiences = [
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description:
                "iPTE cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin",
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description:
                "iPTE cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin",
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description:
                "iPTE cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin",
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description:
                "iPTE cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin",
        },
        {
            title: "Học sinh cấp 1, cấp 2 và cấp 3",
            description:
                "iPTE cung cấp các khóa học tiếng Anh được thiết kế đặc biệt để phù hợp với nhu cầu học tập của học sinh ở mọi trình độ rèn luyện kỹ năng ngôn ngữ một cách hiệu quả và phát triển khả năng giao tiếp tiếng Anh một cách tự tin",
        },
    ]

    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Left side - Heading and description */}
                <div className="flex flex-col justify-start">
                    <h2 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
                        <span className="text-amber-400">iPTE</span>{" "}
                        <span className="text-purple-700">phù hợp với đối tượng nào?</span>
                    </h2>
                    <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                        iPTE cung cấp các khóa học tiếng Anh linh hoạt và đa dạng để đáo ứng nhu cầu của mọi đối tượng học viên
                    </p>
                </div>

                {/* Right side - First card */}
                {audiences.map((item, index) => {
                    return (
                        <div key={index}>
                            <TargetAudienceCard data={item} />
                        </div>
                    )
                })}
            </div>

            {/* Bottom grid - Remaining cards */}
            {/* <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {audiences.slice(1).map((audience, index) => (
                    <TargetAudienceCard key={index} title={audience.title} description={audience.description} />
                ))}
            </div> */}
        </section>
    )
}
export default IPTEAudienceSection