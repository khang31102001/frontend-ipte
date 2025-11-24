"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
type layout = "col" | "row";
interface CourseCardProps {
    href: string;
    image: string;
    duration: string;
    level: string;
    title: string;
    description: string;
    btnText?: string;
    card_layout?: layout;
    onButtonClick?: () => void
}

export const RowLayout = ({ image, title, duration, level, description, btnText }: CourseCardProps) => (
    <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">

        <div className="flex-shrink-0">
            <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={256}
                height={192}
                className="w-64 h-48 object-cover rounded-xl"
            />
        </div>

        <div className="flex-1 flex flex-col justify-between">
            <div className="flex gap-4 mb-4">
                <span className="text-sm font-medium text-gray-600">{duration}</span>
                <span className="text-sm font-medium text-gray-600">{level}</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

            <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>

            <button className="group bg-gradient-to-r from-brandBlue-900 to-brandBlue-500 text-white font-medium px-4 py-3 rounded-full hover:opacity-90 transition duration-300 flex justify-center items-center text-sm sm:text-base md:text-lg">
                {btnText}
                <ArrowRight size={16} className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-2" />
            </button>
        </div>
    </div>
);
export const ColLayout = ({ image, title, duration, level, description, btnText }: CourseCardProps) => (
    <article className="course-card">
        <div className="course-card__image-wrapper">
            <Image
                src={image}
                alt={title}
                fill
                className="course-card__image"
            />
        </div>

        <div className="course-card__body">
            <div className="course-card__tags">
                <span className="course-card__tag">{duration}</span>
                <span className="course-card__tag">{level}</span>
            </div>

            <h3 className="course-card__title">{title}</h3>
            <p className="course-card__description">{description}</p>

            <div className="course-card__footer">
                <button className="course-card__button">
                    {btnText}
                    <ArrowRight size={16} className="course-card__button-icon" />
                </button>
            </div>
        </div>
    </article>
);

const CourseCard = ({
    href,
    image,
    duration,
    level,
    title,
    description,
    btnText = "Tìm hiểu thêm",
    card_layout = "col",
}: CourseCardProps) => {

    return (
        <Link href={href} className="block h-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary">
            {card_layout === "row" ? (
                <RowLayout
                    href={href}
                    image={image}
                    title={title}
                    duration={duration}
                    level={level}
                    description={description}
                    btnText={btnText}
                />
            ) : (
                <ColLayout
                    href={href}
                    image={image}
                    title={title}
                    duration={duration}
                    level={level}
                    description={description}
                    btnText={btnText}
                />
            )}
        </Link>
    );
};

export default CourseCard;
