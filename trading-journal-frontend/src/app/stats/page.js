"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider, createGlobalStyle } from "styled-components";
import NavBar from '../NavBar';  // Adjust the path if needed
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';  // Use next/navigation in the app directory
import SidebarComponent from '../Sidebar';  // นำเข้ามาใช้

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
    animation: ${fadeIn} 0.5s ease-in-out;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  /* Center content vertically and horizontally */
  position: relative;
  padding: 0 20px;
`;

const ComingSoon = styled.div`
  font-size: 72px;  /* Large text size */
  font-weight: bold;
  color: ${(props) => props.theme.text};
  text-align: center;
  transform: translateY(-50%);
`;

const Stats = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, locales } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const router = useRouter();  // Use next/navigation for client-side routing

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem('theme', newTheme);
    }
  };

  const currentLocale = locales && locales[language] ? locales[language] : locales?.en || {};

  const handleNavigation = (path) => {
    router.push(path);  // Use push method for routing
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
      <Container>
        <SidebarComponent handleNavigation={handleNavigation} />
        <ComingSoon>Coming Soon...</ComingSoon>
      </Container>
    </ThemeProvider>
  );
};

export default Stats;
