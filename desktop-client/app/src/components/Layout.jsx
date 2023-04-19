import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Breadcrumbs } from "./Breadcrumbs";

export const Layout = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-[#e6e3e3]">
        <Sidebar />
        <div className="w-full mx-6 min-h-[100%] h-[100%] relative">
          <div className="flex justify-end m-5">
            <Breadcrumbs />
          </div>
          <div className="w-full h-[75vh] bg-white overflow-y-auto overflow-x-hidden absolute p-[2rem] rounded-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
