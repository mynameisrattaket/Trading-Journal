"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from 'next/link'; // Import Link component from Next.js
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
  color: #3498db; /* Elegant blue tone */
  font-size: 1.2rem;
  border: 2px solid #3498db; /* Outline border */
  padding: 12px 40px;
  border-radius: 50px;
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  /* Subtle hover effect */
  &:hover {
    background-color: #3498db;
    color: white;
    transform: translateY(-2px); /* Slight lift */
  }

  /* Focus effect for accessibility */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3498db; /* Focus ring */
  }
`;


export default function Home() {
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

        <div className="mt-8">
          <SocialIcon href="https://github.com">
            <i className="fab fa-github"></i>
          </SocialIcon>
          <SocialIcon href="https://twitter.com">
            <i className="fab fa-twitter"></i>
          </SocialIcon>
        </div>

        {/* Wrap the Button with the Link component to navigate to /login */}
        <Link href="/login" passHref>
          <Button>Get Started</Button>
        </Link>
      </Card>
    </div>
  );
}
