import { LayoutGrid, Users2, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    step: "01",
    title: "Organize",
    subtitle: "Consolidate your daily academic workflow",
    description:
      "Create tasks with real deadlines, track project sprints with your peers, and store lecture notes with course and semester filters.",
    icon: LayoutGrid,
    color: "#14B8A6",
    features: [
      "Priority-based task management",
      "Course project collaboration & progress",
      "Subject-indexed PDF and notes library",
    ],
  },
  {
    step: "02",
    title: "Connect",
    subtitle: "Engage with campus peers and circles",
    description:
      "Join specialized circles in engineering, AI/ML, and placement preparation. Buy or sell study gear directly within your campus network.",
    icon: Users2,
    color: "#5EEAD4",
    features: [
      "Categorized student communities",
      "Campus marketplace for books & hardware",
      "Team discovery for hackathons & labs",
    ],
  },
  {
    step: "03",
    title: "Grow",
    subtitle: "Accelerate your learning with AI and structure",
    description:
      "Use your intelligent AI assistant to break down difficult concepts, solve bugs, and stay ahead of deadlines throughout the semester.",
    icon: TrendingUp,
    color: "#A3AD7A",
    features: [
      "Workflow-aware AI study companion",
      "Unified deadline and invite alerts",
      "Portfolio-ready verified student profile",
    ],
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#080D0B] border-b border-white/5 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#14B8A6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[min(94vw,1800px)] relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111916] border border-[#78864A]/30 text-[11px] font-mono tracking-wider uppercase text-[#A3AD7A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#78864A]" />
            THE STUDENT JOURNEY
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E8ECE7]">
            How StudentOS works.
            <br />
            <span className="text-[#A2ADA5] font-semibold text-2xl sm:text-3xl lg:text-4xl">
              From daily organization to long-term academic growth.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A2ADA5] leading-relaxed max-w-2xl mx-auto">
            A three-stage framework designed around how real students actually plan,
            collaborate, and study.
          </p>
        </div>

        {/* 3-Step Connected Spatial Journey */}
        <div className="relative">
          {/* Luminous Connecting Track (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 -translate-y-12 h-[2px] bg-gradient-to-r from-[#14B8A6]/20 via-[#5EEAD4]/40 to-[#A3AD7A]/20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="relative p-8 rounded-3xl bg-[#0C1210]/90 border border-white/10 hover:border-[#14B8A6]/40 hover:bg-[#111916] shadow-xl shadow-black/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        style={{ color: s.color }}
                        className="text-2xl sm:text-3xl font-black font-mono tracking-tighter"
                      >
                        {s.step}
                      </span>

                      <div
                        style={{
                          backgroundColor: `${s.color}15`,
                          borderColor: `${s.color}30`,
                          color: s.color,
                        }}
                        className="flex items-center justify-center w-12 h-12 rounded-2xl border shadow-md"
                      >
                        <Icon size={22} />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-xl font-bold text-[#E8ECE7] group-hover:text-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#14B8A6] mt-1">
                      {s.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-[#A2ADA5] leading-relaxed mt-3">
                      {s.description}
                    </p>

                    {/* Feature List */}
                    <ul className="mt-6 space-y-2 border-t border-white/5 pt-4">
                      {s.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-[#E8ECE7]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5">
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#A2ADA5] group-hover:text-[#5EEAD4] transition-colors"
                    >
                      <span>Start with {s.title.toLowerCase()}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
