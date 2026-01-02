import Image from "next/image";
import Link from "next/link";

type Layout = "col" | "row";

interface ArticleCardProps {
  href?: string;
  image?: string;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  layout?: Layout;
  fallbackHref?: string; 
}

const FALLBACK_IMG_COL = "/images/co-so-vat-chat-2.png";
const FALLBACK_IMG_ROW = "/images/co-so-vat-chat-2.jpg";

export default function ArticleCard({
  href,
  image,
  category,
  title,
  description,
  layout = "col",
  fallbackHref = "#",
}: ArticleCardProps) {
  const isRow = layout === "row";
  const cardClass = `article-card ${isRow ? "article-card--list" : "article-card--grid"}`;
  const mediaClass = `article-card__media ${isRow ? "article-card__media--list" : "article-card__media--grid"}`;
  const excerptLinesClass = isRow
    ? "article-card__excerpt--two-lines"
    : "article-card__excerpt--three-lines";

  const imgSrc = image || (isRow ? FALLBACK_IMG_ROW : FALLBACK_IMG_COL);
  const linkHref = href?.trim() || fallbackHref;
  const altText = title?.trim() || "PTE iPASS";


  return (
    <Link href={linkHref} className={cardClass} aria-label={title ?? "Article"}>
      <article className="article-card__inner">
        <div className={mediaClass}>
          <Image
            src={imgSrc}
            alt={altText}
            fill
            className="article-card__image"
            sizes={isRow ? "160px" : "(min-width: 1024px) 33vw, 100vw"}
          />
        </div>

        <div className="article-card__body">
          {category ? <p className="article-card__category">{category}</p> : null}

          {title ? (
            <h3 className="article-card__title article-card__title--two-lines">
              {title}
            </h3>
          ) : null}

          {description ? (
            <p className={`article-card__excerpt ${excerptLinesClass}`}>
              {description}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
