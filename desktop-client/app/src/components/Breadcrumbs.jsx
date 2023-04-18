import React from "react";
import { Link, Router, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = "";

  const routeTranslator = {
    Index: "Inicio",
    Inbox: "Comunicados",
    Agenda: "Agenda",
    Patients: "Pacientes",
    Active: "Activos",
    Records: "Expedientes",
  };

  function assign(obj) {
    for (let key in routeTranslator) {
      var res = key.match(/Index/g);
      if (res) {
        // match
        console.log(routeTranslator[key]);
      }
    }
  }

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <Link
          className="text-[#a375ff] after:content-['/'] after:text-[#A2A2A2] after:ml-[0.25rem] after:mr-[0.25rem] last:after:collapse"
          to={currentLink}
          key={crumb}
        >
          {assign(crumb.charAt(0).toUpperCase() + crumb.slice(1))}
        </Link>
      );
    });
  return <div>{crumbs}</div>;
};
