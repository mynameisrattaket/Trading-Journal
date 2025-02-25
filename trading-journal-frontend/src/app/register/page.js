'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../config/firebase-config";  // ขึ้นไป 2 ระดับ
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
      // ใช้ Firebase Authentication สำหรับการลงทะเบียน
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // ส่งอีเมลยืนยันตัวตน
      await sendEmailVerification(userCredential.user);
      
      alert("Registration successful! Please check your email to verify your account.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Create an Account</Title>
        
        {/* Username Input */}
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
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
          <div className="text-red-600 text-center">{errorMessage}</div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* Login Link */}
        <RegisterLink>
          Already have an account?{' '}
          <StyledLink href="/login">Login here</StyledLink>
        </RegisterLink>
      </Form>
    </Wrapper>
  );
}
