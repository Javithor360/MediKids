import React from 'react'
import { NavBar, Footer } from '../components';
import { useTranslation } from "react-i18next";
import "./assets/scss/about.scss";
const Banner = require.context("./assets/img", true);
export const Sobre = () => {
  const { t } = useTranslation();
  return (
    <>
  <NavBar />
            <section className="acc-hero4">
                <div className="acc-hero-cont">
                    <h1>MediKids</h1>
                    <p>{t("sobre.banner")}</p>
                </div>
            </section>
            <h1 className='next2'>{t("sobre.ti")}<span> {t("sobre.tle")}</span> </h1>
            <p className='sub3'>{t("sobre.sub1")}
                <br /><br /><br />
                <br /><br />
            </p>
            <hr />  
            <h1 className='next2'>{t("sobre.ti2")} <span> {t("sobre.tle2")}</span></h1>
            <div className='contmot'>
            <div className='imgcont'><img className='w-[100%] h-[100%] flex items-center' src={Banner('./doctores/docclow.png')} /></div>
            <div className='pcont'>
            <p className='sub3'>{t("sobre.sub2")}
            </p>
            </div>
            </div>
            <hr />
            <h1 className='next2'>{t("sobre.ti3")}<span>{t("sobre.tle3")}</span></h1>
            <div className='contmot'>
            <div className='pcont'>
            <p className='sub3'>{t("sobre.sub3")}
            </p>
            </div>
            <div className='imgcont'><img className='w-[100%] h-[100%] flex items-center' src={Banner('./doctores/doc2.png')} /></div>
            </div>
            <hr />
            <h1 className='next2'>Vis<span>ión</span></h1>
            <div className='contmot'>
            <div className='imgcont'><img className='w-[100%] h-[100%] flex items-center' src={Banner('./doctores/docclo.png')} />
            </div>  
            <div className='pcont'>
            <p className='sub3'>{t("sobre.sub4")}
            </p>
            </div>
            </div>
            <Footer />
    </>
  )
}
