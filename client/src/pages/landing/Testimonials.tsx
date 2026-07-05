export default function Testimonials() {
  return (
    <section className="relative py-36 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-sm text-orange-400">
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Loved by Students
          </h2>

          <p className="mt-4 text-zinc-400">
            Thousands of students are already using StudentOS.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <div className="group rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_80px_rgba(249,115,22,.15)]">
            <h3 className="text-xl font-semibold text-white">
              Aarav Sharma
            </h3>

            <p className="mt-4 text-zinc-400">
              StudentOS literally replaced five different apps for me.
            </p>

            <div className="mt-6 text-orange-400">
              ★★★★★
            </div>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_80px_rgba(249,115,22,.15)]">
            <h3 className="text-xl font-semibold text-white">
              Priya Patel
            </h3>

            <p className="mt-4 text-zinc-400">
              The AI Planner keeps me productive every single day.
            </p>

            <div className="mt-6 text-orange-400">
              ★★★★★
            </div>
          </div>

          <div className="group rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_80px_rgba(249,115,22,.15)]">
            <h3 className="text-xl font-semibold text-white">
              Karan Mehta
            </h3>

            <p className="mt-4 text-zinc-400">
              Best dashboard I've ever used in college.
            </p>

            <div className="mt-6 text-orange-400">
              ★★★★★
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}