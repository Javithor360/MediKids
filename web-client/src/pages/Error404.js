import React from 'react'
const Error = require.context("./assets/img", true);
export const Error404 = () => {
  return (
    <>
    <h1 className='tittle3'>¡Algo salio <span>mal</span>!</h1>
   <div className='cont-infot'>
   <p className='infot'>parece que has digitado una ruta que no valida</p>
   <button className="readMoreBtn bgBtnt2">volver</button>
   </div>
    <img className='kidt' src={Error('./niños/error.png')} />

    </>
  )
}
