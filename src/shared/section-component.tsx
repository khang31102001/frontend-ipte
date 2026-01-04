import React from "react";

type SectionTone = "default" | "muted" | "primary";
type SectionSize = "sm" | "md" | "lg";
type ContainerSize = "sm" | "md" | "lg" | "xl";

type SectionProps = {
  id?: string;
  className?: string;
  innerClassName?: string;

  /** Padding top/bottom preset */
  size?: SectionSize;

  /** Background preset */
  tone?: SectionTone;

  /** Container max-width preset */
  container?: ContainerSize;

  /** Nếu muốn full width (không container) */
  fullBleed?: boolean;

  /** Optional: title/subtitle chung */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;

  /** Optional: divider dưới section */
  withDivider?: boolean;

  backgroundImage?: string;

  children: React.ReactNode;
};

const cx = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const SIZE: Record<SectionSize, string> = {
  sm: "py-10 md:py-12",
  md: "py-14 md:py-16",
  lg: "py-16 md:py-20",
};

const TONE: Record<SectionTone, string> = {
  default: "bg-white",
  muted: "bg-slate-50",
  primary: "bg-indigo-50",
};

const CONTAINER: Record<ContainerSize, string> = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export default function Section({
  id,
  className,
  innerClassName,
  size = "md",
  tone = "default",
  container = "lg",
  fullBleed = false,
  title,
  subtitle,
  withDivider = false,
  backgroundImage,
  children,
}: SectionProps) {

    const styleBackground: React.CSSProperties | undefined = backgroundImage
  ? {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }
  : undefined;
  
  return (
    <section id={id} className={cx(TONE[tone], SIZE[size], className)}>
      <div className={cx(fullBleed ? "w-full" : cx("mx-auto px-4", CONTAINER[container]))} style={styleBackground}>
        {(title || subtitle) && (
          <header className="mb-10 md:mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base md:text-lg text-slate-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <div className={cx(innerClassName)}>{children}</div>

        {withDivider && (
          <div className="mt-12 md:mt-16 h-px w-full bg-slate-200" />
        )}
      </div>
    </section>
  );
}
