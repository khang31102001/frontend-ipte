import { BookOpen } from "lucide-react";

interface ArticleCoverProps {
  image?: string;
  caption?: string;
  title: string;
  className?: string;

}

export function ArticleCover({ image, caption, title }: ArticleCoverProps) {
  if (!image) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center my-8">
        <BookOpen className="w-20 h-20 text-primary-foreground opacity-50" />
      </div>
    );
  }

  return (
    <figure className="my-8">
      <img
        src={image}
        alt={caption || title}
        className="w-full aspect-video object-cover rounded-lg"
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
