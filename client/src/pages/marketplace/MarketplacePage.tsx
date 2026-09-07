import { useEffect, useState, useCallback } from "react";
import { Plus, Search, MapPin, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";
import Modal from "../../components/common/Modal";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import Card3DTilt from "../../components/3d/Card3DTilt";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  seller: { fullName: string; avatar: string; college: string };
  createdAt: string;
}

const categories = ["books", "electronics", "notes", "calculators", "furniture", "supplies", "other"];
const conditions = ["new", "like_new", "good", "fair", "poor"];
const conditionLabels: Record<string, string> = {
  new: "New",
  like_new: "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};
const categoryLabels: Record<string, string> = {
  books: "📚 Books",
  electronics: "💻 Electronics",
  notes: "📝 Notes",
  calculators: "🔢 Calculators",
  furniture: "🪑 Furniture",
  supplies: "📦 Supplies",
  other: "📌 Other",
};

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "books",
    condition: "good",
    location: "",
  });

  const fetchListings = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (category) params.category = category;
      const res = await api.get("/listings", { params });
      setListings(res.data.listings || []);
    } catch {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.price) return;
    setSaving(true);
    try {
      await api.post("/listings", { ...form, price: Number(form.price) });
      setModalOpen(false);
      setForm({ title: "", description: "", price: "", category: "books", condition: "good", location: "" });
      fetchListings();
    } catch {
      toast.error("Failed to create listing");
    } finally {
      setSaving(false);
    }
  };

  const filtered = search
    ? listings.filter((l) => l.title.toLowerCase().includes(search.toLowerCase()))
    : listings;

  if (loading) return <LoadingState message="Loading marketplace items..." />;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Discovery Hero Header */}
      <div className="gsap-reveal-item flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
            Campus Marketplace
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Find what you need. Sell what you don't across your campus.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>
          List Item for Sale
        </Button>
      </div>

      {/* Discovery Search & Category Toolbar */}
      <div className="gsap-reveal-item space-y-4">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 backdrop-blur-xl">
          <Search size={18} className="text-orange-400 shrink-0" />
          <input
            placeholder="Search books, notes, calculators, electronics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchListings()}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
              !category
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                : "bg-zinc-900/80 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            All Items
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                category === c
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-zinc-900/80 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              {categoryLabels[c] || c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No marketplace listings found"
          description="Be the first to post a study resource or item for sale."
          action={
            <Button onClick={() => setModalOpen(true)} leftIcon={<Plus size={16} />}>
              List an Item
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item._id} className="gsap-reveal-item h-full">
              <Card3DTilt className="group flex flex-col justify-between h-full">
                <div>
                  {/* Category & Condition Badges */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-lg bg-zinc-800/80 border border-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300">
                      {categoryLabels[item.category] || item.category}
                    </span>
                    <Badge variant="orange">
                      {conditionLabels[item.condition] || item.condition}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Price Tag */}
                  <div className="mt-4 text-2xl font-black text-orange-400 tracking-tight">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>

                {/* Seller Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-500/20 text-xs font-black text-orange-400">
                      {item.seller?.fullName?.charAt(0) || "S"}
                    </div>
                    <span className="text-xs font-semibold text-zinc-300">
                      {item.seller?.fullName || "Student Seller"}
                    </span>
                  </div>
                  {item.location && (
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <MapPin size={12} /> {item.location}
                    </span>
                  )}
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
        title="List Item for Sale"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Operating Systems Concept 10th Ed"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe condition, missing pages, or notes included..."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="450"
                min="0"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Condition</label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none"
              >
                {conditions.map((c) => (
                  <option key={c} value={c}>
                    {conditionLabels[c]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Campus Hostel / City"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          <Button
            onClick={handleCreate}
            isLoading={saving}
            disabled={!form.title.trim() || !form.price}
            className="w-full mt-2"
          >
            Post Listing
          </Button>
        </div>
      </Modal>
    </div>
  );
}
