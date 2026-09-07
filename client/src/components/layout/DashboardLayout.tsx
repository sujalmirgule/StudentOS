import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import CommandPalette from "../common/CommandPalette";
import SpatialBackground from "../3d/SpatialBackground";
import { Menu, X, Search, Bell, Activity } from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";
import api from "../../services/api";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "My Tasks",
  "/projects": "Projects",
  "/marketplace": "Marketplace",
  "/communities": "Communities",
  "/resources": "Resources",
  "/ai": "AI Assistant",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const { user } = useAuthStore();

  const currentTitle = routeTitles[location.pathname] || "StudentOS";
  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "S";

  // Clock tick timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch unread count on page change
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await api.get("/notifications");
        setUnreadCount(res.data.unreadCount || 0);
      } catch {
        //
      }
    };
    fetchUnread();
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen bg-[#08080a] text-zinc-100 antialiased selection:bg-orange-500 selection:text-white">
      {/* 3D Spatial Background Layer */}
      <SpatialBackground />

      {/* Desktop Sidebar */}
      <div className="relative z-30 hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 h-full w-72">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 flex flex-1 flex-col min-w-0">
        {/* Topbar Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-[#08080a]/80 px-6 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-white lg:hidden"
              aria-label="Open sidebar menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumb & Title */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-orange-500 uppercase hidden sm:inline">
                StudentOS
              </span>
              <span className="text-zinc-700 hidden sm:inline">/</span>
              <h1 className="text-base font-bold text-white tracking-tight sm:text-lg">
                {currentTitle}
              </h1>
            </div>
          </div>

          {/* Right Topbar Elements */}
          <div className="flex items-center gap-3">
            {/* Live Clock / Date Indicator */}
            {currentTime && (
              <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/5 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur">
                <Activity size={13} className="text-emerald-400 animate-pulse" />
                <span>{currentTime}</span>
              </div>
            )}

            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-2 text-xs text-zinc-400 transition hover:border-orange-500/30 hover:bg-zinc-800 hover:text-white"
            >
              <Search size={15} className="text-orange-400" />
              <span className="hidden md:inline">Search commands...</span>
              <kbd className="hidden md:inline rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400 border border-white/5">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Button */}
            <Link
              to="/notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 text-zinc-400 transition hover:border-orange-500/30 hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm shadow-orange-500/50">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* Profile Avatar Button */}
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-black text-white shadow-sm shadow-orange-500/20 transition hover:scale-105"
            >
              {userInitial}
            </Link>
          </div>
        </header>

        {/* Dynamic Route Content Outlet */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
