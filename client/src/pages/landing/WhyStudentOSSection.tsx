import { Layout, GraduationCap, Network, Cpu, Compass, ShieldCheck } from "lucide-react";

interface Benefit {
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Layout;
}

const BENEFITS: Benefit[] = [
  {
    title: "One Workspace",
    subtitle: "Eliminate context switching",
    description:
      "Stop juggling 12 different browser tabs between task managers, group chats, cloud folders, and code repositories.",
    icon: Layout,
  },
  {
    title: "Built for Academic Cycles",
    subtitle: "Aligned with your semester",
    description:
      "Structured specifically around terms, exam weeks, lab submissions, coursework deadlines, and student projects.",
    icon: GraduationCap,
  },
  {
    title: "Connected Architecture",
    subtitle: "Everything talks to each other",
    description:
      "Tasks connect directly to projects. Resources link to specific subjects and semesters. Peer invitations tie to real workspaces.",
    icon: Network,
  },
  {
    title: "Intelligent Assistance",
    subtitle: "AI when and where it matters",
    description:
      "No invasive chatbots. AI is integrated directly where you need it to break down requirements, debug code, and summarize concepts.",
    icon: Cpu,
  },
  {
    title: "Localized Campus Discovery",
    subtitle: "Find peers, circles, and gear",
    description:
      "Discover active engineering and career circles. Buy and sell verified textbooks and lab equipment locally within your campus.",
    icon: Compass,
  },
  {
    title: "Private & Secure",
    subtitle: "Your academic data remains yours",
    description:
      "Private tasks and projects are strictly isolated with IDOR-hardened authentication and verified user-bound access.",
    icon: ShieldCheck,
  },
];

export default function WhyStudentOSSection() {
  return (
    <section id="why" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0C1210] border-b border-white/5 relative">
      <div className="mx-auto w-full max-w-[min(94vw,1800px)] relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111916] border border-[#78864A]/30 text-[11px] font-mono tracking-wider uppercase text-[#A3AD7A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#78864A]" />
            CORE PRINCIPLES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E8ECE7]">
            Why StudentOS.
            <br />
            <span className="text-[#A2ADA5] font-semibold text-2xl sm:text-3xl lg:text-4xl">
              Principles behind the operating system.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A2ADA5] leading-relaxed max-w-2xl mx-auto">
            Engineered to remove friction from student life so you can focus on building,
            learning, and connecting with peers.
          </p>
        </div>

        {/* 6-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#111916]/80 border border-white/5 hover:border-[#14B8A6]/30 hover:bg-[#17211C] shadow-lg shadow-black/30 transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20">
                  <Icon size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#E8ECE7]">{b.title}</h3>
                  <p className="text-xs font-semibold text-[#5EEAD4] mt-0.5">{b.subtitle}</p>
                </div>

                <p className="text-xs text-[#A2ADA5] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
