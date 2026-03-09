import styles from "./style/Audioplayer.module.css";
import musicicon from "./assets/music_icon.png";
import { useAudio } from "@/context/AudioContext";

/*
Custom horizontal music player.

Features
- play / pause toggle
- waveform animation
- circular music icon

Important
- Audio element is handled globally in AudioProvider
- This component only controls playback UI
*/

export default function AudioPlayer() {
  /* access global audio state and controls */
  const { playing, toggleAudio } = useAudio();

  return (
    <div className={styles.audio_container}>
      {/* Left music icon */}
      <div className={styles.music_icon}>
        <img
          src={musicicon}
          alt="music playing icon"
          style={{ width: "40px", height: "40px" }}
        />
      </div>

      {/* waveform animation */}
      <div className={`${styles.waveform} ${playing ? styles.active : ""}`}>
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* play / pause button */}
      <button
        className={styles.play_btn}
        onClick={toggleAudio}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "❚❚" : "▶"}
      </button>
    </div>
  );
}
