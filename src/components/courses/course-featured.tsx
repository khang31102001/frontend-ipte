import { CourseCard, type CourseCardProps } from "@/components/courses/card/course-card"
import { Sparkles, Zap, Target } from "lucide-react"
const CourseFeatured = () => {
    const courses: CourseCardProps[] = [
        {
            category: {
                icon: <Sparkles className="h-5 w-5 text-yellow-600" />,
                label: "Xây nền",
            },
            title: "Xây dựng nền tảng",
            description: "Xây nền tiếng Anh từ đầu, làm quen IELTS và tư duy Linearthinking học đúng từ gốc.",
            objectives: [
                "Làm quen format bài thi PTE",
                "Học ngữ pháp, từ vựng nền tảng",
                "Luyện nghe – nói theo tinh huống",
                "Bổ dịch từng từ nhỏ Linearthinking",
                "Tạo nền tư duy tiếng Anh mạch lạc",
            ],
            learningInfo: {
                duration: "9 tuần – 27 buổi học",
                audience: "Phù hợp người mất gốc Tiếng Anh",
                requirements: "Đầu ra đạt mức 4.0+ IELTS",
            },
            buttons: [{ label: "Khóa học..." }, { label: "Khóa học...." }, { label: "Khóa học..." }],
        },
        {
            category: {
                icon: <Zap className="h-5 w-5 text-yellow-600" />,
                label: "Tăng tốc",
            },
            title: "Xây dựng nền tảng",
            description: "Xây nền tiếng Anh từ đầu, làm quen IELTS và tư duy Linearthinking học đúng từ gốc.",
            objectives: [
                "Làm quen format bài thi PTE",
                "Học ngữ pháp, từ vựng nền tảng",
                "Luyện nghe – nói theo tinh huống",
                "Bổ dịch từng từ nhỏ Linearthinking",
                "Tạo nền tư duy tiếng Anh mạch lạc",
            ],
            learningInfo: {
                duration: "9 tuần – 27 buổi học",
                audience: "Phù hợp người mất gốc Tiếng Anh",
                requirements: "Đầu ra đạt mức 4.0+ IELTS",
            },
            buttons: [{ label: "Xem thêm" }, { label: "Xem thêm" }, { label: "Xem thêm" }],
        },
        {
            category: {
                icon: <Target className="h-5 w-5 text-yellow-600" />,
                label: "Về đích",
            },
            title: "Xây dựng nền tảng",
            description: "Xây nền tiếng Anh từ đầu, làm quen IELTS và tư duy Linearthinking học đúng từ gốc.",
            objectives: [
                "Làm quen format bài thi PTE",
                "Học ngữ pháp, từ vựng nền tảng",
                "Luyện nghe – nói theo tinh huống",
                "Bổ dịch từng từ nhỏ Linearthinking",
                "Tạo nền tư duy tiếng Anh mạch lạc",
            ],
            learningInfo: {
                duration: "9 tuần – 27 buổi học",
                audience: "Phù hợp người mất gốc Tiếng Anh",
                requirements: "Đầu ra đạt mức 4.0+ IELTS",
            },
            buttons: [{ label: "Xem thêm" }, { label: "Xem thêm" }, { label: "Xem thêm" }],
        },
    ]

    return (
        <section className=" bg-[#0a0a5c] px-6 py-16">
            <div className="container mx-auto ">
                <div className="grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CourseFeatured
