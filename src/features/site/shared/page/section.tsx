import clsx from "clsx";
import type { CSSProperties, ElementType, ReactNode } from "react";

export function Section({
  children,
  className,
  as: Tag = "section",
  backgroundImage = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  backgroundImage?: string;
  id?: string;
}) {
  const styleBackground: CSSProperties = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Tag id={id} className={clsx("w-full section sm:section--sm", className)} style={styleBackground}>
      {children}
    </Tag>
  );
}
