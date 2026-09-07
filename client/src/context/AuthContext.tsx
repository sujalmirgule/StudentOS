import { create } from "zustand";
import { authService } from "../services/auth";
import type { User, LoginData, SignupData } from "../services/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(localStorage.getItem("studentos_user") || "null"),
  token: localStorage.getItem("studentos_token"),
  isAuthenticated: !!localStorage.getItem("studentos_token"),
  isLoading: false,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.login(data);
      const { token, user } = res.data;
      localStorage.setItem("studentos_token", token);
      localStorage.setItem("studentos_user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.signup(data);
      const { token, user } = res.data;
      localStorage.setItem("studentos_token", token);
      localStorage.setItem("studentos_user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Signup failed. Please try again.";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem("studentos_token");
    localStorage.removeItem("studentos_user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("studentos_token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }
    try {
      const res = await authService.getProfile();
      const user = res.data.user;
      localStorage.setItem("studentos_user", JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } catch {
      localStorage.removeItem("studentos_token");
      localStorage.removeItem("studentos_user");
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  updateUser: (data) => {
    const current = get().user;
    if (current) {
      const updated = { ...current, ...data };
      localStorage.setItem("studentos_user", JSON.stringify(updated));
      set({ user: updated });
    }
  },

  clearError: () => set({ error: null }),
}));
