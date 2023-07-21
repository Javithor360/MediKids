import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parser from "html-react-parser";

import { FaUserAlt } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";

import Modal from "../../components/Modal.jsx";

import {
  EditMedicalPrescription,
  EditMedicalRecord,
  ReferPatient,
  ScheduleAppointment,
} from "./PatientsComponents";

export const MedicalAppoinment = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [active, setActive] = useState(false);

  const [tabSelector, setTabSelector] = useState(1);

  const [finalMedicalRecord, setFinalMedicalRecord] = useState("");
  const [medicalPrescript, setMedicalPrescript] = useState("");
  const [scheAppoint, setScheAppoint] = useState({});

  const toggle = () => {
    setActive(!active);
  };

  const handleClick = (e) => {
    e.preventDefault();
    try {
      toggle();
      console.log("The link was clicked.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-[1.8rem] text-[#707070] mt-[.6rem] ml-7">
          Atendiendo Paciente:{" "}
        </p>
        <button
          className="justify-end self-center"
          onClick={() => {
            toggle();
          }}
        >
          Finalizar consulta
        </button>
      </div>
      <div className="inline-flex justify-center items-center gap-3 mt-[.5rem] ml-7">
        <FaUserAlt />
        <p>{`${patient.First_Names} ${patient.Last_Names}`}</p>
      </div>
      <div className="w-[100%] flex justify-center">
        <div className="inline-flex gap-16 justify-center items-center border border-[#BBBBBB] shadow-md rounded-xl mt-7 mx-auto w-[90%] h-[5rem] left-0 right-0 overflow-x-auto px-3">
          <div
            className={
              tabSelector === 1
                ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none "
                : "w-fit h-fit cursor-pointer select-none"
            }
            onClick={() => {
              setTabSelector(1);
            }}
          >
            Editar expediente
          </div>

          <div
            className={
              tabSelector === 2
                ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none"
                : "w-fit h-fit cursor-pointer select-none"
            }
            onClick={() => {
              setTabSelector(2);
            }}
          >
            Editar receta
          </div>

          <div
            className={
              tabSelector === 3
                ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none"
                : "w-fit h-fit cursor-pointer select-none"
            }
            onClick={() => {
              setTabSelector(3);
            }}
          >
            Programar cita
          </div>

          <div
            className={
              tabSelector === 4
                ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none"
                : "w-fit h-fit cursor-pointer select-none"
            }
            onClick={() => {
              setTabSelector(4);
            }}
          >
            Referir paciente
          </div>
        </div>
      </div>
      <div className="border border-[#BBBBBB] w-[90%] h-fit mx-auto mt-5 rounded-2xl">
        <div className={tabSelector === 1 ? "block" : "hidden"}>
          <EditMedicalRecord
            setFinalMedicalRecord={setFinalMedicalRecord}
            state={location.state}
          />
        </div>
        <div className={tabSelector === 2 ? "block" : "hidden"}>
          <EditMedicalPrescription
            setMedicalPrescript={setMedicalPrescript}
            state={location.state}
          />
        </div>
        <div className={tabSelector === 3 ? "block" : "hidden"}>
          <ScheduleAppointment
            setScheAppoint={setScheAppoint}
            state={location.state}
          />
        </div>
        <div className={tabSelector === 4 ? "block" : "hidden"}>
          <ReferPatient state={location.state} />
        </div>
      </div>
      {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <div className="w-[20rem] h-[20rem]">
            ESTAS A PUNTO DE DAR POR TERMINADA LA CITA. ESTA ACCIÓN ES
            IRREVERSIBLE ¿ESTÁS SEGURO QUE QUIERES CONTINUAR?
            <button
              className="flex items-center justify-center border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9"
              onClick={handleClick}
            >
              <MdSaveAs />
              Guardar y confirmar
            </button>
            <button
              className="flex items-center justify-center border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9"
              onClick={() => toggle()}
            >
              <MdSaveAs />
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
