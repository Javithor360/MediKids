import React from 'react'
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
            <p className='sub'>La Gastroenterología pediátrica se enfoca en el diagnóstico y tratamiento de trastornos gastrointestinales
                que afectan a los niños, desde recién nacidos hasta adolescentes.
                Los gastroenterólogos pediátricos tratan una amplia variedad de enfermedades y afecciones, que incluyen, pero no se limitan a:
                <br /><br /><br />
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
                <br /><br />
                <div className="list-item">
                    <p className="roundedStep">7</p>
                    <p>Problemas de crecimiento y nutrición relacionados con la alimentación y la digestión.</p>
                </div>
                <br /><br /><br /><br />
                <button className='boton'>Solicitar una cita</button>
            </p>
            <img className='first' src={Banner('./niños/kid2.png')} />
            <Footer />
        </>
    )
}
