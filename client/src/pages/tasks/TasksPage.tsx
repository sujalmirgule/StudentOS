import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Calendar,
  Pencil,
  Trash2,
  ListTodo,
  Tag,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  deadline: string | null;
  project: { _id: string; title: string } | null;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.06,
    delay: 0.05,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    deadline: "",
  });

  const fetchTasks = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      if (search) params.search = search;

      const res = await api.get("/tasks", { params });
      setTasks(res.data.tasks || []);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openCreateModal = () => {
    setEditingTask(null);
    setForm({ title: "", description: "", priority: "medium", status: "todo", deadline: "" });
    setModalOpen(true);
  };

  const openEditModal = (t: Task) => {
    setEditingTask(t);
    setForm({
      title: t.title,
      description: t.description || "",
      priority: t.priority || "medium",
      status: t.status || "todo",
      deadline: t.deadline ? t.deadline.split("T")[0] : "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
      } else {
        await api.post("/tasks", form);
      }
      setModalOpen(false);
      fetchTasks();
    } catch {
      toast.error('Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (task: Task) => {
    const nextStatus = task.status === "completed" ? "todo" : "completed";
    try {
      await api.put(`/tasks/${task._id}`, { status: nextStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
      );
    } catch {
      toast.error('Failed to update task status');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = search
    ? tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    : tasks;

  if (loading) return <LoadingState message="Loading your task assignments..." />;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header Banner */}
      <div className="gsap-reveal-item flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
            Tasks Workspace
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Keep your semester moving forward with organized assignments & deadlines.
          </p>
        </div>
        <Button onClick={openCreateModal} leftIcon={<Plus size={16} />}>
          New Task Assignment
        </Button>
      </div>

      {/* Filter & Toolbar */}
      <div className="gsap-reveal-item flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-zinc-900/60 p-3.5 rounded-3xl border border-white/10 backdrop-blur-xl">
        {/* Search Input */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 sm:w-80">
          <Search size={16} className="text-zinc-500" />
          <input
            placeholder="Search task assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 px-2">
            <Filter size={13} />
            <span className="hidden sm:inline font-semibold">Filter:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 outline-none hover:border-white/20"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 outline-none hover:border-white/20"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Task List Content */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="No task assignments found"
          description="Create your first task assignment to keep track of academic deadlines."
          action={
            <Button onClick={openCreateModal} leftIcon={<Plus size={16} />}>
              Create Task
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="gsap-reveal-item group flex flex-col gap-3 rounded-3xl border border-white/10 bg-zinc-900/60 p-4.5 backdrop-blur-xl transition-all duration-200 hover:border-orange-500/30 hover:bg-zinc-900/90 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Checkbox + Title + Description */}
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  onClick={() => toggleStatus(task)}
                  className="mt-0.5 text-zinc-500 hover:text-emerald-400 transition shrink-0"
                  aria-label="Toggle task completion"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 size={20} className="text-emerald-400" />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
                <div className="min-w-0">
                  <h4
                    className={`text-sm font-semibold ${
                      task.status === "completed"
                        ? "text-zinc-500 line-through"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="mt-0.5 text-xs text-zinc-400 line-clamp-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Metadata + Actions */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                {task.project && (
                  <span className="flex items-center gap-1 rounded-lg bg-zinc-800/80 px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-white/5">
                    <Tag size={12} className="text-orange-400" />
                    {task.project.title}
                  </span>
                )}

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
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
                    <Calendar size={13} />
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                )}

                <div className="flex gap-1 opacity-80 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    onClick={() => openEditModal(task)}
                    className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                    title="Edit Task"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="rounded-xl p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition"
                    title="Delete Task"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? "Edit Task Assignment" : "New Task Assignment"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Operating Systems Lab Assignment"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Details or notes about this task..."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Deadline</label>
            <input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <Button
            onClick={handleSave}
            isLoading={saving}
            disabled={!form.title.trim()}
            className="w-full mt-2"
          >
            {editingTask ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
