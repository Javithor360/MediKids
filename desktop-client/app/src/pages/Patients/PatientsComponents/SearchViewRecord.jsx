import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parser from "html-react-parser";
import {
  AiFillBackward,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillForward,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle
} from "react-icons/ai";
import { BsClipboardPlusFill, BsCalendarCheck } from 'react-icons/bs'
import { MdOutlineHeight, MdVaccines } from 'react-icons/md'
import { FaChild, FaGripLinesVertical, FaWeight, FaHandHoldingWater, FaUserAlt, FaPhoneAlt, FaTemperatureHigh } from 'react-icons/fa'
import { GiBodyHeight } from 'react-icons/gi'
import { useDash } from "../../../context/DoctorContext";
import { getPatientAge } from "../../../utils/Functions";
import PulseLoader from "react-spinners/PulseLoader";

export const SearchViewRecord = ({ values }) => {

  const { PatientMedicalRecords, PatientVaccines, medicalRecords, vaccines } = useDash();

  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    <FirstPage
        values={values}
        vaccines={vaccines}
    />,
    ...medicalRecords.map((i) => <RecordsLayout key={i.id} record={i} />),
  ];

  useEffect(() => {
    PatientMedicalRecords(values.Patient_id);
    PatientVaccines(values.Patient_id);
  }, []);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(pages.length - 1);
  };

  const [loadingScreen, setLoadingScreen] = useState(true);
  setTimeout(() => {
    setLoadingScreen(false);
  }, 3000);
  return (
    <>
      {
        loadingScreen === true ?
        <div className="flex items-center justify-center w-[30rem] h-[40rem]">
          <PulseLoader
            color="#a375ff"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        :
        <>
          <div>{pages[currentPage]}</div>
          <div className='pt-[1rem] border-t border-t-[#c6c6c6] mt-[1rem] flex items-center justify-center gap-4'>
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 0}
            className={`btn btn-sm ${currentPage === 0 ? 'opacity-50' : ''}`}
          >
            <AiFillBackward />Primera
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`btn btn-sm ${currentPage === 0 ? 'opacity-50' : ''}`}
          >
            <AiFillCaretLeft />Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
            className={`btn btn-sm ${currentPage === pages.length - 1 ? 'opacity-50' : ''}`}
          >
            Siguiente<AiFillCaretRight />
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === pages.length - 1}
            className={`btn btn-sm ${currentPage === pages.length - 1 ? 'opacity-50' : ''}`}
          >
            Última<AiFillForward />
          </button>
          </div>
        </>
      }
      
    </>
  );
};

