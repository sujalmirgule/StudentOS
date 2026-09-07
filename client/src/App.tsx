import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFoundPage from "./pages/NotFoundPage";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import GuestRoute from "./components/common/GuestRoute";

import Dashboard from "./pages/dashboard/Dashboard";
import TasksPage from "./pages/tasks/TasksPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import CommunitiesPage from "./pages/communities/CommunitiesPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import AIPage from "./pages/ai/AIPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";
import { useAuthStore } from "./context/AuthContext";

function App() {
  const { checkAuth } = useAuthStore();

  // Validate token on mount — if the token is expired the server
  // returns 401 and checkAuth clears localStorage automatically
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        {/* Protected app routes — wrapped in DashboardLayout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* 404 — must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#f4f4f5',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '500',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;