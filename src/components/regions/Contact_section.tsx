import styles from "./style/Contact.module.css";

const Contact_Section = () => {
  return (
    <section className={styles.contact_section}>
      <h1>Let's document your story!</h1>
      <p>
        Every story deserves to be remembered. Every moment deserves to be felt
        again. I’m here to document yours, beautifully.
      </p>
      <button>Contact Me</button>
    </section>
  );
};

export default Contact_Section;
