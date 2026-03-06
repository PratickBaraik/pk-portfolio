import styles from "./style/Work.module.css";
import cine_work from "./assets/cinematics_work.jpg";
import video_work from "./assets/video_work.jpg";
import drone_work from "./assets/drone_work.png";

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
