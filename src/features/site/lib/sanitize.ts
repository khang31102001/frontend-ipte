import DOMPurify from "isomorphic-dompurify";

/** Làm sạch HTML từ CMS để tránh XSS; chỉ giữ các thẻ/thuộc tính an toàn. */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "ul", "ol", "li",
      "strong", "em", "u", "s", "sup", "sub",
      "a", "img", "figure", "figcaption",
      "blockquote", "pre", "code",
      "table", "thead", "tbody", "tr", "th", "td",
      "div", "span",
      "iframe", // video nhúng
    ],
    ALLOWED_ATTR: [
      "href", "title", "target", "rel",
      "src", "alt", "width", "height",
      "class", "id",
      "colspan", "rowspan",
      "frameborder", "allowfullscreen", "allow",
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
}

/** Nội dung nhập thuần văn bản (không có thẻ HTML) → các đoạn `<p>`. */
export function toHtml(content: string): string {
  if (/<[a-z][\s\S]*>/i.test(content)) return content;
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escape(p).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/** Bọc iframe YouTube/Vimeo trong khung responsive. */
export function processEmbeds(html: string): string {
  return html.replace(
    /(<iframe[^>]*src=["'](?:https?:)?\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com)[^"']*["'][^>]*>\s*<\/iframe>)/gi,
    '<div class="embed-responsive">$1</div>',
  );
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Gắn id cho h2/h3 và trả mục lục (chạy được cả server). */
export function withToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, level: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = `muc-${toc.length + 1}`;
    toc.push({ id, text, level: Number(level) });
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}
