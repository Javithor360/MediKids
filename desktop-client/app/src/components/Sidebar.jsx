import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AiOutlineHome,
  AiOutlineMail,
  AiTwotoneCalendar,
  AiOutlineInbox,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineAssignmentInd, MdOutlinePersonSearch } from "react-icons/md";
import Modal from "../components/Modal"

import { useDash } from "../context/DoctorContext";

import ColLogotype from "../assets/logos/MediKids_Colored-Logotype.png";
import Avatar from "../assets/template/avatar.jpg";

export const Sidebar = () => {
  const { DoctorInfoQuery, Info } = useDash();
  let navigate = useNavigate();

  const [calendar, setCalendar] = useState(false);
  const [patients, setPatients] = useState(false);
  const [active, setActive] = useState(false);
  const isModal = true;
  const toggle =()=> {
    setActive(!active);
  };

  useEffect(() => {
    DoctorInfoQuery(JSON.parse(localStorage.getItem("userSession")).id);
  }, []);

  return ( 
    <>
   {toggle && (
        <Modal
          active={active}
          toggle={toggle}
          onRequestClose={toggle}
         className="h-9 w-10 bg-red-500"
        >
        <div  className="min-w-[40rem] max-w-[45rem] min-h-[10rem] m-5 rounded-lg ">
          <h3 className="flex items-center justify-center">Configuración</h3>
          <div className="inline-flex items-center gap-3 mt-5 ml-40 ">
          <p className="text-xl ">Foto de perfil</p> 
          <button class="btn ml-20">Cambiar</button>
          </div>
          <div className="mt-5 ml-40 inline-flex items-center gap-3">
          <p className="text-xl">Idioma del sistema</p> 
          <select className="ml-10" >
            <option>Español</option>
            <option>Ingles</option>
          </select>
          

          </div>
          
       

        </div>
        </Modal>
      )}
      <nav className="flex flex-col top-0 left-0 h-screen bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] -translate-x-0 w-80 min-w-[20rem] max-w-[20rem] max-h-screen min-h-screen select-none">
        <div className="flex flex-col items-center">
          <img
            className="w-[50%] h-[50%] m-8"
            src={ColLogotype}
            alt="MediKids Logo"
          />
          <div className="mx-6 mb-6 avatar">
            <div className="w-[8rem] rounded-full">
              <img
                src={Info.Profile_Photo == "NULL" ? Avatar : Info.Profile_Photo}
                alt="Doctor"
              />
            </div>
          </div>
          <div className="h-[1px] my-[.5rem] w-[90%] mx-auto bg-[#e6e6e6] "></div>
        </div>

        <ul className="relative m-0 list-none px-[0.2rem] overflow-y-auto overflow-x-hidden">
          <li className="relative">
            <Link
              to="/index"
              className="flex items-center h-12 truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white"
            >
              <AiOutlineHome className="w-6 h-6" />
              <p className="ml-4 text-lg">Inicio</p>
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/inbox"
              className="flex items-center h-12 truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white"
            >
              <AiOutlineMail className="w-6 h-6" />
              <p className="ml-4 text-lg">Comunicados</p>
            </Link>
          </li>
          <li className="relative">
            <span
              className="flex items-center h-12 truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83]"
              onClick={() => {
                setCalendar(!calendar);
                setPatients(false);
              }}
            >
              <AiTwotoneCalendar className="w-6 h-6" />
              <p className="ml-4 text-lg">Agenda</p>
              <span
                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear"
                data-te-sidenav-rotate-icon-ref
              >
                <IoIosArrowUp
                  className={`w-4 h-4 transition-transform duration-300 ${
                    !calendar && `rotate-180`
                  }`}
                />
              </span>
            </span>
            {calendar && (
              <ul className="relative m-0 list-none px-[0.2rem]">
                <li>
                  <Link
                    to="/agenda/appointment_requests"
                    className="flex items-center h-12 w-[90%] ml-auto truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white"
                  >
                    <AiOutlineInbox className="w-6 h-6" />
                    <p className="ml-4 text-lg">Solicitudes de citas</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agenda/calendar"
                    className="flex items-center h-12 w-[90%] ml-auto truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white"
                  >
                    <AiOutlineClockCircle className="w-6 h-6" />
                    <p className="ml-4 text-lg">Citas programadas</p>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <span
              className="flex items-center h-12 truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83]"
              onClick={() => {
                setPatients(!patients);
                setCalendar(false);
              }}
            >
              <IoPeopleOutline className="w-6 h-6" />
              <p className="ml-4 text-lg">Control de pacientes</p>
              <span
                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear"
                data-te-sidenav-rotate-icon-ref
              >
                <IoIosArrowUp
                  className={`w-4 h-4 transition-transform duration-300 ${
                    !patients && `rotate-180`
                  }`}
                />
              </span>
            </span>
            {patients && (
              <ul className="relative m-0 list-none px-[0.2rem]">
                <li>
                  <Link
                    to="/patients/active"
                    className="flex items-center h-12 w-[90%] ml-auto truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white"
                  >
                    <BsPersonCheck className="w-6 h-6" />
                    <p className="ml-4 text-lg">Mis pacientes</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/patients/records"
                    className="flex items-center h-12 w-[90%] ml-auto truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white"
                  >
                    <MdOutlinePersonSearch className="w-6 h-6" />
                    <p className="ml-4 text-lg">Buscar expediente</p>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="relative m-0 list-none px-[0.2rem] mt-auto py-6">
          <div className="h-[1px] my-[.5rem] w-[90%] mx-auto bg-[#e6e6e6] "></div>
          <ul className="relative m-0 list-none px-[0.2rem] align-bottom">
            <li className="relative"
            onClick={()=> {toggle();}}

            >
              <span className="flex items-center h-12 truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#a375ff83] focus:bg-[#A375FF] focus:text-white">
                <AiOutlineSetting className="w-6 h-6" />
                <p className="ml-4 text-lg">Configuración</p>
              </span>
            </li>
            <li
              onClick={() => {
                localStorage.removeItem("userSession");
                navigate("/login");
              }}
              className="relative"
            >
              <span className="flex items-center h-12 truncate cursor-pointer rounded-[5px] px-6 py-4 text-base text-gray-600 transition duration-300 ease-linear hover:bg-[#f65151] hover:text-white focus:bg-red-500 focus:text-white">
                <FiLogOut className="w-6 h-6" />
                <p className="ml-4 text-lg">Cerrar sesión</p>
              </span>
            </li>
          </ul>
        </div>
        
      </nav>
    </>
  );
};
