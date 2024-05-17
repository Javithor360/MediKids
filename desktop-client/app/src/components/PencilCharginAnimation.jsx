import React from 'react'
import './assets/scss/PencilAnimation.css'
const PencilCharginAnimation = () => {
  return (
    <>
    <div className="canvas">
        <div className="notepad">
            <div className="cover">
            </div>
            <div className="page one">

            </div>
            <div className="page two"></div>
            <div className="page three"></div>
            <div className="page four"></div>
        </div>
        <div className="pencil">
            {/* <div className="edge"></div> */}
        </div>
    </div>
    <p className="font-semibold text-[#707070] text-[1.2rem] text-center">Guardando datos...</p>
    </>
  )
}

export default PencilCharginAnimation;