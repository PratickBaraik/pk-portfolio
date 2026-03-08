import "./Progressbar.module.css";

interface ProgressProps {
  value: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/*
Audio progress bar.
Allows seeking through the track.
*/
export default function ProgressBar({ value, max, onChange }: ProgressProps) {
  return (
    <input
      type="range"
      className="progress-bar"
      value={value}
      max={max}
      onChange={onChange}
    />
  );
}
