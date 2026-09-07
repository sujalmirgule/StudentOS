import { useState } from "react";
import {
  Pencil,
  ExternalLink,
  Globe,
  Save,
  X,
} from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";
import { authService } from "../../services/auth";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
    college: user?.college || "",
    course: user?.course || "",
    semester: user?.semester?.toString() || "",
    skills: user?.skills?.join(", ") || "",
    interests: user?.interests?.join(", ") || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...form,
        semester: form.semester ? Number(form.semester) : null,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        interests: form.interests.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const res = await authService.updateProfile(data);
      updateUser(res.data.user);
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  const userInitial = user.fullName?.charAt(0)?.toUpperCase() || "S";

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Top Banner Header */}
      <div className="gsap-reveal-item relative overflow-hidden rounded-[36px] border border-orange-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-8 shadow-2xl shadow-orange-500/10 backdrop-blur-2xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-3xl font-black text-white shadow-xl shadow-orange-500/25">
              {userInitial}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
                  {user.fullName}
                </h1>
                <Badge variant="orange">Student</Badge>
              </div>
              <p className="text-xs font-semibold text-zinc-400 mt-1">@{user.username}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div>
            {!editing ? (
              <Button
                variant="secondary"
                onClick={() => setEditing(true)}
                leftIcon={<Pencil size={15} />}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setEditing(false)}
                  leftIcon={<X size={15} />}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  isLoading={saving}
                  leftIcon={<Save size={15} />}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Details Form / Display */}
        <div className="lg:col-span-2 space-y-6">
          <div className="gsap-reveal-item rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">
              Academic & Personal Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <ProfileField
                label="Bio"
                value={form.bio}
                editing={editing}
                onChange={(v) => setForm({ ...form, bio: v })}
                multiline
                placeholder="Tell peers about your interests, goals, or projects..."
              />
              <ProfileField
                label="College / University"
                value={form.college}
                editing={editing}
                onChange={(v) => setForm({ ...form, college: v })}
                placeholder="College name"
              />
              <ProfileField
                label="Degree / Course"
                value={form.course}
                editing={editing}
                onChange={(v) => setForm({ ...form, course: v })}
                placeholder="e.g. Computer Science Engineering"
              />
              <ProfileField
                label="Semester"
                value={form.semester}
                editing={editing}
                onChange={(v) => setForm({ ...form, semester: v })}
                placeholder="e.g. 5"
                type="number"
              />
            </div>
          </div>

          {/* Skills & Technical Focus Section */}
          <div className="gsap-reveal-item rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">
              Skills & Technical Focus
            </h3>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Skills (comma separated)</label>
              {editing ? (
                <input
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="React, TypeScript, Node.js, Python, Three.js"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
                />
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.skills && user.skills.length > 0 ? (
                    user.skills.map((s) => (
                      <Badge key={s} variant="orange">
                        {s}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-500">No skills added yet.</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Interests (comma separated)</label>
              {editing ? (
                <input
                  value={form.interests}
                  onChange={(e) => setForm({ ...form, interests: e.target.value })}
                  placeholder="Web3, AI/ML, Hackathons, Open Source"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
                />
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.interests && user.interests.length > 0 ? (
                    user.interests.map((i) => (
                      <Badge key={i} variant="default">
                        {i}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-500">No interests added yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Social Links Card */}
        <div className="gsap-reveal-item space-y-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">
              Social Links
            </h3>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <ExternalLink size={14} className="text-orange-400" /> GitHub Profile
              </label>
              {editing ? (
                <input
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
                />
              ) : user.github ? (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block truncate text-xs text-orange-400 hover:underline font-semibold"
                >
                  {user.github}
                </a>
              ) : (
                <p className="mt-1.5 text-xs text-zinc-600">Not provided</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Globe size={14} className="text-blue-400" /> LinkedIn Profile
              </label>
              {editing ? (
                <input
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
                />
              ) : user.linkedin ? (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block truncate text-xs text-blue-400 hover:underline font-semibold"
                >
                  {user.linkedin}
                </a>
              ) : (
                <p className="mt-1.5 text-xs text-zinc-600">Not provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  multiline,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400">{label}</label>
      {editing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
          />
        ) : (
          <input
            type={type || "text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
          />
        )
      ) : (
        <p className="mt-1.5 text-xs text-zinc-200 font-medium">
          {value || <span className="text-zinc-600">Not set</span>}
        </p>
      )}
    </div>
  );
}
