import React from "react";
import { cn } from "../../lib/utils";

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  context?: string;
  color?: "orange" | "blue" | "yellow" | "green" | "purple";
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  context,
  color = "orange",
  className,
}: StatCardProps) {
  const styles = {
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div
      className={cn(
        "group rounded-3xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-orange-500/5",
        className
      )}
    >
      <div className={`mb-3 inline-flex rounded-2xl border p-3 transition-transform duration-300 group-hover:scale-110 ${styles[color]}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
        {value}
      </h3>
      <p className="mt-1 text-xs font-bold text-zinc-300">{label}</p>
      {context && <p className="mt-0.5 text-[11px] text-zinc-500">{context}</p>}
    </div>
  );
}
