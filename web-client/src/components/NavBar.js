import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import "./assets/scss/NavBar.scss";
import ImagoType from "./assets/img/logos/Imagotype_White_Text.png";

export const NavBar = () => {
  const { t } = useTranslation();

  const [navScroll, setNavScroll] = useState(false);

  const changeIconSize = () => {
    if (window.scrollY >= 90) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };
  window.addEventListener("scroll", changeIconSize);

  return (
    <nav
      className={
        navScroll ? "navbarContainer drop-shadow-xl" : "navbarContainer"
      }
    >
      <div className="navCol1">
        <Link className="navLink" to="/index">
          {t("navbar.services")}
        </Link>
        <Link className="navLink" to="/nosotros">
          {t("navbar.about")}
        </Link>
      </div>
      <div className="navCol2">
        <Link
          className={navScroll ? "navLogo scrolled" : "navLogo"}
          to="/index"
        >
          <img src={ImagoType} alt="" />
        </Link>
      </div>
      <div className="navCol1">
        <Link className="navLink" to="/Contact">
          {t("navbar.contact")}
        </Link>
        <Link className="navDownloadBtn" to="/download-app">
          {t("navbar.download")}
        </Link>
      </div>
    </nav>
  );
};
