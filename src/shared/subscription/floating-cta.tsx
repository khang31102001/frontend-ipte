"use client"
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  hotline?: string;
  onRegisterClick?: () => void;
}

export function FloatingCTA({ hotline, onRegisterClick }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-background border-t shadow-lg p-4">
        <div className="flex items-center space-x-2 max-w-container mx-auto">
          <button 
            className="flex-1 w-full items-center justify-center px-4 py-2
               font-extrabold btn-sm 
              border border-gray-300 rounded  
              text-primary hover:text-white
              bg-[#f6e10e] hover:bg-hero-gradient
              transition-colors duration-200 ease-out"
            onClick={onRegisterClick}
          >
            Đăng ký
          </button>
          
          {hotline && (
            <button className="flex-1 w-full" >
              <a href={`tel:${hotline}`} className="w-full btn-link justify-center font-semibold btn-sm 
              border border-gray-300 rounded  
              bg-transparent hover:bg-hero-gradient hover:text-white
              transition-colors duration-200 ease-out">
                <Phone className="w-4 h-4" />
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
