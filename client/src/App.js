// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import ToolList from "./components/ToolList";
import Favorites from "./components/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.bodyBg};
    color: ${(props) => props.theme.textColor};
    transition: background 0.3s, color 0.3s;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

// Light and dark theme objects (adjust as needed)
const lightTheme = {
  bodyBg: "#ffffff",
  textColor: "#000000",
  headingTextColor: "#000000",
  componentBg: "#f7f7f7",
  borderColor: "#ddd",
  inputBg: "#ffffff",
  buttonBg: "#e0e0e0",
  hoverBg: "#d0d0d0",
  resetBg: "#7F00FF",
  resetHoverBg: "#6a00cc",
  linkColor: "#0077FF",
  linkHoverColor: "#005bb5",
  subTextColor: "#555",
  // For cards:
  cardBg: "#ffffff",
  paidBadgeBg: "#FFE0B2",
  paidBadgeText: "#FF5722",
  freemiumBadgeBg: "#C8E6C9",
  freemiumBadgeText: "#2E7D32",
  favoriteBg: "#e53e3e",
  favoriteText: "#ffffff",
  favoritedBg: "#fff5f5",
  favoritedText: "#e53e3e",
  favoriteHoverBg: "#c53030",
  favoritedHoverBg: "#fed7d7",
  removeBg: "#e2e8f0",
  removeText: "#2d3748",
  removeHoverBg: "#cbd5e0",
};

const darkTheme = {
  bodyBg: "#1a202c",
  textColor: "#e2e8f0",
  headingTextColor: "#FFFFFF",
  componentBg: "#2d3748",
  borderColor: "#4a5568",
  inputBg: "#2d3748",
  buttonBg: "#4a5568",
  hoverBg: "#3c5568",
  resetBg: "#7F00FF",
  resetHoverBg: "#6a00cc",
  linkColor: "#63b3ed",
  linkHoverColor: "#4299e1",
  subTextColor: "#a0aec0",
  // For cards:
  cardBg: "#2d3748",
  paidBadgeBg: "#fc8181",
  paidBadgeText: "#742a2a",
  freemiumBadgeBg: "#68d391",
  freemiumBadgeText: "#22543d",
  favoriteBg: "#e53e3e",
  favoriteText: "#ffffff",
  favoritedBg: "#1a202c",
  favoritedText: "#e53e3e",
  favoriteHoverBg: "#c53030",
  favoritedHoverBg: "#2d3748",
  removeBg: "#4a5568",
  removeText: "#e2e8f0",
  removeHoverBg: "#2d3748",
};

// Styled components for header and navigation
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const RocketIcon = styled.span`
  font-size: 2.5rem;
`;

const TitleTextLeft = styled.span`
  background: linear-gradient(90deg, #7F00FF, #0077FF, #FF007F);
  background-size: 200% 200%;
  animation: 5s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TitleTextRight = styled.span`
  color: ${(props) => props.theme.headingTextColor};
`;

const DarkModeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.linkColor};
`;

const NavButtons = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const NavLink = styled(Link)`
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;
  &:hover {
    background: ${(props) => props.theme.hoverBg};
  }
`;

const App = () => {
  const [theme, setTheme] = useState("light");

  // Load previous theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <Router>
          <Header>
            <Title>
              <RocketIcon>🚀</RocketIcon>
              <TitleTextLeft>AI Tools</TitleTextLeft>
              <TitleTextRight>Explorer</TitleTextRight>
            </Title>
            <DarkModeButton onClick={toggleTheme}>
              {theme === "light" ? "🌓" : "🌞"}
            </DarkModeButton>
          </Header>
          <NavButtons>
            {/* Removed "All Tools" NavLink */}
            <NavLink to="/favorites">My Favorites</NavLink>
          </NavButtons>

          <Routes>
            <Route path="/" element={<ToolList />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;