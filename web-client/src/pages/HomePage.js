import React from 'react'
import { Link } from 'react-router-dom'
import "./assets/scss/main.scss";
import IndexVideo from "./assets/img/banners/Index_Banner_Vid-1.mp4"
import  {NavBar, Footer} from '../components';
const IndexImages = require.context("./assets/img", true);


export const HomePage = () => {
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
                        <p>Salud y niñez integral</p>
                        <Link to="">Descargar App</Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main>
        <section className="mainInfo1">
            <div className="mainInfoRow1">
                <div>
                    <h1>Una clínica, una familia en quien confiar</h1>
                    <p>Nuestros servicios especializados brindan una atención asertiva y eficaz a los niños y adolescentes</p>
                    <Link class="readMoreBtn bgBtn1" to="">Leer Más</Link>
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
            <div class="MainInfo2">
                <div className="mainInfoRow2_1">
                    <img className="circleImg" src={IndexImages("./banners/dra-circle-1-02.png")} alt=""/>
                </div>
                <div className="mainInfoRow2_2">
                    <div>
                        <h1>Agenda una cita en nuestra app</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In eveniet magni excepturi aut natus repudiandae odio sunt repellendus dolorum accusantium.</p>
                        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, tempore?</p>
                        </div>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni expedita minus?</p>
                        </div>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, fuga.</p>
                        </div>
                        <div className="btnRight">
                            <Link className="readMoreBtn bgBtn2" to="">Más información</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="especialidadesMain">
            <p className="headdingTitle1 hr-lines">Especialidades</p>
            <h1 >Control específico y directo para una atención apropiada</h1>
            <div className="cardsWrapper">
                <div className="card">
                    <div className="cardImg cardImg1">
                        <div className="cardType cardType1"><img src={IndexImages('./icons/otorrino.png')} alt=""/></div>
                    </div>
                    <div className="cardContent">
                        <p>Otorrinolaringología</p>
                        <Link to="/otorrinolaringologo">Más información</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="cardImg cardImg2">
                        <div className="cardType cardType2"><img src={IndexImages('./icons/gastro.png')} alt=""/></div>
                    </div>
                    <div className="cardContent">
                        <p>Gastroenterología</p>
                        <Link to="/gastroenterología">Más información</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="cardImg cardImg3">
                        <div className="cardType cardType3"><img src={IndexImages('./icons/neumologia.png')} alt=""/></div>
                    </div>
                    <div className="cardContent">
                        <p>Neumología</p>
                        <Link to="/neumologia">Más información</Link>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="docsTitle">
                <p>Nuestros médicos</p>
            </div>
            <article className="docsPics">
                <div className="docSpace">
                    <img src={IndexImages("./doctores/Dr_guzman.png")} alt=""/>
                    <h2>Dr. Esteban Gúzman</h2>
                    <Link className="readMoreBtn bgBtn3" to="">Conoce más</Link>
                </div>
                <div className="docSpace">
                    <img src={IndexImages("./doctores/Dra_garza.png")} alt=""/>
                    <h2>Dra. Fátima Garza</h2>
                    <Link className="readMoreBtn bgBtn4" to="">Conoce más</Link>
                </div>
                <div className="docSpace">
                    <img src={IndexImages("./doctores/Dr_flores.png")} alt=""/>
                    <h2>Dr. Adrián Flores </h2>
                    <Link class="readMoreBtn bgBtn5" to="">Conoce más</Link>
                </div>
            </article>
        </section>
    </main>
    <Footer/>
    </>
  )
}