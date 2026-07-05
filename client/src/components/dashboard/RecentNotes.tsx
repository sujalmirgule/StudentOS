import { BookOpen } from "lucide-react";

const notes = [
  "Operating System",
  "DBMS",
  "Computer Networks",
  "Java",
];

export default function RecentNotes() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-7">

      <div className="flex items-center gap-3">

        <BookOpen className="text-orange-500" />

        <h2 className="text-xl font-bold text-white">
          Recent Notes
        </h2>

      </div>

      <div className="mt-6 space-y-4">

        {notes.map((note) => (

          <div
            key={note}
            className="rounded-2xl bg-zinc-800 p-4 text-white"
          >
            {note}
          </div>

        ))}

      </div>

    </div>
  );
}