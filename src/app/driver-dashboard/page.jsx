"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getAvailableRides, acceptRide, completeRide } from "@/lib/api";

export default function DriverDashboard() {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (user.role === "driver") {
      fetchRides();
    }
  }, [user]);

  const fetchRides = async () => {
  if (!user) return;
  const res = await getAvailableRides(user);
  setRides(res.rides || []);
};

  const handleAccept = async (ride_id) => {
    const res = await acceptRide({ ride_id, driver_id: user.id });
    if (res.error) return alert(res.error);
    alert("Ride accepted!");
    fetchRides();
  };

  const handleComplete = async (ride_id) => {
    const res = await completeRide({ ride_id });
    if (res.error) return alert(res.error);
    alert("Ride marked as completed!");
    fetchRides();
  };

  if (!user) return <p>Loading user...</p>;
  if (user.role !== "driver") return <p>Only drivers can access this page.</p>;


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Driver Dashboard</h2>

      {rides.length === 0 ? (
        <p className="text-red-700">No rides available right now.</p>
      ) : (
        <ul className="space-y-4 text-black">
          {rides.map((ride) => (
            <li key={ride.id} className="p-4 border rounded-xl bg-white shadow-md text-black">
              <p><strong>Pickup:</strong> {ride.pickup_location}</p>
              <p><strong>Dropoff:</strong> {ride.dropoff_location}</p>
              <p><strong>Rider:</strong> {ride.rider_name}</p>
              <p><strong>Status:</strong> {ride.status}</p>

              {ride.status === "requested" && (
                <button
                  onClick={() => handleAccept(ride.id)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Accept Ride
                </button>
              )}

              {ride.status === "accepted" && ride.driver_id === user.id && (
                <button
                  onClick={() => handleComplete(ride.id)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                >
                  Complete Ride
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
