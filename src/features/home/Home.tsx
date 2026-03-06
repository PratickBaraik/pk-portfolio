// import { useState } from "react";
import { createGlobalStyle } from "styled-components";

import Main_Canvas from "../../components/regions/home/Main_section";
import Intro_Section from "../../components/regions/home/Intro_section";
import Work_Section from "../../components/regions/home/Work_section";
import Contact_Section from "../../components/regions/home/Contact_section";

import Footer from "../../components/molecules/Footer";
import ScrollToTop from "../../components/molecules/ScrollTop";
import Navbar from "../../components/molecules/Navbar";

/**
 * Navigation item type definition
 * Ensures type-safe navigation configuration
 */
type NavItem = {
  label: string;
  href: string;
};

/**
 * Global CSS Reset
 * Keeps styling consistent across browsers
 */
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

/**
 * HomePage
 * Main landing page composition for the portfolio
 */
const HomePage: React.FC = () => {
  /**
   * Navigation configuration
   * Passed to Navbar as props
   */
  const navLinks: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Works", href: "#works" },
    { label: "Gearlist", href: "#gearlist" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  /**
   * Scroll-to-top button visibility state
   */
  // const [showButton] = useState(false);

  return (
    <>
      {/* Global CSS reset */}
      <GlobalStyle />

      {/* Navigation */}
      <Navbar brand="PK Portfolio" links={navLinks} />

      {/* Main landing canvas */}
      <Main_Canvas />

      {/* Introduction section */}
      <Intro_Section />

      {/* Work showcase */}
      <Work_Section />

      {/* Contact section */}
      <Contact_Section />

      {/* Scroll to top button */}
      <ScrollToTop showAfter={600} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
