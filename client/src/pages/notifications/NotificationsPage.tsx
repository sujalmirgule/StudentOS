import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck, Trash2 } from "lucide-react";
import api from "../../services/api";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const typeColors: Record<string, string> = {
  task_deadline: "bg-red-500/10 text-red-400 border-red-500/20",
  project_invite: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  community_update: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  marketplace_message: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  system: "bg-zinc-800 text-zinc-300 border-white/10",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.06,
    delay: 0.05,
  });

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      fetchNotifications();
    } catch {
      //
    }
  };

  const markAllRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      fetchNotifications();
    } catch {
      //
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch {
      //
    }
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "tasks") return n.type === "task_deadline";
    if (activeTab === "projects") return n.type === "project_invite";
    if (activeTab === "communities") return n.type === "community_update";
    return true;
  });

  if (loading) return <LoadingState message="Loading notification center..." />;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="gsap-reveal-item flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
            Notifications Center
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "You're all caught up on system updates!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" onClick={markAllRead} leftIcon={<CheckCheck size={16} />}>
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="gsap-reveal-item flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "tasks", label: "Tasks" },
          { id: "projects", label: "Projects" },
          { id: "communities", label: "Communities" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                : "bg-zinc-900/80 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications found"
          description="Updates about your tasks, projects, and communities will appear here."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n._id}
              className={`gsap-reveal-item group flex items-start justify-between gap-4 rounded-3xl border p-4.5 backdrop-blur-xl transition-all duration-200 ${
                n.isRead
                  ? "border-white/5 bg-zinc-900/40"
                  : "border-orange-500/30 bg-zinc-900/80 shadow-lg shadow-orange-500/5"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                    typeColors[n.type] || typeColors.system
                  }`}
                >
                  <Bell size={16} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-semibold ${
                        n.isRead ? "text-zinc-400" : "text-white"
                      }`}
                    >
                      {n.title}
                    </h4>
                    {!n.isRead && (
                      <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0 shadow-sm shadow-orange-500" />
                    )}
                  </div>
                  {n.message && (
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      {n.message}
                    </p>
                  )}
                  <span className="mt-2 block text-[11px] font-medium text-zinc-500">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1 opacity-80 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {!n.isRead && (
                  <button
                    onClick={() => markRead(n._id)}
                    className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400 transition"
                    title="Mark read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n._id)}
                  className="rounded-xl p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition"
                  title="Delete notification"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
