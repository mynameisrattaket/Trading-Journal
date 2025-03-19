"use client"; // Add this at the top of your file

import React, { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider, createGlobalStyle } from "styled-components";
import NavBar from '../NavBar';  // Adjust the path if needed
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';

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
  padding: 40px 20px;
  position: relative;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: 250px;
  height: calc(100vh - 100px);
  background: ${(props) => props.theme.cardBg};
  padding: 20px;
  box-shadow: none; /* เอา box-shadow ออก */
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


const SidebarButton = styled.button`
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, locales } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

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
        <Sidebar>
          <SidebarButton>New Trade</SidebarButton>
          <SidebarButton>Dashboard</SidebarButton>
          <SidebarButton>Stats</SidebarButton>
        </Sidebar>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
