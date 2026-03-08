import "./Iconbutton.module.css";

interface IconButtonProps {
  icon: string;
  onClick: () => void;
}

/*
Reusable button component.
Used for play, pause, next, previous controls.
*/
export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button className="icon-btn" onClick={onClick}>
      {icon}
    </button>
  );
}
