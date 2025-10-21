import React, { ReactNode } from "react";

interface PopperWrapperProps {
  children: ReactNode;
  className?: string;
}

const PopperWrapper: React.FC<PopperWrapperProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export default PopperWrapper;
