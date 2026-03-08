import { useRef, useState } from "react";
import PlayerControls from "../../molecules/Playercontroler";
import ProgressBar from "../../atoms/Progress_bar/Progressbar";
import "./style/Musicplayer.module.css";

/*
Main Music Player component.
Combines controls + progress + audio logic.
*/
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setProgress(audio.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const time = Number(e.target.value);

    if (audio) {
      audio.currentTime = time;
      setProgress(time);
    }
  };

  return (
    <div className="music-player">
      <h3>Now Playing</h3>

      <audio
        ref={audioRef}
        src="/music/background.mp3"
        onTimeUpdate={handleTimeUpdate}
      />

      <ProgressBar
        value={progress}
        max={audioRef.current?.duration || 0}
        onChange={handleSeek}
      />

      <PlayerControls isPlaying={isPlaying} onPlayPause={togglePlay} />
    </div>
  );
}
