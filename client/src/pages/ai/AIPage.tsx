import { useState, useRef, useEffect } from "react";
import { Brain, Send, Copy, RotateCcw, Trash2, Sparkles, AlertCircle } from "lucide-react";
import { useAuthStore } from "../../context/AuthContext";
import { aiService, type ChatMessage } from "../../services/ai";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useGsapReveal } from "../../hooks/useGsapReveal";

const suggestions = [
  "Explain binary search in simple terms",
  "Help me plan my semester study schedule",
  "Summarize the concept of DBMS normalization",
  "Generate 5 practice interview questions for React",
  "Write a study roadmap for Data Structures & Algorithms",
  "Explain the key differences between TCP and UDP",
];

export default function AIPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal-item", {
    stagger: 0.08,
    delay: 0.05,
  });

  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const response = await aiService.sendMessage(text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setError("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (index: number) => {
    if (loading) return;
    let lastUserMsg = "";
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        lastUserMsg = messages[i].content;
        break;
      }
    }
    if (!lastUserMsg) return;

    setMessages((prev) => prev.slice(0, index));
    setLoading(true);
    setError(null);

    try {
      const response = await aiService.sendMessage(lastUserMsg);
      const aiMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setError("Failed to regenerate response.");
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div
      ref={containerRef}
      className="flex h-[calc(100vh-8rem)] flex-col lg:h-[calc(100vh-6.5rem)]"
    >
      {/* Header */}
      <div className="gsap-reveal-item mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/20">
            <Brain className="text-white" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                AI Assistant Workspace
              </h1>
              <Badge variant="orange">AI Online</Badge>
            </div>
            <p className="text-xs text-zinc-400">
              Smart student study, code, and project planning companion
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearChat} leftIcon={<Trash2 size={15} />}>
            Clear Chat
          </Button>
        )}
      </div>

      {/* Chat Area Container */}
      <div className="gsap-reveal-item flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-2xl">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-xl shadow-orange-500/20">
              <Sparkles className="text-white" size={32} />
            </div>
            <h2 className="mt-6 text-2xl font-black text-white">
              How can StudentOS AI help you today?
            </h2>
            <p className="mt-2 text-xs text-zinc-400 max-w-md">
              Ask questions about your courses, code debugging, semester study plans, or practice interview questions.
            </p>

            {/* Quick Prompt Cards */}
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 text-left text-xs font-semibold text-zinc-300 transition-all duration-200 hover:border-orange-500/30 hover:bg-zinc-800/90 hover:text-white"
                >
                  ✨ {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/20">
                    <Brain size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-md shadow-orange-500/20"
                      : "border border-white/10 bg-zinc-950/80 text-zinc-200 backdrop-blur"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === "assistant" && (
                    <div className="mt-3 flex gap-2 border-t border-white/10 pt-3">
                      <button
                        onClick={() => copyMessage(msg.id, msg.content)}
                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                      >
                        <Copy size={12} /> {copiedId === msg.id ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => handleRegenerate(idx)}
                        disabled={loading}
                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold text-zinc-400 hover:bg-zinc-800 hover:text-white transition disabled:opacity-50"
                      >
                        <RotateCcw size={12} /> Regenerate
                      </button>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-xs font-black text-orange-400 border border-orange-500/30">
                    {userInitial}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                  <Brain size={16} className="text-white" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>Thinking</span>
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-orange-400 [animation-delay:0ms]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-orange-400 [animation-delay:150ms]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-orange-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400 font-semibold">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="gsap-reveal-item mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3 backdrop-blur-xl focus-within:border-orange-500/50">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask StudentOS AI anything..."
          className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-zinc-500"
        />
        <Button
          size="sm"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          rightIcon={<Send size={15} />}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
