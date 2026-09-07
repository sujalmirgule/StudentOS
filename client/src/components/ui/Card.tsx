import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export function Card({
  children,
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-300",
        interactive &&
          "hover:border-orange-500/30 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-orange-500/5 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
