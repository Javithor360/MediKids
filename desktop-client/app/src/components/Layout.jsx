import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Breadcrumbs } from "./Breadcrumbs";

export const Layout = () => {
  return (
    <>
      <div className="flex overflow-hidden bg-[#e6e3e3]">
        <Sidebar />
        <div className="w-full mx-5 min-h-[100%] h-[100%] relative">
          <div className="lol1 flex justify-end items-center my-2 mx-5 h-[3rem] relative">
            <div className="w-5 h-fit mr-3"><div className="w-full h-[2px] bg-[#A375FF]"></div></div>
            <Breadcrumbs className=""/>
          </div>
          <div className="w-full h-[85vh] bg-white overflow-y-auto overflow-x-hidden absolute p-[2rem] rounded-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
