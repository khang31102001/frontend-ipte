import { BookOpen } from "lucide-react";
import Image from "next/image";

interface ArticleCoverProps {
  image?: string | null;
  caption?: string | null;
  title?: string | null;
  className?: string;

}

const ArticleCover =({ image, caption, title }: ArticleCoverProps)=> {
  if (!image) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center my-8">
        <BookOpen className="w-20 h-20 text-primary-foreground opacity-50" />
      </div>
    );
  }

  return (
    <figure className=" my-8">
      <Image
        src={image}
        alt={caption ?? ""}
        width={1280}
        height={720}
        className="w-full aspect-video object-cover rounded-lg"
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ArticleCover;
