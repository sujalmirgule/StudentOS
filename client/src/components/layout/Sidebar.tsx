import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  ShoppingBag,
  Users,
  BookOpen,
  Brain,
  Bell,
  UserCircle,
  Settings,
  LogOut,
  GraduationCap,
  X,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";

interface NavItem {
  to: string;
  icon: any;
  label: string;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "CORE OS",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/tasks", icon: ListTodo, label: "My Tasks" },
    ],
  },
  {
    title: "ACADEMIC & COLLAB",
    items: [
      { to: "/projects", icon: FolderKanban, label: "Projects" },
      { to: "/resources", icon: BookOpen, label: "Resources" },
    ],
  },
  {
    title: "CAMPUS NETWORK",
    items: [
      { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
      { to: "/communities", icon: Users, label: "Communities" },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { to: "/ai", icon: Brain, label: "AI Assistant", badge: "AI" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { to: "/notifications", icon: Bell, label: "Notifications" },
      { to: "/profile", icon: UserCircle, label: "Profile" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "S";

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/5 bg-[#08080a]/90 text-zinc-300 backdrop-blur-2xl">
      {/* Brand Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <NavLink to="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-md shadow-orange-500/10">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white group-hover:text-orange-400 transition">
              StudentOS
            </h2>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              Spatial Student OS
            </p>
          </div>
        </NavLink>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="px-6 my-1">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Categorized Nav Links */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-3">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase">
              {group.title}
            </h3>
            <div className="space-y-0.5 mt-1.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    end={item.to === "/dashboard"}
                    className={({ isActive }: { isActive: boolean }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-zinc-800/90 text-white shadow-sm border border-white/10 font-bold"
                          : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100"
                      }`
                    }
                  >
                    {({ isActive }: { isActive: boolean }) => (
                      <>
                        <div className="flex items-center gap-3">
                          {isActive && (
                            <span className="absolute left-0 h-5 w-1 rounded-r-full bg-orange-500 shadow-sm shadow-orange-500" />
                          )}
                          <Icon
                            size={17}
                            className={`transition ${
                              isActive
                                ? "text-orange-400"
                                : "text-zinc-500 group-hover:text-zinc-300"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="flex items-center gap-1 rounded-md bg-orange-500/10 px-1.5 py-0.5 text-[9px] font-bold text-orange-400 border border-orange-500/20">
                            <Sparkles size={10} />
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer Card */}
      <div className="border-t border-white/5 p-4 bg-zinc-950/60">
        {user && (
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900/60 p-3 backdrop-blur">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-black text-white shadow-sm shadow-orange-500/20">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                {user.fullName}
              </p>
              <p className="truncate text-[11px] text-zinc-500">
                @{user.username}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={16} />
          Logout Session
        </button>
      </div>
    </aside>
  );
}