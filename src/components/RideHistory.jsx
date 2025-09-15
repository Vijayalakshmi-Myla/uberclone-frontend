"use client";
import { useEffect, useState } from "react";
import { getRideHistory } from "../lib/api";

export default function RideHistory({ user_id, role }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const res = await getRideHistory(user_id, role);
      if (res.rides) setRides(res.rides);
    }
    fetchHistory();
  }, [user_id, role]);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
      {rides.length === 0 ? <p>No rides found.</p> :
        rides.map((ride) => (
          <div key={ride.id} className="border p-2 rounded mb-2">
            <p><strong>Pickup:</strong> {ride.pickup_location}</p>
            <p><strong>Dropoff:</strong> {ride.dropoff_location}</p>
            <p><strong>Status:</strong> {ride.status}</p>
            <p><strong>Fare:</strong> ${ride.fare}</p>
          </div>
        ))}
    </div>
  );
}
