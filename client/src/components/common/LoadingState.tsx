import { Loader2 } from "lucide-react";

export default function LoadingState({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      <p className="text-zinc-400">{message}</p>
    </div>
  );
}
