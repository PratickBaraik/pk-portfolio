import musicicon from "./assets/music_icon.png";
import { useAudio } from "@/context/AudioContext";

/*
Glassmorphism Audio Player

Improvements
- real glass UI layer
- soft border highlights
- floating depth shadows
- reflective lighting
- GPU friendly animation
*/

export default function AudioPlayer() {
  const { playing, toggleAudio } = useAudio();

  /* symmetrical animation delays */
  const delays = [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05,
    0,
  ];

  return (
    <div
      className="
      relative
      flex items-center gap-6
      w-[360px] h-[80px]
      px-5 py-3
      rounded-2xl

      bg-white/10
      dark:bg-white/5

      backdrop-blur-xl
      border border-white/20
      dark:border-white/10

      shadow-[0_10px_30px_rgba(0,0,0,0.35)]

      transition-all duration-300
      hover:-translate-y-[3px]
      hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]
      "
    >
      {/* GLASS LIGHT REFLECTION */}
      <div
        className="
        pointer-events-none
        absolute inset-0
        rounded-2xl
        bg-gradient-to-br
        from-white/20
        to-transparent
        opacity-40
      "
      />

      {/* MUSIC ICON */}
      <div
        className="
        relative z-10
        w-[54px] h-[54px]
        flex items-center justify-center
        rounded-full
        overflow-hidden

        bg-white/30
        dark:bg-white/10

        backdrop-blur-lg
        border border-white/30

        shadow-[0_4px_12px_rgba(0,0,0,0.35)]
        "
      >
        <img
          src={musicicon}
          alt="music icon"
          className="w-[65%] h-[65%] object-contain"
        />
      </div>

      {/* WAVEFORM */}
      <div className="relative z-10 flex flex-1 items-center justify-center gap-[6px] min-w-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            style={{ animationDelay: `${delays[i]}s` }}
            className={`
              block
              w-[4px]
              h-[18px]

              md:w-[3px] md:h-[16px]
              sm:w-[2px] sm:h-[14px]

              rounded-full

              bg-white/90
              dark:bg-white/70

              origin-center

              ${playing ? "animate-wave" : ""}
            `}
          />
        ))}
      </div>

      {/* PLAY BUTTON */}
      <button
        onClick={toggleAudio}
        aria-label={playing ? "Pause music" : "Play music"}
        className="
        relative z-10
        w-[56px] h-[56px]

        flex items-center justify-center
        rounded-full

        text-[24px]

        bg-white/40
        dark:bg-white/20

        backdrop-blur-lg
        border border-white/40

        shadow-[0_6px_16px_rgba(0,0,0,0.35)]

        transition-all duration-200

        hover:scale-[1.08]
        hover:bg-white/60
        active:scale-[0.95]
      "
      >
        {playing ? "❚❚" : "▶"}
      </button>
    </div>
  );
}
