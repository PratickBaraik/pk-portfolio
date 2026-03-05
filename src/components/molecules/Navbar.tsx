import React, { useState } from "react";
import styled from "styled-components";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  links: NavItem[];
  brand?: string;
}

/* ---------------- Navbar Container ---------------- */

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 70px;
  background: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  z-index: 1000;
`;

/* Responsive grid */

const NavInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr auto;
  }
`;

/* ---------------- Brand ---------------- */

const Brand = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

/* ---------------- Desktop Links ---------------- */

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 30px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &:after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    height: 2px;
    width: 0%;
    background: black;
    transition: width 0.25s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

/* ---------------- Hamburger ---------------- */

const Hamburger = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: none;
  justify-self: end;

  @media (max-width: 900px) {
    display: block;
  }
`;

/* ---------------- Offcanvas ---------------- */

const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: ${(p) => (p.open ? "0" : "-80%")};
  width: 80%;
  max-width: 380px;
  height: 100vh;
  background: white;
  transition: right 0.35s ease;
  padding: 40px 30px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 1500;
`;

const MobileLinks = styled.ul`
  list-style: none;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const MobileLink = styled.a`
  text-decoration: none;
  font-size: 18px;
  color: black;
`;

/* ---------------- Component ---------------- */

const Navbar: React.FC<NavbarProps> = ({ links, brand = "Brand" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavContainer>
        <NavInner>
          {/* Left section */}
          <Brand>{brand}</Brand>

          {/* Center navigation */}
          <NavLinks>
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </NavLinks>

          {/* Right hamburger */}
          <Hamburger onClick={() => setOpen(true)}>
            <Menu size={28} />
          </Hamburger>
        </NavInner>
      </NavContainer>

      {/* Offcanvas menu */}
      <Overlay open={open}>
        <Hamburger onClick={() => setOpen(false)}>
          <X size={28} />
        </Hamburger>

        <MobileLinks>
          {links.map((link) => (
            <li key={link.href}>
              <MobileLink href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </MobileLink>
            </li>
          ))}
        </MobileLinks>
      </Overlay>
    </>
  );
};

export default Navbar;
