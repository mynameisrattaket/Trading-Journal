"use client";

import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle , keyframes} from "styled-components";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';


// Define light and dark themes
const lightTheme = {
  background: "#fff",
  text: "#000",
  subText: "#333",
  buttonBg: "#ff7b00",
  buttonText: "#fff",
  buttonHover: "#e66a00",
  cardBg: "#f7f7f7",
};

const darkTheme = {
  background: "#000",
  text: "#fff",
  subText: "#aab2c3",
  buttonBg: "#ff7b00",
  buttonText: "#fff",
  buttonHover: "#e66a00",
  cardBg: "#121212",
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// สร้าง keyframes สำหรับ slide-up
const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background-color 0.5s ease, color 0.5s ease;
    animation: ${fadeIn} 0.5s ease-in-out;  // เพิ่มการ fade-in สำหรับ body
  }

  h1, h2, h3, p, span {
    animation: ${slideUp} 1s ease-out;
  }

  .feature-card {
    animation: ${slideUp} 1s ease-out;  // เพิ่มการ slide-up สำหรับ FeatureCard
  }

  /* ป้องกันไม่ให้ไอคอนของธีมขยับ */
  .toggle-circle,
  span {
    animation: none; /* ไม่ให้ไอคอนมีแอนิเมชัน */
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ThemeToggle = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isDark',
})`
  background: ${(props) => (props.theme.text === "#000" ? "#ddd" : "#333")};
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  & .toggle-circle {
    content: '';
    position: absolute;
    top: 3px;
    left: ${(props) => (props.isDark ? "30px" : "3px")};
    background-color: ${(props) => (props.isDark ? "#f7f7f7" : "#333")};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition: left 0.3s ease;
  }

  & span {
    font-size: 1.2rem;
    color: ${(props) => (props.theme.text === "#000" ? "#333" : "#f7f7f7")};
    transition: color 0.3s ease;
    position: absolute;
    left: ${(props) => (props.isDark ? "5px" : "auto")};
    right: ${(props) => (props.isDark ? "auto" : "5px")};
  }
`;

const LanguageToggle = styled.button`
  shouldForwardProp: (prop) => prop !== 'language';
  background-image: ${(props) => 
    props.language === 'en' 
      ? 'url(/images/flags/usa-flag.png)' 
      : 'url(/images/flags/thai-flag.png)'};
  background-size: cover;
  background-position: center;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.9);
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  font-size: 1rem;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px; /* กำหนดความกว้างของปุ่มเพื่อให้ไม่ขยับ */
  
  &:hover {
    background: ${(props) => props.theme.buttonHover};
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;


// เพิ่มการตรวจสอบใน useState เพื่ออ่านค่า theme จาก localStorage
const Dashboard = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, locales } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // อ่านค่า theme จาก localStorage หรือใช้ light เป็นค่าเริ่มต้น
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
      localStorage.setItem('theme', newTheme);  // บันทึกค่า theme ที่เลือกลงใน localStorage
    }
  };

  const currentLocale = locales && locales[language] ? locales[language] : locales?.en || {};

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <NavBar>
          <Logo>Trading Journal</Logo>
          <ButtonContainer>
            <ThemeToggle onClick={toggleTheme} isDark={theme === "dark"}>
              <div className="toggle-circle" />
              <span>{theme === "dark" ? "🌙" : "🌞"}</span>
            </ThemeToggle>
            <LanguageToggle language={language} onClick={toggleLanguage}>
              {/* ปุ่มไม่มีเนื้อหา แต่จะเป็นแค่รูปธง */}
            </LanguageToggle>
          </ButtonContainer>
        </NavBar>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;