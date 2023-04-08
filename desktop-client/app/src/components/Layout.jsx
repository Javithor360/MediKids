import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Sidebar />
      <div className="px-20 py-2">
        <Outlet />
      </div>
    </div>
  );
};
