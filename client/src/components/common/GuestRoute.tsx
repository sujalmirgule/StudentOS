import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../context/AuthContext";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
