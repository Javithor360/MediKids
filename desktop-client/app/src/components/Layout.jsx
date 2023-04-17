import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-[#f3f3f3]">
        <Sidebar />
        <div className="w-full m-10 min-h-[100%] h-[100%] relative">
          <div className="flex justify-end m-5">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <a>Ruta</a>
                </li>
                <li>
                  <a>del</a>
                </li>
                <li>archivo</li>
              </ul>
            </div>
          </div>
          <div className="w-full h-[85vh] bg-white overflow-y-auto overflow-x-hidden absolute p-[2rem] rounded-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
