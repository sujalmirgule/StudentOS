import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Bookmark, BookmarkCheck, ExternalLink, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import Card3DTilt from "../../components/3d/Card3DTilt";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../context/AuthContext";
import { useGsapReveal } from "../../hooks/useGsapReveal";

interface Resource {
  _id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  category: string;
  subject: string;
  semester: number | null;
  uploadedBy: { _id: string; fullName: string; avatar: string };
  bookmarkedBy: string[];
}

const types = ["notes", "pdf", "link", "video", "other"];
const typeIcons: Record<string, string> = {
  notes: "📝",
  pdf: "📄",
  link: "🔗",
  video: "🎥",
  other: "📌",
};

export default function ResourcesPage() {
  const { user } = useAuthStore();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "notes",
    url: "",
    category: "",
    subject: "",
    semester: "",
  });

  const fetchResources = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (typeFilter) params.type = typeFilter;
      const res = await api.get("/resources", { params });
      setResources(res.data.resources || []);
    } catch {
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.type) return;
    setSaving(true);
    try {
      await api.post("/resources", {
        ...form,
        semester: form.semester ? Number(form.semester) : null,
      });
      setModalOpen(false);
      setForm({ title: "", description: "", type: "notes", url: "", category: "", subject: "", semester: "" });
      fetchResources();
    } catch {
      toast.error('Failed to upload resource');
    } finally {
      setSaving(false);
    }
  };

  const toggleBookmark = async (id: string) => {
    try {
      await api.post(`/resources/${id}/bookmark`);
      fetchResources();
    } catch {
      toast.error('Failed to update bookmark');
    }
  };

  const deleteResource = async (id: string) => {
    try {
      await api.delete(`/resources/${id}`);
      fetchResources();
    } catch {
      toast.error('Failed to delete resource');
    }
  };

  const filtered = search
    ? resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
    : resources;

  if (loading) return <LoadingState message="Loading study resource library..." />;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="gsap-reveal-item flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
            Study Resource Library
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Verified study notes, PDFs, reference links, and semester material.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>
          Upload Resource
        </Button>
      </div>

      {/* Toolbar Search & Type Filters */}
      <div className="gsap-reveal-item space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 backdrop-blur-xl">
          <Search size={18} className="text-orange-400 shrink-0" />
          <input
            placeholder="Search study materials by title, subject, DBMS, OS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchResources()}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
        </div>

        {/* Type Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTypeFilter("")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
              !typeFilter
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                : "bg-zinc-900/80 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            All Types
          </button>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                typeFilter === t
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-zinc-900/80 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              {typeIcons[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No study resources found"
          description="Share notes or semester links with fellow students."
          action={
            <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>
              Upload Resource
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => {
            const isBookmarked = user ? resource.bookmarkedBy.includes(user.id) : false;
            const isOwner = user ? resource.uploadedBy?._id === user.id : false;
            return (
              <div key={resource._id} className="gsap-reveal-item h-full">
                <Card3DTilt className="group flex flex-col justify-between h-full">
                  <div>
                    {/* Type Badge & Bookmark Action */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-lg bg-zinc-800/80 border border-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300">
                        {typeIcons[resource.type]} {resource.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmark(resource._id)}
                          className="rounded-xl p-1.5 text-zinc-400 hover:text-orange-400 transition"
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark Resource"}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck size={18} className="text-orange-400" />
                          ) : (
                            <Bookmark size={18} />
                          )}
                        </button>
                        {isOwner && (
                          <button
                            onClick={() => deleteResource(resource._id)}
                            className="rounded-xl p-1.5 text-zinc-400 opacity-80 sm:opacity-0 hover:text-red-400 group-hover:opacity-100 transition"
                            title="Delete Resource"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                      {resource.title}
                    </h3>
                    {resource.description && (
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                        {resource.description}
                      </p>
                    )}

                    {/* Subject & Semester Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {resource.subject && (
                        <Badge variant="blue">{resource.subject}</Badge>
                      )}
                      {resource.semester && (
                        <Badge variant="default">Sem {resource.semester}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Footer Link Opener */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs text-zinc-500 font-medium">
                      By {resource.uploadedBy?.fullName || "Student"}
                    </span>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 transition"
                      >
                        Open Resource <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </Card3DTilt>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Study Resource"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400">Resource Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. DBMS Unit 3 Normalization Notes"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description of the study notes or exam guide..."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Resource Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="DBMS / Operating Systems"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Resource URL / Link</label>
              <input
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://drive.google.com/..."
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Semester</label>
              <input
                type="number"
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
                placeholder="1-8"
                min="1"
                max="8"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <Button
            onClick={handleCreate}
            isLoading={saving}
            disabled={!form.title.trim()}
            className="w-full mt-2"
          >
            Upload Resource
          </Button>
        </div>
      </Modal>
    </div>
  );
}
