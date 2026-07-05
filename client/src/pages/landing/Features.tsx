import {
  Brain,
  Code2,
  GraduationCap,
  Briefcase,
  Users,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Study Planner",
    desc: "Personalized study plans powered by AI.",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: Code2,
    title: "Coding Tracker",
    desc: "Track coding streaks and contests.",
  },
  {
    icon: GraduationCap,
    title: "Attendance",
    desc: "Monitor attendance in real time.",
  },
  {
    icon: Briefcase,
    title: "Placement Hub",
    desc: "Internships, jobs and resume tracking.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Projects, teams and communities.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    desc: "Instant help for academics and coding.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#030303] py-32">
      <div className="mx-auto max-w-[1500px] px-8">

        <div className="text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Everything a Student Needs.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            One platform for academics, coding, AI,
            placements and productivity.
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
             <div
  key={feature.title}
  className={`group rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_80px_rgba(249,115,22,.15)] ${feature.className || ""}`}
>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}