'use client';

import { useState } from "react";
import { auth, provider, signInWithPopup } from "../config/firebase-config";  // นำเข้าจาก firebase-config.js
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4FD1C5, #667EEA); /* Smooth gradient background */
`;

const Form = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #2D3748;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 1rem;
  color: #4A5568;
  background: #F7FAFC;
  transition: all 0.3s;
  
  &:focus {
    border-color: #667EEA;
    outline: none;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #667EEA;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  
  &:hover {
    background-color: #5A67D8;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(1);
  }
`;

const RegisterLink = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  color: #2D3748;
`;

const StyledLink = styled(Link)`
  color: #667EEA;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // ใช้ signInWithPopup
      const user = result.user;
      alert("Google login successful!");
      console.log(user);
    } catch (error) {
      setErrorMessage(error.message || "Google login failed.");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Welcome Back!</Title>
        
        {/* Email Input */}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        {/* Password Input */}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {/* Error message display */}
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Google Login Button */}
        <Button onClick={handleGoogleLogin} disabled={loading} style={{ backgroundColor: '#DB4437', marginTop: '10px' }}>
          {loading ? "Logging in..." : "Login with Google"}
        </Button>

        {/* Register Link */}
        <RegisterLink>
          Don&apos;t have an account?{' '}
          <StyledLink href="/register">Register here</StyledLink>
        </RegisterLink>
      </Form>
    </Wrapper>
  );
}
