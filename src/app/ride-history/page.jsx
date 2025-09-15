"use client";
import RideHistory from "../../components/RideHistory";
import { useAuth } from "../../context/AuthContext";

export default function RideHistoryPage() {
  const { user } = useAuth();
  if (!user) return <p className="text-center mt-10">Please login first</p>;

  return <RideHistory user_id={user.id} role={user.role} />;
}
