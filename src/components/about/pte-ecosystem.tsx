import { IAbout } from "@/types/about";
import PTEEcosystemCard from "./card/pte-ecosystem-card"

interface PTEcosystemProps {
    data?: IAbout[] | [];
}
const PTEcosystem = ({ data = [], }: PTEcosystemProps) => {
    if (!data || data.length === 0) return null; 

    return (
        <section className=" py-16  lg:px-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div>
                    <h1 className="text-4xl font-bold leading-tight text-purple-700">Hệ Thống iPass Ecosystem</h1>
                    <p className="mt-2 text-base leading-relaxed text-gray-600 lg:text-lg">
                        iPTE cung cấp một hệ sinh thái học tập toàn diện, bao gồm các khóa học, tài liệu và công cụ hỗ trợ học tập, giúp học viên phát triển kỹ năng tiếng Anh một cách hiệu quả.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {data.map((item, index) => (
                        <PTEEcosystemCard key={index} data={item} />
                    ))}
                </div>

            </div>
        </section>
    )
}
export default PTEcosystem