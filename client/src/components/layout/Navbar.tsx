import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/60 px-6 py-4 backdrop-blur-xl">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <GraduationCap className="h-8 w-8 text-orange-500" />

          <span className="text-2xl font-black text-white">
            StudentOS
          </span>
        </Link>

        {/* Desktop Nav */}

        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-zinc-300 transition hover:text-orange-400"
          >
            Features
          </a>

          <a
            href="#modules"
            className="text-zinc-300 transition hover:text-orange-400"
          >
            Modules
          </a>

          <Link
            to="/dashboard"
            className="text-zinc-300 transition hover:text-orange-400"
          >
            Dashboard
          </Link>

          <Link
            to="/marketplace"
            className="text-zinc-300 transition hover:text-orange-400"
          >
            Marketplace
          </Link>

          <Link
            to="/teams"
            className="text-zinc-300 transition hover:text-orange-400"
          >
            Teams
          </Link>

        </nav>

        {/* Right */}

        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/login"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-white transition hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
          >
            Sign Up
          </Link>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-zinc-900 p-6 backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-5">

            <a href="#features">Features</a>

            <a href="#modules">Modules</a>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/marketplace">
              Marketplace
            </Link>

            <Link to="/teams">
              Teams
            </Link>

            <hr className="border-white/10" />

            <Link to="/login">
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-xl bg-orange-500 px-5 py-3 text-center font-semibold text-white"
            >
              Sign Up
            </Link>

          </div>

        </div>
      )}
    </header>
  );
}