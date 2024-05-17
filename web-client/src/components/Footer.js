import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'

import { AiOutlineInstagram } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'

import "./assets/scss/Footer.scss"
import FooterLogo from "./assets/img/logos/Imagotype_White_Text.png";
import { LanguageSwitcher } from './LanguageSwitcher'

export const Footer = () => {
    const { t } = useTranslation();
  return (
    <footer className="footerContainer">
        <div className="footerContent">
            <div className="logoSide">
                <Link to="/index"><img src={FooterLogo} alt=""/></Link>
            </div>
            <div className="linksContainer">
                <div className="linksSide">
                    <div className="linksSideRow1">
                        <Link className="footerLink" to="/index">{t("footer.title")}</Link>
                        <Link className="footerLink" to="/contact">{t("footer.title1")}</Link>
                    </div>
                    <div className="linksSideRow1">
                        <Link className="footerLink" to="/download-app">{t("footer.title2")}</Link>
                        <Link className="footerLink" to="/index">{t("footer.title3")}</Link>
                    </div>
                    <div className="linksSideRow1">
                        <Link className="footerLink" to="/nosotros">{t("footer.title4")}</Link>
                        <Link className="footerLink" to="/terminos">{t("footer.title5")}</Link>
                    </div>
                    <div className="socialIcons">
                        <Link  to="https://instagram.com/medikids_2023?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"><AiOutlineInstagram className='footerSIcon w-[3rem] h-[3rem]'/></Link>
                        <Link to="https://www.facebook.com/people/Medi-Kids/pfbid021NWLfz98Z9qi7t1Hhuk9EMULvx2GxzAt3bb6AEdZvsHqjfCiAH2kaPSTZ1Hspfvfl/"><BsFacebook className='footerSIcon w-[2.5rem] h-[2.5rem]'/></Link>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
