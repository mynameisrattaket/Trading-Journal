import React from 'react';
import styled from 'styled-components';

const ThemeToggleWrapper = styled.button.withConfig({
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

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <ThemeToggleWrapper onClick={toggleTheme} isDark={isDark}>
      <div className="toggle-circle" />
      <span>{isDark ? "🌙" : "🌞"}</span>
    </ThemeToggleWrapper>
  );
};

export default ThemeToggle;
