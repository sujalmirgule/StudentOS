export default function DashboardPreview() {
  return (
    <section className="relative py-32 bg-[#030303]">
      <div className="mx-auto max-w-[1500px] px-8">

        <div className="text-center">

          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            Dashboard Preview
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Your Entire College
            <br />
            Life In One Dashboard
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Track academics, coding, attendance, AI productivity,
            placements and projects from one intelligent workspace.
          </p>

        </div>

        <div className="relative mt-24 max-w-[1500px] mx-auto">

  <div className="absolute -left-20 top-20 h-48 w-48 rounded-full bg-orange-500/20 blur-[120px]" />

  <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-violet-600/20 blur-[120px]" />

  <div className="relative rounded-[40px] border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-10 overflow-hidden">

    {/* Dashboard */
    <div className="grid gap-6 lg:grid-cols-3">

  {/* Left */}
  <div className="space-y-6">

    <div className="rounded-3xl border border-white/10 bg-zinc-800/40 p-6">
      <p className="text-zinc-400">Attendance</p>
      <h3 className="mt-2 text-5xl font-bold text-white">92%</h3>

      <div className="mt-4 h-2 rounded-full bg-zinc-700">
        <div className="h-2 w-[92%] rounded-full bg-orange-500"></div>
      </div>
    </div>

    <div className="rounded-3xl border border-white/10 bg-zinc-800/40 p-6">
      <h4 className="font-semibold text-white">
        Today's Tasks
      </h4>

      <div className="mt-5 space-y-3">

        <div className="rounded-xl bg-zinc-900 p-3">
          ✔ DBMS Assignment
        </div>

        <div className="rounded-xl bg-zinc-900 p-3">
          ✔ React Dashboard
        </div>

        <div className="rounded-xl bg-zinc-900 p-3">
          ✔ Practice DSA
        </div>

      </div>

    </div>

  </div>

  {/* Center */}

  <div className="rounded-3xl border border-white/10 bg-zinc-800/40 p-8">

      <h3 className="text-xl font-semibold text-white">
        Productivity
      </h3>

      <div className="mt-8 flex h-72 items-end justify-between">

        <div className="w-8 rounded-full bg-orange-500 h-24"></div>
        <div className="w-8 rounded-full bg-orange-500 h-40"></div>
        <div className="w-8 rounded-full bg-orange-500 h-52"></div>
        <div className="w-8 rounded-full bg-orange-500 h-36"></div>
        <div className="w-8 rounded-full bg-orange-500 h-60"></div>
        <div className="w-8 rounded-full bg-orange-500 h-44"></div>
        <div className="w-8 rounded-full bg-orange-500 h-64"></div>

      </div>

  </div>

  {/* Right */}

  <div className="space-y-6">

      <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">

          <p className="text-orange-300">
            AI Suggestion
          </p>

          <h3 className="mt-4 text-2xl font-bold text-white">
            Study Operating System Today
          </h3>

          <p className="mt-3 text-zinc-300">
            You're 82% prepared for your next exam.
          </p>

      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-800/40 p-6">

        <p className="text-zinc-400">
          Resume Score
        </p>

        <h2 className="mt-3 text-5xl font-bold text-orange-400">
          91
        </h2>

      </div>

  </div>

</div>}

  </div>

</div>

      </div>
    </section>
  );
}