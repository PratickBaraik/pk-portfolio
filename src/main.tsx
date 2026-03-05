// import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./features/home/Home";

/**
 * Entry point of the React application.
 * Mounts the HomePage component to the DOM root.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HomePage />,
  // </React.StrictMode>,
);
