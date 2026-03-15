import AudioPlayer from "./Audioplayer";
import bgImage from "./assets/main_canvas.jpg";

const Main_Canvas = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bgImage})` }}
      className="
      relative
      min-h-screen
      w-full

      bg-cover bg-center bg-no-repeat

      flex flex-col
      items-center
      justify-center

      gap-[clamp(3rem,6vw,7rem)]

      px-6
      sm:px-10
      md:px-14
      lg:px-20
      "
    >
      {/* GLASS OVERLAY */}
      <div
        className="
        absolute inset-0
        bg-black/30
        backdrop-blur-[2px]

        dark:bg-black/40
        "
      />

      {/* CONTENT */}
      <div
        className="
        relative z-10
        flex flex-col
        items-center
        w-full
        max-w-[1400px]

        gap-[clamp(3rem,6vw,7rem)]
        "
      >
        {/* TITLE */}
        <h1
          className="
          text-white
          font-sans
          text-center
          leading-[1.1]

          text-[clamp(2rem,2vw+3rem,6rem)]
          "
        >
          Prakashit Kujur
        </h1>

        {/* OPTIONAL CENTER SPACE */}
        <div className="w-full"></div>

        {/* BOTTOM SECTION */}
        <div
          className="
          w-full

          flex
          flex-col
          md:flex-row

          items-start
          md:items-end

          justify-between

          gap-6 md:gap-10

          px-[clamp(1rem,4vw,3rem)]
          "
        >
          <p
            className="
            text-white/90
            leading-[1.3]

            text-[clamp(1.2rem,1.6vw+0.5rem,2.6rem)]

            max-w-full
            md:max-w-[70%]
            "
          >
            Visual storyteller working across cinematography, photography, and
            editing to craft natural, immersive story.
          </p>

          <button
            className="
            whitespace-nowrap

            px-8
            py-3

            rounded-xl

            bg-white/10
            text-white

            backdrop-blur-md
            border border-white/20

            transition-all duration-300

            hover:bg-white/20
            hover:scale-[1.05]

            active:scale-[0.95]
            "
          >
            Know More
          </button>
        </div>

        {/* AUDIO PLAYER */}
        <div className="w-full flex justify-center md:justify-end">
          <AudioPlayer />
        </div>
      </div>
    </section>
  );
};

export default Main_Canvas;
