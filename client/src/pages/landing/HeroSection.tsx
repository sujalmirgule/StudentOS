import { Link } from "react-router-dom";
import { ArrowRight, Play, ArrowDown } from "lucide-react";
import EarthHero3D from "../../components/3d/EarthHero3D";
import StudentSilhouette from "../../components/3d/StudentSilhouette";
import UpperCosmosAtmosphere from "../../components/3d/UpperCosmosAtmosphere";
import { useAuthStore } from "../../context/AuthContext";

export default function HeroSection() {
  const { isAuthenticated } = useAuthStore();

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("how-it-works");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen lg:h-[100dvh] lg:max-h-[100dvh] flex flex-col justify-between pt-20 sm:pt-22 pb-2 overflow-hidden bg-[#050908] border-b border-white/5 select-none">
      {/* 1. Deep Upper Cosmos Atmosphere & Celestial Architecture */}
      <UpperCosmosAtmosphere />

      {/* 2. Left Edge Vertical Section Counter (01 / 02 / 03 / 04 / 05 as seen in reference) */}
      <div className="hidden 2xl:flex flex-col items-center gap-3 absolute left-6 3xl:left-10 top-1/2 -translate-y-1/2 z-30 font-mono text-[11px] tracking-widest pointer-events-none">
        <span className="text-[#5EEAD4] font-bold drop-shadow-[0_0_8px_rgba(94,234,212,0.8)]">
          01
        </span>
        <div className="w-[1px] h-6 bg-[#14B8A6]/50" />
        <span className="text-[#6F7C74]/60">02</span>
        <span className="text-[#6F7C74]/50">03</span>
        <span className="text-[#6F7C74]/40">04</span>
        <span className="text-[#6F7C74]/30">05</span>
      </div>

      {/* 3. Far-Right Edge Vertical Accent Text: "A SMARTER WAY TO STUDENT LIFE" */}
      <div className="hidden xl:flex flex-col items-center absolute right-6 3xl:right-10 top-1/2 -translate-y-1/2 z-30 font-mono text-[9px] tracking-[0.35em] text-[#6F7C74]/70 uppercase pointer-events-none [writing-mode:vertical-rl]">
        A · SMARTER · WAY · TO · STUDENT · LIFE
      </div>

      {/* 4. Main Hero Spatial Grid */}
      <div className="relative z-20 mx-auto w-full max-w-[min(95vw,2200px)] px-4 sm:px-8 lg:px-12 2xl:px-16 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 2xl:gap-10 items-center w-full">
          {/* Left Hero Storytelling Column */}
          <div className="hero-copy lg:col-span-5 2xl:col-span-5 text-center lg:text-left space-y-5 lg:space-y-6 z-20 pt-2 lg:pt-0 max-w-xl 2xl:max-w-2xl mx-auto lg:mx-0">
            {/* Mission & Stage Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#14B8A6]/30 bg-[#0C1411]/80 text-[10px] 2xl:text-xs font-semibold tracking-[0.25em] uppercase text-[#5EEAD4] backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse shadow-[0_0_6px_#5EEAD4]" />
              STUDY · BUILD · CONNECT · GROW
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(2.3rem,3.7vw,4.6rem)] font-black tracking-tight text-[#E8ECE7] leading-[1.05]">
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-[#5EEAD4] via-[#2DD4BF] to-[#A3AD7A] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(45,212,191,0.25)]">
                Operating System
              </span>
              <br />
              for Student Life.
            </h1>

            {/* Fluid Supporting Copy */}
            <p className="text-[clamp(0.92rem,1.05vw,1.2rem)] leading-relaxed text-[#A2ADA5] max-w-lg 2xl:max-w-xl mx-auto lg:mx-0 font-normal">
              Plan smarter. Learn deeper. Build projects. Connect with peers. Access resources.
              All in one beautiful, unified workspace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-0.5">
              <Link
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="inline-flex items-center justify-center gap-2 px-6 2xl:px-8 py-3.5 2xl:py-4 rounded-full bg-[#10705E] hover:bg-[#14B8A6] text-white text-sm 2xl:text-base font-bold shadow-[0_0_24px_rgba(20,184,166,0.35)] hover:shadow-[0_0_32px_rgba(94,234,212,0.55)] border border-[#2DD4BF]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>{isAuthenticated ? "Open Workspace" : "Get Started Free"}</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="#how-it-works"
                onClick={handleScrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2.5 px-5 2xl:px-7 py-3.5 2xl:py-4 rounded-full bg-[#0C1512]/80 text-[#E8ECE7] text-sm 2xl:text-base font-semibold border border-white/15 hover:border-[#14B8A6]/50 hover:bg-[#13221C] hover:text-white transition-all duration-200 backdrop-blur-md group"
              >
                <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#14B8A6] transition-colors">
                  <Play size={10} className="text-[#14B8A6] ml-0.5 fill-[#14B8A6]" />
                </div>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Social Proof & Trust: 4 student avatars + count */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-left">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full border-2 border-[#050908] bg-gradient-to-br from-teal-400 to-emerald-700 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  AK
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#050908] bg-gradient-to-br from-emerald-500 to-teal-800 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  SR
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#050908] bg-gradient-to-br from-teal-600 to-cyan-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  MN
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#050908] bg-gradient-to-br from-amber-600 to-emerald-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  PV
                </div>
              </div>
              <div className="text-xs text-[#A2ADA5]">
                <p className="font-semibold text-white">Join 10,000+ students</p>
                <p className="text-[11px] text-[#6F7C74]">building their future with StudentOS</p>
              </div>
            </div>

            {/* Subtle Quote from Reference */}
            <div className="pt-1 text-xs italic text-[#6F7C74] font-serif max-w-xs">
              &ldquo;More than a tool. A better student life.&rdquo;
            </div>
          </div>

          {/* Right Hero 3D Spatial Canvas (Dominant living ecosystem) */}
          <div
            className="lg:col-span-7 2xl:col-span-7 relative flex items-center justify-center w-full h-full min-h-[480px] lg:min-h-[clamp(520px,58vh,860px)]"
            style={{ overflow: "visible" }}
          >
            <EarthHero3D />
          </div>
        </div>
      </div>

      {/* 5. Cinematic Knowledge Universe Landscape (Student Terrace, Book Architecture, Glowing Open Volumes) */}
      <div className="absolute inset-x-0 bottom-0 z-10 w-full pointer-events-none overflow-hidden h-[clamp(280px,44vh,520px)]">
        <StudentSilhouette />
      </div>

      {/* 6. Bottom Trust Bar Matching Reference */}
      <div className="relative z-30 mx-auto w-full max-w-[min(95vw,2200px)] px-4 sm:px-8 lg:px-12 2xl:px-16 mt-0.5">
        <div className="pt-2.5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] 2xl:text-xs text-[#6F7C74] font-mono">
          {/* Scroll to Explore Link */}
          <a
            href="#problem"
            className="inline-flex items-center gap-2 text-[#A2ADA5] hover:text-[#5EEAD4] transition-colors group"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/10 group-hover:border-[#14B8A6] transition-colors">
              <ArrowDown size={11} className="animate-bounce text-[#14B8A6]" />
            </div>
            <span className="text-xs">Scroll to explore</span>
          </a>

          {/* Trusted by Students Everywhere with Institution Tags */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center">
            <span className="text-[10px] 2xl:text-[11px] tracking-[0.25em] text-[#6F7C74] uppercase font-bold">
              TRUSTED BY STUDENTS EVERYWHERE
            </span>
            <div className="flex items-center gap-3 sm:gap-4 tracking-wider uppercase font-bold text-[#A2ADA5]">
              <span className="hover:text-[#5EEAD4] transition-colors">IIT</span>
              <span className="hover:text-[#5EEAD4] transition-colors">NIT</span>
              <span className="hover:text-[#5EEAD4] transition-colors">BITS</span>
              <span className="hover:text-[#5EEAD4] transition-colors">VIT</span>
              <span className="hover:text-[#5EEAD4] transition-colors">IIIT</span>
              <span className="text-white/20 text-[10px] font-normal lowercase">and more...</span>
            </div>
          </div>

          {/* Authentic Made For Students Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0C1210] border border-[#14B8A6]/20 text-[#A3AD7A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] shadow-[0_0_6px_#5EEAD4]" />
            <span className="text-[10px] 2xl:text-xs tracking-wider uppercase font-bold text-[#E8ECE7]">
              MADE FOR STUDENTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
