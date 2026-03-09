import { useRef, useState } from "react";
import styles from "./style/Audioplayer.module.css";
import musicicon from "./assets/music_icon.png";

/*
Custom horizontal music player.

Features
- play / pause toggle
- waveform animation
- circular music icon
*/

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }

    setPlaying(!playing);
  };

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
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* play button */}
      <button className={styles.play_btn} onClick={toggleAudio}>
        {playing ? "❚❚" : "▶"}
      </button>

      <audio ref={audioRef} src="/music/background.mp3" />
    </div>
  );
}
