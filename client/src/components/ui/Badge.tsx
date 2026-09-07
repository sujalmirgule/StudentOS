import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "orange"
    | "blue"
    | "green"
    | "yellow"
    | "red"
    | "purple";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
  ...props
}: BadgeProps) {
  const styles = {
    default: "bg-zinc-800 text-zinc-300 border-white/10",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-[11px]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border font-semibold tracking-wide uppercase select-none",
        styles[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
