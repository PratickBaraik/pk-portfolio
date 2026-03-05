import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

type NavItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  links: NavItem[];
};

const Navbar = ({ links }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav_list}>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                isActive
                  ? `${styles.nav_link} ${styles.active}`
                  : styles.nav_link
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
