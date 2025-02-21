'use client';

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", formData);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 mb-2 w-full"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}
