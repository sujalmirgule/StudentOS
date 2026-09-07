import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Users } from "lucide-react";
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

interface Community {
  _id: string;
  name: string;
  description: string;
  category: string;
  members: string[];
  owner: { fullName: string; avatar: string };
}

const categoryLabels: Record<string, string> = {
  engineering: "Engineering",
  web_dev: "Web Dev",
  ai_ml: "AI / ML",
  hackathons: "Hackathons",
  placement: "Placement Prep",
  college: "Campus Life",
  other: "General Circle",
};

export default function CommunitiesPage() {
  const { user } = useAuthStore();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [joining, setJoining] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", category: "other" });

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const fetchCommunities = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      const res = await api.get("/communities", { params });
      setCommunities(res.data.communities || []);
    } catch {
      toast.error('Failed to load communities');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await api.post("/communities", form);
      setModalOpen(false);
      setForm({ name: "", description: "", category: "other" });
      fetchCommunities();
    } catch {
      toast.error('Failed to create community');
    } finally {
      setSaving(false);
    }
  };

  const handleJoinLeave = async (community: Community) => {
    if (!user) return;
    setJoining(community._id);
    const isMember = community.members.includes(user.id);
    try {
      await api.post(`/communities/${community._id}/${isMember ? "leave" : "join"}`);
      fetchCommunities();
    } catch {
      toast.error('Failed to update membership');
    } finally {
      setJoining(null);
    }
  };

  const filtered = search
    ? communities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : communities;

  if (loading) return <LoadingState message="Loading campus communities..." />;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="gsap-reveal-item flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
            Campus Circles & Communities
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Discover tech circles, placement study rooms, and student communities.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>
          Create Circle
        </Button>
      </div>

      {/* Search Bar */}
      <div className="gsap-reveal-item flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 sm:max-w-xs backdrop-blur-xl">
        <Search size={16} className="text-zinc-500" />
        <input
          placeholder="Search communities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchCommunities()}
          className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No communities found"
          description="Be the first to create a student circle on campus."
          action={
            <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>
              Create Circle
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const isMember = user ? c.members.includes(user.id) : false;
            return (
              <div key={c._id} className="gsap-reveal-item h-full">
                <Card3DTilt className="group flex flex-col justify-between h-full">
                  <div>
                    {/* Category & Member Count */}
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="purple">
                        {categoryLabels[c.category] || c.category}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                        <Users size={13} />
                        <span>{c.members?.length || 0} members</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                      {c.name}
                    </h3>
                    {c.description && (
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                        {c.description}
                      </p>
                    )}
                  </div>

                  {/* Footer Join Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-500/20 text-xs font-black text-orange-400">
                        {c.owner?.fullName?.charAt(0) || "C"}
                      </div>
                      <span className="text-xs font-semibold text-zinc-400">
                        {c.owner?.fullName}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant={isMember ? "secondary" : "primary"}
                      isLoading={joining === c._id}
                      onClick={() => handleJoinLeave(c)}
                    >
                      {isMember ? "Joined" : "Join Circle"}
                    </Button>
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
        title="Create Student Circle"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400">Circle Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Web3 Developers Circle"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What's this community about? Projects, prep, discussions..."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleCreate}
            isLoading={saving}
            disabled={!form.name.trim()}
            className="w-full mt-2"
          >
            Create Circle
          </Button>
        </div>
      </Modal>
    </div>
  );
}
