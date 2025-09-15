"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <Link href="/" className="text-xl font-bold">Ride App</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link href="/ride-history">History</Link>
            {user.role === "rider" && <Link href="/request-ride">Request Ride</Link>}
            {user.role === "driver" && <Link href="/driver-dashboard">Dashboard</Link>}
            <button onClick={() => setUser(null)} className="ml-4">Logout</button>
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
