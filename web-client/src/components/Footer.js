import React from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineInstagram } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'

import "./assets/scss/Footer.scss"
import FooterLogo from "./assets/img/logos/Imagotype_White_Text.png";
import { LanguageSwitcher } from './LanguageSwitcher'

export const Footer = () => {
  return (
    <footer className="footerContainer">
        <div className="footerContent">
            <div className="logoSide">
                <Link to=""><img src={FooterLogo} alt=""/></Link>
            </div>
            <div className="linksContainer">
                <div className="linksSide">
                    <div className="linksSideRow1">
                        <Link className="footerLink" to="">Inicio</Link>
                        <Link className="footerLink" to="">Contacto</Link>
                    </div>
                    <div className="linksSideRow1">
                        <Link className="footerLink" to="">Descargar App</Link>
                        <Link className="footerLink" to="">Servicios</Link>
                    </div>
                    <div className="linksSideRow1">
                        <Link className="footerLink" to="">Sobre Nosotros</Link>
                        <Link className="footerLink" to="">Politica de privacidad</Link>
                    </div>
                    <div className="socialIcons">
                        <Link  to=""><AiOutlineInstagram className='footerSIcon w-[3rem] h-[3rem]'/></Link>
                        <Link to=""><BsFacebook className='footerSIcon w-[2.5rem] h-[2.5rem]'/></Link>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
