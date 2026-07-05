import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] min-h-screen flex items-center pt-24">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[180px]" />
        <div className="absolute -left-32 top-40 h-96 w-96 rounded-full bg-orange-500/10 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-24 px-6 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300 backdrop-blur-xl">
            <Sparkles size={16}/>
            Built for Modern Students
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white lg:text-7xl">
            The Operating
            <br />
            System Every
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">
              Student Needs.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
            StudentOS brings together Notes, AI, Marketplace,
            Teams, Calendar, Planner and Productivity into one
            beautiful workspace.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

           <Link
  to="/signup"
  className="group inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
>
  Get Started
  <ArrowRight
    size={18}
    className="transition group-hover:translate-x-1"
  />
</Link>

           <Link
  to="/login"
  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-white backdrop-blur-xl transition hover:bg-white/10"
>
  <Play size={18} />
  Login
</Link>

<Link
  to="/dashboard"
  className="inline-flex items-center gap-2 rounded-2xl border border-orange-500 px-7 py-4 text-orange-400 transition hover:bg-orange-500 hover:text-white"
>
  Explore Dashboard
</Link>

</div>
          <div className="mt-14 flex gap-10">

            <div>
              <h2 className="text-4xl font-bold text-white">
                50K+
              </h2>
              <p className="text-zinc-500">
                Students
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white">
                120+
              </h2>
              <p className="text-zinc-500">
                Colleges
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white">
                98%
              </h2>
              <p className="text-zinc-500">
                Productivity
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity:0, x:60 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:1 }}
          className="relative"
        >

          <div className="rounded-[32px] border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Student Dashboard
                </h2>

                <p className="text-zinc-500">
                  Welcome back 👋
                </p>
              </div>

              <div className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                AI Ready
              </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
                <h3 className="text-4xl font-bold text-white">
                  92%
                </h3>
                <p className="mt-2 text-zinc-500">
                  Study Progress
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
                <h3 className="text-4xl font-bold text-white">
                  16
                </h3>
                <p className="mt-2 text-zinc-500">
                  Tasks Today
                </p>
              </div>
                            <div className="col-span-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-6">
                <h3 className="text-xl font-bold text-white">
                  🤖 AI Assistant
                </h3>

                <p className="mt-2 text-orange-100">
                  Generate notes, summaries, quizzes and roadmaps in seconds.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
                <p className="text-sm text-zinc-400">
                  Upcoming Exam
                </p>

                <h3 className="mt-3 text-lg font-semibold text-white">
                  DBMS
                </h3>

                <p className="mt-2 text-orange-400">
                  Tomorrow • 10:00 AM
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5">
                <p className="text-sm text-zinc-400">
                  Marketplace
                </p>

                <h3 className="mt-3 text-lg font-semibold text-white">
                  24 New Notes
                </h3>

                <p className="mt-2 text-green-400">
                  Trending ↑
                </p>
              </div>

            </div>

          </div>

          {/* Floating Card 1 */}

          <div className="absolute -left-10 top-12 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-xl">

            <p className="text-sm text-zinc-400">
              Today's Focus
            </p>

            <h3 className="mt-2 font-semibold text-white">
              Operating Systems
            </h3>

          </div>

          {/* Floating Card 2 */}

          <div className="absolute -right-8 bottom-8 rounded-2xl border border-white/10 bg-orange-500 p-5 shadow-2xl">

            <p className="text-sm text-white/80">
              Productivity
            </p>

            <h2 className="text-3xl font-black text-white">
              +28%
            </h2>

          </div>

        </motion.div>

      </div>

    </section>
  );
}