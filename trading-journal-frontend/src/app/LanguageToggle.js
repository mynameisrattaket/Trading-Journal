import React from 'react';
import styled from 'styled-components';

const LanguageToggleWrapper = styled.button`
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

const LanguageToggle = ({ language, toggleLanguage }) => {
  return (
    <LanguageToggleWrapper language={language} onClick={toggleLanguage} />
  );
};

export default LanguageToggle;
