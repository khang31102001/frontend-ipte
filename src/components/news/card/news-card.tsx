import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NameAvatar from "@/shared/name-avatar";

type Layout = "col" | "row";

interface NewsCardProps {
    href: string;
    image: string;
    title: string;
    description: string;

    category?: string;
    authorName?: string;
    authorAvatar?: string;
    date?: string;

    btnText?: string;
    layout?: Layout;


    onButtonClick?: () => void;
}


function RowLayout({
    image,
    title,
    description,
    authorName,
    authorAvatar,
    date,
    btnText,
    onButtonClick,
}: Pick<
    NewsCardProps,
    "image" | "title" | "description" | "authorName" | "authorAvatar" | "date" | "btnText" | "onButtonClick"
>) {
    return (
        <article className="news-card news-card--row">
            <div className="news-card__media">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title || "PTE iPASS"}
                    fill
                    className="news-card__img"
                    sizes="(max-width: 768px) 120px, 256px"
                />
            </div>

            <div className="news-card__body">
                <div>
                    {(authorName || date) && (
                        <div className="news-card__meta">
                            {authorName ? (
                                <div className="news-card__author">
                                    {authorAvatar ? (
                                        <div className="news-card__avatar">
                                            <Image
                                                src={authorAvatar || "/images/avatar-default.jpg"}
                                                alt={authorName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <NameAvatar name={authorName} />
                                    )}

                                    <span className="news-card__authorName">{authorName}</span>
                                </div>
                            ) : (
                                <span />
                            )}

                            {date ? <time className="news-card__date">{date}</time> : null}
                        </div>
                    )}

                    <h3 className="news-card__title">
                        {title}
                    </h3>

                    <p className="news-card__excerpt">
                        {description}
                    </p>
                </div>


                {btnText ? (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            onButtonClick?.();
                        }}
                        className="news-card__cta"
                    >
                        {btnText}
                        <ArrowRight
                            size={16}
                            className="ml-3 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2"
                        />
                    </button>
                ) : null}
            </div>
        </article>
    );
}

function ColLayout({
    image,
    title,
    description,
    category,
    authorName,
    authorAvatar,
    date,
}: Pick<
    NewsCardProps,
    "image" | "title" | "description" | "category" | "authorName" | "authorAvatar" | "date"
>) {
    return (
        <article className="news-card news-card--col">
            <div className="news-card__media">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title || "PTE iPASS"}
                    fill
                    className="news-card__img"
                    sizes="(max-width: 768px) 100vw, 25vw"
                />

                {category ? (
                    <div className="news-card__badge">
                        <span>{category}</span>
                    </div>
                ) : null}
            </div>

            <div className="news-card__body">
                {(authorName || date) && (
                    <div className="news-card__meta">
                        {authorName ? (
                            <div className="news-card__author">
                                {authorAvatar ? (
                                    <div className="news-card__avatar">
                                    <Image
                                        src={authorAvatar || "/images/avatar-default.jpg"}
                                        alt={authorName}
                                        fill
                                        className="new-card__avatar-img"
                                    />
                                </div>
                                ):(
                                    <NameAvatar name={authorName}/>
                                )}
                                <span className="news-card__authorName">{authorName}</span>
                            </div>
                        ) : (
                            <span />
                        )}

                        {date ? <time className="new-card__time">{date}</time> : null}
                    </div>
                )}

                <h3 className="news-card__title">{title}</h3>
                <p className="news-card__excerpt">{description}</p>
            </div>
        </article>
    );
}


export default function NewsCard({
    href,
    image,
    title,
    description,
    category,
    authorName,
    authorAvatar,
    date,
    btnText = "Tìm hiểu thêm",
    layout = "col",
    onButtonClick,
}: NewsCardProps) {
    return (
        <Link href={href} className="news-card-link">
            {layout === "row" ? (
                <RowLayout
                    image={image}
                    title={title}
                    description={description}
                    authorName={authorName}
                    authorAvatar={authorAvatar}
                    date={date}
                    btnText={btnText}
                    onButtonClick={onButtonClick}
                />
            ) : (
                <ColLayout
                    image={image}
                    title={title}
                    description={description}
                    category={category}
                    authorName={authorName}
                    authorAvatar={authorAvatar}
                    date={date}
                />
            )}
        </Link>
    );
}
