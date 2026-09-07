import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
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
  Plus,
  ArrowRight,
  X,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Quick Link";
  icon: any;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNavigation = useCallback(
    (path: string) => {
      onClose();
      navigate(path);
    },
    [navigate, onClose]
  );

  const items: CommandItem[] = [
    { id: "dash", title: "Dashboard", category: "Navigation", icon: LayoutDashboard, action: () => handleNavigation("/dashboard") },
    { id: "tasks", title: "My Tasks", category: "Navigation", icon: ListTodo, action: () => handleNavigation("/tasks") },
    { id: "projects", title: "Projects Workspace", category: "Navigation", icon: FolderKanban, action: () => handleNavigation("/projects") },
    { id: "market", title: "Student Marketplace", category: "Navigation", icon: ShoppingBag, action: () => handleNavigation("/marketplace") },
    { id: "communities", title: "Communities", category: "Navigation", icon: Users, action: () => handleNavigation("/communities") },
    { id: "resources", title: "Study Resources Library", category: "Navigation", icon: BookOpen, action: () => handleNavigation("/resources") },
    { id: "ai", title: "Ask StudentOS AI Assistant", category: "Navigation", icon: Brain, action: () => handleNavigation("/ai") },
    { id: "notifs", title: "Notifications Center", category: "Navigation", icon: Bell, action: () => handleNavigation("/notifications") },
    { id: "profile", title: "Student Profile", category: "Navigation", icon: UserCircle, action: () => handleNavigation("/profile") },
    { id: "settings", title: "Account & App Settings", category: "Navigation", icon: Settings, action: () => handleNavigation("/settings") },
    { id: "new-task", title: "Create New Task", category: "Actions", icon: Plus, action: () => handleNavigation("/tasks") },
    { id: "new-proj", title: "Start New Project", category: "Actions", icon: Plus, action: () => handleNavigation("/projects") },
    { id: "list-item", title: "List Item in Marketplace", category: "Actions", icon: Plus, action: () => handleNavigation("/marketplace") },
  ];

  const filtered = query
    ? items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    },
    [isOpen, onClose, filtered, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0f] shadow-2xl shadow-orange-500/10">
        {/* Search Bar */}
        <div className="flex items-center border-b border-white/10 px-5 py-4">
          <Search className="mr-3 text-orange-400 shrink-0" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search StudentOS... (Esc to exit)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
          <button
            onClick={onClose}
            className="ml-2 rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-3">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">
              No matching commands or pages found.
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-orange-500/10 hover:text-orange-400 ${index === selectedIndex ? 'bg-orange-500/10 text-orange-400' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition group-hover:bg-orange-500 group-hover:text-white">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white transition group-hover:text-orange-400">
                          {item.title}
                        </p>
                        <span className="text-[11px] text-zinc-500">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-zinc-600 opacity-0 transition group-hover:opacity-100 group-hover:text-orange-400"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/5 bg-zinc-950 px-5 py-2.5 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-300">
              ↑↓
            </kbd>
            <span>Navigate</span>
            <kbd className="ml-2 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-300">
              ↵
            </kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-1">
            <span>StudentOS Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}
