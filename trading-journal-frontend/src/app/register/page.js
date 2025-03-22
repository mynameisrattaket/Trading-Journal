"use client";  // Make sure this is at the top of your file

import React, { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider, createGlobalStyle } from "styled-components";
import NavBar from '../NavBar';  // Adjust the path if needed
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';  // Use next/navigation for routing

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

const RegisterFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;  // Adjusted height to make form a bit higher
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
  margin-top: -20px;  // Adjust form's position upwards slightly
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Add your registration logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registering with:", { email, password });

    // On successful registration, redirect to login page or home page
    router.push("/login"); // Redirect to login page after successful registration
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
          <Button type="submit">Register</Button>
          <RegisterLink>
            Already have an account? <a href="/login">Login here</a>
          </RegisterLink>
        </RegisterForm>
      </RegisterFormContainer>
    </ThemeProvider>
  );
};

export default Register;
