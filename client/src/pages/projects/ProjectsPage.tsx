import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  ExternalLink,
  Users,
  FolderKanban,
  GitBranch,
} from "lucide-react";
import api from "../../services/api";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import Card3DTilt from "../../components/3d/Card3DTilt";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import toast from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  status: string;
  progress: number;
  deadline: string | null;
  members: { user: { fullName: string; avatar: string }; role: string }[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    status: "planning",
    progress: 0,
    deadline: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || []);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      status: "planning",
      progress: 0,
      deadline: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description || "",
      technologies: p.technologies ? p.technologies.join(", ") : "",
      githubUrl: p.githubUrl || "",
      status: p.status || "planning",
      progress: p.progress || 0,
      deadline: p.deadline ? p.deadline.split("T")[0] : "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const data = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      deadline: form.deadline || null,
      progress: Number(form.progress),
    };
    try {
      if (editing) {
        await api.put(`/projects/${editing._id}`, data);
      } else {
        await api.post("/projects", data);
      }
      setModalOpen(false);
      fetchProjects();
    } catch {
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const filtered = search
    ? projects.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : projects;

  if (loading) return <LoadingState message="Loading projects portfolio..." />;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header Banner */}
      <div className="gsap-reveal-item flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
            Projects Portfolio
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Build something worth shipping with your teammates and link GitHub repositories.
          </p>
        </div>
        <Button onClick={openCreateModal} leftIcon={<Plus size={16} />}>
          New Project
        </Button>
      </div>

      {/* Toolbar Search */}
      <div className="gsap-reveal-item flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 sm:max-w-xs backdrop-blur-xl">
        <Search size={16} className="text-zinc-500" />
        <input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects found"
          description="Start a new project to collaborate and build together."
          action={
            <Button onClick={openCreateModal} leftIcon={<Plus size={16} />}>
              Start Project
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p._id} className="gsap-reveal-item h-full">
              <Card3DTilt className="group flex flex-col justify-between h-full">
                <div>
                  {/* Status & Actions Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <Badge
                      variant={
                        p.status === "active"
                          ? "green"
                          : p.status === "completed"
                            ? "default"
                            : p.status === "on_hold"
                              ? "yellow"
                              : "blue"
                      }
                    >
                      {p.status.replace("_", " ")}
                    </Badge>

                    <div className="flex gap-1 opacity-80 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <button
                        onClick={() => openEditModal(p)}
                        className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                        title="Edit Project"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteProject(p._id)}
                        className="rounded-xl p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {p.description}
                    </p>
                  )}

                  {/* Tech Tags */}
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/5 bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.technologies.length > 4 && (
                        <span className="rounded-lg border border-white/5 bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-500">
                          +{p.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Progress & Footer */}
                <div className="mt-6 border-t border-white/5 pt-4 space-y-3">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-400">
                      <span className="text-[11px] font-semibold text-zinc-400">Progress</span>
                      <span className="font-bold text-white">{p.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-800/80 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} />
                      <span>{p.members?.length || 1} member</span>
                    </div>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition font-semibold"
                      >
                        <GitBranch size={13} /> Repository <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </Card3DTilt>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Project" : "New Project"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Smart Student Workspace App"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Project goals, tech stack, roadmap..."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">
              Technologies (comma separated)
            </label>
            <input
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="React, TypeScript, Node.js, Three.js"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">GitHub Repository URL</label>
            <input
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="https://github.com/username/project"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">
                Progress ({form.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                className="mt-3 w-full accent-orange-500"
              />
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
            {editing ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
