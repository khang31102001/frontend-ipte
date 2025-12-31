"use client";

import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ArticleFooterProps {
  tags?: string[];
}

export default function ArticleFooter({
  tags = ["PTE", "Speaking Test Preparation", "Online Course Score 79+"],
}: ArticleFooterProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [shareTitle, setShareTitle] = useState("");

  useEffect(() => {
    // Chạy sau khi mount => window/document chắc chắn tồn tại
    setShareUrl(encodeURIComponent(window.location.href));
    setShareTitle(encodeURIComponent(document.title));
  }, []);

  const dataSocial = useMemo(() => {
    if (!shareUrl) return []; 
    return [
      {
        id: "facebook",
        icon: <Facebook className="w-4 h-4 mr-2" />,
        title: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      },
      {
        id: "twitter",
        icon: <Twitter className="w-4 h-4 mr-2" />,
        title: "Twitter",
        url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      },
      {
        id: "linkedin",
        icon: <Linkedin className="w-4 h-4 mr-2" />,
        title: "LinkedIn",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      },
    ];
  }, [shareUrl, shareTitle]);

  return (
    <footer className="mt-12 pt-8 border-t space-y-6">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag.trim()}
                className="text-sm font-medium border border-gray-300 rounded p-2"
              >
                {tag.trim()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Share this course</h3>

        <div className="flex space-x-2">
          {dataSocial.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
              className="btn-link text-sm font-semibold border border-gray-300 rounded p-2
                         hover:bg-hero-gradient hover:text-white transition-colors duration-200 ease-out"
              disabled={!shareUrl}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
