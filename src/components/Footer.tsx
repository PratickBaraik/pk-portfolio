import styles from "./Footer.module.css";
import logo from "../assets/logo.png";
import fb from "../assets/social/facebook.png";
import ig from "../assets/social/instagram.png";
import yt from "../assets/social/youtube.png";
import li from "../assets/social/linkedin.png";

const Footer = () => {
  return (
    <section className={styles.navbar_container}>
      <div className={styles.top_section}>
        <section className={styles.logo_nav}>
          <div className={styles.brand_container}>
            <img src={logo} alt="prakashit kujur brand logo" />
            <h1>Prakashit Kujur</h1>
          </div>
          <nav>
            <ul>
              <li>
                <a href="/#">Home</a>
              </li>
              <li>
                <a href="/#">Works</a>
              </li>
              <li>
                <a href="/#">Gearlist</a>
              </li>
              <li>
                <a href="/#">About Me</a>
              </li>
              <li>
                <a href="/#">Contact</a>
              </li>
            </ul>
          </nav>
        </section>
        <section className={styles.social_links}>
          <a href="/#">
            <img src={fb} alt="prakashit facebook handle link-icon" />
          </a>
          <a href="/#">
            <img src={ig} alt="prakashit instagram handle link-icon" />
          </a>
          <a href="/#">
            <img src={yt} alt="prakashit youtube handle link-icon" />
          </a>
          <a href="/#">
            <img src={li} alt="prakashit li handle link-icon" />
          </a>
        </section>
      </div>
      <div className={styles.bottom_section}>
        {/* <hr /> */}

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
