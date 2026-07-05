import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-36 px-6">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[180px]" />

      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl">

        <div className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-zinc-900/60
        p-16
        backdrop-blur-xl
        ">

          {/* Floating Circle */}

          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/20 blur-[100px]" />

          <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative z-10 text-center">

            <span className="
            rounded-full
            border
            border-orange-500/20
            bg-orange-500/10
            px-5
            py-2
            text-sm
            font-medium
            text-orange-400
            ">
              🚀 Join the Future
            </span>

            <h2 className="mx-auto mt-8 max-w-4xl text-6xl font-black leading-tight text-white">

              Ready To Transform

              <br />

              Your College Journey?

            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">

              Everything a student needs —
              AI assistance, attendance,
              projects, coding, notes,
              placements and productivity —
              in one intelligent workspace.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <button className="
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-yellow-400
              px-8
              py-4
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_60px_rgba(249,115,22,.45)]
              ">

                Get Started

                <ArrowRight className="ml-2 inline h-5 w-5" />

              </button>

              <button className="
              rounded-2xl
              border
              border-white/10
              bg-zinc-800/60
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:border-orange-500/40
              hover:bg-zinc-800
              ">

                Watch Demo

              </button>

            </div>

            {/* Stats */}

            <div className="mt-16 flex flex-wrap justify-center gap-16">

              <div>
                <h3 className="text-4xl font-black text-orange-400">
                  10K+
                </h3>

                <p className="text-zinc-500">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-orange-400">
                  150+
                </h3>

                <p className="text-zinc-500">
                  Colleges
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-orange-400">
                  24/7
                </h3>

                <p className="text-zinc-500">
                  AI Support
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}