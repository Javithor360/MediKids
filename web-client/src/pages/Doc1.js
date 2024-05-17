import React from 'react'
import { useTranslation } from "react-i18next";
import { NavBar, Footer } from '../components';
import "./assets/scss/DocInfo.scss";
import { Link } from 'react-router-dom';
const Banner = require.context("./assets/img", true);
export const Doc1 = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavBar />
      <Link name='l' />
      <section className="acc-hero">
        <div className="acc-hero-cont">
          <h1>{t("Doc1.tittle")}</h1>
          <p>{t("Doc1.subtittle")}</p>
        </div>
      </section>
      <h1 className='tittle'>{t("Doc1.tittle1")} <span>{t("Doc1.tittle2")}</span>?</h1>
      <div className='cont-espk'>
      <div className='w-[60%] h-[70%] flex items-center'>
        <img className='first' src={Banner('./niños/kid1.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>{t("Doc1.subtittle1")}
        <br/><br/><br/>
        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>{t("Doc1.s1")}</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>{t("Doc1.s2")}</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>{t("Doc1.s3")}</p>
                        </div>
                        <br/><br/><br/><br/>
                        <Link className="boton __moreView absolute bottom-30 right-11" to="/download-app">{t("Doc1.button")}</Link>
        </p>
      </div>
      </div>
      <Footer />
    </>
  )
}
