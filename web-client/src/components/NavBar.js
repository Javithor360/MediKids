import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './assets/scss/NavBar.scss'
import ImagoType from "./assets/img/logos/Imagotype_White_Text.png"

export const NavBar = () => {

  const [navScroll, setNavScroll] = useState(false);

  const changeIconSize = () =>{
    if(window.scrollY >= 90){
      setNavScroll(true)
    }else{
      setNavScroll(false)
    }
  }
  window.addEventListener('scroll', changeIconSize);

  return (
    <nav className={navScroll ? 'navbarContainer drop-shadow-xl' : 'navbarContainer'}>
        <div className="navCol1">
            <Link className="navLink" to="">Servicios</Link>
            <Link className="navLink" to="">Sobre Nosotros</Link>
        </div>
        <div className="navCol2">
            <Link className={navScroll ? 'navLogo scrolled' : 'navLogo'} to="/index"><img src={ImagoType} alt=""/></Link>
        </div>
        <div className="navCol1">
            <Link className="navLink" to="">Contáctanos</Link>
            <Link className="navDownloadBtn" to="/download-app">Descargar App</Link>
        </div>
    </nav>
  )
}
