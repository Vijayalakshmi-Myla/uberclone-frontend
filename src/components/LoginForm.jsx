"use client";
import { useState } from "react";
import { loginUser } from "../lib/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!form.email || !form.password) return setMessage("Please fill in all fields.");
      const res = await loginUser(form);
      

      // Store token and user info
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setMessage("Login successful!");
      if (res.user.role === "rider") {
        window.location.href = "/dashboard";
      } else if (res.user.role === "driver") {
        window.location.href = "/driver-dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setMessage("Login failed: " + err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-right  space-x-4">
      <form onSubmit={handleSubmit} className="bg-black p-15 rounded-xl shadow-md w-100 space-y-4">
        <h2 className="text-xl font-bold text-center text-white">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded text-white"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Login
        </button>
        {message && <p className="text-center text-sm mt-2 text-white">{message}</p>}
      </form>
    </div>
  );
}