import { useEffect, useState } from "react";
import {
  ListTodo,
  FolderKanban,
  Clock,
  Users,
  Brain,
  ArrowRight,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../context/AuthContext";
import api from "../../services/api";
import WorkspaceHero3D from "../../components/3d/WorkspaceHero3D";
import Card3DTilt from "../../components/3d/Card3DTilt";
import { StatCard } from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/Badge";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import toast from 'react-hot-toast';

interface Task {
  _id: string;
  title: string;
  priority: string;
  status: string;
  deadline: string | null;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({ tasks: 0, projects: 0, communities: 0 });
  const [loading, setLoading] = useState(true);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const fetchDashboardData = async () => {
    try {
      const [taskRes, projectRes, communityRes] = await Promise.allSettled([
        api.get("/tasks"),
        api.get("/projects"),
        api.get("/communities"),
      ]);

      if (taskRes.status === "fulfilled") {
        setTasks(taskRes.value.data.tasks || []);
        setStats((s) => ({ ...s, tasks: taskRes.value.data.tasks?.length || 0 }));
      }
      if (projectRes.status === "fulfilled") {
        setStats((s) => ({ ...s, projects: projectRes.value.data.projects?.length || 0 }));
      }
      if (communityRes.status === "fulfilled") {
        setStats((s) => ({ ...s, communities: communityRes.value.data.communities?.length || 0 }));
      }
    } catch {
      // Silently handle API failures
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === "completed" ? "todo" : "completed";
    try {
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
    } catch {
      toast.error('Failed to update task');
    }
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const upcomingDeadlines = tasks.filter(
    (t) => t.deadline && t.status !== "completed"
  ).length;

  return (
    <div ref={containerRef} className="space-y-8">
      {/* ── 1. SPATIAL COMMAND CENTER HERO ── */}
      <div className="gsap-reveal-item relative overflow-hidden rounded-[36px] border border-orange-500/20 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-zinc-950/90 p-8 shadow-2xl shadow-orange-500/10 backdrop-blur-2xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Greeting & Status */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                <Sparkles size={13} />
                StudentOS Spatial Command Center
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {greeting()},{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                {user?.fullName?.split(" ")[0] || "Student"}
              </span>{" "}
              👋
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Welcome to your personal academic command center. Track priorities, manage campus projects, and access AI assistance in one unified spatial environment.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/tasks"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-xs font-bold text-white transition hover:scale-105 shadow-md shadow-orange-500/25"
              >
                <Plus size={16} /> New Task Assignment
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-3 text-xs font-bold text-zinc-200 backdrop-blur transition hover:bg-zinc-800 hover:border-white/20"
              >
                <Plus size={16} /> Start Project
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Workspace Scene Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <WorkspaceHero3D />
          </div>
        </div>
      </div>

      {/* ── 2. METRICS GRID ── */}
      <div className="gsap-reveal-item grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ListTodo size={22} />}
          label="Total Tasks"
          value={String(stats.tasks)}
          context={`${completedCount} completed tasks`}
          color="orange"
        />
        <StatCard
          icon={<FolderKanban size={22} />}
          label="Active Projects"
          value={String(stats.projects)}
          context="Workspace portfolio"
          color="blue"
        />
        <StatCard
          icon={<Clock size={22} />}
          label="Upcoming Deadlines"
          value={String(upcomingDeadlines)}
          context="Action required"
          color="yellow"
        />
        <StatCard
          icon={<Users size={22} />}
          label="Campus Circles"
          value={String(stats.communities)}
          context="Connected networks"
          color="green"
        />
      </div>

      {/* ── 3. MAIN DASHBOARD CONTENT GRID: TASKS + AI ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Tasks Workspace */}
        <div className="gsap-reveal-item lg:col-span-2 rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Today's Priorities & Assignments
              </h2>
              <p className="text-xs text-zinc-500">
                Click task status circle to mark completed
              </p>
            </div>
            <Link
              to="/tasks"
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 transition"
            >
              View All Tasks <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 py-2">
              <div className="h-14 w-full rounded-2xl bg-zinc-800/40 skeleton-shimmer" />
              <div className="h-14 w-full rounded-2xl bg-zinc-800/40 skeleton-shimmer" />
              <div className="h-14 w-full rounded-2xl bg-zinc-800/40 skeleton-shimmer" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-500 mb-3 border border-white/5">
                <ListTodo size={24} />
              </div>
              <p className="text-sm font-bold text-white">No tasks scheduled for today</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Your schedule is clear. Enjoy the breathing room or add a new assignment.
              </p>
              <Link
                to="/tasks"
                className="mt-4 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20"
              >
                Create Assignment
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task._id}
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-950/60 p-4 transition-all duration-200 hover:border-orange-500/30 hover:bg-zinc-800/60"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      onClick={() => toggleTaskStatus(task)}
                      className="text-zinc-500 hover:text-emerald-400 transition shrink-0"
                      aria-label="Toggle task status"
                    >
                      {task.status === "completed" ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                    <span
                      className={`text-xs font-medium truncate ${
                        task.status === "completed"
                          ? "text-zinc-500 line-through"
                          : "text-zinc-200 font-semibold"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant={
                        task.priority === "high" || task.priority === "urgent"
                          ? "red"
                          : task.priority === "medium"
                            ? "yellow"
                            : "default"
                      }
                    >
                      {task.priority}
                    </Badge>
                    {task.deadline && (
                      <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                        <Calendar size={12} />
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Companion Spatial Banner */}
        <div className="gsap-reveal-item rounded-3xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 flex flex-col justify-between shadow-xl shadow-orange-500/5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-md shadow-orange-500/10">
                <Brain size={24} />
              </div>
              <Badge variant="orange">AI Online</Badge>
            </div>
            <h3 className="text-xl font-black text-white">Need AI study help?</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Ask StudentOS AI to summarize lecture notes, review code syntax, generate practice quiz questions, or build a study roadmap.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <Link
              to="/ai"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-xs font-bold text-white transition hover:scale-[1.02] shadow-md shadow-orange-500/20"
            >
              Ask StudentOS AI
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. QUICK MODULES SPATIAL GRID ── */}
      <div className="gsap-reveal-item grid gap-4 sm:grid-cols-3">
        <Link to="/projects">
          <Card3DTilt className="group flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <FolderKanban className="text-sky-400" size={24} />
                <ArrowRight
                  size={16}
                  className="text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 transition"
                />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition">
                Projects Workspace
              </h4>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Build semester software, track team milestones, and link GitHub repositories.
              </p>
            </div>
          </Card3DTilt>
        </Link>

        <Link to="/marketplace">
          <Card3DTilt className="group flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="text-emerald-400" size={24} />
                <ArrowRight
                  size={16}
                  className="text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 transition"
                />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition">
                Campus Marketplace
              </h4>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Buy and sell used textbooks, calculators, monitors, and study supplies.
              </p>
            </div>
          </Card3DTilt>
        </Link>

        <Link to="/communities">
          <Card3DTilt className="group flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Users className="text-purple-400" size={24} />
                <ArrowRight
                  size={16}
                  className="text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 transition"
                />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition">
                Campus Circles
              </h4>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                Join campus developer circles, study groups, and hackathon teams.
              </p>
            </div>
          </Card3DTilt>
        </Link>
      </div>
    </div>
  );
}