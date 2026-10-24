import { Navigate, Outlet } from "react-router";
import { useSession } from "../lib/auth-client";
import NavBar from "./NavBar";

export default function ProtectedRoute() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p className="p-8 text-center text-gray-500">Loading...</p>;
  }
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar userName={session.user.name} />
      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
