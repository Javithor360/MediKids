import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import "./assets/scss/main.scss";
import IndexVideo from "./assets/img/banners/Index_Banner_Vid-1.mp4"
import  { NavBar, Footer } from '../components';
const IndexImages = require.context("./assets/img", true);


export const HomePage = () => {
    const { t } = useTranslation();
  return (
    <>
    <NavBar />
    <header>
        <div className="indexBannerContainer">
            <video className="bannerVideo"loop autoPlay muted >
                <source src={IndexVideo} type="video/mp4"/>
            </video>
            <div className="indexBannerContent">
                <div className="fit-lol">
                    <div className="contentImage">
                        <img src={IndexImages('./banners/child-main-banner.png')} alt=""/>
                    </div>
                    <div className="contentText">
                        <p>{t("index.banner")}</p>
                        <Link to="/download-app">{t("index.boton")}</Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main>
        <section className="mainInfo1">
            <div className="mainInfoRow1">
                <div>
                    <h1>{t("index.title")}</h1>
                    <p>{t("index.sub")}</p>
                    <Link className="readMoreBtn bgBtn1" to="/nosotros">{t("index.boton2")}</Link>
                </div>
            </div>
            <div className="mainInfoRow2">
                <div className="imgBoxBg">
                    <div className="imgBoxMain">
                        <img className="mainInfo1Img" src={IndexImages('./banners/section-1-dr.png')} alt=""/>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="MainInfo2">
                <div className="mainInfoRow2_1">
                    <img className="circleImg" src={IndexImages("./banners/dra-circle-1-02.png")} alt=""/>
                </div>
                <div className="mainInfoRow2_2">
                    <div>
                        <h1>{t("index.title2")}</h1>
                        <p>{t("index.sub2")}</p>
                        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>{t("index.list1")}</p>
                        </div>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>{t("index.list2")}</p>
                        </div>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>{t("index.list3")}</p>
                        </div>
                        <div className="btnRight">
                            <Link id='especialtiesLink' className="readMoreBtn bgBtn2" to="/citas">{t("index.boton3")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="especialidadesMain">
            <p className="headdingTitle1 hr-lines">{t("index.titles")}</p>
            <h1 >{t("index.sub3")}</h1>
            <div className="cardsWrapper">
                <div className="card">
                    <div className="cardImg cardImg1">
                        <div className="cardType cardType1"><img src={IndexImages('./icons/otorrino.png')} alt=""/></div>
                    </div>
                    <div className="cardContent">
                        <p>{t("index.card")}</p>
                        <Link to="/otorrinolaringologo">{t("index.boton3")}</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="cardImg cardImg2">
                        <div className="cardType cardType2"><img src={IndexImages('./icons/gastro.png')} alt=""/></div>
                    </div>
                    <div className="cardContent">
                        <p>{t("index.card2")}</p>
                        <Link to="/gastroenterología">{t("index.boton3")}</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="cardImg cardImg3">
                        <div className="cardType cardType3"><img src={IndexImages('./icons/neumologia.png')} alt=""/></div>
                    </div>
                    <div className="cardContent">
                        <p>{t("index.card3")}</p>
                        <Link to="/neumologia">{t("index.boton3")}</Link>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="docsTitle">
                <p>{t("index.title3")}</p>
            </div>
            <article className="docsPics">
                <div className="docSpace">
                    <img src={IndexImages("./doctores/Dr_guzman.png")} alt=""/>
                    <h2>Dr. Esteban Gúzman</h2>
                    <Link className="readMoreBtn bgBtn3" to="/dr-guzman">{t("index.boton4")}</Link>
                </div>
                <div className="docSpace">
                    <img src={IndexImages("./doctores/Dra_garza.png")} alt=""/>
                    <h2>Dra. Fátima Garza</h2>
                    <Link className="readMoreBtn bgBtn4" to="/dra-garza">{t("index.boton4")}</Link>
                </div>
                <div className="docSpace">
                    <img src={IndexImages("./doctores/Dr_flores.png")} alt=""/>
                    <h2>Dr. Adrián Flores </h2>
                    <Link className="readMoreBtn bgBtn5" to="/dr-flores">{t("index.boton4")}</Link>
                </div>
            </article>
        </section>
    </main>
    <Footer/>
    </>
  )
}