import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/molecules/Navbar";

/**
 * Navigation links used by Navbar.
 * Keeping this here ensures Navbar stays part of the layout
 * and does not re-render unnecessarily across pages.
 */
type NavItem = {
  label: string;
  href: string;
};

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Gearlist", href: "/gearlist" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Layout component
 * - Navbar stays persistent
 * - Page content is injected through <Outlet />
 */
const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar links={navLinks} />

      {/* Routed page content appears here */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
