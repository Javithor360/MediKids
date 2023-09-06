import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteTranslatorEn, RouteTranslatorEs } from "../assets/js/RouteTranslator";
import "./assets/scss/breadcrums.css";

export const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = "";

  const assign = (obj) => {
    if(localStorage.getItem("i18nextLng") === "en") {
      if (RouteTranslatorEn[obj]) {
        return RouteTranslatorEn[obj];
      } 
    } else {
      if (RouteTranslatorEs[obj]) {
        return RouteTranslatorEs[obj];
      }
    }
    return obj;
  };

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <Link
          className="after:inline-block text-[#a375ff] select-none hover:underline after:content-['/'] after:text-[#A2A2A2] after:ml-[0.25rem] after:mr-[0.05rem] last:after:hidden last:font-semibold right-0"
          to={currentLink}
          key={crumb}
          state={location.state}
        >
          {assign(crumb.charAt(0).toUpperCase() + crumb.slice(1))}
        </Link>
      );
    });
  return <div className="lol h-[1.6rem] flex justify-end">{crumbs}</div>;
};
