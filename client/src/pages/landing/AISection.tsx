import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, CheckSquare, Code2, Brain } from "lucide-react";

interface AIPromptSample {
  prompt: string;
  response: string;
  category: string;
  icon: typeof Sparkles;
}

const SAMPLE_PROMPTS: AIPromptSample[] = [
  {
    category: "Concept Breakdown",
    prompt: "Can you explain Dijkstra's algorithm using a simple campus map example?",
    response:
      "Imagine finding the shortest walking path between your CS department and the library. Dijkstra starts at the department, explores all immediate path intersections, and always chooses the unvisited vertex with the minimum cumulative distance, updating distances as shorter routes emerge.",
    icon: Brain,
  },
  {
    category: "Task Breakdown",
    prompt: "How should I structure my 3-week Operating Systems memory management project?",
    response:
      "Week 1: Design paging data structures and free-frame bitmasks.\nWeek 2: Implement page replacement policies (FIFO & LRU) and track page faults.\nWeek 3: Stress-test against concurrent memory allocations and write lab documentation.",
    icon: CheckSquare,
  },
  {
    category: "Code Help & Review",
    prompt: "Why is my binary search tree insertion causing a stack overflow on sorted inputs?",
    response:
      "Inserting sorted data into an unbalanced BST causes every node to become a right child, turning the tree into a linked list with O(N) depth. The recursive call stack exceeds limits. Solution: Use iterative insertion or implement an AVL / Red-Black balanced tree.",
    icon: Code2,
  },
];

export default function AISection() {
  const [selectedSample, setSelectedSample] = useState(0);

  return (
    <section id="ai" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#080D0B] border-b border-white/5 relative overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-[#5EEAD4]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[min(94vw,1800px)] relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111916] border border-[#5EEAD4]/30 text-[11px] font-mono tracking-wider uppercase text-[#5EEAD4]">
            <Sparkles size={13} className="text-[#5EEAD4]" />
            STUDY ASSISTANT
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E8ECE7]">
            AI that understands your student workflow.
          </h2>

          <p className="text-sm sm:text-base text-[#A2ADA5] leading-relaxed max-w-2xl mx-auto">
            Not a generic chatbot or marketing gimmick. An intelligent assistant designed to help
            you think through complex coursework, organize projects, and prepare for exams.
          </p>
        </div>

        {/* Interactive Assistant Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Sample Categories */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#78864A] font-semibold mb-2">
              Select an academic workflow:
            </p>

            {SAMPLE_PROMPTS.map((sample, idx) => {
              const Icon = sample.icon;
              const isSelected = selectedSample === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSample(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3 ${
                    isSelected
                      ? "bg-[#111916] border-[#14B8A6] shadow-lg shadow-[#14B8A6]/10"
                      : "bg-[#0C1210] border-white/5 hover:border-white/15 text-[#A2ADA5]"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl border shrink-0 ${
                      isSelected
                        ? "bg-[#14B8A6]/20 border-[#14B8A6]/40 text-[#5EEAD4]"
                        : "bg-white/5 border-white/5 text-[#A2ADA5]"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? "text-[#E8ECE7]" : "text-[#A2ADA5]"}`}>
                      {sample.category}
                    </h4>
                    <p className="text-[11px] text-[#6F7C74] line-clamp-1 mt-0.5">
                      {sample.prompt}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="pt-4">
              <Link
                to="/ai"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#5EEAD4] hover:underline"
              >
                <span>Try the AI Copilot inside workspace</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview Terminal */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-[#0C1210] border border-[#14B8A6]/30 shadow-2xl space-y-4">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 text-[11px] font-mono text-[#6F7C74]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-[#A2ADA5]">StudentOS Copilot</span>
              </div>
              <span className="text-[#5EEAD4]">Live Preview</span>
            </div>

            {/* Prompt */}
            <div className="p-3.5 rounded-xl bg-[#111916] border border-white/5 text-xs text-[#E8ECE7]">
              <span className="font-mono text-[#14B8A6] font-bold mr-2">Student:</span>
              <span>{SAMPLE_PROMPTS[selectedSample].prompt}</span>
            </div>

            {/* Response */}
            <div className="p-4 rounded-xl bg-[#141E1A]/80 border border-[#14B8A6]/20 text-xs text-[#E8ECE7] leading-relaxed space-y-2 whitespace-pre-line font-sans">
              <div className="flex items-center gap-2 text-[#5EEAD4] font-mono text-[11px] font-bold">
                <Sparkles size={14} />
                <span>Copilot Answer:</span>
              </div>
              <p className="text-[#A2ADA5]">{SAMPLE_PROMPTS[selectedSample].response}</p>
            </div>

            {/* Micro Connection Footnote */}
            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#6F7C74]">
              <span>Links directly to Tasks & Notes</span>
              <span>Context-aware assistance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
