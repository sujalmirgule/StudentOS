import {
  Brain,
  BookOpen,
  Users,
  ShoppingBag,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI Assistant",
    desc: "Generate notes, quizzes, summaries and study roadmaps instantly.",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    desc: "Organize, search and access all your notes in one place.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Create teams, assign tasks and work together on projects.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Buy & sell notes, books and study materials with students.",
  },
  {
    icon: CalendarDays,
    title: "Planner",
    desc: "Track classes, exams and assignments with a smart planner.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Monitor study hours, productivity and weekly performance.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#09090B] py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Everything You Need
            <br />
            For College Life
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            StudentOS combines every essential tool into one
            beautiful and modern workspace.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                transition={{
                  duration: .3,
                }}
                className="group rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
              >

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition group-hover:bg-orange-500">
                  <Icon
                    size={28}
                    className="text-orange-400 group-hover:text-white"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.desc}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}