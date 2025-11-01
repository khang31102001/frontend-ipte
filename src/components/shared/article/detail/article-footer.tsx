// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
// import { toast } from "sonner";
// import { Link } from "react-router-dom";

interface ArticleFooterProps {
  tags?: string[];
  prevCourse?: { id: string; title: string };
  nextCourse?: { id: string; title: string };
}

export function ArticleFooter({ tags, prevCourse, nextCourse }: ArticleFooterProps) {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(document.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  return (
    <footer className="mt-12 pt-8 border-t space-y-6">
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag} >
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
          <button
           
            onClick={() => window.open(shareLinks.facebook, "_blank")}
          >
            <Facebook className="w-4 h-4 mr-2" />
            Facebook
          </button>
          <button
            onClick={() => window.open(shareLinks.twitter, "_blank")}
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </button>
          <button
            onClick={() => window.open(shareLinks.linkedin, "_blank")}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </button>
        </div>
      </div>

      {/* Previous/Next Navigation */}
      {(prevCourse || nextCourse) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {prevCourse ? (
            <Link href={`/pte/${prevCourse.id}`}>
              <button  className="w-full justify-start">
                <ChevronLeft className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="text-sm font-medium truncate">{prevCourse.title}</div>
                </div>
              </button>
            </Link>
          ) : (
            <div />
          )}
          
          {nextCourse && (
            <Link href={`/pte/${nextCourse.id}`}>
              <button  className="w-full justify-end">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="text-sm font-medium truncate">{nextCourse.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          )}
        </div>
      )}
    </footer>
  );
}
