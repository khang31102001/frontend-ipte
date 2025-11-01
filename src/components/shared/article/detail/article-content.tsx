import { sanitizeHtml, processEmbeds } from "@/lib/sanitize";
import { useMemo } from "react";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const sanitizedContent = useMemo(() => {
    const cleaned = sanitizeHtml(content);
    return processEmbeds(cleaned);
  }, [content]);

  return (
    <article 
      className="prose prose-lg max-w-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
