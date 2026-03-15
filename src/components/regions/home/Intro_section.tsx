import self_portrait from "./assets/self_portriat.jpg";

const Intro_Section = () => {
  return (
    <section
      className="
      w-full

      flex
      flex-col
      md:flex-row

      items-center
      justify-between

      text-center
      md:text-left

      gap-[clamp(2rem,6vw,6rem)]
      px-[clamp(2rem,6vw,4rem)]
      py-[clamp(2rem,6vw,4rem)]
      "
    >
      {/* TEXT SECTION */}
      <div className="flex-1">
        <h1
          className="
          font-sans
          font-semibold
          mb-4

          text-[clamp(2rem,2vw+1rem,2.5rem)]
          "
        >
          Hey, I am Prakashit Kujur
        </h1>

        <p
          className="
          opacity-90
          mx-6 md:mx-8

          text-[clamp(0.9rem,1vw+0.8rem,1rem)]
          leading-relaxed
          "
        >
          A videographer and photographer specializing in storytelling. My work
          spans Documentaries, travels, and weddings projects, with a focus on
          capturing the unique essence of each person, place, and moment.
          Whether documenting a wedding, showcasing a landscape, or crafting a
          brand's visual identity, I combine creativity with technical skill to
          produce authentic and timeless imagery. If you're looking to bring
          your vision to life through compelling visuals, let's connect and
          create something unforgettable together!
        </p>
      </div>

      {/* IMAGE SECTION */}
      <div
        className="
        flex-shrink-0

        w-[clamp(260px,35vw,520px)]
        md:w-[clamp(260px,35vw,520px)]
        sm:w-[clamp(220px,70vw,400px)]

        mt-8 md:mt-0
        "
      >
        <img
          src={self_portrait}
          alt="self portrait of prakashit kujur"
          className="
          w-full
          h-auto
          object-cover

          rounded-xl

          shadow-xl
          "
        />
      </div>
    </section>
  );
};

export default Intro_Section;
