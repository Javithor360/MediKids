import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { NavBar, Footer } from '../components';
const Banner = require.context("./assets/img", true);
export const Doc2 = () => {
    const { t } = useTranslation();
    return (
        <>
            <NavBar />
            <section className="acc-hero2">
                <div className="acc-hero-cont">
                    <h1>{t("Doc2.tittle")}</h1>
                    <p>{t("Doc2.subtittle")}</p>
                </div>
            </section>
            <h1 className='tittle'>{t("Doc2.tittle1")}<span>{t("Doc2.tittle2")}</span>?</h1>
            <div className='cont-espk'>
      <div className='w-[60%] h-[70%] flex items-center'>
        <img className='first' src={Banner('./niños/kid2.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>{t("Doc2.subtittle1")}
                        <br/><br/>
                        <div className="list-item">
                        <p className="roundedStep">1</p>
                    <p>{t("Doc2.s1")}</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">2</p>
                    <p>{t("Doc2.s2")}</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">3</p>
                    <p>{t("Doc2.s3")}</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">4</p>
                    <p>{t("Doc2.s4")}</p>
                </div>
                <br /><br />
                        <br/><br/><br/><br/>
                        <Link className="boton __moreView absolute bottom-30 right-11" to="/download-app">{t("Doc2.button")}</Link>
        </p>
      </div>
      </div>
            <Footer />
        </>
    )
}
