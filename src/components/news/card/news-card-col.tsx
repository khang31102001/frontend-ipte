import Image from "next/image";
import Link from "next/link";

interface NewCardItem {

}

interface NewcardColProps {
    href: string;
    image: string;
    title: string;
    description: string;
    category?: string ;
    authorname?: string ;
    date?: string ;
}

const NewscardCol = ({
    
    href,
    image,
    title,
    description,
    category,
    authorname,
    date
}: NewcardColProps) => {
    return (
        <Link href={href} className="new-card">
            <div className="new-card__media">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title ?? "PTE IPASS"}
                    fill
                    className="new-card__image"
                />

                {category && (
                    <div className="new-card__category">
                        <span>{category}</span>
                    </div>
                )}
            </div>

            <div className="new-card__body">
                <div className="new-card__author">
                    <div className="new-card__avatar">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {authorname && (
                        <span className="new-card__author-name">{authorname}</span>
                    )}
                </div>

                <time className="new-card__time">
                    {date ?? "20/10/2025"}
                </time>

                <h3 className="new-card__title">{title}</h3>

                <p className="new-card__excerpt">{description}</p>
            </div>
        </Link>
    );
};

export default NewscardCol;
