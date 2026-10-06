

import React from "react";
import clsx from "clsx";

export default function PageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={clsx("mx-auto py-6 sm:w-[var(--width-container-sm)] md:w-[var(--width-container-md)] lg:w-[var(--width-container-lg)] xl:w-[var(--width-container-xl)] sm:px-[var(--padding-x-container-sm)] md:px-[var(--padding-x-container-md)] lg:px-[var(--padding-x-container-lg)] xl:px-[var(--padding-x-container-xl)]", className)}>
      {children}
    </main>
  );
}
