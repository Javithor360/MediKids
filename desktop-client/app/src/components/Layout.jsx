import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Navbar*/}
      <div className="px-6 py-2">
        <Outlet />
      </div>
    </div>
  );
};
