import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import HomePage from "../features/home/Home";

/**
 * Central routing configuration for the application.
 *
 * Design decisions:
 * - Uses a Layout Route pattern
 * - MainLayout persists across all pages
 * - Route components are injected into <Outlet /> inside MainLayout
 */
const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Layout wrapper for all main pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<div>Works Page</div>} />
        <Route path="/gearlist" element={<div>Gearlist Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Route>

      {/* Fallback route for unknown URLs */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
