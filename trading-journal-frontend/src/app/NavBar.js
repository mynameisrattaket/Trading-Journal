import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto; /* จัดตำแหน่งกลาง */
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  text-align: left; /* จัดโลโก้ให้อยู่ทางซ้าย */
  flex-grow: 1; /* ทำให้โลโก้ขยายเต็มความกว้างของ container */

  @media (max-width: 768px) {
    font-size: 1.5rem; /* ปรับขนาดฟอนต์เมื่อหน้าจอเล็ก */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: flex-end; /* ปุ่มอยู่ขวาสุด */

  @media (max-width: 768px) {
    gap: 10px; /* ลดระยะห่างระหว่างปุ่มในหน้าจอเล็ก */
  }
`;

const NavBar = ({ theme, toggleTheme, language, toggleLanguage }) => {
  return (
    <NavBarContainer>
      <Link href="/dashboard" passHref legacyBehavior>
        <Logo as="div">Trading Journal</Logo>
      </Link>
      <ButtonContainer>
        <ThemeToggle isDark={theme === "dark"} toggleTheme={toggleTheme} />
        <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
      </ButtonContainer>
    </NavBarContainer>
  );
};

export default NavBar;
