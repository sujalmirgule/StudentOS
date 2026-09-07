import { useMemo } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * UpperCosmosAtmosphere — Deep Cinematic Space & Upper Atmospheric Architecture
 * 
 * Enriches the upper half of the hero section without cluttering:
 * - Deep space dark teal haze & volumetric atmospheric dust (no bright wallpaper/galaxies)
 * - Sparse, layered star field with subtle independent twinkle (avoiding the left headline area)
 * - Extended upper orbital trajectories fading naturally into the cosmic void
 * - 2-3 distant, subtle celestial bodies (high distant moon, ringed planetoid, tiny asteroid)
 * - Soft diagonal volumetric light shaft breaking the flat darkness
 * - Long, desynchronized animation cycles (25-56s) for imperceptible cinematic life
 * - Complete respect for prefers-reduced-motion
 */
export default function UpperCosmosAtmosphere() {
  const prefersReduced = usePrefersReducedMotion();

  // Handcrafted sparse stars carefully positioned in upper & right quadrant
  // Specifically excludes the left headline box (x: 0-38%, y: 22-75%)
  const stars = useMemo(
    () => [
      // Background faint stars (tiny, opacity 0.25 - 0.45)
      { id: "bg-1", x: 42, y: 6, size: 1.0, opacity: 0.35, color: "#E8ECE7", dur: "9s", delay: "0s" },
      { id: "bg-2", x: 49, y: 11, size: 1.2, opacity: 0.40, color: "#D6E5DF", dur: "11s", delay: "2s" },
      { id: "bg-3", x: 57, y: 7, size: 0.9, opacity: 0.30, color: "#E8ECE7", dur: "8s", delay: "4s" },
      { id: "bg-4", x: 63, y: 14, size: 1.1, opacity: 0.38, color: "#D6E5DF", dur: "13s", delay: "1s" },
      { id: "bg-5", x: 71, y: 8, size: 1.0, opacity: 0.32, color: "#E8ECE7", dur: "10s", delay: "3s" },
      { id: "bg-6", x: 77, y: 18, size: 1.2, opacity: 0.42, color: "#D6E5DF", dur: "12s", delay: "5s" },
      { id: "bg-7", x: 86, y: 9, size: 0.9, opacity: 0.28, color: "#E8ECE7", dur: "14s", delay: "2s" },
      { id: "bg-8", x: 92, y: 15, size: 1.1, opacity: 0.36, color: "#D6E5DF", dur: "9s", delay: "6s" },
      { id: "bg-9", x: 95, y: 28, size: 1.0, opacity: 0.30, color: "#E8ECE7", dur: "11s", delay: "1s" },
      { id: "bg-10", x: 38, y: 8, size: 1.0, opacity: 0.30, color: "#E8ECE7", dur: "10s", delay: "4s" },
      { id: "bg-11", x: 26, y: 8, size: 0.9, opacity: 0.25, color: "#E8ECE7", dur: "12s", delay: "3s" }, // high above headline
      { id: "bg-12", x: 15, y: 6, size: 0.8, opacity: 0.22, color: "#E8ECE7", dur: "15s", delay: "5s" }, // very high left near navbar

      // Mid-depth stars (slightly brighter, opacity 0.50 - 0.70)
      { id: "md-1", x: 46, y: 16, size: 1.6, opacity: 0.60, color: "#F0F5F2", dur: "7s", delay: "1s" },
      { id: "md-2", x: 54, y: 9, size: 1.5, opacity: 0.55, color: "#E8ECE7", dur: "11s", delay: "3s" },
      { id: "md-3", x: 68, y: 12, size: 1.7, opacity: 0.65, color: "#F0F5F2", dur: "9s", delay: "2s" },
      { id: "md-4", x: 83, y: 7, size: 1.5, opacity: 0.58, color: "#E8ECE7", dur: "13s", delay: "4s" },
      { id: "md-5", x: 90, y: 22, size: 1.6, opacity: 0.62, color: "#F0F5F2", dur: "8s", delay: "0s" },

      // Subtle Teal Accent Stars (with faint cyan glow)
      { id: "ac-1", x: 51, y: 13, size: 2.0, opacity: 0.80, color: "#5EEAD4", glow: true, dur: "6s", delay: "2s" },
      { id: "ac-2", x: 74, y: 15, size: 1.8, opacity: 0.75, color: "#2DD4BF", glow: true, dur: "8s", delay: "4s" },
      { id: "ac-3", x: 88, y: 12, size: 2.0, opacity: 0.70, color: "#5EEAD4", glow: true, dur: "10s", delay: "1s" },

      // Subtle Warm Amber Stars (warm wisdom accent matching the open books)
      { id: "wm-1", x: 60, y: 11, size: 1.6, opacity: 0.65, color: "#E8D9A8", dur: "9s", delay: "3s" },
      { id: "wm-2", x: 79, y: 6, size: 1.4, opacity: 0.55, color: "#DFCF97", dur: "12s", delay: "5s" },
    ],
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Ultra-Subtle Deep Space Gradient (almost black top -> deep teal mid -> soft dark void) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#030605] via-[#050B09] to-transparent opacity-90"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        }}
      />

      {/* 2. Volumetric Dark Teal Nebula Haze & Cosmic Dust Layers */}
      {/* Primary deep teal haze pool centered over upper-right space */}
      <div
        className={`absolute -top-16 right-[18%] w-[58vw] max-w-[960px] h-[48vh] max-h-[580px] bg-[#0C241D]/24 rounded-full blur-[130px] ${
          prefersReduced ? "" : "animate-[hazeDriftA_36s_ease-in-out_infinite]"
        }`}
      />
      {/* Secondary soft sage/moss atmospheric dust cloud */}
      <div
        className={`absolute top-4 right-[38%] w-[42vw] max-w-[700px] h-[38vh] max-h-[440px] bg-[#14B8A6]/10 rounded-full blur-[110px] ${
          prefersReduced ? "" : "animate-[hazeDriftB_44s_ease-in-out_infinite_4s]"
        }`}
      />
      {/* Delicate upper-left cosmic mist (high above headline area) */}
      <div
        className="absolute -top-10 left-[24%] w-[32vw] max-w-[500px] h-[30vh] max-h-[350px] bg-[#0E2820]/14 rounded-full blur-[100px]"
      />

      {/* 3. Subtle Volumetric Diagonal Light Shaft from Upper-Right */}
      <div
        className="absolute top-0 right-[12%] w-[45vw] max-w-[800px] h-[65vh] pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: "linear-gradient(215deg, rgba(94,234,212,0.06) 0%, rgba(20,184,166,0.025) 35%, rgba(120,134,74,0.01) 60%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      {/* 4. Extended Orbital Trajectories into Upper Deep Space (SVG Vectors) */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        <defs>
          <linearGradient id="upperOrbitFadeA" x1="600" y1="50" x2="1150" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#5EEAD4" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#14B8A6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="upperOrbitFadeB" x1="1000" y1="60" x2="1450" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78864A" stopOpacity="0.0" />
            <stop offset="35%" stopColor="#5EEAD4" stopOpacity="0.15" />
            <stop offset="75%" stopColor="#14B8A6" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.0" />
          </linearGradient>

          <radialGradient id="moonShadeGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1E332B" />
            <stop offset="60%" stopColor="#0B1511" />
            <stop offset="100%" stopColor="#040806" />
          </radialGradient>

          <radialGradient id="planetoidShadeGrad" cx="28%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#253D32" />
            <stop offset="50%" stopColor="#12221B" />
            <stop offset="85%" stopColor="#070E0B" />
            <stop offset="100%" stopColor="#030604" />
          </radialGradient>
        </defs>

        {/* High Celestial Resonance Orbit Arc 1 (Sweeps across the upper cosmos) */}
        <path
          d="M 620,60 C 740,110 920,180 1120,380"
          stroke="url(#upperOrbitFadeA)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />

        {/* High Celestial Resonance Orbit Arc 2 (Upper-right distant trajectory) */}
        <path
          d="M 1420,100 C 1300,160 1140,240 1020,360"
          stroke="url(#upperOrbitFadeB)"
          strokeWidth="1.0"
          strokeDasharray="6 10"
        />

        {/* Tiny Data Pulse Node traveling along distant orbit */}
        {!prefersReduced && (
          <circle
            cx="860"
            cy="155"
            r="1.5"
            fill="#5EEAD4"
            className="animate-pulse"
            style={{
              filter: "drop-shadow(0 0 6px rgba(94,234,212,0.8))",
              animationDuration: "4s",
            }}
          />
        )}
      </svg>

      {/* 5. Sparse Star Field (Precisely distributed, non-cluttered) */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${prefersReduced ? "" : "animate-pulse"}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: star.glow ? `0 0 6px ${star.color}` : "none",
              animationDuration: star.dur,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* 6. Distant Celestial Objects (Subtle, non-competing, spatial depth) */}

      {/* A. Upper-Left Distant Celestial Moon (High-altitude, tiny, x: ~43%, y: ~11%) */}
      <div
        className={`absolute left-[43%] top-[11%] pointer-events-none ${
          prefersReduced ? "" : "animate-[celestialFloatA_48s_ease-in-out_infinite]"
        }`}
      >
        <div className="relative w-4 h-4 rounded-full shadow-[0_0_12px_rgba(94,234,212,0.15)]">
          {/* Sphere body */}
          <div
            className="w-full h-full rounded-full border border-[#5EEAD4]/25"
            style={{ background: "radial-gradient(circle at 35% 35%, #182B23 0%, #09120E 65%, #030604 100%)" }}
          />
          {/* Subtle teal crescent highlight facing toward the Earth */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: "inset -1.5px -1.5px 3px rgba(94, 234, 212, 0.4)",
            }}
          />
        </div>
      </div>

      {/* B. Upper-Right Distant Ringed Planetoid (Subtle, elegant, x: ~83%, y: ~13%) */}
      <div
        className={`absolute right-[16%] top-[13%] pointer-events-none ${
          prefersReduced ? "" : "animate-[celestialFloatB_56s_ease-in-out_infinite]"
        }`}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Delicate faint tilted ring behind/around planetoid */}
          <div
            className="absolute w-10 h-3 border border-[#5EEAD4]/25 rounded-full transform -rotate-[26deg] pointer-events-none"
            style={{
              boxShadow: "0 0 8px rgba(94,234,212,0.12)",
            }}
          />
          {/* Planetoid body */}
          <div
            className="relative z-10 w-5 h-5 rounded-full border border-[#14B8A6]/30 shadow-[0_0_14px_rgba(20,184,166,0.2)]"
            style={{
              background: "radial-gradient(circle at 30% 30%, #20352B 0%, #0D1713 60%, #030605 100%)",
            }}
          />
        </div>
      </div>

      {/* C. Small Distant Asteroid 1 (High upper right, x: ~74%, y: ~9%) */}
      <div
        className={`absolute right-[25%] top-[9%] pointer-events-none ${
          prefersReduced ? "" : "animate-[celestialFloatA_42s_ease-in-out_infinite_3s]"
        }`}
      >
        <div
          className="w-2 h-2 bg-[#121F19] border border-[#5EEAD4]/30 transform rotate-45 shadow-[0_0_6px_rgba(94,234,212,0.2)]"
          style={{ clipPath: "polygon(30% 0%, 85% 15%, 100% 70%, 65% 100%, 15% 85%, 0% 40%)" }}
        />
      </div>

      {/* D. Small Distant Asteroid 2 (Near upper orbit trajectory, x: ~55%, y: ~17%) */}
      <div
        className={`absolute left-[54%] top-[17%] pointer-events-none ${
          prefersReduced ? "" : "animate-[celestialFloatB_38s_ease-in-out_infinite_6s]"
        }`}
      >
        <div
          className="w-2.5 h-2 bg-[#0E1B15] border border-[#14B8A6]/25 transform -rotate-12"
          style={{ clipPath: "polygon(20% 0%, 90% 25%, 75% 100%, 10% 80%)" }}
        />
      </div>

      {/* Keyframe Styles for imperceptible cosmic motion */}
      <style>{`
        @keyframes hazeDriftA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-15px, 8px, 0) scale(1.03); }
        }
        @keyframes hazeDriftB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(18px, -10px, 0) scale(0.98); }
        }
        @keyframes celestialFloatA {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-4px, -6px, 0); }
        }
        @keyframes celestialFloatB {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(5px, -5px, 0); }
        }
      `}</style>
    </div>
  );
}
