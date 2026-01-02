import React from 'react'
import { ArticleContent, ArticleFooter, ArticleHeader } from '../../shared/article'
import { IAbout } from '@/types/about'
import ArticleCover from '../../shared/article/detail/article-cover';
interface AboutDetailProps {
    about: IAbout;
}
const AboutDetail = ({ about }: AboutDetailProps) => {
  const imgUrl = about?.image || "/images/img-courses-deault.jpg";
    return (

        <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-6xl  mx-auto pad-sm">

                <ArticleHeader
                    title={about?.title ?? ""}
                    summary={about?.description ?? ""}
                />

                <ArticleCover
                    image={imgUrl}
                />

                <div className="space-y-8">
                    <ArticleContent content={about?.content} />
                    {/* <ArticleFooter /> */}

                </div>

            </div>

        </article>

    )
}

export default AboutDetail