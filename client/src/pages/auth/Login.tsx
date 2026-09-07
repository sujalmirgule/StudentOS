import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  BookOpen,
  CheckSquare,
  Users,
} from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";
import AuthEnvironment from "../../components/3d/AuthEnvironment";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;
    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch {
      // Error handled by store
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#020504] text-white overflow-hidden"
    >
      {/* Full-screen cinematic environment */}
      <AuthEnvironment variant="login" />

      {/* Content layer */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-12 items-center">
        {/* Left — Cinematic Storytelling Column */}
        <div className="hidden lg:flex flex-col justify-center lg:col-span-5 2xl:col-span-5 px-10 xl:px-16 2xl:px-20 relative z-20">
          <div className="gsap-reveal-item space-y-6 max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#14B8A6]/30 bg-[#0C1411]/80 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5EEAD4] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse shadow-[0_0_6px_#5EEAD4]" />
              WELCOME BACK
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.4rem,4vw,4.2rem)] font-black tracking-tight text-[#E8ECE7] leading-[1.08]">
              Continue
              <br />
              <span className="bg-gradient-to-r from-[#5EEAD4] via-[#2DD4BF] to-[#A3AD7A] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(45,212,191,0.25)]">
                Your Journey.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[clamp(0.88rem,1vw,1.1rem)] leading-relaxed text-[#A2ADA5] max-w-md font-normal">
              Log in to your StudentOS and pick up right where you left off.
            </p>

            {/* Feature Indicators */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#8A958D]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                  <BookOpen size={13} className="text-[#5EEAD4]" />
                </div>
                <span>
                  <strong className="text-[#C8D1CA]">Access</strong> your resources
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8A958D]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                  <CheckSquare size={13} className="text-[#5EEAD4]" />
                </div>
                <span>
                  <strong className="text-[#C8D1CA]">Manage</strong> your tasks
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8A958D]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                  <Users size={13} className="text-[#5EEAD4]" />
                </div>
                <span>
                  <strong className="text-[#C8D1CA]">Connect</strong> with peers
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="pt-4 text-xs italic text-[#5B6B63] font-serif max-w-xs border-t border-white/5">
              &ldquo;The universe of knowledge is always open for you.&rdquo;
            </div>
          </div>
        </div>

        {/* Right — Premium Auth Card */}
        <div className="flex items-center justify-center lg:col-span-7 2xl:col-span-7 px-4 sm:px-6 py-12 lg:py-0">
          <div
            className="gsap-reveal-item w-full max-w-md rounded-3xl border border-[#5EEAD4]/14 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-[#14B8A6]/8"
            style={{
              background: "rgba(7, 15, 12, 0.82)",
            }}
          >
            {/* Mobile-only Logo */}
            <Link
              to="/"
              className="mb-8 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#5EEAD4] border border-[#14B8A6]/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                StudentOS
              </span>
            </Link>

            <h2 className="text-2xl font-black text-white tracking-tight">
              Login
            </h2>
            <p className="mt-1.5 text-xs text-[#8A958D]">
              Sign in to your student account.
            </p>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-[#8A958D]">
                  Email
                </label>
                <div
                  className={`mt-1.5 flex items-center rounded-xl border px-3.5 transition-all duration-200 ${
                    errors.email
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-[#5EEAD4]/10 bg-[#020605]/65 focus-within:border-[#2DD4BF]/65 focus-within:shadow-[0_0_20px_rgba(20,184,166,0.08)]"
                  }`}
                >
                  <Mail className="text-[#5B6B63] shrink-0" size={17} />
                  <input
                    type="email"
                    placeholder="student@college.edu"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-[#3D4E45]"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-[#8A958D]">
                  Password
                </label>
                <div
                  className={`mt-1.5 flex items-center rounded-xl border px-3.5 transition-all duration-200 ${
                    errors.password
                      ? "border-red-500/50 bg-red-500/5"
                      : "border-[#5EEAD4]/10 bg-[#020605]/65 focus-within:border-[#2DD4BF]/65 focus-within:shadow-[0_0_20px_rgba(20,184,166,0.08)]"
                  }`}
                >
                  <Lock className="text-[#5B6B63] shrink-0" size={17} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-[#3D4E45]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#5B6B63] hover:text-[#A2ADA5] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-[#5EEAD4]/20 bg-[#020605]/65 text-[#14B8A6] focus:ring-[#14B8A6]/40 accent-[#14B8A6]"
                  />
                  <span className="text-[11px] text-[#6F7C74] group-hover:text-[#A2ADA5] transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-[#5EEAD4] hover:text-[#2DD4BF] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#10705E] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#2DD4BF] text-white text-sm font-bold shadow-[0_0_24px_rgba(20,184,166,0.30)] hover:shadow-[0_0_32px_rgba(94,234,212,0.45)] border border-[#2DD4BF]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Login to StudentOS</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Social Auth Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-[#5B6B63] font-semibold tracking-wider uppercase">
                or continue with
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Social Auth Buttons */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 bg-[#020605]/50 text-[11px] font-semibold text-[#A2ADA5] hover:border-[#14B8A6]/30 hover:text-white transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 bg-[#020605]/50 text-[11px] font-semibold text-[#A2ADA5] hover:border-[#14B8A6]/30 hover:text-white transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 bg-[#020605]/50 text-[11px] font-semibold text-[#A2ADA5] hover:border-[#14B8A6]/30 hover:text-white transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M11.4 24H0V12.6L11.4 0h12.6v11.4L11.4 24z" fill="#F25022" opacity="0.8" />
                </svg>
                Microsoft
              </button>
            </div>

            {/* Toggle to Signup */}
            <p className="mt-6 text-center text-xs text-[#6F7C74]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-[#5EEAD4] hover:text-[#2DD4BF] transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}