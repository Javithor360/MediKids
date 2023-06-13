import React from 'react'
import "./assets/scss/error.scss"
const Error = require.context("./assets/img", true);
export const Error404 = () => {
const img = [Error("./niños/error.png"), Error("./niños/error1.png"), Error("./niños/error2.png")];

  return (
    <>
    <h1 className='tittle3'>¡Algo salio <span>mal</span>!</h1>
    <div className='cont-erro'>
    <div className='w-[90%] h-[100%] flex items-center'>
   <img className='kidt' src={`${img[Math.floor(Math.random() * img.length)]}`} />
   </div>
    <div className='cont-err'>
   <p className='infot'>parece que has digitado una ruta que no es valida</p>
   <div className='btnx'><button className="readMoreBtn bgBtnt3">volver</button></div>
   </div> 
    </div>

    </>
  )
}
