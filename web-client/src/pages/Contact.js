import React from 'react'
import "./assets/scss/contact.scss";
import { useTranslation } from "react-i18next";
import { Footer, NavBar } from '../components'
import { Link } from 'react-router-dom'
import { MdEmail, MdRateReview } from 'react-icons/md'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Banner = require.context("./assets/img", true);
export const Contact = () => {
  const { t } = useTranslation();
  const [Message, setMessage] = useState(null);
  const [Email, setEmail] = useState(null);

  const sendEmail = async () => {
    try {
      if (!Email || !Message || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)) {
        toast.error('Email o Mensaje no valido', {
          autoClose: 3000,
          theme: 'light',
          position: 'top-left',
          pauseOnHover: true,
        })
      } else {
        const {data} = await axios.post('https://medikids-server.uc.r.appspot.com/api/admin/send_web_email', {Email, Message}, { headers: {'Content-Type': 'application/json'} })
        if (data.success) {
          toast.success('¡Correo de contacto enviado!', {
            autoClose: 3000,
            theme: 'light',
            position: 'top-left',
            pauseOnHover: true,
          })
          setEmail(null);
          setMessage(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <NavBar />
      <h1 className='next2'>{t("contact.tittle")}<span>{t("contact.tittle2")}</span> ?</h1>
      <p className='sub3'>{t("contact.subtitle")}
        <br /><br /><br />
        <br /><br />
      </p>
      <div className='cont-contact flex justify-center'>
        <div className='form'>
          <div className='flex flex-col justify-center gap-7 pt-7'>
            <div className='inline-flex items-center gap-3 mx-auto w-fit'>
              <MdEmail className='text-[2rem] text-[#A375FF]' />
              <input onChange={(e) => setEmail(e.target.value)} className='input' placeholder={t("contact.label")} autoComplete='off' />
            </div>

            <textarea onChange={(e) => setMessage(e.target.value)} className='texta' placeholder={t("contact.label2")} />
            <button onClick={() => {sendEmail()}} className="readMoreBtn bgBtnt2 w-[7rem] mx-auto block">{t("contact.button")}</button>
          </div>
        </div>
        <img className='kid3' src={Banner("./niños/dochild.png")} alt='' />
      </div>
      <Footer />
    </>
  )
}
