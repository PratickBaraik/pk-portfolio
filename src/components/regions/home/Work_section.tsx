import cine_work from "./assets/cinematics_work.jpg";
import video_work from "./assets/photo_work.jpg";
import drone_work from "./assets/drone_work.png";

const Work_Section = () => {
  return (
    <section className="w-full">
      {/* HEADING */}
      <h1
        className="
        mt-12
        text-center
        font-semibold

        text-[clamp(1.8rem,3vw+0.5rem,4rem)]
        mb-[clamp(1rem,3vw,2rem)]
        "
      >
        Area of Work
      </h1>

      {/* GRID */}
      <div
        className="
        w-full

        grid
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]

        gap-[clamp(1rem,3vw,2rem)]

        px-[clamp(2rem,5vw,4rem)]
        pb-[clamp(2rem,5vw,4rem)]
        "
      >
        {/* CARD 1 */}
        <div
          className="
          flex flex-col items-center justify-center

          p-8

          w-full
          aspect-[3/4]

          group
          "
        >
          <img
            src={cine_work}
            alt="Prakashit doing cinematography work"
            className="
            w-full h-full
            object-cover

            transition-transform duration-300 ease-in-out
            group-hover:scale-105
            cursor-pointer
            "
          />

          <h2 className="pt-4 text-lg font-medium">Cinematography</h2>
        </div>

        {/* CARD 2 */}
        <div
          className="
          flex flex-col items-center justify-center

          p-8

          w-full
          aspect-[3/4]

          group
          "
        >
          <img
            src={video_work}
            alt="Prakashit doing videography work"
            className="
            w-full h-full
            object-cover

            transition-transform duration-300 ease-in-out
            group-hover:scale-105
            cursor-pointer
            "
          />

          <h2 className="pt-4 text-lg font-medium">Photography</h2>
        </div>

        {/* CARD 3 */}
        <div
          className="
          flex flex-col items-center justify-center

          p-8

          w-full
          aspect-[3/4]

          group
          "
        >
          <img
            src={drone_work}
            alt="Prakashit doing drone footage work"
            className="
            w-full h-full
            object-cover

            transition-transform duration-300 ease-in-out
            group-hover:scale-105
            cursor-pointer
            "
          />

          <h2 className="pt-4 text-lg font-medium">Drone Footage</h2>
        </div>
      </div>
    </section>
  );
};

export default Work_Section;
