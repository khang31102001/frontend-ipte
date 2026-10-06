import { BookOpen } from "lucide-react";
import Image from "next/image";

interface ArticleCoverProps {
  image?: string | null;
  caption?: string | null;
  title?: string | null;
  className?: string;

}

const ArticleCover =({ image, caption }: ArticleCoverProps)=> {
  if (!image) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center my-8">
        <BookOpen className="w-20 h-20 text-primary-foreground opacity-50" />
      </div>
    );
  }

  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={caption ?? ""}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ArticleCover;
