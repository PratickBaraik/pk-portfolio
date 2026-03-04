import { useState, useEffect } from "react"; // ✅ FIXED: Import hooks from React
import styled, { createGlobalStyle } from "styled-components";
import Main_Canvas from "../../components/regions/Main_section";
import Intro_Section from "../../components/regions/Intro_section";
import Work_Section from "../../components/regions/Work_section";
import Contact_Section from "../../components/regions/Contact_section";
// import Navbar from "../../components/Navbar";

// Global Reset (your CSS)
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

// // Home wrapper (uncommented for positioning context)
// const HomeContainer = styled.div`
//   min-height: 100vh;
//   // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   overflow-x: hidden;
//   position: relative;
// `;

// Scroll-to-Top Button (your styles - perfect!)
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #28292b, #949396);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
`;

// Main component
const HomePage = () => {
  const [showButton, setShowButton] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > 800); // Show after Intro (~800px)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <GlobalStyle />
      {/* <HomeContainer> */} {/* ✅ Added wrapper for better structure */}
      <Main_Canvas />
      <Intro_Section />
      <Work_Section />
      <Contact_Section />
      {/* <Navbar logo="" tagline="" /> */}
      <ScrollToTopButton
        className={showButton ? "visible" : ""}
        onClick={scrollToTop}
        title="Back to Top"
        aria-label="Scroll to top"
      >
        ↑
      </ScrollToTopButton>
      {/* </HomeContainer> */}
    </>
  );
};

export default HomePage;
