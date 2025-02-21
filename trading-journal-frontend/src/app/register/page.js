'use client';

import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post("http://localhost:3001/api/register", formData);
      alert("Registration successful!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create an Account</h2>
        
        {/* Username input */}
        <div className="relative">
          <input
            className="peer border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            type="text"
            name="username"
            placeholder=" "
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="username"
            className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600"
          >
            Username
          </label>
        </div>

        {/* Email input */}
        <div className="relative">
          <input
            className="peer border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600"
          >
            Email
          </label>
        </div>

        {/* Password input */}
        <div className="relative">
          <input
            className="peer border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            type="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="password"
            className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-600"
          >
            Password
          </label>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="text-red-600 text-center">{errorMessage}</div>
        )}

        {/* Submit button */}
        <button
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Login here
          </a>
        </div>
      </form>
    </div>
  );
}
