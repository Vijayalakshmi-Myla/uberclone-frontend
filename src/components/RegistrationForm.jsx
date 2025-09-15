"use client";
import { useState } from "react";
import { registerUser } from "../lib/api";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    role: "rider", vehicle_number: "", vehicle_model: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
    const res = await registerUser(formData);
    res.error ? alert(res.error) : alert("Registered successfully!");
    window.location.href = "/login";
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded shadow-md max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-black">Register</h2>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-blue-950" required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-blue-950" required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-blue-950" required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-blue-950" required />

      <div className="flex gap-2 mb-2">
        <button type="button" onClick={() => setFormData({ ...formData, role: "rider" })} className={`flex-1 py-2 rounded ${formData.role === "rider" ? "bg-blue-500 text-white" : "bg-red-200"}`}>Rider</button>
        <button type="button" onClick={() => setFormData({ ...formData, role: "driver" })} className={`flex-1 py-2 rounded ${formData.role === "driver" ? "bg-blue-500 text-white" : "bg-red-200"}`}>Driver</button>
      </div>

      {formData.role === "driver" && (
        <>
          <input name="vehicle_number" placeholder="Vehicle Number" value={formData.vehicle_number} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-blue-950" />
          <input name="vehicle_model" placeholder="Vehicle Model" value={formData.vehicle_model} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-blue-950" />
        </>
      )}

      <button type="submit" className="w-full py-2 mt-2 bg-green-500 text-white rounded">Register</button>
    </form>
  );
}
