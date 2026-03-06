import styles from "./style/Intro.module.css";
import self_portrait from "./assets/self_portriat.jpg";

const Intro_Section = () => {
  return (
    <section className={styles.intro_section}>
      <div className={styles.intro_section_text}>
        <h1>Hey, I am Prakashit Kujur</h1>
        <p>
          A videographer and photographer specializing in storytelling. My work
          spans Documentaries, travels , and weddings projects, with a focus on
          capturing the unique essence of each person, place, and moment.
          Whether documenting a wedding, showcasing a landscape, or crafting a
          brand's visual identity, I combine creativity with technical skill to
          produce authentic and timeless imagery. If you're looking to bring
          your vision to life through compelling visuals, let's connect and
          create something unforgettable together!
        </p>
      </div>
      <div className={styles.intro_section_img}>
        <img src={self_portrait} alt="self portrait of prakashit kujur" />
      </div>
    </section>
  );
};

export default Intro_Section;
