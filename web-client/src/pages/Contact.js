import React from 'react'
import "./assets/scss/contact.scss";
import { useTranslation } from "react-i18next";
import { Footer, NavBar } from '../components'
import { Link } from 'react-router-dom'
import { MdEmail, MdRateReview } from 'react-icons/md'
const Banner = require.context("./assets/img", true);
export const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavBar />
      <h1 className='next2'>{t("contact.tittle")}<span>{t("contact.tittle2")}</span> ?</h1>
      <p className='sub3'>{t("contact.subtitle")}
        <br /><br /><br />
        <br /><br />
      </p>
      <div className='cont-contact flex justify-center'>
        <div className='form'>
          <form className='flex flex-col justify-center gap-7 pt-7'>
            <div className='inline-flex items-center gap-3 mx-auto w-fit'>
              <MdEmail className='text-[2rem] text-[#A375FF]' />
              <input className='input' placeholder={t("contact.label")} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" autoComplete='off' />
            </div>
            {/* <div className='inline-flex items-center justify-center gap-3 mx-auto'>
                <MdRateReview className='text-[2rem] text-[#A375FF]'/>
                <p className='w-[80%] text-[#707070]'> </p>
              </div> */}

            <textarea className='texta' placeholder={t("contact.label2")} />
            <button className="readMoreBtn bgBtnt2 w-[7rem] mx-auto block">{t("contact.button")}</button>
          </form>
        </div>
        <img className='kid3' src={Banner("./niños/dochild.png")} alt='' />
      </div>
      <Footer />
    </>
  )
}
