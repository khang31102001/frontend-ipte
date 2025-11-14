import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface CoursesCardProps {
    id?: number,
    slug: string | null,
    image?: string | null,
    duration?: string | null,
    level?: string | null,
    title: string | null,
    description: string | null,
    textBtn?: string | null,
}

const CoursesCardColum = ({
    id,
    slug,
    title,
    image,
    description,
    duration,
    level,
    textBtn
}: CoursesCardProps) => {
    return (
        <Link href={`/khoa-hoc/${slug}`} className="course-card-link">
            <article className="course-card">
                {/* IMAGE */}
                <div className="course-card__image-wrapper">
                    <Image
                        src={image || "/images/course-1.jpg"}
                        alt={title || ""}
                        fill
                        className="course-card__image"
                    />
                </div>

                {/* BODY */}
                <div className="course-card__body">
                    {duration && level && (
                        <div className="course-card__tags">
                            <span className="course-card__tag">{duration}</span>
                            <span className="course-card__tag">{level}</span>
                        </div>
                    )}

                    <h3 className="course-card__title">
                        {title}
                    </h3>

                    <p className="course-card__description">
                        {description}
                    </p>

                    <div className="course-card__footer">
                        <button className="course-card__button">
                            {textBtn || "Tìm hiểu thêm"}
                            <ArrowRight className="course-card__button-icon" size={16} />
                        </button>
                    </div>
                </div>
            </article>
        </Link>

    );
};


export default CoursesCardColum