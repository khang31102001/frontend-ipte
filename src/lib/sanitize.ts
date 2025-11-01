import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Allows safe HTML tags while removing dangerous content
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'em', 'u', 's', 'sup', 'sub',
      'a', 'img', 'figure', 'figcaption',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
      'iframe', // for embedded videos
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id',
      'colspan', 'rowspan',
      'frameborder', 'allowfullscreen', 'allow',
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
}

/**
 * Process content to make iframes responsive
 */
export function processEmbeds(html: string): string {
  // Wrap YouTube and Vimeo iframes in responsive container
  return html.replace(
    /<iframe([^>]*src=["'](?:https?:)?\/\/(?:www\.)?(youtube\.com|youtu\.be|vimeo\.com)[^"']*["'][^>]*)>/gi,
    '<div class="embed-responsive"><iframe$1></div>'
  );
}

/**
 * Extract table of contents from HTML content
 */
export function extractTOC(html: string): Array<{ id: string; text: string; level: number }> {
  if (typeof window === 'undefined') return [];
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h2, h3, h4');
  
  return Array.from(headings).map((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent || '';
    const id = `heading-${index}`;
    
    return { id, text, level };
  });
}
