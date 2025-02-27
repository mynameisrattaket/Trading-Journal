'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase-config";  // ขึ้นไป 2 ระดับ
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/navigation"; // ใช้สำหรับการ redirect

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

const GoogleButton = styled(Button)`
  background-color: #db4437; /* Google red color */
  margin-top: 15px;
  
  &:hover {
    background-color: #c1351d;
  }
`;

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // สำหรับการ redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    try {
      // Create a user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      alert("Registration successful! Please check your email to verify your account.");
      
      // Reset form data after successful registration
      setFormData({ username: "", email: "", password: "" });
      
      setLoading(false);
      
      // Redirect to Home page
      router.push("/"); // Redirect to Home page
    } catch (error) {
      setLoading(false);
      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email is already in use. Please try another one.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage("Password should be at least 6 characters.");
      } else {
        setErrorMessage(error.message || "Registration failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // After successful Google login
      alert("Login with Google successful!");
      router.push("/"); // Redirect to Home page after successful Google login
    } catch (error) {
      setErrorMessage(error.message || "Google login failed. Please try again.");
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
          <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* Google Register Button */}
        <GoogleButton type="button" onClick={handleGoogleLogin}>
          Register with Google
        </GoogleButton>

        {/* Login Link */}
        <RegisterLink>
          Already have an account?{' '}
          <StyledLink href="/login">Login here</StyledLink>
        </RegisterLink>
      </Form>
    </Wrapper>
  );
}
