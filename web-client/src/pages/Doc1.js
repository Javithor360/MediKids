import React from 'react'
import { NavBar, Footer } from '../components';
import "./assets/scss/DocInfo.scss";
import { Link } from 'react-router-dom';
const Banner = require.context("./assets/img", true);
export const Doc1 = () => {
  return (
    <>
      <NavBar />
      <Link name='l' />
      <section className="acc-hero">
        <div className="acc-hero-cont">
          <h1>Otorrino Pediatra</h1>
          <p>Cuido y bienestar para los peques del hogar</p>
        </div>
      </section>
      <h1 className='tittle'>¿En que nos <span>especializamos</span>?</h1>
      <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/kid1.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>La otorrinolaringología pediátrica se enfoca en el diagnóstico y tratamiento de trastornos
        relacionados con los oídos, nariz, garganta y áreas relacionadas en niños, desde recién nacidos hasta adolescentes.   
        Algunas de las afecciones más comunes que aborda la otorrinolaringología pediátrica son las infecciones del oído,
        amígdalas y adenoides inflamadas, problemas de audición, problemas de equilibrio, ronquidos, apnea del sueño,
        malformaciones congénitas de la cabeza y el cuello,
        trastornos del habla y del lenguaje, y traumatismos en la cabeza y el cuello.
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
                        <button className='boton'>Solicitar una cita</button>
        </p>
      </div>
      </div>
      <Footer />
    </>
  )
}
