import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../context/AuthContext";
import { Button } from "../ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#08080a]/80 px-6 py-3.5 backdrop-blur-2xl shadow-xl shadow-black/50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-orange-400 transition">
            StudentOS
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-xs font-semibold text-zinc-400 transition hover:text-orange-400"
          >
            Features
          </a>
          <Link
            to="/login"
            className="text-xs font-semibold text-zinc-400 transition hover:text-orange-400"
          >
            Portal Access
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="sm">Go to Workspace</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-400 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-zinc-900/90 p-6 backdrop-blur-2xl md:hidden space-y-4">
          <div className="flex flex-col gap-3 text-xs font-semibold text-zinc-300">
            <a href="#features" onClick={() => setOpen(false)}>
              Features
            </a>
            <hr className="border-white/5" />
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full">
                  Dashboard Workspace
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button size="sm" variant="secondary" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}