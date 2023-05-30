import React from 'react'
import { Link } from 'react-router-dom';
import { NavBar, Footer } from '../components';
import "./assets/scss/citas.scss";
const Banner = require.context("./assets/img", true);
export const Citas = () => {
    return (
        <>
            <NavBar />
            <h1 className='tittle1'>Requisitos para agendar una <span className='color1'>cita</span></h1>
            <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/docchild.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>Para agendar una cita en la clínica pediátrica "MediKids", es necesario cumplir con ciertos requisitos.
       En primer lugar, es fundamental tener a mano la información del niño, incluyendo su nombre completo, fecha de nacimiento,
        número de seguro médico y cualquier historial médico relevante. Además, se debe proporcionar un número de teléfono de contacto
         válido y una dirección de correo electrónico, en caso de ser necesario. Dependiendo de la política de la clínica, puede ser
          requerido presentar documentos adicionales, como tarjetas de seguro o referencias médicas. También se recomienda tener en 
          cuenta cualquier preparación previa necesaria para la cita, como ayuno o restricciones alimentarias.
       Cumplir con estos requisitos asegurará una programación adecuada y una atención efectiva en la clínica "MediKids".
        </p>
      </div>
      </div>
            <hr />
            <h1 className='tittle2'>Recuerda tomar en <span>cuenta</span></h1>
            <div className='cont-child'>
           <div className='cont-esp'>
           <p className='sub2'>Al agendar una cita en la clínica pediátrica "MediKids", es esencial tener en cuenta una serie de
            recomendaciones para asegurar un proceso fluido y eficiente. En primer lugar, se recomienda agendar la cita con anticipación
             utilizando el sistema de programación de la clínica, ya sea por teléfono o a través de su plataforma en línea. Asegúrate de 
             tener a mano los datos completos del niño, como su nombre, fecha de nacimiento y número de seguro médico. Además, verifica 
             si se requiere algún documento adicional, como tarjetas de seguro, referencias médicas o consentimientos firmados. Infórmate
              sobre cualquier preparación previa necesaria para la cita, como ayuno o restricciones alimentarias, y asegúrate de seguirlas
               adecuadamente. Es importante llegar a tiempo el día de la cita para tener suficiente tiempo para completar cualquier formulario
                requerido y permitir que el niño se familiarice con el entorno de la clínica. Si por alguna razón necesitas cancelar o cambiar
                 la cita, comunícate con la clínica con la mayor antelación posible. Siguiendo estas recomendaciones
           , podrás disfrutar de una experiencia tranquila y eficiente al agendar una cita en la clínica pediátrica "MediKids".
            </p>
           </div>
            <div className='w-[30%] h-[100%] flex items-center'>
            <img className='kid2' src={Banner("./niños/child.png")} />
            </div>
            </div>
            <hr/>
            <h1 className='tittle1'>Pasos para agendar una <span>cita</span></h1>
            <div className='cont-espk'>
      <div className='w-[40%] h-[100%] flex items-center'>
        <img className='first' src={Banner('./niños/docse.png')} />
      </div>
      <div className='cont-esp'>
      <p className='sub'>
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
                        <br /><br />
                        <div className="list-item">
                            <p className="roundedStep">4</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, tempore?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">5</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis magni expedita minus?</p>
                        </div>
                        <br/><br/>
                        <div className="list-item">
                            <p className="roundedStep">6</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, fuga.</p>
                        </div>
                        <Link className="boton __moreView absolute bottom-30 right-11" to="/download-app">Descargar App</Link>
        </p>
      </div>
      </div>
            <Footer />
        </>
    )
}
