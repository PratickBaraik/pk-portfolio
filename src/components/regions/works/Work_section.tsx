import styles from "./style/Work.module.css";
import cine_work from "./assets/cinematics_work.jpg";
import video_work from "./assets/photo_work.jpg";
import drone_work from "./assets/drone_work.png";

const Work_Section = () => {
  return (
    <section>
      <h1 className={styles.work_heading}>Body of Work</h1>
      <p className={styles.work_desc}>
        Every photograph is more than an image—it is a moment preserved beyond
        time. My work focuses on capturing authentic emotions, subtle details,
        and the quiet beauty that often goes unnoticed. Through careful
        composition, natural light, and a strong narrative approach, each frame
        becomes a story rather than just a picture. I believe photography is not
        only about what we see, but how we feel when we see it. Whether it is
        the energy of a fleeting moment, the depth of human expression, or the
        atmosphere of a place, my goal is to translate those emotions into
        visuals that remain meaningful long after the moment has passed. This
        collection represents my dedication to observation, patience, and
        storytelling—transforming everyday scenes into lasting visual
        experiences.
      </p>
      <div className={styles.work_section}>
        <div className={styles.work_one}>
          <img src={cine_work} alt="Prakashit doing cinematography work" />
          <h2>Cinematography</h2>
        </div>
        <div className={styles.work_two}>
          <img src={video_work} alt="Prakashit doing videography work" />
          <h2>Photography</h2>
        </div>
        <div className={styles.work_three}>
          <img src={drone_work} alt="Prakashit doing drone footage work" />
          <h2>Drone Footage</h2>
        </div>
      </div>
    </section>
  );
};

export default Work_Section;
