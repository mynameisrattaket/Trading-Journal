'use client';

import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/register", formData);
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
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
          type="email"
          name="email"
          placeholder="Email"
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
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
}
