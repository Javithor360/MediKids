import React, { useState } from "react";
import Modal from "../components/Modal.jsx";
import { Link } from "react-router-dom";
import moment from 'moment';
import { ModalTestComponent } from "../components/ModalTestComponent.jsx";
import { MdNotifications, MdChat, MdDescription } from "react-icons/md"

export const IndexPage = () => {
  const [active, setActive] = useState(false);
  const isModal = true;
  const toggle = () => {
    setActive(!active);
  };
  const [time, setTime] = useState(new Date())
  useEffect(()=>{
    setInterval(()=>setTime(new Date()), 1000)
  },[])
  // console.log(time.toLocaleTimeString())
  return (
    <>
      <div className="w-[90%] h-[15rem] m-auto rounded-3xl border border-[#707070a9] shadow-xl bg-white flex">
        <div className="h-full w-[40%] flex flex-col justify-center gap-5">
          {
            (time.toLocaleTimeString() < "12:00:00") ?
            <p className="font-semibold ml-7 text-[1.6rem]">¡Buenos Días!</p>
            :
              time.toLocaleTimeString() < "18:00:00" ?
              <p className="font-semibold ml-7 text-[1.6rem]">¡Buenas Tardes!</p>
            :
            <p className="font-semibold ml-7 text-[1.6rem]">¡Buenas Noches!</p>
          }
          <p className="ml-7 text-[1.8rem] truncate">Dr. Javier Enrique Mejía Flores</p>
        </div>
        <div className="h-full w-[60%] flex items-center">
          <div className="border border-[#707070a9] bg-[white] w-[80%] h-[65%] rounded-2xl mx-auto">
            <div className="flex gap-2 w-fit mx-auto mt-3">
              <p className="border-r border-[#707070] pr-2">{moment().format('LTS')}</p>
              <p>{time.toLocaleDateString()}</p>
            </div>
            <div className="h-[5rem] w-fit mt-4 mx-auto flex justify-center items-center">
              <div className="w-[15%] h-full flex justify-center items-center">
                  {/* <MdNotifications className="text-[#707070] text-[2rem]"/> */}
                  <div className="indicator w-[2rem] h-[2rem]">
                    <span className="indicator-item badge badge-xs badge-ghost bg-[red] top-1 right-2"></span> 
                    <div className="grid place-items-center"><MdNotifications className="text-[#707070] text-[2rem]"/></div>
                  </div>
              </div>
              <div className="w-[90%] h-full flex items-center">
                <div className="h-fit w-fit ml-5 pb-[0.5rem] flex border-b border-b-[#707070a9]">
                  <p className="min-w-fit">2 notificaciones nuevas</p>
                  <div className="ml-7 truncate flex gap-3">
                    <MdDescription className="h-[1.5rem] w-[1.5rem]"/>
                    <MdChat className="h-[1.5rem] w-[1.5rem]"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="h-[18rem] w-[95%] grid grid-cols-3 gap-7 mx-auto mt-9">
        <div className="rounded-[42px] border-2 border-[#A5C8CF] relative p-3">
          <p className="relative before:content before:block before:w-[30px] before:h-[4px] before:top-[50%] before:absolute before:bg-black before:-left-[3rem] ml-[4.3rem] mt-5 font-semibold">Pacientes activos</p>
          <p className="mt-5 mx-5 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolores consequuntur.</p>
          <p className="ml-7 font-semibold text-[3rem]">2</p>
          <Link className="absolute right-7 bottom-5 bg-[#A5C8CF] h-[2.5rem] w-[6.5rem] rounded-xl text-center table hover:-translate-y-[2px] hover:rounded-md ease-in transition-all"><span className="table-cell align-middle font-semibold">Ver más</span></Link>
        </div>

        <div className="rounded-[42px] border-2 border-[#E67B7B] relative p-3">
          <p className="relative before:content before:block before:w-[30px] before:h-[4px] before:top-[50%] before:absolute before:bg-black before:-left-[3rem] ml-[4.3rem] mt-5 font-semibold">Solicitudes activas</p>
          <p className="mt-5 mx-5 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolores consequuntur.</p>
          <p className="ml-7 font-semibold text-[3rem]">2</p>
          <Link className="absolute right-7 bottom-5 bg-[#E67B7B] h-[2.5rem] w-[6.5rem] rounded-xl text-center table hover:-translate-y-[2px] hover:rounded-md ease-in transition-all"><span className="table-cell align-middle font-semibold">Ver más</span></Link>
        </div>

        <div className="rounded-[42px] border-2 border-[#BB85D5] relative p-3">
          <p className="relative before:content before:block before:w-[30px] before:h-[4px] before:top-[50%] before:absolute before:bg-black before:-left-[3rem] ml-[4.3rem] mt-5 font-semibold">Solicitud de citas</p>
          <p className="mt-5 mx-5 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolores consequuntur.</p>
          <p className="ml-7 font-semibold text-[3rem]">2</p>
          <Link className="absolute right-7 bottom-5 bg-[#BB85D5] h-[2.5rem] w-[6.5rem] rounded-xl text-center table hover:-translate-y-[2px] hover:rounded-md ease-in transition-all"><span className="table-cell align-middle font-semibold">Ver más</span></Link>
        </div>
      </section>
      {/* <button onClick={toggle}>Abrir modal</button> */}
      {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <ModalTestComponent isModal={isModal} />
        </Modal>
      )}
    </>
  );
};
