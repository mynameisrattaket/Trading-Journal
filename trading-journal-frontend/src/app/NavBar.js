import React from 'react';
import styled from 'styled-components';
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
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const NavBar = ({ theme, toggleTheme, language, toggleLanguage }) => {
  return (
    <NavBarContainer>
      <Logo>Trading Journal</Logo>
      <ButtonContainer>
        <ThemeToggle isDark={theme === "dark"} toggleTheme={toggleTheme} />
        <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
      </ButtonContainer>
    </NavBarContainer>
  );
};

export default NavBar;
