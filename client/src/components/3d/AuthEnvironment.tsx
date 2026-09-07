import { useMemo } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface AuthEnvironmentProps {
  /** "login" = seated student returning | "signup" = standing student beginning */
  variant: "login" | "signup";
}

/**
 * AuthEnvironment — Full-Screen Cinematic StudentOS Universe
 *
 * Multi-layered cinematic environment for authentication pages.
 * The form exists INSIDE the StudentOS universe, not on top of a generic background.
 *
 * Depth layers:
 * L01 → Deep Space base gradient
 * L02 → Teal nebula atmosphere & cosmic dust
 * L03 → Sparse star field (multiple depths)
 * L04 → Distant celestial objects (planets, asteroids)
 * L05 → Cinematic environment image (book landscape, student, open book)
 * L06 → Floating research pages (CSS animated, independent timing)
 * L07 → Volumetric lighting & atmospheric interaction
 * L08 → Foreground terrain overlay inscriptions (STUDENTOS BELONGS TO DREAMERS)
 * L09 → Telemetry cube overlay
 */
export default function AuthEnvironment({ variant }: AuthEnvironmentProps) {
  const prefersReduced = usePrefersReducedMotion();

  // Sparse star field — carefully positioned to avoid the right form card area (right 38%)
  const stars = useMemo(
    () => [
      // Background faint stars
      { id: "s1", x: 8, y: 8, sz: 1.0, op: 0.30, c: "#E8ECE7", dur: "10s", del: "0s" },
      { id: "s2", x: 14, y: 15, sz: 1.2, op: 0.38, c: "#D6E5DF", dur: "12s", del: "2s" },
      { id: "s3", x: 22, y: 6, sz: 0.9, op: 0.28, c: "#E8ECE7", dur: "9s", del: "4s" },
      { id: "s4", x: 32, y: 12, sz: 1.1, op: 0.35, c: "#D6E5DF", dur: "14s", del: "1s" },
      { id: "s5", x: 42, y: 9, sz: 1.0, op: 0.32, c: "#E8ECE7", dur: "11s", del: "3s" },
      { id: "s6", x: 50, y: 7, sz: 1.2, op: 0.40, c: "#D6E5DF", dur: "13s", del: "5s" },
      { id: "s7", x: 58, y: 14, sz: 0.9, op: 0.30, c: "#E8ECE7", dur: "8s", del: "2s" },
      { id: "s8", x: 18, y: 22, sz: 1.0, op: 0.33, c: "#E8ECE7", dur: "10s", del: "6s" },
      { id: "s9", x: 36, y: 18, sz: 1.1, op: 0.36, c: "#D6E5DF", dur: "15s", del: "1s" },
      { id: "s10", x: 46, y: 20, sz: 1.0, op: 0.28, c: "#E8ECE7", dur: "9s", del: "4s" },
      // Mid-depth brighter stars
      { id: "m1", x: 12, y: 11, sz: 1.6, op: 0.58, c: "#F0F5F2", dur: "7s", del: "1s" },
      { id: "m2", x: 28, y: 8, sz: 1.5, op: 0.55, c: "#E8ECE7", dur: "11s", del: "3s" },
      { id: "m3", x: 44, y: 13, sz: 1.7, op: 0.62, c: "#F0F5F2", dur: "9s", del: "2s" },
      { id: "m4", x: 54, y: 10, sz: 1.5, op: 0.56, c: "#E8ECE7", dur: "13s", del: "4s" },
      // Teal accent stars
      { id: "a1", x: 20, y: 14, sz: 2.0, op: 0.75, c: "#5EEAD4", glow: true, dur: "6s", del: "2s" },
      { id: "a2", x: 48, y: 8, sz: 1.8, op: 0.70, c: "#2DD4BF", glow: true, dur: "8s", del: "4s" },
      // Warm amber accents
      { id: "w1", x: 38, y: 11, sz: 1.5, op: 0.60, c: "#E8D9A8", dur: "10s", del: "3s" },
      { id: "w2", x: 16, y: 19, sz: 1.3, op: 0.50, c: "#DFCF97", dur: "12s", del: "5s" },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* L01: Deep Space Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020504] via-[#050908] to-[#07100D]" />

      {/* L02: Teal Nebula Atmosphere & Cosmic Dust */}
      <div
        className={`absolute top-[5%] left-[15%] w-[55vw] max-w-[900px] h-[50vh] max-h-[600px] bg-[#0B3D36]/18 rounded-full blur-[120px] ${
          prefersReduced ? "" : "animate-[authHazeA_38s_ease-in-out_infinite]"
        }`}
      />
      <div
        className={`absolute top-[12%] right-[20%] w-[45vw] max-w-[750px] h-[42vh] max-h-[500px] bg-[#14B8A6]/10 rounded-full blur-[100px] ${
          prefersReduced ? "" : "animate-[authHazeB_46s_ease-in-out_infinite_5s]"
        }`}
      />
      <div className="absolute bottom-[10%] left-[25%] w-[38vw] max-w-[600px] h-[30vh] max-h-[350px] bg-[#0E2820]/12 rounded-full blur-[90px]" />

      {/* Subtle diagonal volumetric light shaft from upper-left */}
      <div
        className="absolute top-0 left-[8%] w-[50vw] max-w-[850px] h-[60vh] pointer-events-none opacity-35 mix-blend-screen"
        style={{
          background: "linear-gradient(155deg, rgba(94,234,212,0.05) 0%, rgba(20,184,166,0.02) 40%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />

      {/* L03: Sparse Star Field */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className={`absolute rounded-full ${prefersReduced ? "" : "animate-pulse"}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.sz}px`,
              height: `${s.sz}px`,
              backgroundColor: s.c,
              opacity: s.op,
              boxShadow: s.glow ? `0 0 6px ${s.c}` : "none",
              animationDuration: s.dur,
              animationDelay: s.del,
            }}
          />
        ))}
      </div>

      {/* L05: Cinematic Environment Image (Full-bleed, masked) */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.7) 22%, black 40%, black 80%, rgba(0,0,0,0.85) 92%, rgba(0,0,0,0.6) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.7) 22%, black 40%, black 80%, rgba(0,0,0,0.85) 92%, rgba(0,0,0,0.6) 100%)",
        }}
      >
        <img
          src={variant === "login"
            ? new URL("../../assets/hero/auth-login-env.jpg", import.meta.url).href
            : new URL("../../assets/hero/auth-signup-env.jpg", import.meta.url).href
          }
          alt={variant === "login" ? "StudentOS Login Universe" : "StudentOS Signup Universe"}
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] saturate-[1.12]"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* L06: Floating Research Pages (independent CSS animation) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Page 1 — foreground left, slow drift */}
        <div
          className={`absolute left-[14%] top-[38%] w-4 h-5 bg-gradient-to-br from-[#FFF9E6]/70 via-[#EFE8D0]/45 to-transparent border border-[#5EEAD4]/35 rounded-[1px] shadow-[0_0_8px_rgba(94,234,212,0.2)] ${
            prefersReduced ? "" : "animate-[authPageA_16s_ease-in-out_infinite]"
          }`}
          style={{ transform: "rotate(-15deg)" }}
        />
        {/* Page 2 — midground center, different timing */}
        <div
          className={`absolute left-[38%] top-[30%] w-3 h-4 bg-gradient-to-br from-[#FFF]/60 via-[#C9B66B]/30 to-transparent border border-[#C9B66B]/35 rounded-[1px] shadow-[0_0_6px_rgba(201,182,107,0.2)] ${
            prefersReduced ? "" : "animate-[authPageB_21s_ease-in-out_infinite_3s]"
          }`}
          style={{ transform: "rotate(18deg)" }}
        />
        {/* Page 3 — upper center, slow */}
        <div
          className={`absolute left-[28%] top-[20%] w-2.5 h-3.5 bg-gradient-to-br from-[#FFF9E6]/55 via-[#14B8A6]/25 to-transparent border border-[#5EEAD4]/40 rounded-[1px] shadow-[0_0_6px_rgba(94,234,212,0.25)] ${
            prefersReduced ? "" : "animate-[authPageA_13s_ease-in-out_infinite_6s]"
          }`}
          style={{ transform: "rotate(-22deg)" }}
        />
        {/* Page 4 — background right-center, longest cycle */}
        <div
          className={`absolute left-[52%] top-[44%] w-3.5 h-4.5 bg-gradient-to-br from-[#FFF9E6]/50 via-[#EFE8D0]/30 to-transparent border border-[#C9B66B]/30 rounded-[1px] shadow-[0_0_5px_rgba(201,182,107,0.15)] ${
            prefersReduced ? "" : "animate-[authPageB_24s_ease-in-out_infinite_8s]"
          }`}
          style={{ transform: "rotate(12deg)" }}
        />
      </div>

      {/* L07: Atmospheric open book warm glow (subtle, not a spotlight) */}
      <div
        className={`absolute ${variant === "login" ? "left-[38%] top-[42%]" : "left-[40%] top-[38%]"} w-48 h-28 bg-radial from-[#E8DFAF]/18 via-[#D6C58A]/10 to-transparent rounded-full blur-2xl mix-blend-screen ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{ animationDuration: "8s" }}
      />

      {/* L08: Terrain Inscription — STUDENTOS BELONGS TO DREAMERS */}
      <div className="absolute left-[4%] sm:left-[5%] bottom-[8%] sm:bottom-[10%] -rotate-[10deg] font-mono opacity-60 mix-blend-screen">
        <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.35em] text-[#3D5A4F] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          STUDENTOS
        </div>
        <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.35em] text-[#3D5A4F] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-0.5">
          BELONGS TO
        </div>
        <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.35em] text-[#3D5A4F] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-0.5">
          DREAMERS
        </div>
      </div>

      {/* L09: Isometric Telemetry Cube (bottom-right, environmental artifact) */}
      <div className="absolute right-[3%] sm:right-[4%] bottom-[6%] sm:bottom-[8%] font-mono opacity-70 hidden md:block">
        <div className="relative w-20 h-24">
          {/* Cube faces via CSS transforms */}
          <svg viewBox="0 0 100 130" fill="none" className="w-full h-full">
            {/* Top face */}
            <polygon points="50,8 92,30 50,52 8,30" fill="#12231C" stroke="#5EEAD4" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Left face */}
            <polygon points="8,30 50,52 50,110 8,88" fill="#0A1510" stroke="#14B8A6" strokeWidth="0.8" strokeOpacity="0.3" />
            {/* Right face */}
            <polygon points="50,52 92,30 92,88 50,110" fill="#0E1B15" stroke="#14B8A6" strokeWidth="0.8" strokeOpacity="0.3" />
            {/* Center vertical edge */}
            <line x1="50" y1="52" x2="50" y2="110" stroke="#5EEAD4" strokeWidth="1.2" strokeOpacity="0.6" />
          </svg>
          {/* Cube text on right face */}
          <div className="absolute right-1 top-[38%] transform -skew-y-[25deg] space-y-0.5">
            <div className="text-[6px] font-bold tracking-[0.2em] text-[#78864A]">DISCOVER</div>
            <div className="text-[6px] font-bold tracking-[0.2em] text-[#9EA878]">LEARN</div>
            <div className="text-[6px] font-bold tracking-[0.2em] text-[#14B8A6]">BUILD</div>
            <div className="text-[6px] font-bold tracking-[0.2em] text-[#5EEAD4]">CONNECT</div>
            <div className="text-[6px] font-bold tracking-[0.2em] text-[#E8ECE7] drop-shadow-[0_0_6px_rgba(94,234,212,0.5)]">GROW</div>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/5">
        <div className="mx-auto max-w-[1800px] px-4 sm:px-8 lg:px-12 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6F7C74] font-mono">
          <span className="tracking-[0.25em] uppercase font-semibold">
            STUDY · BUILD · CONNECT · GROW
          </span>
          <span className="tracking-[0.15em] uppercase text-[#5B6B63]">
            A SMARTER WAY TO STUDENT LIFE
          </span>
        </div>
      </div>

      {/* Keyframes for independent motion */}
      <style>{`
        @keyframes authHazeA {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-12px, 6px, 0) scale(1.02); }
        }
        @keyframes authHazeB {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(14px, -8px, 0) scale(0.98); }
        }
        @keyframes authPageA {
          0%, 100% { transform: translate3d(0,0,0) rotate(-15deg); }
          50% { transform: translate3d(-5px, -12px, 0) rotate(-9deg); }
        }
        @keyframes authPageB {
          0%, 100% { transform: translate3d(0,0,0) rotate(18deg); }
          50% { transform: translate3d(7px, -16px, 0) rotate(24deg); }
        }
      `}</style>
    </div>
  );
}
