import IconButton from "../atoms/Icon_button/Iconbutton";
import "./Playercontroler.module.css";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

/*
Groups control buttons together.
Uses atomic buttons.
*/
export default function PlayerControls({
  isPlaying,
  onPlayPause,
}: ControlsProps) {
  return (
    <div className="controls">
      <IconButton icon="⏮" onClick={() => {}} />
      <IconButton icon={isPlaying ? "⏸" : "▶"} onClick={onPlayPause} />
      <IconButton icon="⏭" onClick={() => {}} />
    </div>
  );
}
