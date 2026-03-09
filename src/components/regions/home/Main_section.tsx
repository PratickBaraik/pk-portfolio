import styles from "./style/Main.module.css";
import AudioPlayer from "./Audioplayer";
// import { AudioProvider } from "@/context/AudioContext";

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
      {/* <AudioProvider> */}
      <AudioPlayer />
      {/* </AudioProvider> */}
    </section>
  );
};

export default Main_Canvas;
