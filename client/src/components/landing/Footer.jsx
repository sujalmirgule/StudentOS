import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090B]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div className="flex items-center gap-3">
          <GraduationCap className="text-orange-500" />
          <span className="text-xl font-bold text-white">
            StudentOS
          </span>
        </div>

        <div className="flex gap-8 text-sm text-zinc-400">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Marketplace</a>
          <a href="#">Teams</a>
          <a href="#">Contact</a>
        </div>

        <p className="text-sm text-zinc-500">
          © 2026 StudentOS. All rights reserved.
        </p>

      </div>
    </footer>
  );
}