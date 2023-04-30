import React from 'react'
import { Link } from 'react-router-dom';
import { NavBar, Footer } from '../components';
const Banner = require.context("./assets/img", true);
export const Doc2 = () => {
    return (
        <>
            <NavBar />
            <section className="acc-hero2">
                <div className="acc-hero-cont">
                    <h1>Gastroenterología</h1>
                    <p>Cuido y bienestar para los peques del hogar</p>
                </div>
            </section>
            <h1 className='tittle'>¿En que nos <span>especializamos</span>?</h1>
            <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/kid2.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>La Gastroenterología pediátrica se enfoca en el diagnóstico y tratamiento de trastornos gastrointestinales
                que afectan a los niños, desde recién nacidos hasta adolescentes.
                Los gastroenterólogos pediátricos tratan una amplia variedad de enfermedades y afecciones, que incluyen, pero no se limitan a:
                        <br/><br/>
                        <div className="list-item">
                        <p className="roundedStep">1</p>
                    <p>Trastornos de la digestión y la absorción de los alimentos</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">2</p>
                    <p>Alergias y sensibilidades alimentarias</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">3</p>
                    <p>Reflujo gastroesofágico</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">4</p>
                    <p>Enfermedades inflamatorias del intestino, como la enfermedad de Crohn y la colitis ulcerosa</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">5</p>
                    <p>Enfermedades hepáticas, como la hepatitis y la cirrosis</p>
                </div>
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">6</p>
                    <p>Trastornos del páncreas, como la pancreatitis</p>
                        </div>
                        <br/><br/><br/><br/>
                        <Link className="boton __moreView absolute bottom-30 right-11" to="/download-app">Descargar App</Link>
        </p>
      </div>
      </div>
            <Footer />
        </>
    )
}
