import { useEffect, useState } from "react";

const ScrollToTop = ({ showAfter = 800 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > showAfter);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed
        bottom-[20px] right-[20px]
        md:bottom-[50px] md:right-[30px]

        w-[45px] h-[45px]
        md:w-[50px] md:h-[50px]

        rounded-full

        flex items-center justify-center

        text-[18px] md:text-[20px]
        text-white

        bg-gradient-to-br from-[#28292b] to-[#949396]

        shadow-[0_4px_12px_rgba(0,0,0,0.3)]

        transition-all duration-300

        hover:scale-110
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]

        ${visible ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}
      `}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
