import styles from "./Home.module.css";
import Main_Canvas from "../../components/regions/Main_section";
import Intro_Section from "../../components/regions/Intro_section";
import Work_Section from "../../components/regions/Work_section";
import Contact_Section from "../../components/regions/Contact_section";
const HomePage = () => {
  return (
    <>
      <Main_Canvas />
      <Intro_Section />
      <Work_Section />
      <Contact_Section />
    </>
  );
};

export default HomePage;
