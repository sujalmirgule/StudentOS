import { useState } from "react";
import { User, Shield, Bell, Palette, Lock } from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";
import { authService } from "../../services/auth";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import toast from 'react-hot-toast';

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy & Data", icon: Lock },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="gsap-reveal-item border-b border-white/5 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-white lg:text-4xl">
          Account & Preferences Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage your student profile, security credentials, and notification preferences.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Navigation Sidebar Tabs */}
        <div className="gsap-reveal-item w-full space-y-1 lg:w-60 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                    : "text-zinc-400 hover:bg-zinc-900/80 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="gsap-reveal-item flex-1 rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-2xl">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "privacy" && <PrivacySettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const { user, updateUser } = useAuthStore();
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
    college: user?.college || "",
    course: user?.course || "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await authService.updateProfile(form);
      updateUser(res.data.user);
      setMsg("Profile updated successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch {
      setMsg("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">
        Profile Settings
      </h2>
      {msg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs font-bold text-emerald-400">
          {msg}
        </div>
      )}
      <div className="space-y-4 max-w-xl">
        <SettingsInput
          label="Full Name"
          value={form.fullName}
          onChange={(v) => setForm({ ...form, fullName: v })}
        />
        <SettingsInput
          label="Bio"
          value={form.bio}
          onChange={(v) => setForm({ ...form, bio: v })}
          multiline
        />
        <SettingsInput
          label="College / University"
          value={form.college}
          onChange={(v) => setForm({ ...form, college: v })}
        />
        <SettingsInput
          label="Course / Field of Study"
          value={form.course}
          onChange={(v) => setForm({ ...form, course: v })}
        />
        <Button onClick={handleSave} isLoading={saving} className="mt-2">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleChange = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setMsg({ text: "Passwords do not match", type: "error" });
      return;
    }
    if (form.newPassword.length < 6) {
      setMsg({ text: "Password must be at least 6 characters", type: "error" });
      return;
    }
    setSaving(true);
    try {
      await authService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setMsg({ text: "Password changed successfully!", type: "success" });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setMsg({
        text: err.response?.data?.message || "Failed to change password",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">
        Security & Password
      </h2>
      {msg.text && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs font-bold ${
            msg.type === "error"
              ? "border-red-500/20 bg-red-500/10 text-red-400"
              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {msg.text}
        </div>
      )}
      <div className="space-y-4 max-w-xl">
        <SettingsInput
          label="Current Password"
          value={form.currentPassword}
          onChange={(v) => setForm({ ...form, currentPassword: v })}
          type="password"
        />
        <SettingsInput
          label="New Password"
          value={form.newPassword}
          onChange={(v) => setForm({ ...form, newPassword: v })}
          type="password"
        />
        <SettingsInput
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={(v) => setForm({ ...form, confirmPassword: v })}
          type="password"
        />
        <Button onClick={handleChange} isLoading={saving} className="mt-2">
          Update Password
        </Button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const { user, updateUser } = useAuthStore();
  const [enabled, setEnabled] = useState(user?.notificationsEnabled ?? true);
  const [saving, setSaving] = useState(false);

  const toggle = async () => {
    setSaving(true);
    try {
      await authService.updateProfile({ notificationsEnabled: !enabled });
      setEnabled(!enabled);
      updateUser({ notificationsEnabled: !enabled });
    } catch {
      toast.error('Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">
        Notification Preferences
      </h2>
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-5 max-w-xl">
        <div>
          <h4 className="text-sm font-bold text-white">Email Notifications</h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Receive assignment deadline reminders & project activity alerts
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={saving}
          aria-label="Toggle notifications"
          className={`relative h-6 w-11 rounded-full transition ${
            enabled ? "bg-orange-500" : "bg-zinc-700"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
              enabled ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">
        Appearance Theme
      </h2>
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 p-5 max-w-xl">
        <div>
          <h4 className="text-sm font-bold text-white">Spatial Dark Mode</h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            StudentOS runs in spatial dark environment mode
          </p>
        </div>
        <Button size="sm" variant="primary">
          Dark Active
        </Button>
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">
        Privacy & Data Ownership
      </h2>
      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 max-w-xl space-y-2">
        <h4 className="text-sm font-bold text-white">Data Encryption & Storage</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Your tasks, projects, resources, and community activity are stored securely in your isolated database container. Passwords are salted and hashed with bcrypt.
        </p>
      </div>
    </div>
  );
}

function SettingsInput({
  label,
  value,
  onChange,
  multiline,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
        />
      ) : (
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50"
        />
      )}
    </div>
  );
}
