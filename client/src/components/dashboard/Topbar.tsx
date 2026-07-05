import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-black text-white">

          Welcome Back 👋

        </h1>

        <p className="mt-2 text-zinc-400">

          Ready to study today?

        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center rounded-2xl border border-white/10 bg-zinc-900 px-4">

          <Search size={18} className="text-zinc-500" />

          <input
            placeholder="Search..."
            className="bg-transparent px-3 py-3 text-white outline-none"
          />

        </div>

        <button className="rounded-2xl border border-white/10 bg-zinc-900 p-3">

          <Bell className="text-white" />

        </button>

      </div>

    </div>
  );
}