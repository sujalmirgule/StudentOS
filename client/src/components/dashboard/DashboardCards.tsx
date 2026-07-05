import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function DashboardCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">

      <Card
        icon={<BookOpen />}
        title="Notes"
        value="124"
      />

      <Card
        icon={<Brain />}
        title="AI Chats"
        value="39"
      />

      <Card
        icon={<Calendar />}
        title="Tasks"
        value="16"
      />

      <Card
        icon={<CheckCircle />}
        title="Progress"
        value="92%"
      />

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-7">

      <div className="mb-6 text-orange-500">

        {icon}

      </div>

      <h2 className="text-4xl font-black text-white">

        {value}

      </h2>

      <p className="mt-2 text-zinc-500">

        {title}

      </p>

    </div>
  );
}