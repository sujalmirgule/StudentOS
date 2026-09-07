import api from "./api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const aiService = {
  sendMessage: async (prompt: string): Promise<string> => {
    try {
      // Clean backend service boundary — calls backend route /ai/chat if available
      const res = await api.post("/ai/chat", { prompt });
      return res.data.response;
    } catch {
      // Fallback mock response provider when no backend AI key / API route is configured
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            `I'm the StudentOS AI Assistant! 🤖\n\nI can help you with:\n• **Study help** — Explain concepts, create summaries\n• **Code help** — Debug, review, and write code\n• **Project planning** — Break down tasks, suggest architectures\n• **Exam preparation** — Generate practice questions\n• **Career guidance** — Resume tips, interview prep\n\n*Note: Running in local provider mode. Add an AI API key to your server environment variables to connect a live LLM model.*`
          );
        }, 1000);
      });
    }
  },
};
