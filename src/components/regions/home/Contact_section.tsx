import contact_bg from "./assets/contact_background.jpeg";

const Contact_Section = () => {
  return (
    <section
      style={{ backgroundImage: `url(${contact_bg})` }}
      className="
      relative
      min-h-screen
      w-full

      bg-cover
      bg-center
      bg-no-repeat

      flex
      flex-col
      justify-center
      items-center

      gap-[clamp(3rem,7vw,7rem)]

      px-6
      md:px-12
      lg:px-20

      overflow-hidden
      "
    >
      {/* CINEMATIC VIGNETTE OVERLAY */}
      <div
        className="
        absolute inset-0

        bg-gradient-to-b
        from-black/70
        via-black/30
        to-black/80

        backdrop-blur-[3px]
        "
      />

      {/* SOFT LIGHT GLOW */}
      <div
        className="
        absolute
        w-[500px]
        h-[500px]

        bg-amber-400/20
        blur-[120px]

        top-[20%]
        left-[50%]

        -translate-x-1/2
        "
      />

      {/* CONTENT */}
      <div
        className="
        relative z-10

        flex flex-col
        items-center
        text-center

        gap-8

        max-w-[900px]
        "
      >
        {/* TITLE */}
        <h1
          className="
          text-white
          font-semibold
          tracking-wide

          text-[clamp(2.2rem,4vw+1rem,5rem)]

          drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]
          "
        >
          Let's Create Something Cinematic
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
          text-white/90

          text-[clamp(1rem,1vw+0.8rem,1.4rem)]

          leading-relaxed
          max-w-[720px]
          "
        >
          Whether it's a wedding, documentary, travel story, or brand visual,
          every frame tells a story. Let's collaborate and craft visuals that
          feel authentic, emotional, and timeless.
        </p>

        {/* GLASS BUTTON */}
        <button
          className="
          px-10
          py-3

          rounded-xl

          text-white
          font-medium
          tracking-wide

          bg-white/10
          backdrop-blur-md

          border border-white/20

          shadow-[0_10px_30px_rgba(0,0,0,0.5)]

          transition-all duration-300

          hover:bg-white/20
          hover:scale-[1.05]

          active:scale-[0.95]
          "
        >
          Start a Project
        </button>
      </div>
    </section>
  );
};

export default Contact_Section;
