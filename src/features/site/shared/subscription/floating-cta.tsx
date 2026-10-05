"use client";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { analytics } from "../../lib/analytics";
import { cn } from "../../lib/utils";
import { useSite } from "../../providers/site-provider";

interface FloatingCTAProps {
  hotline?: string;
}

/** Thanh CTA cố định đáy màn hình (di động) — hiện sau khi cuộn 300px. */
export function FloatingCTA({ hotline }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { openRegistration, hasRegistrationForm } = useSite();

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!hasRegistrationForm && !hotline) return null;

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden", isVisible ? "translate-y-0" : "translate-y-full")}>
      <div className="bg-background border-t shadow-lg p-4">
        <div className="flex items-center space-x-2 max-w-container mx-auto">
          {hasRegistrationForm && (
            <button
              className="flex-1 w-full items-center justify-center px-4 py-2 font-extrabold btn-sm border border-gray-300 rounded text-primary hover:text-white bg-[#f6e10e] hover:bg-hero-gradient transition-colors duration-200 ease-out"
              onClick={() => {
                analytics.ctaClick("register", "floating_cta");
                openRegistration();
              }}
            >
              Đăng ký
            </button>
          )}
          {hotline && (
            <a
              href={`tel:${hotline.replace(/\s/g, "")}`}
              onClick={() => analytics.ctaClick("call", "floating_cta")}
              aria-label="Gọi hotline"
              className="flex-1 w-full btn-link justify-center font-semibold btn-sm border border-gray-300 rounded bg-transparent hover:bg-hero-gradient hover:text-white transition-colors duration-200 ease-out"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
