import React from "react";
import { useGsapTilt } from "../../hooks/useGsapTilt";
import { cn } from "../../lib/utils";

interface Card3DTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTiltX?: number;
  maxTiltY?: number;
  scaleOnHover?: number;
  className?: string;
}

export default function Card3DTilt({
  children,
  maxTiltX = 6,
  maxTiltY = 6,
  scaleOnHover = 1.015,
  className,
  ...props
}: Card3DTiltProps) {
  const cardRef = useGsapTilt<HTMLDivElement>({
    maxTiltX,
    maxTiltY,
    scaleOnHover,
  });

  return (
    <div
      ref={cardRef}
      className={cn(
        "spatial-card rounded-3xl p-6 transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
