'use client';
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase-browser';
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import RideHistory from "@/components/RideHistory";
import RequestRidePage from "@/components/RideRequestForm"; 

const GOOGLE_LIBS = ["places"];

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [rides, setRides] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_LIBS,
  });

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);

      const { data: { session } = {} } = await supabase.auth.getSession();
      if (!session?.user) {
        setProfile(null);
        setLoadingProfile(false);
        return;
      }

      const user = session.user;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!data) {
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({ id: user.id, name: user.email, role: "rider" })
          .select()
          .single();
        setProfile(newProfile);
      } else {
        setProfile(data);
      }

      setLoadingProfile(false);
    };
    loadProfile();
  }, []);

  // Load ride history
  useEffect(() => {
    const fetchRides = async () => {
      if (!profile) return;
      const { data } = await supabase
        .from("rides")
        .select("*")
        .eq("rider_id", profile.id)
        .order("requested_at", { ascending: false });

      setRides(data || []);
    };
    fetchRides();
  }, [profile]);

  if (loadingProfile) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">Please log in to continue</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ride request form */}
        <div className="bg-white p-2 rounded-xl shadow-md">
          <RequestRidePage userId={profile.id} isLoaded={isLoaded} />
        </div>

        {/* Google Map */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-950">Select Locations</h2>
          <div style={{ height: "300px", width: "100%" }}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={14}
                onClick={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  setMapCenter({ lat, lng });

                  if (!pickupCoords) {
                    setPickupCoords({ lat, lng });
                  } else if (!dropoffCoords) {
                    setDropoffCoords({ lat, lng });
                  }
                }}
              >
                {pickupCoords && <Marker position={pickupCoords} label="P" />}
                {dropoffCoords && <Marker position={dropoffCoords} label="D" />}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>

      {/* Ride history */}
      <div className="bg-white p-6 rounded-xl shadow-md text-green-950">
        <RideHistory user_id={profile.id} role={profile.role} />
      </div>
    </div>
  );
}
