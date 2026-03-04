import styles from "./Home.module.css";
import self_portrait from "../../assets/home/self_portriat.jpg";
import cine_work from "../../assets/home/cinematics_work.jpg";
import video_work from "../../assets/home/video_work.jpg";
import drone_work from "../../assets/home/drone_work.png";

const Main_Canvas = () => {
  return (
    <section className={styles.main_container}>
      <h1 className={styles.top_section}>Prakashit Kujur</h1>
      <div className={styles.middle_section}></div>
      <div className={styles.bottom_section}>
        <p>
          Visual storyteller working across cinematography, photography, and
          editing to craft natural, immersive story.
        </p>
        <button>Know More</button>
      </div>
    </section>
  );
};

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

const Work_Section = () => {
  return (
    <section>
      <h1 className={styles.work_heading}>Area of Work</h1>
      <div className={styles.work_section}>
        <div className={styles.work_one}>
          <img src={cine_work} alt="Prakashit doing cinematography work" />
          <h2>Cinematography</h2>
        </div>
        <div className={styles.work_two}>
          <img src={video_work} alt="Prakashit doing videography work" />
          <h2>Videography</h2>
        </div>
        <div className={styles.work_three}>
          <img src={drone_work} alt="Prakashit doing drone footage work" />
          <h2>Drone Footage</h2>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <Main_Canvas />
      <Intro_Section />
      <Work_Section />
    </>
  );
};

export default HomePage;
