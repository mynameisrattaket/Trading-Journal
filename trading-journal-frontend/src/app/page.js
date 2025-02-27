'use client';

import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Link from "next/link";
import { useAuth } from "./contexts/AuthContext";

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

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
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

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
  color: ${(props) => props.theme.text};

  span {
    color: ${(props) => props.theme.buttonBg};
  }
`;

const SubHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: ${(props) => props.theme.subText};
  text-align: center;
  max-width: 800px;
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
  min-width: 120px;
  
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

const WelcomeText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.buttonBg};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  padding: 20px;
  max-width: 1000px;
  text-align: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
  width: 100%;
  max-width: 1000px;
`;

const FeatureCard = styled.div`
  background: ${(props) => props.theme.cardBg};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Home = () => {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
            {isLoggedIn ? (
              <>
                <WelcomeText>Welcome, {user?.displayName || "Trader"}!</WelcomeText>
                <Button type="button" onClick={logout}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button>Login</Button>
                </Link>
                <Link href="/get-started" passHref>
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </ButtonContainer>
        </NavBar>

        <ContentWrapper>
          <Header>
            Trading Journal for <span>everyone</span>.
          </Header>
          <SubHeader>
            Simple, free, and powerful — the ultimate trading journal for all traders.
          </SubHeader>
        </ContentWrapper>

        <FeatureGrid>
          <FeatureCard>✅ Track your trades</FeatureCard>
          <FeatureCard>📊 Analyze your performance</FeatureCard>
          <FeatureCard>📝 Take detailed notes</FeatureCard>
          <FeatureCard>🚀 Improve your strategy</FeatureCard>
        </FeatureGrid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
