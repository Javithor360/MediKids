import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { NavBar, Footer } from '../components';
import "./assets/scss/citas.scss";
const Banner = require.context("./assets/img", true);
export const Citas = () => {
    const { t } = useTranslation();
    return (
        <>
            <NavBar />
            <h1 className='tittle1'>{t("cite.tittle")}<span className='color1'> {t("cite.tittle1")}</span></h1>
            <div className='cont-espk'>
      <div className='w-[60%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/docchild.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>{t("cite.cont")}
        </p>
      </div>
      </div>
            <hr />
            <h1 className='tittle2'>{t("cite.tittle2")} <span>{t("cite.tittle3")}</span></h1>
            <div className='cont-child'>
           <div className='cont-esp'>
           <p className='sub2'>{t("cite.cont2")}
            </p>
           </div>
            <div className='w-[30%] h-[80%] flex items-center'>
            <img className='kid2' src={Banner("./niños/child.png")} />
            </div>
            </div>
            <hr/>
            <h1 className='tittle1'>{t("cite.tittle4")} <span>{t("cite.tittle5")}</span></h1>
            <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/docse.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>
        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>{t("cite.step1")}</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>{t("cite.step2")}</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>{t("cite.step3")}</p>
                        </div>
                        <br /><br />
                        <div className="list-item">
                            <p className="roundedStep">4</p>
                            <p>{t("cite.step4")}</p>
                        </div>
                        <br/><br/>
                        <Link className="boton __moreView absolute bottom-30 right-11" to="/download-app">Descargar App</Link>
        </p>
      </div>
      </div>
            <Footer />
        </>
    )
}
