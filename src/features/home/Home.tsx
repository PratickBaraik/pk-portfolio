import { createGlobalStyle } from "styled-components";
import Main_Canvas from "../../components/regions/Main_section";
import Intro_Section from "../../components/regions/Intro_section";
import Work_Section from "../../components/regions/Work_section";
import Contact_Section from "../../components/regions/Contact_section";

// Global Reset (your exact CSS)
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

// Main component
const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      {/* <HomeContainer> */}
      <Main_Canvas />
      <Intro_Section />
      <Work_Section />
      <Contact_Section />
      {/* </HomeContainer> */}
    </>
  );
};

export default HomePage;
