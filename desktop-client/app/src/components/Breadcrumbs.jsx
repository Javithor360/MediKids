import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteTranslator } from "../assets/js/RouteTranslator";

export const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = "";

  const assign = (obj) => {
    if (RouteTranslator[obj]) {
      return RouteTranslator[obj];
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
          className="after:inline-block text-[#a375ff] select-none hover:underline after:content-['/'] after:text-[#A2A2A2] after:ml-[0.25rem] after:mr-[0.25rem] last:after:collapse last:font-semibold"
          to={currentLink}
          key={crumb}
        >
          {assign(crumb.charAt(0).toUpperCase() + crumb.slice(1))}
        </Link>
      );
    });
  return <div>{crumbs}</div>;
};
