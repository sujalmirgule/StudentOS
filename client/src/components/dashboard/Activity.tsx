const activity = [
  "Completed DBMS Notes",
  "AI Generated Quiz",
  "Uploaded Java Notes",
  "Joined Team Alpha",
];

export default function Activity() {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-7">

      <h2 className="text-xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">

        {activity.map((item) => (

          <div
            key={item}
            className="rounded-2xl bg-zinc-800 p-4"
          >
            <p className="text-zinc-300">
              {item}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}