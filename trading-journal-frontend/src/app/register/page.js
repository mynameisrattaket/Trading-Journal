'use client'; // This tells Next.js that this file should be treated as a client component

import React, { useState } from "react";
import styled, { keyframes, ThemeProvider, createGlobalStyle } from "styled-components";
import NavBar from '../NavBar';  // Adjust the path if needed
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';  // Use next/navigation for routing


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

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Global style for the app
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    animation: ${fadeIn} 0.5s ease-in-out;
  }
`;

// Styling for the form and containers
const RegisterFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;  
  background: ${(props) => props.theme.background};
  padding: 0 20px;
`;

const RegisterForm = styled.form`
  background-color: ${(props) => props.theme.cardBg};
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-in-out;
  margin-top: -20px;
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

const Register = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, locales } = useLanguage();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const router = useRouter();

  // State for loading, username, email, password, confirmPassword
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // ส่งข้อมูลไปที่ API เพื่อทำการลงทะเบียน
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // Include username
      });

      const data = await response.json();

      if (response.ok) {
        // ถ้าการลงทะเบียนสำเร็จให้ไปที่หน้าล็อกอิน
        alert("Registration successful!");
        router.push("/login");
      } else {
        // ถ้ามีข้อผิดพลาดในการลงทะเบียน
        alert(data.error || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred, please try again later.");
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
      alert("Google login failed. Please try again.");
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

  const currentLocale = locales && locales[language] ? locales[language] : locales?.en || {};

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <NavBar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
      />
      <RegisterFormContainer>
        <RegisterForm onSubmit={handleRegister}>
          <Title>Sign Up</Title>
          <Input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}  
          />
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <Button type="submit" disabled={loading}>Register</Button>
          <GoogleButton 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading} 
          >
            {loading ? "Register with Google..." : "Register with Google"}
          </GoogleButton>
          <RegisterLink>
            Already have an account? <a href="/login">Login here</a>
          </RegisterLink>
        </RegisterForm>
      </RegisterFormContainer>
    </ThemeProvider>
  );
};

export default Register;
