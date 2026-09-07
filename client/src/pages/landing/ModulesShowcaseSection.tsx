import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckSquare,
  FolderKanban,
  Users,
  BookOpen,
  ShoppingBag,
  ArrowRight,
  Clock,
  FileText,
} from "lucide-react";

interface ShowcaseModule {
  id: string;
  title: string;
  badge: string;
  headline: string;
  description: string;
  path: string;
  icon: typeof CheckSquare;
  preview: React.ReactNode;
}

export default function ModulesShowcaseSection() {
  const [activeTab, setActiveTab] = useState<string>("tasks");

  const MODULES: ShowcaseModule[] = [
    {
      id: "tasks",
      title: "Smart Tasks",
      badge: "Core Productivity",
      headline: "Prioritize deadlines without the mental overload.",
      description:
        "Manage assignments, labs, and personal study sessions with priority tags, status columns (Todo, In Progress, Completed), and calendar deadlines.",
      path: "/tasks",
      icon: CheckSquare,
      preview: (
        <div className="space-y-3 font-sans">
          {/* Mock Task Item 1 */}
          <div className="p-3.5 rounded-2xl bg-[#111916] border border-[#14B8A6]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-md border-2 border-[#14B8A6] flex items-center justify-center bg-[#14B8A6]/10">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#14B8A6]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#E8ECE7]">Distributed Systems Lab 4</p>
                <p className="text-[10px] text-[#A2ADA5]">Raft consensus algorithm implementation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                Urgent
              </span>
              <span className="text-[10px] text-[#6F7C74] font-mono flex items-center gap-1">
                <Clock size={11} /> Tomorrow
              </span>
            </div>
          </div>

          {/* Mock Task Item 2 */}
          <div className="p-3.5 rounded-2xl bg-[#111916] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-md border border-white/20" />
              <div>
                <p className="text-xs font-bold text-[#E8ECE7]">Compiler Design Parser</p>
                <p className="text-[10px] text-[#A2ADA5]">LR(1) grammar parse table generation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-[#14B8A6]/10 text-[#5EEAD4] border border-[#14B8A6]/20">
                In Progress
              </span>
              <span className="text-[10px] text-[#6F7C74] font-mono flex items-center gap-1">
                <Clock size={11} /> Sep 12
              </span>
            </div>
          </div>

          {/* Mock Task Item 3 */}
          <div className="p-3.5 rounded-2xl bg-[#111916] border border-white/5 opacity-60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <span className="text-emerald-400 text-[10px]">✓</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#A2ADA5] line-through">DBMS Normalization Notes</p>
                <p className="text-[10px] text-[#6F7C74]">3NF and BCNF decomposition</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Done</span>
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projects Hub",
      badge: "Team Collaboration",
      headline: "Turn ideas into structured, team-ready projects.",
      description:
        "Track software builds, engineering hackathons, and research projects with milestone sliders, tech stack tags, and teammate roles.",
      path: "/projects",
      icon: FolderKanban,
      preview: (
        <div className="p-4 rounded-2xl bg-[#111916] border border-[#14B8A6]/30 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[10px] font-mono text-[#5EEAD4] uppercase font-bold">
                Active Project
              </span>
              <h4 className="text-sm font-bold text-[#E8ECE7] mt-1.5">Autonomous Quadcopter Drone</h4>
              <p className="text-[11px] text-[#A2ADA5]">ROS2 node navigation & obstacle avoidance</p>
            </div>
            <span className="text-sm font-black font-mono text-[#14B8A6]">65%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#14B8A6] to-[#A3AD7A] rounded-full w-[65%]" />
          </div>

          {/* Tech Stack & Team */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono text-[#E8ECE7] border border-white/5">C++</span>
              <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono text-[#E8ECE7] border border-white/5">ROS2</span>
              <span className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono text-[#E8ECE7] border border-white/5">Python</span>
            </div>
            <span className="text-[10px] text-[#A2ADA5] font-mono">3 Contributors</span>
          </div>
        </div>
      ),
    },
    {
      id: "resources",
      title: "Resource Library",
      badge: "Knowledge Sharing",
      headline: "Access and organize verified academic resources.",
      description:
        "Index lecture notes, verified question banks, and research links by subject and semester. One-click bookmarking for exam revision.",
      path: "/resources",
      icon: BookOpen,
      preview: (
        <div className="space-y-2.5">
          <div className="p-3 rounded-2xl bg-[#111916] border border-[#14B8A6]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#E8ECE7]">Operating Systems Summary PDF</p>
                <p className="text-[10px] text-[#A2ADA5]">Processes, Threads, and Deadlocks • Sem 5</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#5EEAD4] px-2 py-0.5 rounded bg-[#14B8A6]/10">Verified</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#111916] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#E8ECE7]">Data Structures Cheatsheet</p>
                <p className="text-[10px] text-[#A2ADA5]">Binary Trees, Red-Black, AVL, Heaps • Sem 3</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#A2ADA5]">Notes</span>
          </div>
        </div>
      ),
    },
    {
      id: "marketplace",
      title: "Campus Marketplace",
      badge: "Student Exchange",
      headline: "Buy, sell, and exchange student supplies locally.",
      description:
        "Trade engineering textbooks, calculators, development boards, and college notes safely with verified campus peers.",
      path: "/marketplace",
      icon: ShoppingBag,
      preview: (
        <div className="p-4 rounded-2xl bg-[#111916] border border-[#14B8A6]/30 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E8ECE7]">Introduction to Algorithms (CLRS 4th Ed)</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Like New
              </span>
            </div>
            <p className="text-[11px] text-[#A2ADA5]">Books • Computer Science</p>
            <p className="text-[10px] text-[#6F7C74] font-mono">Seller: Campus Peer</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-black font-mono text-[#5EEAD4]">$42</span>
            <p className="text-[9px] text-[#A2ADA5]">Instant Contact</p>
          </div>
        </div>
      ),
    },
    {
      id: "communities",
      title: "Student Communities",
      badge: "Peer Circles",
      headline: "Connect with students building the same things.",
      description:
        "Join tech circles, college hackathon clubs, and career preparation rooms to ask questions, share insights, and find teammates.",
      path: "/communities",
      icon: Users,
      preview: (
        <div className="p-4 rounded-2xl bg-[#111916] border border-[#14B8A6]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E8ECE7]">AI & Machine Learning Builders</span>
              <span className="px-2 py-0.2 rounded text-[9px] font-mono bg-[#78864A]/20 text-[#A3AD7A]">
                Engineering
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#5EEAD4]">Active</span>
          </div>
          <p className="text-xs text-[#A2ADA5] bg-black/30 p-2.5 rounded-xl border border-white/5">
            &ldquo;Anyone looking for a frontend contributor for the upcoming smart campus hackathon? Building with React and WebGL.&rdquo;
          </p>
          <p className="text-[10px] font-mono text-[#6F7C74]">12 Members • 4 Discussions</p>
        </div>
      ),
    },
  ];

  const currentModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];

  return (
    <section id="modules" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0C1210] border-b border-white/5 relative">
      <div className="mx-auto w-full max-w-[min(94vw,2000px)] relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111916] border border-[#14B8A6]/30 text-[11px] font-mono tracking-wider uppercase text-[#5EEAD4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
            CORE CAPABILITIES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E8ECE7]">
            Designed for the student workflow.
            <br />
            <span className="text-[#A2ADA5] font-semibold text-2xl sm:text-3xl lg:text-4xl">
              Practical tools built for actual coursework and campus life.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A2ADA5] leading-relaxed max-w-2xl mx-auto">
            Explore the specialized modules that power your daily productivity and growth inside StudentOS.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeTab === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 border ${
                  isActive
                    ? "bg-[#14B8A6] text-[#080D0B] border-[#14B8A6] shadow-lg shadow-[#14B8A6]/20"
                    : "bg-[#111916] text-[#A2ADA5] border-white/10 hover:border-white/20 hover:text-[#E8ECE7]"
                }`}
              >
                <Icon size={15} />
                <span>{mod.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Spatial Panel Showcase */}
        <div className="rounded-3xl border border-[#14B8A6]/30 bg-[#111916]/90 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <span className="px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[11px] font-mono uppercase tracking-wider text-[#5EEAD4] font-bold">
              {currentModule.badge}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#E8ECE7] leading-tight">
              {currentModule.headline}
            </h3>

            <p className="text-sm text-[#A2ADA5] leading-relaxed">
              {currentModule.description}
            </p>

            <div className="pt-4">
              <Link
                to={currentModule.path}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#17211C] border border-[#14B8A6]/40 hover:bg-[#14B8A6] hover:text-[#080D0B] text-[#E8ECE7] text-xs font-bold transition-all duration-200 shadow-md group"
              >
                <span>Launch {currentModule.title}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Live UI Preview Panel */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0C1210] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 text-[11px] font-mono text-[#6F7C74]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                StudentOS UI Preview
              </span>
              <span>Live Module State</span>
            </div>

            {currentModule.preview}
          </div>
        </div>
      </div>
    </section>
  );
}
