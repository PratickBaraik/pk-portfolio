import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AudioProvider } from "@/context/AudioContext";

import HomePage from "./features/home/Home";
import Works from "./features/works/Work";
import Contact from "./features/contact/Contact";
// import Gearlist from "./features/gearlist/Gearlist";

/*
Root render for the application.

Important
- AudioProvider is placed above the router
- This ensures the audio instance is global
- Music will continue across page navigation
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AudioProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/gearlist" element={<Gearlist />} /> */}
      </Routes>
    </BrowserRouter>
  </AudioProvider>,
);
