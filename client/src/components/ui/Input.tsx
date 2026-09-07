import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-zinc-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-zinc-500 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-orange-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-orange-500/20",
              leftIcon && "pl-10",
              error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-[11px] font-medium text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
