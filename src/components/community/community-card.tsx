import React, { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CommunityCardProps {
  icon: string | ReactNode;
  title: string;
  description: string;
  bgColor: string; 
  className?: string;
  href?: string;
}
function isStringIcon(icon: string | ReactNode): icon is string {
  return typeof icon === "string";
}

const CommunityCard = ({
  icon,
  title,
  description,
  bgColor,
  className,
  href,
}: CommunityCardProps) => {
  const CardWrapper: React.ElementType = href ? "a" : "div";

  return (
    <CardWrapper
      {...(href
        ? { href, target: "_blank", rel: "noreferrer" }
        : undefined)}
      className={[
        "p-4 sm:p-6 lg:p-6",
        "bg-white",
        "hover:shadow-lg transition-all duration-300 cursor-pointer group",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-shrink">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: bgColor }}
          >
           {isStringIcon(icon)? (
             <Image
              alt={title}
              src={icon}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
           ): (icon)}
          </div>

          <div className="flex flex-col min-w-0 flex-shrink">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
        <ArrowRight
          className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0"
          style={{ color: bgColor }}
        />
      </div>
    </CardWrapper>
  );
};

export default CommunityCard;
