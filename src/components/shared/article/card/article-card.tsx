import Image from "next/image"
import Link from "next/link"

interface ArticleCardColProps {
  baseUrl?: string;
  href?: string;
  image?: string | null
  category?: string | null
  title?: string | null
  description?: string | null
  layout?: "grid" | "list"
}

export default function ArticleCard({
  baseUrl,
  href,
  image,
  category,
  title,
  description,
  layout = "grid",
}: ArticleCardColProps) {

  const url = `/${baseUrl}/${href}/`;
  // console.log("`${baseUrl}` +`${href}`", url)
  if (layout === "list") {
    return (
      <article className="article-card article-card--list">
        <Link href={url} className="article-card__link">
          <div className="article-card__inner">
            <div className="article-card__media article-card__media--list">
              <Image
                src={image || "/images/co-so-vat-chat-2.jpg"}
                alt={title ?? "PTE IPASS"}
                fill
                className="article-card__image"
              />
            </div>

            <div className="article-card__body">
              {category && <p className="article-card__category">{category}</p>}
              <h3 className="article-card__title article-card__title--two-lines">
                {title}
              </h3>
              <p className="article-card__excerpt article-card__excerpt--two-lines">
                {description}
              </p>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // layout = "grid"
  return (
    <article className="article-card article-card--grid">
      <Link href={url} className="article-card__link">
        <div className="article-card__media article-card__media--grid">
          <Image
            src={image || "/images/co-so-vat-chat-2.png"}
            alt={title ?? "PTE IPASS"}
            fill
            className="article-card__image"
          />
        </div>

        <div className="article-card__body">
          {category && <p className="article-card__category">{category}</p>}
          <h3 className="article-card__title article-card__title--two-lines">
            {title}
          </h3>
          <p className="article-card__excerpt article-card__excerpt--three-lines">
            {description}
          </p>
        </div>
      </Link>
    </article>
  )
}
