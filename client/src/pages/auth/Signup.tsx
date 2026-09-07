import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  BookOpen,
  Rocket,
  Globe,
} from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";
import AuthEnvironment from "../../components/3d/AuthEnvironment";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.username.trim()) e.username = "Username is required";
    else if (form.username.length < 3)
      e.username = "Username must be at least 3 characters";
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username))
      e.username = "Only letters, numbers and underscores allowed";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;
    try {
      await signup({
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/dashboard", { replace: true });
    } catch {
      // Handled by store
    }
  };

  const inputClass = (field: string) =>
    `mt-1.5 flex items-center rounded-xl border px-3.5 transition-all duration-200 ${
      errors[field]
        ? "border-red-500/50 bg-red-500/5"
        : "border-[#5EEAD4]/10 bg-[#020605]/65 focus-within:border-[#2DD4BF]/65 focus-within:shadow-[0_0_20px_rgba(20,184,166,0.08)]"
    }`;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#020504] text-white overflow-hidden"
    >
      {/* Full-screen cinematic environment */}
      <AuthEnvironment variant="signup" />

      {/* Content layer */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-12 items-center">
        {/* Left — Cinematic Storytelling Column */}
        <div className="hidden lg:flex flex-col justify-center lg:col-span-5 2xl:col-span-5 px-10 xl:px-16 2xl:px-20 relative z-20">
          <div className="gsap-reveal-item space-y-6 max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#14B8A6]/30 bg-[#0C1411]/80 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#5EEAD4] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse shadow-[0_0_6px_#5EEAD4]" />
              YOUR JOURNEY STARTS HERE
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.4rem,4vw,4.2rem)] font-black tracking-tight text-[#E8ECE7] leading-[1.08]">
              Join The
              <br />
              <span className="bg-gradient-to-r from-[#5EEAD4] via-[#2DD4BF] to-[#A3AD7A] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(45,212,191,0.25)]">
                Student Operating System.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[clamp(0.88rem,1vw,1.1rem)] leading-relaxed text-[#A2ADA5] max-w-md font-normal">
              Create your account and step into a universe of learning, building,
              and growth.
            </p>

            {/* Feature Indicators */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#8A958D]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                  <BookOpen size={13} className="text-[#5EEAD4]" />
                </div>
                <span>
                  <strong className="text-[#C8D1CA]">Learn</strong> — Go deeper
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8A958D]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                  <Rocket size={13} className="text-[#5EEAD4]" />
                </div>
                <span>
                  <strong className="text-[#C8D1CA]">Build</strong> — Real projects
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8A958D]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                  <Globe size={13} className="text-[#5EEAD4]" />
                </div>
                <span>
                  <strong className="text-[#C8D1CA]">Grow</strong> — With a global
                  community
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="pt-4 text-xs italic text-[#5B6B63] font-serif max-w-xs border-t border-white/5">
              &ldquo;Every great journey begins with a single step.&rdquo;
            </div>
          </div>
        </div>

        {/* Right — Premium Auth Card */}
        <div className="flex items-center justify-center lg:col-span-7 2xl:col-span-7 px-4 sm:px-6 py-8 lg:py-0">
          <div
            className="gsap-reveal-item w-full max-w-md rounded-3xl border border-[#5EEAD4]/14 p-7 sm:p-9 backdrop-blur-2xl shadow-2xl shadow-[#14B8A6]/8"
            style={{
              background: "rgba(7, 15, 12, 0.82)",
            }}
          >
            {/* Mobile-only Logo */}
            <Link
              to="/"
              className="mb-6 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#5EEAD4] border border-[#14B8A6]/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                StudentOS
              </span>
            </Link>

            <h2 className="text-2xl font-black text-white tracking-tight">
              Create Account
            </h2>
            <p className="mt-1 text-xs text-[#8A958D]">
              Start your student operating journey.
            </p>

            {error && (
              <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-[#8A958D]">
                  Full Name
                </label>
                <div className={inputClass("fullName")}>
                  <User className="text-[#5B6B63] shrink-0" size={17} />
                  <input
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#3D4E45]"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="text-xs font-semibold text-[#8A958D]">
                  Username
                </label>
                <div className={inputClass("username")}>
                  <span className="text-[#5B6B63] text-xs font-bold">@</span>
                  <input
                    placeholder="Choose a username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#3D4E45]"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-[#8A958D]">
                  Email
                </label>
                <div className={inputClass("email")}>
                  <Mail className="text-[#5B6B63] shrink-0" size={17} />
                  <input
                    type="email"
                    placeholder="student@college.edu"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#3D4E45]"
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
                <div className={inputClass("password")}>
                  <Lock className="text-[#5B6B63] shrink-0" size={17} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#3D4E45]"
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

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-semibold text-[#8A958D]">
                  Confirm Password
                </label>
                <div className={inputClass("confirmPassword")}>
                  <Lock className="text-[#5B6B63] shrink-0" size={17} />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#3D4E45]"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#10705E] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#2DD4BF] text-white text-sm font-bold shadow-[0_0_24px_rgba(20,184,166,0.30)] hover:shadow-[0_0_32px_rgba(94,234,212,0.45)] border border-[#2DD4BF]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create My StudentOS</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle to Login */}
            <p className="mt-5 text-center text-xs text-[#6F7C74]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#5EEAD4] hover:text-[#2DD4BF] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}