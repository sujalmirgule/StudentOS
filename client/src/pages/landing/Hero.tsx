import { ArrowRight, Play, Sparkles, BrainCircuit } from "lucide-react";


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#030303] pt-32 pb-24">
      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[160px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 lg:flex-row">
        {/* LEFT */}
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            AI Powered Student Platform
          </div>

          <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
            AI
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Operating System
            </span>
            <br />
            for Every Student.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
            Manage academics, attendance, coding, placements, notes,
            projects, AI assistance and your complete college journey—
            all in one intelligent platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600 flex items-center gap-2">
  Get Started
  <ArrowRight size={18} />
</button>

            <button className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3 font-semibold text-white hover:bg-zinc-800">
  Watch Demo
</button>
          </div>

          <div className="mt-14 flex items-center gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="text-zinc-500">Students</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">150+</h3>
              <p className="text-zinc-500">Colleges</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">24/7</h3>
              <p className="text-zinc-500">AI Assistant</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Floating Card */}
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(255,120,0,.15)]">

            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Student Dashboard
              </h2>

              <BrainCircuit className="h-7 w-7 text-orange-400" />
            </div>

            <div className="space-y-5">

              <div className="rounded-2xl bg-zinc-900/70 p-5">
                <p className="text-sm text-zinc-400">
                  Attendance
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <h2 className="text-4xl font-bold text-white">
                    92%
                  </h2>

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                    Excellent
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-900/70 p-5">
                <p className="mb-3 text-sm text-zinc-400">
                  Today's Tasks
                </p>

                <div className="space-y-3 text-zinc-200">

                  <div>✅ DBMS Assignment</div>

                  <div>📚 Study Operating System</div>

                  <div>💻 React Project</div>

                </div>
              </div>

              <div className="rounded-2xl bg-orange-500/10 p-5 border border-orange-500/20">
                <p className="text-orange-400 text-sm">
                  AI Suggestion
                </p>

                <p className="mt-2 text-white">
                  Focus on Operating Systems today.
                  You're 82% prepared for your next exam.
                </p>
              </div>

            </div>
          </div>

          {/* Floating Mini Cards */}

          <div className="absolute -left-8 top-10 rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-3 backdrop-blur">
            <p className="text-xs text-zinc-400">CGPA</p>
            <h3 className="text-xl font-bold text-white">
              9.1
            </h3>
          </div>

          <div className="absolute -right-8 bottom-12 rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-3 backdrop-blur">
            <p className="text-xs text-zinc-400">
              Resume Score
            </p>

            <h3 className="text-xl font-bold text-orange-400">
              91
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}