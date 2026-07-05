import { CalendarDays, Bot, BookOpen, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Floating Card */}
      <div className="absolute -left-10 top-10 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur-xl shadow-2xl">
        <p className="text-xs text-zinc-400">Today's Goal</p>
        <h3 className="mt-1 font-semibold text-white">Complete DBMS</h3>
      </div>

      {/* Floating Badge */}
      <div className="absolute -right-8 bottom-6 rounded-2xl bg-orange-500 px-5 py-4 shadow-xl">
        <p className="text-xs text-white/80">Productivity</p>
        <h2 className="text-3xl font-black text-white">+28%</h2>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Student Dashboard
            </h2>
            <p className="text-sm text-zinc-400">
              Welcome back 👋
            </p>
          </div>

          <div className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
            AI Ready
          </div>
        </div>

        {/* Widgets */}
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
            <BarChart3 className="mb-3 text-orange-400" />
            <h3 className="text-3xl font-bold text-white">92%</h3>
            <p className="text-zinc-400">Study Progress</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
            <CheckCircle2 className="mb-3 text-green-400" />
            <h3 className="text-3xl font-bold text-white">16</h3>
            <p className="text-zinc-400">Tasks Today</p>
          </div>

          <div className="col-span-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-5">
            <div className="flex items-center gap-2">
              <Bot className="text-white" />
              <h3 className="text-lg font-bold text-white">
                AI Assistant
              </h3>
            </div>

            <p className="mt-2 text-orange-100">
              Generate notes, quizzes and summaries instantly.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
            <CalendarDays className="mb-3 text-orange-400" />
            <h3 className="font-semibold text-white">
              Tomorrow
            </h3>
            <p className="text-zinc-400">
              DBMS Exam
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
            <BookOpen className="mb-3 text-orange-400" />
            <h3 className="font-semibold text-white">
              Marketplace
            </h3>
            <p className="text-zinc-400">
              24 New Notes
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}