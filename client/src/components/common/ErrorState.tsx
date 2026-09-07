import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white">Error</h3>
      <p className="max-w-sm text-zinc-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-xl bg-red-500/20 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/30"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
