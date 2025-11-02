"use client"
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
// import { toast } from "sonner";
// import { Link } from "react-router-dom";

interface ArticleFooterProps {
  tags?: string[];

}
const ArticleFooter = ({
  tags = ["PTE", " Speaking Test Preparation ", "Online Course Score 79+ "],

}: ArticleFooterProps) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(document.title);
  const dataSocial = [
    {
      id: 1,
      icon: <Facebook className="w-4 h-4 mr-2" />,
      title: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      id: 2,
      icon: <Twitter className="w-4 h-4 mr-2" />,
      title: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    },
    {
      id: 3,
      icon: <Linkedin className="w-4 h-4 mr-2" />,
      title: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },

  ]


  return (
    <footer className="mt-12 pt-8 border-t space-y-6">
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2 ">
            {tags.map((tag) => (
              <div key={tag}
                className="text-sm font-medium border border-gray-300 rounded p-2"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Share this course</h3>
        <div className="flex space-x-2">
          {dataSocial.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => window.open(item.url, "_blank")}
                className="btn-link text-sm font-semibold 
                border border-gray-300 rounded p-2
                hover:bg-hero-gradient hover:text-white 
                transition-colors duration-200 ease-out

                "
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            )
          })}

        </div>
      </div>
    </footer>
  );
}
export default ArticleFooter;