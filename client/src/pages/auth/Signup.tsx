import { useNavigate } from "react-router-dom";
import { GraduationCap, User, Mail, Lock, ArrowRight } from "lucide-react";


export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#09090B]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}

        <div className="relative hidden overflow-hidden lg:flex">

          <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[150px]" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-yellow-500/20 blur-[150px]" />

          <div className="relative z-10 flex flex-col justify-center px-20">

            <div className="flex items-center gap-3">

              <GraduationCap className="h-10 w-10 text-orange-500" />

              <h1 className="text-4xl font-black text-white">
                StudentOS
              </h1>

            </div>

            <h2 className="mt-12 text-6xl font-black leading-tight text-white">
              Join The
              <br />
              Future.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-zinc-400">
              Create your StudentOS account and
              manage everything from one beautiful workspace.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center px-6">

          <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-zinc-900/60 p-10 backdrop-blur-xl">

            <h2 className="text-3xl font-bold text-white">
              Create Account
            </h2>

            <p className="mt-2 text-zinc-400">
              Start your journey today.
            </p>

            {/* Name */}

            <div className="mt-8">

              <label className="text-sm text-zinc-400">
                Full Name
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-zinc-800 px-4">

                <User className="text-zinc-500" size={18} />

                <input
                  placeholder="Enter your name"
                  className="w-full bg-transparent px-4 py-4 text-white outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div className="mt-5">

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

            <div className="mt-5">

              <label className="text-sm text-zinc-400">
                Password
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-zinc-800 px-4">

                <Lock className="text-zinc-500" size={18} />

                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full bg-transparent px-4 py-4 text-white outline-none"
                />

              </div>

            </div>

<button
  onClick={() => navigate("/dashboard")}
  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
>
  Create Account
  <ArrowRight size={18} />
</button>

            <button className="mt-4 w-full rounded-2xl border border-white/10 py-4 text-white transition hover:bg-white/5">

              Continue with Google

            </button>

            <p className="mt-8 text-center text-zinc-400">

              Already have an account?

              <span className="ml-2 cursor-pointer text-orange-400">

                Login

              </span>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}