// COMPONENTE DE LA PRIMERA PÁGINA DEL EXPEDIENTE, ÚNICAMENTE SE MUESTRA INFORMACIÓN DEL PACIENTE (FALTAN LAS VACUNAS)
const FirstPage = ({ values, vaccines }) => {

    const vaccineEntries = Object.entries(vaccines).filter(
    ([key]) => key !== "id" && key !== "Patient_id"
  );

  return (
    <div className="h-fit w-[30rem]">
      <div className="flex items-center gap-2">
        <BsClipboardPlusFill className="text-[#A375FF] "/>
        <p className="text-[1.4rem] text-[#707070] font-semibold">Expediente</p>
      </div>
      <div className="w-[100%] h-[1px] bg-[#c6c6c6] my-[.5rem]"></div>
      {/* table */}
        <>
          <div className="w-full rounded-lg border border-[#bbbbbb] h-fit flex flex-col overflow-hidden mb-[1rem] mt-[1rem]">
            <div className="w-full h-fit p-3 bg-[#d8d7fe] text-center">
              <span className="font-semibold">Información del paciente</span>
            </div>
            <div className="w-full bg-[#f7f7f7] h-[3rem] flex flex-row border-t border-t-[#bbbbbb] border-b border-b-[#bbbbbb] text-[#707070] shadow-sm">
              <div className="w-[70%] h-full text-center border-r border-r-[#bbbbbb] font-semibold flex flex-row items-center justify-center gap-2">
                <FaChild></FaChild>Nombre
              </div>
              <div className="w-[30%] h-full text-center font-semibold flex flex-row items-center justify-center gap-2">
                <FaGripLinesVertical></FaGripLinesVertical>Edad
              </div>
            </div>    
            <div className="w-full flex flex-row h-[3rem]">
              <div className="w-[70%] h-full text-center border-r border-r-[#bbbbbb] flex items-center justify-center">
                {values.Name}
              </div>
              <div className="w-[30%] h-full text-center flex items-center justify-center">
                {getPatientAge(values.Age, values.Birthdate)}
              </div>
            </div>  

            <div className="w-full bg-[#f7f7f7] h-[3rem] flex flex-row border-t border-t-[#bbbbbb] border-b border-b-[#bbbbbb] text-[#707070] shadow-sm">
              <div className="w-[40%] h-full text-center border-r border-r-[#bbbbbb] font-semibold flex flex-row items-center justify-center gap-2">
                <FaHandHoldingWater></FaHandHoldingWater>Tipo de sangre
              </div>
              <div className="w-[30%] h-full text-center border-r border-r-[#bbbbbb] font-semibold flex flex-row items-center justify-center gap-2">
                <FaWeight></FaWeight>Peso
              </div>
              <div className="w-[30%] h-full text-center font-semibold flex flex-row items-center justify-center gap-2">
                <MdOutlineHeight></MdOutlineHeight>Altura
              </div>
            </div>    
            <div className="w-full flex flex-row h-[3rem]">
              <div className="w-[40%] h-full text-center border-r border-r-[#bbbbbb] flex items-center justify-center">
                {values.Blood_Type}
              </div>
              <div className="w-[30%] h-full text-center border-r border-r-[#bbbbbb] flex items-center justify-center">
                {values.Weight} lb
              </div>
              <div className="w-[30%] h-full text-center flex items-center justify-center">
                {values.Height} mt
              </div>
            </div>  
          </div>

          <div className="w-full rounded-lg border border-[#bbbbbb] h-fit flex flex-col overflow-hidden">
            <div className="w-full h-fit p-3 bg-[#d8d7fe] text-center">
              <span className="font-semibold">Información del responsable</span>
            </div>
            <div className="w-full bg-[#f7f7f7] h-[3rem] flex flex-row border-t border-t-[#bbbbbb] border-b border-b-[#bbbbbb] text-[#707070] shadow-sm">
              <div className="w-[60%] h-full text-center border-r border-r-[#bbbbbb] font-semibold flex flex-row items-center justify-center gap-2">
                <FaUserAlt></FaUserAlt>Nombre
              </div>
              <div className="w-[40%] h-full text-center font-semibold flex flex-row items-center justify-center gap-2">
                <FaPhoneAlt></FaPhoneAlt>Celular
              </div>
            </div>    
            <div className="w-full flex flex-row h-[3rem]">
              <div className="w-[60%] h-full text-center border-r border-r-[#bbbbbb] flex items-center justify-center">
                {values.Responsible_Name} 
              </div>
              <div className="w-[40%] h-full text-center flex items-center justify-center">
                {values.Phone}
              </div>
            </div>  
          </div>
          <div className="h-fit w-full border border-[#bbbbbb] mt-[1rem] rounded-md overflow-hidden">
            <div className="w-full h-fit p-3 bg-[#d8d7fe] text-center flex flex-row items-center justify-center gap-2 ">
              <MdVaccines></MdVaccines><span className="font-semibold">Registro de vacunas</span>
            </div>
            <div className="h-[7rem] overflow-y-auto border-t border-t-[#bbbbbb]">
              <ul className="p-3">
                {vaccineEntries.map(([vaccine, value]) => (
                  <li key={vaccine} className="flex flex-row gap-2 p-2 items-center">
                    {
                      value ? 
                      <AiOutlineCheckCircle className="text-green-500"/>
                      :
                      <AiOutlineCloseCircle className="text-red-500"/>
                    }
                    Vacuna contra <span className="font-semibold">{vaccine.replace("Vaccine_", "").replace(/_/g, ' ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
    </div>
  );
};

// COMPONENTE LAYOUT PARA CADA REGISTRO DEL EXPEDIENTE
const RecordsLayout = ({ record }) => {
  const appDate = new Date(record.Date_Time);
  return (
    <div className="h-fit w-[30rem]">
      <div className="flex items-center gap-2">
        <BsClipboardPlusFill className="text-[#A375FF]"/>
        <p className="text-[1.4rem] text-[#707070]">Registro de cita</p>
      </div>
      <div className="text-[1.4rem] text-[#707070] font-bold flex flex-row items-center gap-3"># {record.Medical_History_Code} <div className="flex flex-row gap-2 items-center"><BsCalendarCheck className="text-[1.2rem]"/>({`${appDate.getDate()}/${appDate.getMonth() + 1}/${appDate.getFullYear()}`})</div></div>
      <div className="w-[100%] h-[1px] bg-[#c6c6c6] my-[.5rem]"></div>
      <div>
        <h2 className="text-[#707070] mt-[1rem]">1. Toma de datos</h2>
        <ul className="ml-5 mt-4">
          <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
            <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><GiBodyHeight /> Altura: </div>
            <span>{record.Height} mt</span>
          </li>
          <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
            <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><FaWeight /> Peso: </div>
            <span>{record.Weight} lb</span>
          </li>
          <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
            <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><FaTemperatureHigh /> Temperatura: </div>
            <span>{record.Temperature} °C</span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-[#707070] mt-[2rem]">2. Anotaciones realizadas</h2>
        <div className="bg-[#f7f7f7] ml-5 mt-[1rem] mb-2 h-[20rem] w-[90%] rounded-md border border-[#bbbbbb] shadow-lg overflow-y-auto p-3">
          <div className="p-4">{parser(record.Diagnosis)}</div>
        </div>
        
      </div>
    </div>
  );
};
