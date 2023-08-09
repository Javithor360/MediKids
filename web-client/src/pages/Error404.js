import React from 'react'
import "./assets/scss/error.scss"
import { Link } from 'react-router-dom';
const Error = require.context("./assets/img", true);
export const Error404 = () => {
const img = [Error("./niños/error.png"), Error("./niños/error1.png"), Error("./niños/error2.png")];

  return (
    <>
    <h1 className='tittle3'>¡Algo salio <span>mal</span>!</h1>
    <div className='w-[100%] h-[60%] flex items-center'>
   <img className='kidt' src={`${img[Math.floor(Math.random() * img.length)]}`} />
   <div className='cont-err'>
   <p className='infot'>parece que has digitado una ruta que no es valida</p>
   <div className='btnx'><Link to="/index"><button className="readMoreBtn bgBtnt3">Volver</button></Link></div>
   </div> 
   </div>

    </>
  )
}
