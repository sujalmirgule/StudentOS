import {
  Brain,
  BookOpen,
  ShoppingCart,
  Users,
  Calendar,
  Briefcase,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const modules = [
  {
    title: "AI Assistant",
    desc: "Chat, summarize notes and generate quizzes.",
    icon: Brain,
    className: "lg:col-span-2 lg:row-span-2",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Notes",
    desc: "Smart note organization.",
    icon: BookOpen,
    color: "from-zinc-800 to-zinc-900",
  },
  {
    title: "Marketplace",
    desc: "Buy & sell notes.",
    icon: ShoppingCart,
    color: "from-zinc-800 to-zinc-900",
  },
  {
    title: "Teams",
    desc: "Collaborate with classmates.",
    icon: Users,
    color: "from-zinc-800 to-zinc-900",
  },
  {
    title: "Planner",
    desc: "Assignments & deadlines.",
    icon: Calendar,
    color: "from-zinc-800 to-zinc-900",
  },
  {
    title: "Career",
    desc: "Resume & internships.",
    icon: Briefcase,
    color: "from-zinc-800 to-zinc-900",
  },
  {
    title: "Attendance",
    desc: "Track attendance.",
    icon: GraduationCap,
    color: "from-zinc-800 to-zinc-900",
  },
  {
    title: "Analytics",
    desc: "Study insights.",
    icon: BarChart3,
    color: "from-zinc-800 to-zinc-900",
  },
];

export default function Modules() {
  return (
    <section className="bg-[#09090B] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
            Modules
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            One Platform.
            <br />
            Endless Possibilities.
          </h2>

          <p className="mt-5 text-lg text-zinc-400">
            Everything a student needs, beautifully organized.
          </p>
        </div>

        <div className="grid auto-rows-[220px] gap-6 lg:grid-cols-4">

          {modules.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} p-7 backdrop-blur-xl ${item.className || ""}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="text-orange-400" size={28} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-300">
                  {item.desc}
                </p>

                {item.title === "AI Assistant" && (
                  <div className="mt-8 rounded-2xl bg-black/20 p-5">
                    <p className="text-sm text-orange-200">
                      🤖 AI can generate summaries,
                      quizzes and roadmaps instantly.
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}