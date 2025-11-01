import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of Contents" className={cn("space-y-2", className)}>
      <h3 className="text-sm font-semibold mb-4">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {items.map(({ id, text, level }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}
          >
            <button
              onClick={() => scrollToHeading(id)}
              className={cn(
                "text-left w-full hover:text-primary transition-colors",
                activeId === id ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
