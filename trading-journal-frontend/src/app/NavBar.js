import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const NavBarContainer = styled.div`
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
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: absolute;
  right: 20px;  /* ขยับไปทางขวาสุด */
  transform: translateY(-50%); /* ช่วยให้มันแนวกลางตามแนวตั้ง */
`;


const NavBar = ({ theme, toggleTheme, language, toggleLanguage }) => {
  return (
    <NavBarContainer>
      <Link href="/" passHref legacyBehavior>
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
