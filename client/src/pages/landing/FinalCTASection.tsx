import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";

export default function FinalCTASection() {
  const { isAuthenticated } = useAuthStore();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#080D0B] overflow-hidden border-b border-white/5">
      {/* Background Calmer Earth Horizon Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-[#14B8A6]/20 via-[#78864A]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10 text-center">
        {/* Subtle Spatial Horizon Container */}
        <div className="relative p-10 sm:p-16 rounded-[40px] border border-[#14B8A6]/30 bg-gradient-to-b from-[#111916] via-[#0C1210] to-[#080D0B] shadow-2xl shadow-black/80 space-y-8 overflow-hidden">
          {/* Subtle Horizon Arc Line */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#14B8A6]/40 to-transparent" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080D0B] border border-[#14B8A6]/40 text-[11px] font-mono uppercase tracking-wider text-[#5EEAD4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
            ENTER THE ECOSYSTEM
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#E8ECE7] leading-[1.1]">
            Your student life is a system.
            <br />
            <span className="bg-gradient-to-r from-[#5EEAD4] via-[#14B8A6] to-[#A3AD7A] bg-clip-text text-transparent">
              Build it like one.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#A2ADA5] leading-relaxed">
            Organize your work. Discover opportunities. Connect with people.
            Keep moving forward with clarity.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#14B8A6] text-[#080D0B] text-sm font-bold shadow-lg shadow-[#14B8A6]/25 hover:bg-[#5EEAD4] hover:shadow-[#14B8A6]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>{isAuthenticated ? "Open Your Workspace" : "Get Started Free"}</span>
              <ArrowRight size={17} />
            </Link>

            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#111916] text-[#E8ECE7] text-sm font-semibold border border-white/10 hover:border-[#14B8A6]/40 hover:bg-[#17211C] transition-all duration-200"
            >
              <Compass size={16} className="text-[#14B8A6]" />
              <span>Back to Top</span>
            </button>
          </div>

          <p className="text-[11px] font-mono text-[#6F7C74]">
            No credit card required • Instant access to your personal workspace
          </p>
        </div>
      </div>
    </section>
  );
}
