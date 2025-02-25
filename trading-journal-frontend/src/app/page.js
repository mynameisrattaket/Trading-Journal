'use client';

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from './contexts/AuthContext';  // เส้นทางที่ถูกต้อง

// Styled components
const Header = styled.h1`
  font-size: 3.8rem;
  font-weight: 700;
  color: transparent;
  background: linear-gradient(90deg, #3498db, #f39c12);
  -webkit-background-clip: text;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 1.35rem;
  color: #34495e;
  margin-bottom: 30px;
  line-height: 1.8;
`;

const Card = styled.div`
  background: #fff;
  background-image: linear-gradient(to bottom right, #ffffff, #f0f4f8);
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 50px;
  width: 100%;
  max-width: 650px;
  text-align: center;
  margin: auto;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const SocialIcon = styled.a`
  font-size: 2.5rem;
  color: #34495e;
  margin: 0 20px;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: #3498db;
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: #3498db;
  font-size: 1.2rem;
  border: 2px solid #3498db;
  padding: 12px 40px;
  border-radius: 50px;
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3498db;
    color: white;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3498db;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const Home = () => {
  const { user, logout } = useAuth(); // ใช้ useAuth เพื่อตรวจสอบสถานะการล็อกอิน
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user); // ถ้ามี user แสดงว่า user ได้ล็อกอิน
  }, [user]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card>
        <Image
          className="mx-auto mb-6"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
        />
        <Header>Welcome to Trading Journal</Header>
        <Text>ยินดีต้อนรับสู่ Trading Journal</Text>

        {isLoggedIn ? (
          <div className="mt-8">
            <span>สวัสดี, {user.displayName || 'User'}!</span> {/* แสดงชื่อผู้ใช้ */}
            <LogoutButton onClick={logout}>Logout</LogoutButton> {/* ปุ่ม Logout */}
          </div>
        ) : (
          <div className="mt-8">
            <Link href="/login" passHref>
              <Button>Login</Button> {/* ปุ่ม Login */}
            </Link>
          </div>
        )}

        <div className="mt-8">
          <SocialIcon href="https://github.com">
            <i className="fab fa-github"></i>
          </SocialIcon>
          <SocialIcon href="https://twitter.com">
            <i className="fab fa-twitter"></i>
          </SocialIcon>
        </div>
      </Card>
    </div>
  );
};

export default Home;
