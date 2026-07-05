import {
  LayoutDashboard,
  BookOpen,
  Brain,
  ShoppingBag,
  Users,
  Settings,
  GraduationCap,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "Notes" },
  { icon: Brain, label: "AI" },
  { icon: ShoppingBag, label: "Marketplace" },
  { icon: Users, label: "Teams" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-white/10 bg-zinc-950">

      <div className="flex items-center gap-3 p-8">

        <GraduationCap className="text-orange-500" />

        <h2 className="text-2xl font-black text-white">

          StudentOS

        </h2>

      </div>

      <div className="mt-8 space-y-2 px-5">

        {items.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.label}
              className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-zinc-400 transition hover:bg-orange-500 hover:text-white"
            >

              <Icon size={20} />

              {item.label}

            </button>

          );

        })}

      </div>

    </aside>
  );
}