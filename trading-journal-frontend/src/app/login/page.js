"use client";  // Make sure this is at the top of your file

import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import NavBar from '../NavBar';  // Adjust the path if needed
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from 'next/navigation';  // Use next/navigation for routing
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithPopup } from 'firebase/auth';  // Import Firebase auth functions

// Define your themes
const lightTheme = {
  background: "#fff",
  text: "#000",
  subText: "#333",
  buttonBg: "#ff7b00",
  buttonText: "#fff",
  buttonHover: "#e66a00",
  cardBg: "#fff",
};

const darkTheme = {
  background: "#000",
  text: "#fff",
  subText: "#aab2c3",
  buttonBg: "#ff7b00",
  buttonText: "#fff",
  buttonHover: "#e66a00",
  cardBg: "#000",
};

// Global style for the app
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

// Styling for the form and containers
const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;  
  background: ${(props) => props.theme.background};
  padding: 0 20px;
`;

const LoginForm = styled.form`
  background-color: ${(props) => props.theme.cardBg};
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
  font-size: 2.2em;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid ${(props) => props.theme.subText};
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 1em;
  transition: border-color 0.3s;
  &:focus {
    border-color: ${(props) => props.theme.buttonBg};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2em;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color:rgb(255, 0, 0);  /* เปลี่ยนเป็นสีแดง */
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2em;
  margin-top: 15px;
  transition: background-color 0.3s;
  &:hover {
    background-color:rgb(204, 0, 0);  /* เปลี่ยนเป็นสีแดงเข้มเมื่อ hover */
  }
`;

const RegisterLink = styled.p`
  margin-top: 15px;
  color: ${(props) => props.theme.subText};
  font-size: 1em;
`;

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
  
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Sign in with popup using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      if (!user) throw new Error("User not found");
  
      // Retrieve Firebase ID Token
      const token = await user.getIdToken();
  
      // Send token to backend for validation
      const response = await fetch("http://localhost:3001/login/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Google login failed");
  
      // Store the token in localStorage
      localStorage.setItem("token", token);
  
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Google Login Error: ", err.message);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    setLanguage(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem('language', newLanguage);
    }
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <NavBar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
      />
      <LoginFormContainer>
        <LoginForm onSubmit={handleLogin}>
          <Title>Sign In</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <GoogleButton 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading} 
            style={{ marginTop: '10px' }}
          >
            {loading ? "Logging in with Google..." : "Log In with Google"}
          </GoogleButton>

          <RegisterLink>
            Don&apos;t have an account? <a href="/register">Create one here</a>
          </RegisterLink>
        </LoginForm>
      </LoginFormContainer>
    </ThemeProvider>
  );
};

export default Login;
