'use client';

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useAuth } from "./contexts/AuthContext";

// Styled components
const Container = styled.div`
  background-color: #000; /* Black background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`;

const SubHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #aab2c3;
  text-align: center;
`;

const Button = styled.button`
  background-color: #ff7b00; /* Orange color */
  color: #fff;
  font-size: 1rem;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;

  &:hover {
    background-color: #e66a00;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Home = () => {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <Container>
      <NavBar>
        <Logo>Trading Journal</Logo>
        <ButtonContainer>
          {isLoggedIn ? (
            <>
              <span>Welcome, {user?.displayName || "Trader"}!</span>
              <Button type="button" onClick={logout}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button>Login</Button> {/* ✅ แก้แล้ว */}
              </Link>
              <Link href="/get-started" passHref>
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </ButtonContainer>
      </NavBar>
      <Header>
        Trading Journal for <span style={{ color: "#ff7b00" }}>everyone</span>.
      </Header>
      <SubHeader>
        A powerful, easy-to-use, and ad-free trading journal to enhance your trading experience.
      </SubHeader>
    </Container>
  );
};

export default Home;
