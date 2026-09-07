import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  college?: string;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  college: string;
  avatar: string;
  bio: string;
  course: string;
  semester: number | null;
  skills: string[];
  interests: string[];
  github: string;
  linkedin: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  isActive?: boolean;
  theme?: string;
  notificationsEnabled?: boolean;
}

export const authService = {
  login: (data: LoginData) => api.post("/auth/login", data),
  signup: (data: SignupData) => api.post("/auth/signup", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data: Partial<User>) => api.put("/auth/profile", data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put("/auth/change-password", data),
};
