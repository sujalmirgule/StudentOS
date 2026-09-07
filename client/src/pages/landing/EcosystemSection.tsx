import { Link } from "react-router-dom";
import {
  CheckSquare,
  FolderKanban,
  BookOpen,
  Users,
  Sparkles,
  ShoppingBag,
  UserCheck,
  Bell,
  ArrowUpRight,
} from "lucide-react";

interface EcosystemPillar {
  title: string;
  tagline: string;
  description: string;
  path: string;
  icon: typeof CheckSquare;
  tag: string;
  color: string;
}

const PILLARS: EcosystemPillar[] = [
  {
    title: "Tasks & Deadlines",
    tagline: "Know what needs to happen next.",
    description:
      "Track assignments, lab submissions, and personal goals with priorities, status pipelines, and deadline reminders.",
    path: "/tasks",
    icon: CheckSquare,
    tag: "Productivity",
    color: "#14B8A6",
  },
  {
    title: "Projects Workspace",
    tagline: "Turn ideas into structured work.",
    description:
      "Coordinate student hackathon builds, research papers, and software projects with milestone tracking and tech stack tags.",
    path: "/projects",
    icon: FolderKanban,
    tag: "Collaboration",
    color: "#5EEAD4",
  },
  {
    title: "Resource Library",
    tagline: "Keep useful knowledge within reach.",
    description:
      "Organized course notes, verified PDFs, syllabus links, and subject guides with quick bookmarking and semester filters.",
    path: "/resources",
    icon: BookOpen,
    tag: "Academics",
    color: "#A3AD7A",
  },
  {
    title: "Student Communities",
    tagline: "Find people building and learning with you.",
    description:
      "Join specialized circles in AI/ML, Web Dev, Placement Prep, and college clubs to share posts, queries, and team opportunities.",
    path: "/communities",
    icon: Users,
    tag: "Network",
    color: "#78864A",
  },
  {
    title: "AI Study Copilot",
    tagline: "Think, plan, and solve faster.",
    description:
      "An intelligent workflow assistant that helps you break down complex projects, debug code, and prep for upcoming exams.",
    path: "/ai",
    icon: Sparkles,
    tag: "Intelligence",
    color: "#5EEAD4",
  },
  {
    title: "Campus Marketplace",
    tagline: "Buy, sell, and exchange student essentials.",
    description:
      "Direct campus exchange for engineering textbooks, calculators, hardware components, and dorm supplies at student-friendly prices.",
    path: "/marketplace",
    icon: ShoppingBag,
    tag: "Exchange",
    color: "#B7C18F",
  },
  {
    title: "Verified Student Profile",
    tagline: "Your verified academic identity.",
    description:
      "Showcase your semester, degree, technical skills, interests, and GitHub / LinkedIn links in one clean profile.",
    path: "/profile",
    icon: UserCheck,
    tag: "Identity",
    color: "#14B8A6",
  },
  {
    title: "Unified Notifications",
    tagline: "Never miss a deadline or peer invite.",
    description:
      "Consolidated alerts for task deadlines, project collaborations, and community updates without the noise of random chat apps.",
    path: "/notifications",
    icon: Bell,
    tag: "Awareness",
    color: "#A3AD7A",
  },
];

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0C1210] border-b border-white/5 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#14B8A6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[min(94vw,2000px)] relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111916] border border-[#14B8A6]/30 text-[11px] font-mono tracking-wider uppercase text-[#5EEAD4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
            WHAT STUDENTOS CONNECTS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E8ECE7]">
            One connected ecosystem.
            <br />
            <span className="text-[#A2ADA5] font-semibold text-2xl sm:text-3xl lg:text-4xl">
              Everything for student life in one environment.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A2ADA5] leading-relaxed max-w-2xl mx-auto">
            Instead of stitching together 6 different consumer apps, StudentOS provides
            cohesive, native modules designed specifically for academic workflows.
          </p>
        </div>

        {/* 8-Pillar Spatial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={idx}
                to={pillar.path}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-[#111916]/80 border border-white/8 hover:border-[#14B8A6]/40 hover:bg-[#17211C] shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-[#14B8A6]/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        borderColor: `${pillar.color}35`,
                        color: pillar.color,
                      }}
                      className="flex items-center justify-center w-10 h-10 rounded-2xl border transition-transform group-hover:scale-110"
                    >
                      <Icon size={18} />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A2ADA5] px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-base font-bold text-[#E8ECE7] group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#14B8A6] mt-0.5">
                    {pillar.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#A2ADA5] leading-relaxed mt-2.5">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer Link Action */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#A2ADA5] group-hover:text-[#5EEAD4] transition-colors">
                  <span>Explore module</span>
                  <ArrowUpRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
