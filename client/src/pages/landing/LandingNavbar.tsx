import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, Search } from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`mx-auto w-full max-w-[min(94vw,2200px)] mt-3 sm:mt-4 transition-all duration-300 rounded-full border ${
          scrolled
            ? "bg-[#080D0B]/85 border-[#14B8A6]/25 shadow-2xl shadow-black/80 backdrop-blur-xl py-2 px-5"
            : "bg-[#080D0B]/60 border-white/10 backdrop-blur-md py-2.5 px-6"
        } flex items-center justify-between`}
      >
        {/* Brand Logo with Glowing Delta / Triangle Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#101915] border border-[#14B8A6]/40 shadow-inner group-hover:border-[#5EEAD4] transition-colors">
            {/* Geometric Delta Symbol */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-[#14B8A6] group-hover:text-[#5EEAD4] transition-colors"
            >
              <polygon
                points="12,4 20,18 4,18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="1.5" fill="#5EEAD4" />
            </svg>
            <div className="absolute -inset-0.5 rounded-full bg-[#14B8A6]/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <span className="text-lg font-bold tracking-tight text-[#E8ECE7] group-hover:text-white transition">
            Student<span className="text-[#14B8A6]">OS</span>
          </span>
        </Link>

        {/* Center Desktop Navigation Links Matching Reference */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#A2ADA5]">
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-white font-semibold py-1 transition-colors"
          >
            <span>Overview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_6px_#14B8A6]" />
          </a>
          <a
            href="#ecosystem"
            className="hover:text-[#E8ECE7] transition-colors py-1 hover:text-[#5EEAD4]"
          >
            Ecosystem
          </a>
          <a
            href="#modules"
            className="hover:text-[#E8ECE7] transition-colors py-1 hover:text-[#5EEAD4]"
          >
            Modules
          </a>
          <a
            href="#ai"
            className="hover:text-[#E8ECE7] transition-colors py-1 hover:text-[#5EEAD4]"
          >
            AI
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#E8ECE7] transition-colors py-1 hover:text-[#5EEAD4]"
          >
            How It Works
          </a>
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-3">
          {/* Quick Search Shortcut Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101814]/90 border border-white/10 text-[11px] text-[#6F7C74] hover:border-[#14B8A6]/40 transition-colors cursor-pointer">
            <Search size={12} className="text-[#A2ADA5]" />
            <span className="text-[#A2ADA5]">Search anything...</span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-black/50 border border-white/10 text-[9px] font-mono text-[#A2ADA5]">
              Ctrl K
            </kbd>
          </div>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-xs font-bold shadow-md shadow-[#14B8A6]/20 hover:from-[#5EEAD4] hover:to-[#14B8A6] hover:text-[#080D0B] transition-all duration-200"
            >
              <span>Workspace</span>
              <ArrowRight size={13} />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs font-semibold text-[#A2ADA5] hover:text-[#E8ECE7] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-xs font-bold shadow-md shadow-[#14B8A6]/25 hover:from-[#5EEAD4] hover:to-[#14B8A6] hover:text-[#080D0B] active:scale-95 transition-all duration-200"
              >
                <span>Get Started</span>
                <ArrowRight size={13} />
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl text-[#A2ADA5] hover:text-[#E8ECE7] hover:bg-[#111916] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-auto mt-2 max-w-[min(94vw,2200px)] rounded-2xl border border-[#14B8A6]/20 bg-[#0C1210]/95 backdrop-blur-2xl p-5 shadow-2xl space-y-4">
          <nav className="flex flex-col gap-2.5 text-xs font-medium text-[#A2ADA5]">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#111916] hover:text-[#E8ECE7]"
            >
              Overview
            </a>
            <a
              href="#ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#111916] hover:text-[#E8ECE7]"
            >
              Ecosystem
            </a>
            <a
              href="#modules"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#111916] hover:text-[#E8ECE7]"
            >
              Modules
            </a>
            <a
              href="#ai"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#111916] hover:text-[#E8ECE7]"
            >
              AI
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#111916] hover:text-[#E8ECE7]"
            >
              How It Works
            </a>
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-[#111916] border border-white/10 text-xs font-semibold text-[#E8ECE7]"
              >
                Sign In
              </Link>
            )}
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl bg-[#14B8A6] text-[#080D0B] text-xs font-bold"
            >
              {isAuthenticated ? "Open Workspace" : "Get Started Free"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
