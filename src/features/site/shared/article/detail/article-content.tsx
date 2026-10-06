import { processEmbeds, sanitizeHtml, toHtml } from "../../../lib/sanitize";

interface ArticleContentProps {
  /** HTML (từ CMS) hoặc văn bản thuần; luôn được làm sạch trước khi hiển thị. */
  content?: string | null;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  if (!content?.trim()) return null;
  const html = processEmbeds(sanitizeHtml(toHtml(content)));
  return <article className="prose prose-lg max-w-content" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ArticleContent;
