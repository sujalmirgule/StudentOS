import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-orange-500" />
          <span className="text-xl font-bold text-white">
            StudentOS
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#" className="text-gray-300 transition hover:text-white">
            Home
          </a>

          <a href="#" className="text-gray-300 transition hover:text-white">
            Features
          </a>

          <a href="#" className="text-gray-300 transition hover:text-white">
            Dashboard
          </a>

          <a href="#" className="text-gray-300 transition hover:text-white">
            Pricing
          </a>

          <a href="#" className="text-gray-300 transition hover:text-white">
            About
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10">
  Login
</button>

<button className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
  Get Started
</button>
        </div>

      </div>
    </header>
  );
}