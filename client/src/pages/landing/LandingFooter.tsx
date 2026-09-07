import { Link } from "react-router-dom";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080D0B] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="mx-auto w-full max-w-[min(94vw,2200px)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#111916] border border-[#14B8A6]/40 text-[#14B8A6]">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-[#14B8A6]">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 14C8 8, 16 8, 20 14" stroke="#A3AD7A" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-base font-bold text-[#E8ECE7]">
                Student<span className="text-[#14B8A6]">OS</span>
              </span>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-[#6F7C74]">
              The unified operating system for student life. Connect your tasks, projects,
              notes, peer communities, and AI copilot into one coherent environment.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#111916] border border-white/5 text-[10px] font-mono text-[#A3AD7A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
              <span>StudentOS v1.0 • Connected Student Operating System</span>
            </div>
          </div>

          {/* Module Links Col (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8ECE7] font-bold">
              Core Modules
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/tasks" className="hover:text-[#5EEAD4] transition-colors">
                  Tasks & Deadlines
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#5EEAD4] transition-colors">
                  Projects Workspace
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-[#5EEAD4] transition-colors">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link to="/communities" className="hover:text-[#5EEAD4] transition-colors">
                  Student Communities
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#5EEAD4] transition-colors">
                  Campus Marketplace
                </Link>
              </li>
              <li>
                <Link to="/ai" className="hover:text-[#5EEAD4] transition-colors">
                  AI Study Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Access Col (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8ECE7] font-bold">
              Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#problem" className="hover:text-[#5EEAD4] transition-colors">
                  The Problem
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-[#5EEAD4] transition-colors">
                  Ecosystem
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#5EEAD4] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why" className="hover:text-[#5EEAD4] transition-colors">
                  Why StudentOS
                </a>
              </li>
            </ul>
          </div>

          {/* Access Col (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#E8ECE7] font-bold">
              Account
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="hover:text-[#5EEAD4] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#5EEAD4] transition-colors">
                  Get Started Free
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#5EEAD4] transition-colors">
                  Student Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6F7C74] font-mono">
          <p>© {currentYear} StudentOS. One Operating System for Student Life.</p>
          <p>Crafted for students who build, learn, and grow.</p>
        </div>
      </div>
    </footer>
  );
}
