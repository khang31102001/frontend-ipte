import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface FeaturedArticleCardProps {
    href?: string;
    image?: string | null
    category?: string | null
    title?: string | null
    description?: string | null
}
const FeaturedArticleCard = ({
    href,
    image,
    category,
    title,
    description
}: FeaturedArticleCardProps) => {
   
    return (
        <article className="featured-row">
            <Link href={href ?? ""} className="featured-row__link">
                <div className="featured-row__media">
                    <Image
                        src={image || '/images/course-1.jpg'}
                        alt={title ?? "PTE IPASS"}
                        fill
                        className="featured-row__image"
                    />
                </div>

                <div className="featured-row__content">
                     {category && 
                         ( <p className="featured-row__category">{category}</p>)
                     }
                    <h2 className="featured-row__title">{title}</h2>
                    <p className="featured-row__excerpt">{description}</p>
                </div>
            </Link>
        </article>
    )
}

export default FeaturedArticleCard
