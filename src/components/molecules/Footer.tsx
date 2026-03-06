import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import logo from "./logo.png";
import fb from "./social/facebook.png";
import ig from "./social/instagram.png";
import yt from "./social/youtube.png";
import li from "./social/linkedin.png";

/**
 * Footer Component
 * Uses React Router <Link> for internal navigation
 * External social links still use <a>
 */
const Footer = () => {
  return (
    <section className={styles.navbar_container}>
      <div className={styles.top_section}>
        <section className={styles.logo_nav}>
          <div className={styles.brand_container}>
            <img src={logo} alt="prakashit kujur brand logo" />
            <h1>Prakashit Kujur</h1>
          </div>

          {/* Internal navigation */}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/works">Works</Link>
              </li>

              <li>
                <Link to="/gearlist">Gearlist</Link>
              </li>

              <li>
                <Link to="/about">About Me</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* Social media links (external) */}
        <section className={styles.social_links}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fb} alt="prakashit facebook handle link-icon" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ig} alt="prakashit instagram handle link-icon" />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={yt} alt="prakashit youtube handle link-icon" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={li} alt="prakashit linkedin handle link-icon" />
          </a>
        </section>
      </div>

      <div className={styles.bottom_section}>
        <section className={styles.copyright_policy}>
          <p>
            &copy; {new Date().getFullYear()} Prakashit Kujur. All rights
            reserved.
          </p>
        </section>
      </div>
    </section>
  );
};

export default Footer;
