import { useState } from "react"; // Import hooks from React
import { createGlobalStyle } from "styled-components";
import Main_Canvas from "../../components/regions/Main_section";
import Intro_Section from "../../components/regions/Intro_section";
import Work_Section from "../../components/regions/Work_section";
import Contact_Section from "../../components/regions/Contact_section";
import Footer from "../../components/molecules/Footer";

import ScrollToTop from "../../components/molecules/ScrollTop";

import Navbar from "../../components/molecules/Navbar";

type NavItem = {
  label: string;
  href: string;
};

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

// Main component
const HomePage = () => {
  const navLinks: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Works", href: "#work" },
    { label: "Gearlist", href: "#gearlist" },
    { label: "About Me", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const [showButton] = useState(false);

  return (
    <>
      <GlobalStyle />
      {/* <HomeContainer> */} {/* ✅ Added wrapper for better structure */}
      <Navbar links={navLinks} />
      <Main_Canvas />
      <Intro_Section />
      <Work_Section />
      <Contact_Section />
      {/* <Navbar logo="" tagline="" /> */}
      {showButton && <ScrollToTop showAfter={600} />}{" "}
      {/* Show button after Intro */}
      <Footer />
    </>
  );
};

export default HomePage;
