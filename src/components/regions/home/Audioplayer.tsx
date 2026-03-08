import { useRef, useState } from "react";
import "./style/Audioplayer.module.css";

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
    <div className="audio-container">
      {/* Left music icon */}
      <div className="music-icon">♪</div>

      {/* waveform animation */}
      <div className={`waveform ${playing ? "active" : ""}`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* play button */}
      <button className="play-btn" onClick={toggleAudio}>
        {playing ? "❚❚" : "▶"}
      </button>

      <audio ref={audioRef} src="/music/sample.mp3" />
    </div>
  );
}
