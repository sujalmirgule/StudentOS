import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description = "Get started by creating something new.",
  action,
}: {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-zinc-900/40 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
        <Icon className="h-8 w-8 text-zinc-500" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="max-w-sm text-zinc-400">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
