import { useState, useRef } from "react";
import {
  ListTodo,
  FolderGit2,
  BookOpen,
  MessageSquare,
  Sparkles,
  BellRing,
  ShoppingBag,
  Layers,
  ArrowRight,
} from "lucide-react";

interface DisconnectedItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: typeof ListTodo;
  scatteredPosition: { x: string; y: string; rotate: string };
  connectedPosition: { order: number };
}

const DISCONNECTED_ITEMS: DisconnectedItem[] = [
  {
    id: "tasks",
    name: "Notion & Apple Reminders",
    category: "Tasks & Deadlines",
    description: "Lost assignment due dates across separate lists",
    icon: ListTodo,
    scatteredPosition: { x: "-18%", y: "-25%", rotate: "-8deg" },
    connectedPosition: { order: 1 },
  },
  {
    id: "projects",
    name: "Trello & GitHub Tabs",
    category: "Coursework Projects",
    description: "Fragmented sprint boards and peer contributions",
    icon: FolderGit2,
    scatteredPosition: { x: "24%", y: "-35%", rotate: "6deg" },
    connectedPosition: { order: 2 },
  },
  {
    id: "resources",
    name: "Google Drive & WhatsApp Files",
    category: "Academic Notes",
    description: "Unorganized exam PDFs, slides, and lecture links",
    icon: BookOpen,
    scatteredPosition: { x: "-28%", y: "15%", rotate: "-4deg" },
    connectedPosition: { order: 3 },
  },
  {
    id: "communities",
    name: "Discord & Telegram Channels",
    category: "Campus Circles",
    description: "Noisy group chats buried under unread pings",
    icon: MessageSquare,
    scatteredPosition: { x: "28%", y: "10%", rotate: "8deg" },
    connectedPosition: { order: 4 },
  },
  {
    id: "ai",
    name: "ChatGPT in Another Tab",
    category: "Study Help",
    description: "AI without context about your subjects or tasks",
    icon: Sparkles,
    scatteredPosition: { x: "5%", y: "-40%", rotate: "-5deg" },
    connectedPosition: { order: 5 },
  },
  {
    id: "marketplace",
    name: "OLX & College WhatsApp Sales",
    category: "Supplies Exchange",
    description: "Unverified textbook and lab gear resale",
    icon: ShoppingBag,
    scatteredPosition: { x: "-12%", y: "35%", rotate: "7deg" },
    connectedPosition: { order: 6 },
  },
  {
    id: "notifications",
    name: "Scattered Email Alerts",
    category: "Urgent Deadlines",
    description: "Critical submission notices lost in inbox clutter",
    icon: BellRing,
    scatteredPosition: { x: "18%", y: "30%", rotate: "-6deg" },
    connectedPosition: { order: 7 },
  },
];

export default function FragmentationSection() {
  const [isConnected, setIsConnected] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="problem" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080D0B] border-b border-white/5 overflow-hidden">
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#78864A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[min(94vw,1800px)] relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111916] border border-[#78864A]/30 text-[11px] font-mono tracking-wider uppercase text-[#A3AD7A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#78864A]" />
            THE CORE PROBLEM
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E8ECE7]">
            Student life is already complex.
            <br />
            <span className="text-[#A2ADA5] font-semibold text-2xl sm:text-3xl lg:text-4xl">
              It shouldn&apos;t live across 12 different tabs.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A2ADA5] leading-relaxed max-w-2xl mx-auto">
            Tasks in one app. Team projects in another. Lecture slides scattered on cloud drives.
            Communities buried in chat apps. When student tools don&apos;t talk to each other,
            you waste energy managing tools instead of learning.
          </p>

          {/* Interactive State Toggle */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setIsConnected(!isConnected)}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#111916] border border-[#14B8A6]/40 text-xs font-semibold text-[#E8ECE7] hover:border-[#14B8A6] hover:bg-[#17211C] shadow-lg shadow-black/60 transition-all duration-300 group"
            >
              <span className="text-[#A2ADA5]">Interactive view:</span>
              <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-colors ${
                isConnected ? "bg-[#14B8A6] text-[#080D0B]" : "bg-[#78864A]/20 text-[#A3AD7A]"
              }`}>
                {isConnected ? "CONNECTED (StudentOS)" : "SCATTERED (Default)"}
              </span>
              <ArrowRight size={14} className="text-[#14B8A6] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Visual Canvas */}
        <div className="relative min-h-[440px] sm:min-h-[480px] rounded-3xl border border-white/10 bg-[#0C1210]/90 p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col justify-center items-center">
          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#14B8A6 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Central Hub Node (Appears prominent when Connected) */}
          <div className={`transition-all duration-700 ease-out z-20 flex flex-col items-center justify-center ${
            isConnected
              ? "scale-100 opacity-100 mb-8"
              : "scale-75 opacity-20 pointer-events-none mb-0"
          }`}>
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#14B8A6]/20 border border-[#14B8A6] shadow-xl shadow-[#14B8A6]/30 text-[#5EEAD4]">
              <Layers size={28} />
            </div>
            <p className="text-sm font-bold text-[#E8ECE7] mt-2">StudentOS Hub</p>
            <p className="text-[11px] font-mono text-[#5EEAD4]">One Unified Workspace</p>
          </div>

          {/* Item Cards Grid / Scattered Positions */}
          <div className={`w-full transition-all duration-700 ease-out ${
            isConnected
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl z-10"
              : "relative h-[340px] sm:h-[380px] w-full max-w-4xl"
          }`}>
            {DISCONNECTED_ITEMS.map((item) => {
              const Icon = item.icon;

              if (isConnected) {
                // Connected Docked Layout
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#111916]/90 border border-[#14B8A6]/30 hover:border-[#14B8A6] hover:bg-[#17211C] shadow-lg shadow-black/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#E8ECE7]">{item.category}</p>
                        <p className="text-[10px] text-[#A3AD7A] font-mono">Integrated</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#A2ADA5] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              }

              // Scattered Disconnected Layout
              return (
                <div
                  key={item.id}
                  style={{
                    transform: `translate(${item.scatteredPosition.x}, ${item.scatteredPosition.y}) rotate(${item.scatteredPosition.rotate})`,
                    top: "40%",
                    left: "40%",
                  }}
                  className="absolute p-3.5 sm:p-4 rounded-2xl bg-[#17211C]/90 border border-white/10 hover:border-red-400/40 shadow-xl shadow-black/70 max-w-[220px] sm:max-w-[260px] transition-transform duration-500 pointer-events-auto select-none"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={15} className="text-[#A2ADA5]" />
                    <span className="text-[10px] uppercase font-mono tracking-wider text-red-400/80 font-bold">
                      Disconnected Tab
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#E8ECE7]">{item.name}</p>
                  <p className="text-[10px] text-[#6F7C74] mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Context Message */}
          <div className="mt-8 text-center z-10">
            <p className="text-xs font-mono text-[#A2ADA5]">
              {isConnected
                ? "✨ Connected: Deadlines, notes, peer projects, and AI assistant operate from a single unified source of truth."
                : "⚠️ Scattered: Context switching between isolated tools costs students hours of cognitive momentum every week."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
