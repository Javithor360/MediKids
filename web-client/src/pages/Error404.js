import React from 'react'
import { useTranslation } from "react-i18next";
import "./assets/scss/error.scss"
import { Link } from 'react-router-dom';
const Error = require.context("./assets/img", true);
export const Error404 = () => {
const img = [Error("./niños/error.png"), Error("./niños/error1.png"), Error("./niños/error2.png")];
const { t } = useTranslation();
  return (
    <>
    <h1 className='tittle3'>{t("error404.tittle")} <span>{t("error404.tittle1")}</span>!</h1>
    <div className='w-[100%] h-[60%] flex items-center'>
   <img className='kidt' src={`${img[Math.floor(Math.random() * img.length)]}`} />
   <div className='cont-err'>
   <p className='infot'>{t("error404.subtittle")}</p>
   <div className='btnx'><Link to="/index"><button className="readMoreBtn bgBtnt3">{t("error404.button")}</button></Link></div>
   </div> 
   </div>

    </>
  )
}
