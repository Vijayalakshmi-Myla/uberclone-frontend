"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">RideApp</Link>

      <div className="space-x-4">
        {user ? (
          <>
            {user.role === "rider" && <Link href="/dashboard">Dashboard</Link>}
            {user.role === "driver" && <Link href="/driver-dashboard">Dashboard</Link>}

            <Link href="/profile">Profile</Link>

            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
