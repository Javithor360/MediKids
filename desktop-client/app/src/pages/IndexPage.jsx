import React, { useState, useEffect } from "react";
import Modal from "../components/Modal.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import moment from 'moment';
import { ModalTestComponent } from "../components/ModalTestComponent.jsx";
import { TbClockHour4, TbCalendarEvent } from "react-icons/tb"

import { useDash } from "../context/DoctorContext";
import{ CalendarPicker } from "./Patients/PatientsComponents/CalendarPicker.jsx";
import { DoctorEvents } from "../utils/DoctorEvents.js";

export const IndexPage = () => {
  const { t } = useTranslation();
  const { DoctorInfoQuery, Info, AppointmentsQuery, ActivePatientsQuery, PatientsClassificator, DoctorAppointmentRequests, assignedPatients, appointmentRequest, appointments, activePatients } = useDash();
  
  const [Chargin, setChargin] = useState(true);
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(new Date());
  const isModal = true;
  
  const toggle = () => {
    setActive(!active);
  };
  
  useEffect(() => {
    DoctorInfoQuery(JSON.parse(localStorage.getItem('userSession')).id);
    ActivePatientsQuery(JSON.parse(localStorage.getItem('userSession')).id);
    PatientsClassificator(JSON.parse(localStorage.getItem("userSession")).id);
    AppointmentsQuery(JSON.parse(localStorage.getItem("userSession")).id);
    DoctorAppointmentRequests(
      JSON.parse(localStorage.getItem("userSession")).id
    );
    setTimeout(() => {
      setChargin(false);
    }, 1500);
  }, []);
  

  useEffect(()=>{
    setInterval(()=>setTime(new Date()), 1000)
  },[])
  // console.log(time.toLocaleTimeString())
  return (
    <>
      {/* {Chargin === true && (
        <div className="">
          <span className="">CARGANDO</span>
        </div>
      )} */}
      <div className="w-[90%] h-[15rem] m-auto rounded-3xl border border-[#707070a9] shadow-xl bg-[white] flex">
        <div className="h-full w-[50%] flex flex-col justify-center gap-5">
          {
            (time.toLocaleTimeString() < "12:00:00") ?
            <p className="font-semibold ml-7 text-[1.6rem]">{t("index.tittle")}</p>
            :
              time.toLocaleTimeString() < "18:00:00" ?
              <p className="font-semibold ml-7 text-[1.6rem]">{t("index.tittle1")}</p>
            :
            <p className="font-semibold ml-7 text-[1.6rem]">{t("index.tittle2")}</p>
          }
          <p className="ml-7 text-[1.8rem] truncate">Dr. {`${Info.First_Names} ${Info.Last_Names}`}</p>
        </div>
        <div className="h-full w-[50%] flex items-center justify-center">
          <div className="h-[70%] w-[1px] bg-[#bbbbbb] self-center"></div>
          <div className="py-4 border shadow-md bg-[#ebebf8] w-[80%] h-fit rounded-2xl mx-auto">
            <div className="flex gap-2 mx-auto w-fit">
              <p className="text-[#707070] flex flex-row items-center gap-2 border-r border-[#707070] pr-2"><TbClockHour4 className="text-[#070707] text-[18px] font-bold"/>{moment().format('LTS')}</p>
              <p className="text-[#707070] flex flex-row items-center gap-2"><TbCalendarEvent className="text-[#070707] text-[18px] font-bold" />{time.toLocaleDateString()}</p>
            </div>
            {/* <div className="h-[5rem] w-fit mt-4 mx-auto flex justify-center items-center">
              <div className="w-[15%] h-full flex justify-center items-center">
                  <MdNotifications className="text-[#707070] text-[2rem]"/>
                  <div className="indicator w-[2rem] h-[2rem]">
                    <span className="indicator-item badge badge-xs badge-ghost bg-[red] border-[white] top-1 right-2"></span> 
                    <div className="grid place-items-center"><MdNotifications className="text-[#707070] text-[2rem]"/></div>
                  </div>
              </div>
              <div className="w-[90%] h-full flex items-center">
                <div className="h-fit w-fit ml-5 pb-[0.5rem] flex border-b border-b-[#707070a9]">
                  <p className="min-w-fit">2 notificaciones nuevas</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <section className="h-[18rem] w-[95%] grid grid-cols-3 gap-7 mx-auto mt-9">
        <div className="rounded-[42px] border-2 border-[#A5C8CF] relative p-3">
          <p className="relative before:content before:block before:w-[30px] before:h-[4px] before:top-[50%] before:absolute before:bg-black before:-left-[3rem] ml-[4.3rem] mt-5 font-semibold">{t("index.tittle3")}</p>
          <p className="mx-5 mt-5 mb-1">{t("index.subtittle")} </p>
          <p className="ml-7 font-semibold text-[3rem]">{assignedPatients.length}</p>
          <Link to="/patients/active" className="absolute right-7 bottom-5 bg-[#A5C8CF] h-[2.5rem] w-[6.5rem] rounded-xl text-center table hover:-translate-y-[2px] hover:rounded-md ease-in transition-all"><span className="table-cell font-semibold align-middle">{t("index.button")}</span></Link>
        </div>
        <div className="rounded-[42px] border-2 border-[#E67B7B] relative p-3">
          <p className="relative before:content before:block before:w-[30px] before:h-[4px] before:top-[50%] before:absolute before:bg-black before:-left-[3rem] ml-[4.3rem] mt-5 font-semibold">{t("index.tittle4")}</p>
          <p className="mx-5 mt-5 mb-1">{t("index.subtittle1")}</p>
          <p className="ml-7 font-semibold text-[3rem]">{appointmentRequest.length}</p>
          <Link to="/agenda/appointment_requests" className="absolute right-7 bottom-5 bg-[#E67B7B] h-[2.5rem] w-[6.5rem] rounded-xl text-center table hover:-translate-y-[2px] hover:rounded-md ease-in transition-all"><span className="table-cell font-semibold align-middle">{t("index.button")}</span></Link>
        </div>
        <div className="rounded-[42px] border-2 border-[#BB85D5] relative p-3">
          <p className="relative before:content before:block before:w-[30px] before:h-[4px] before:top-[50%] before:absolute before:bg-black before:-left-[3rem] ml-[4.3rem] mt-5 font-semibold">{t("index.tittle5")}</p>
          <p className="mx-5 mt-5 mb-1">{t("index.subtittle2")}</p>
          <p className="ml-7 font-semibold text-[3rem]">{DoctorEvents(appointments, activePatients).length}</p>
          <Link to="/agenda/calendar" className="absolute right-7 bottom-5 bg-[#BB85D5] h-[2.5rem] w-[6.5rem] rounded-xl text-center table hover:-translate-y-[2px] hover:rounded-md ease-in transition-all"><span className="table-cell font-semibold align-middle">{t("index.button")}</span></Link>
        </div>
      </section>
      {/* <button onClick={toggle} >Abrir modal</button>
      <Link className="ml-4" to={'/login'}>LOGIN</Link> */}
      {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <ModalTestComponent isModal={isModal} />
        </Modal>
      )}
    </>
  );
};
