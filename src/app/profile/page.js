"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase-browser";
import DriverProfile from "../../components/DriverProfile";
import RiderProfile from "../../components/RiderProfile";
import { fetchUserProfile } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profiles, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchProfileAndDriverDetails() {
      try {
        const profileData = await fetchUserProfile(user.id);

        if (profileData.role === "driver") {
          const { data: driverData, error: driverError } = await supabase
            .from("drivers")
            .select("*")
            .eq("id", profileData.id)
            .single();

          if (driverError) {
            console.error("Error fetching driver data:", driverError);
          }

          setProfile({ ...profileData, driver: driverData || {} });
        } else {
          setProfile(profileData);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileAndDriverDetails();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("driver.")) {
      const driverField = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        driver: {
          ...prev.driver,
          [driverField]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (!profiles) return;

    setSaving(true);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: profiles.name,
        email: profiles.email,
      })
      .eq("id", profiles.id);

    if (profileError) {
      alert("Error updating profile: " + profileError.message);
      setSaving(false);
      return;
    }

    if (profiles.role === "driver" && profiles.driver) {
      const { data: driverData, error: driverError } = await supabase
        .from("drivers")
        .update({
          vehicle_number: profiles.driver.vehicle_number,
          vehicle_model: profiles.driver.vehicle_model,
        })
        .eq("id", profiles.id);

      if (driverError) {
        alert("Error updating driver details: " + driverError.message);
        setSaving(false);
        return;
      }
    }

    alert("Profile updated successfully!");
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  if (!profiles)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-600 font-semibold">No profile found.</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Your Profile
      </h1>

      {profiles.role === "driver" ? (
        <DriverProfile
          profile={profiles}
          handleChange={handleChange}
          saving={saving}
          handleSave={handleSave}
        />
      ) : (
        <RiderProfile
          profile={profiles}
          handleChange={handleChange}
          saving={saving}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}
