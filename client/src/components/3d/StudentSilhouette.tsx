import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import knowledgeLandscape from "../../assets/hero/knowledge-landscape.jpg";

/**
 * Knowledge Universe — Cinematic Academic Environment & Student Observation Terrace
 * 
 * Rebuilt to match the approved cinematic reference composition:
 * - Single natural student silhouette seated on a basalt observation ledge, looking up at the Earth
 * - Cohesive academic landscape where books form terraces, stepped platforms, and architectural structures
 * - Prominent open book with softly glowing illuminated parchment pages
 * - Subtle loose-leaf research pages drifting in low-gravity deep space
 * - Distant celestial bodies (ringed planetoid, moons) & academic horizon
 * - Inscribed "STUDENTOS BELONGS TO DREAMERS" on the terrace facet
 * - Integrated futuristic telemetry cube with holographic "DISCOVER · LEARN · BUILD · CONNECT · GROW"
 * - Dual cinematic rim lighting (teal from the Earth, subtle warm gold from the open book)
 * - Seamless atmospheric masking into the deep space void behind EarthHero3D
 */
export default function StudentSilhouette() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parallaxLayerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (parallaxLayerRef.current) {
        parallaxLayerRef.current.style.transform = `translate3d(${-currentX * 6}px, ${-currentY * 3}px, 0px)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="hero-environment-wrapper relative w-full h-full select-none pointer-events-none overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.95) 28%, black 45%, black 85%, rgba(0,0,0,0.8) 95%, black 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.95) 28%, black 45%, black 85%, rgba(0,0,0,0.8) 95%, black 100%)",
      }}
    >
      {/* 1. Volumetric Light Pools */}
      {/* Soft warm gold aura emanating from the prominent open book on the right */}
      <div className="absolute bottom-[20%] right-[24%] w-[380px] h-[160px] bg-[#C9B66B]/15 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDuration: "5s" }} />
      {/* Teal rim bounce light from the Earth illuminating the student's terrace */}
      <div className="absolute bottom-[24%] left-[28%] w-[320px] h-[140px] bg-[#14B8A6]/14 rounded-full blur-[75px] pointer-events-none" />
      {/* Subtle emerald atmospheric mist across the midground academic terraces */}
      <div className="absolute bottom-[14%] right-[48%] w-[420px] h-[100px] bg-[#2DD4BF]/8 rounded-full blur-[90px] pointer-events-none" />

      {/* 2. Main Cinematic Knowledge Landscape & Student Layer */}
      <div
        ref={parallaxLayerRef}
        className="relative w-full h-full will-change-transform"
      >
        <img
          src={knowledgeLandscape}
          alt="StudentOS Knowledge Universe Landscape"
          className="w-full h-full object-cover object-bottom filter brightness-[0.98] contrast-[1.05]"
          loading="eager"
          decoding="async"
        />

        {/* 3. Engraved Ledge Inscription: STUDENTOS BELONGS TO DREAMERS */}
        <div className="absolute left-[7%] sm:left-[8%] md:left-[9%] bottom-[24%] sm:bottom-[26%] md:bottom-[28%] -rotate-[13deg] font-mono select-none pointer-events-none opacity-80 mix-blend-screen">
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.32em] text-[#3D5A4F] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            STUDENTOS
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.32em] text-[#3D5A4F] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-0.5">
            BELONGS TO
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.32em] text-[#3D5A4F] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-0.5">
            DREAMERS
          </div>
        </div>

        {/* 4. Isometric Telemetry Cube Typography & Cyan Circuit Overlay */}
        <div className="absolute right-[8.5%] sm:right-[9.5%] md:right-[10.5%] bottom-[15%] sm:bottom-[17%] md:bottom-[19%] font-mono select-none pointer-events-none transform -skew-y-[25deg] opacity-90">
          <div className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold tracking-[0.28em] text-[#78864A]">
            DISCOVER
          </div>
          <div className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold tracking-[0.28em] text-[#9EA878] mt-0.5">
            LEARN
          </div>
          <div className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold tracking-[0.28em] text-[#14B8A6] mt-0.5">
            BUILD
          </div>
          <div className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold tracking-[0.28em] text-[#5EEAD4] mt-0.5">
            CONNECT
          </div>
          <div className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold tracking-[0.28em] text-[#E8ECE7] mt-0.5 drop-shadow-[0_0_8px_rgba(94,234,212,0.6)]">
            GROW
          </div>
        </div>

        {/* 5. Subtle Floating Loose-Leaf Pages & Academic Shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Drifting research paper 1 (midground left) */}
          <div
            className="absolute left-[36%] bottom-[42%] w-3.5 h-4.5 bg-gradient-to-br from-[#FFF9E6]/75 via-[#EFE8D0]/50 to-transparent border border-[#5EEAD4]/40 rounded-[1px] transform -rotate-12 shadow-[0_0_8px_rgba(94,234,212,0.3)] animate-[floatPaperA_14s_ease-in-out_infinite]"
          />
          {/* Drifting research paper 2 (midground center) */}
          <div
            className="absolute left-[47%] bottom-[50%] w-3 h-4 bg-gradient-to-br from-[#FFF]/65 via-[#C9B66B]/35 to-transparent border border-[#C9B66B]/40 rounded-[1px] transform rotate-16 shadow-[0_0_6px_rgba(201,182,107,0.25)] animate-[floatPaperB_18s_ease-in-out_infinite_2s]"
          />
          {/* Drifting research paper 3 (upper right) */}
          <div
            className="absolute right-[27%] bottom-[56%] w-2.5 h-3.5 bg-gradient-to-br from-[#FFF9E6]/70 via-[#14B8A6]/40 to-transparent border border-[#5EEAD4]/50 rounded-[1px] transform -rotate-24 shadow-[0_0_8px_rgba(94,234,212,0.35)] animate-[floatPaperA_16s_ease-in-out_infinite_4s]"
          />
        </div>

        {/* 6. Soft Open Book Golden Luminous Pulse */}
        <div
          className="absolute right-[22%] bottom-[25%] w-28 sm:w-36 md:w-44 h-16 sm:h-20 bg-radial from-[#FFF9E6]/25 via-[#C9B66B]/15 to-transparent rounded-full blur-xl pointer-events-none mix-blend-screen animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Keyframe styles for delicate low-gravity drifting */}
      <style>{`
        @keyframes floatPaperA {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-12deg); }
          50% { transform: translate3d(-6px, -14px, 0) rotate(-7deg); }
        }
        @keyframes floatPaperB {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(16deg); }
          50% { transform: translate3d(8px, -18px, 0) rotate(22deg); }
        }
      `}</style>
    </div>
  );
}
