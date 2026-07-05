import { Brain, ArrowRight } from "lucide-react";

export default function AIWidget() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-7">

      <Brain className="text-white" size={34} />

      <h2 className="mt-5 text-2xl font-bold text-white">
        AI Assistant
      </h2>

      <p className="mt-3 leading-7 text-orange-100">
        Ask doubts, summarize notes,
        generate quizzes and study faster.
      </p>

      <button className="mt-8 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-orange-500">

        Open AI

        <ArrowRight size={18} />

      </button>

    </div>
  );
}