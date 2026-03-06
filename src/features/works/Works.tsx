import { createGlobalStyle } from "styled-components";
import Work_Section from "../../components/regions/works/Work_section";
import Navbar from "../../components/molecules/Navbar";
import Footer from "../../components/molecules/Footer";

/**
 * Navigation item structure
 */
type NavItem = {
  label: string;
  href: string;
};

/**
 * Global CSS reset
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
 * Works Page
 * Displays portfolio work gallery
 */
const Works: React.FC = () => {
  /**
   * Navigation configuration
   * Same structure used in Home.tsx
   */
  const navLinks: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Works", href: "/works" },
    { label: "Gearlist", href: "/gearlist" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Global CSS reset */}
      <GlobalStyle />

      {/* Navigation */}
      <Navbar brand="PK Portfolio" links={navLinks} />

      {/* Work showcase section */}
      <Work_Section />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Works;
