import React from 'react'
import { Link } from 'react-router-dom';
import { NavBar, Footer } from '../components';
const Banner = require.context("./assets/img", true);
export const Doc3 = () => {
  return (
    <>
      <NavBar />
      <section className="acc-hero3">
        <div className="acc-hero-cont">
          <h1>Neumología</h1>
          <p>Cuido y bienestar para los peques del hogar</p>
        </div>
      </section>
      <h1 className='tittle'>¿En que nos <span>especializamos</span>?</h1>
      <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/kid3.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>La neumología es la rama de la medicina que se enfoca en el diagnóstico, tratamiento y prevención
        de las enfermedades respiratorias y del sistema respiratorio en general. Los neumólogos se especializan en trastornos
        respiratorios como el asma, la enfermedad pulmonar obstructiva crónica, la fibrosis pulmonar, la neumonía, el
        cáncer de pulmón, la apnea del sueño y otros trastornos respiratorios. Los neumólogos también se enfocan en el manejo
        de la ventilación mecánica y el cuidado intensivo de pacientes con enfermedades respiratorias graves. Además, la neumología
        también se preocupa por la prevención de enfermedades respiratorias,
        incluyendo el fomento de hábitos de vida saludables y la vacunación contra enfermedades como la gripe y la neumonía.
        <br/><br/><br/>
        <div className="list-item">
                            <p className="roundedStep">1</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, tempore?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">2</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni expedita minus?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">3</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, fuga.</p>
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
