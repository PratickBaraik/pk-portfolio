import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./features/home/Home";
import Works from "./features/works/Works";
import Contact from "./features/contact/Contact";
// import Gearlist from "./features/gearlist/Gearlist";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/works" element={<Works />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/gearlist" element={<Gearlist />} /> */}
    </Routes>
  </BrowserRouter>,
);
