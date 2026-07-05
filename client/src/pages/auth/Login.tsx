import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";


export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#09090B]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}

        <div className="relative hidden overflow-hidden lg:flex">

          <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[150px]" />

          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-yellow-500/20 blur-[150px]" />

          <div className="relative z-10 flex flex-col justify-center px-20">

            <div className="flex items-center gap-3">

              <GraduationCap className="h-10 w-10 text-orange-500" />

              <h1 className="text-4xl font-black text-white">
                StudentOS
              </h1>

            </div>

            <h2 className="mt-12 text-6xl font-black leading-tight text-white">
              Welcome
              <br />
              Back.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-zinc-400">
              Access your notes, AI assistant,
              marketplace, planner and everything
              from one place.
            </p>

            <div className="mt-12 flex gap-10">

              <div>

                <h3 className="text-4xl font-bold text-white">
                  50K+
                </h3>

                <p className="text-zinc-500">
                  Students
                </p>

              </div>

              <div>

                <h3 className="text-4xl font-bold text-white">
                  120+
                </h3>

                <p className="text-zinc-500">
                  Colleges
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center px-6">

          <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-zinc-900/60 p-10 backdrop-blur-xl">

            <h2 className="text-3xl font-bold text-white">
              Login
            </h2>

            <p className="mt-2 text-zinc-400">
              Continue your journey.
            </p>

            {/* Email */}

            <div className="mt-8">

              <label className="text-sm text-zinc-400">
                Email
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-zinc-800 px-4">

                <Mail className="text-zinc-500" size={18} />

                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-transparent px-4 py-4 text-white outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div className="mt-6">

              <label className="text-sm text-zinc-400">
                Password
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-zinc-800 px-4">

                <Lock className="text-zinc-500" size={18} />

                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full bg-transparent px-4 py-4 text-white outline-none"
                />

              </div>

            </div>

<button
  onClick={() => navigate("/dashboard")}
  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
>
  Login
  <ArrowRight size={18} />
</button>

            <button className="mt-4 w-full rounded-2xl border border-white/10 py-4 text-white transition hover:bg-white/5">

              Continue with Google

            </button>

            <p className="mt-8 text-center text-zinc-400">

              Don't have an account?

              <span className="ml-2 cursor-pointer text-orange-400">

                Sign Up

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}