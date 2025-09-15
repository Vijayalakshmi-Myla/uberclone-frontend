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

      setMessage("✅ Login successful!");
      window.location.href = "/dashboard"; 
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center space-x-8">
      <form onSubmit={handleSubmit} className="bg-black p-10 rounded-xl shadow-md w-100 space-y-4 ">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Login
        </button>
        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}