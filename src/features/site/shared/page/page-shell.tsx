import clsx from "clsx";
import type { ReactNode } from "react";

type PageShellProps = {
  className?: string;
  /** Một hoặc nhiều đối tượng JSON-LD (schema.org). */
  jsonLd?: object | object[];
  children: ReactNode;
};

export default function PageShell({ className = "", jsonLd, children }: PageShellProps) {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <div className={clsx("bg-hero-brand", className)}>
      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }} />
      ))}
      {children}
    </div>
  );
}
