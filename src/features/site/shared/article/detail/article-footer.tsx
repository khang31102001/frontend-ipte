"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FacebookIcon, LinkedinIcon, XIcon } from "../../../components/ui/brand-icons";

interface ArticleFooterProps {
  tags?: string[];
  shareLabel?: string;
}

interface ShareTarget {
  id: string;
  icon: ReactNode;
  title: string;
  url: string;
}

export default function ArticleFooter({ tags = [], shareLabel = "Chia sẻ bài viết" }: ArticleFooterProps) {
  const [share, setShare] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    setShare({ url: encodeURIComponent(window.location.href), title: encodeURIComponent(document.title) });
  }, []);

  const targets: ShareTarget[] = share
    ? [
        { id: "facebook", icon: <FacebookIcon size={16} />, title: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${share.url}` },
        { id: "x", icon: <XIcon size={16} />, title: "X", url: `https://twitter.com/intent/tweet?url=${share.url}&text=${share.title}` },
        { id: "linkedin", icon: <LinkedinIcon size={16} />, title: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${share.url}` },
      ]
    : [];

  return (
    <footer className="mt-12 pt-8 border-t space-y-6">
      {tags.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} className="text-sm font-medium border border-gray-300 rounded p-2">
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold mb-3">{shareLabel}</h3>
        <div className="flex space-x-2">
          {targets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
              className="btn-link text-sm font-semibold border border-gray-300 rounded p-2 gap-2 hover:bg-hero-gradient hover:text-white transition-colors duration-200 ease-out"
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
