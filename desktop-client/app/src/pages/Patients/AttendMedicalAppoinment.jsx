import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useDash } from "../../context/DoctorContext";

export const MedicalAppoinment = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  let navigate = useNavigate();
  const { EndMedicalAppointment } = useDash();

  const [active, setActive] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const [chargin, setChargin] = useState(false);

  const [tabSelector, setTabSelector] = useState(1);

  // Each component's exported information needs to have its own state to be sure that the field is not empty
  const [medicalRecord, setMedicalRecord] = useState({});
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [notes, setNotes] = useState("");

  const [medicalPrescript, setMedicalPrescript] = useState("");
  const [scheAppoint, setScheAppoint] = useState({});

  useEffect(() => {
    if (height !== medicalRecord.height) setHeight(medicalRecord.height);
    if (weight !== medicalRecord.weight) setWeight(medicalRecord.weight);
    if (temperature !== medicalRecord.temperature)
      setTemperature(medicalRecord.temperature);
    if (notes !== medicalRecord.notes) setNotes(medicalRecord.notes);
    // console.log(medicalRecord);
    setHeight(medicalRecord.height);
  }, [medicalRecord]);

  // useEffect(() => {
  //   console.log(medicalRecord);
  //   console.log(`Current height: ${height}`);
  //   console.log(`Current weight: ${weight}`);
  //   console.log(`Current temperature: ${temperature}`);
  //   console.log(`Current notes: ${notes}`);
  // }, [height, weight, temperature, notes]);

  const toggle = () => {
    setActive(!active);
  };

  const toggleError = () => {
    setActiveError(!activeError);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await EndMedicalAppointment(
        { height, weight, temperature, notes, Patient_id: patient.id },
        {},
        {}
      );
      setChargin(true);
      setTimeout(() => {
        toggle();
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }, 3000);
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
          className="self-center justify-end"
          onClick={() => {
            if (
              height === 0 ||
              height === "" ||
              weight === 0 ||
              weight === "" ||
              temperature === 0 ||
              temperature === "" ||
              notes === undefined ||
              notes === ""
            ) {
              toggleError();
            } else {
              toggle();
            }
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
            setMedicalRecord={setMedicalRecord}
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
          <div className="min-w-[20rem] max-w-[30rem] min-h-[20rem] m-5">
            <h2>[!] ADVERTENCIA [!]</h2>
            <p>
              Esta acción de confirmación es irreversible. Por favor asegúrate
              que todos los datos estén en orden antes de proceder
            </p>
            <div className="mt-5 info-container">
              <div className={`medical-record`}>
                <h3>Información del expediente:</h3>
                <ul>
                  <li>
                    Altura: {height} lb{" "}
                    {height && height === medicalRecord.height
                      ? ``
                      : `(Sin modificar)`}
                  </li>
                  <li>
                    Peso: {weight} mts{" "}
                    {weight && weight === medicalRecord.weight
                      ? ``
                      : `(Sin modificar)`}
                  </li>
                  <li>
                    Temperatura: {temperature} °C{" "}
                    {temperature && temperature === medicalRecord.temperature
                      ? ``
                      : `(Sin modificar)`}
                  </li>

                  <li>
                    Anotaciones:{" "}
                    {!notes ? (
                      "Sin anotaciones"
                    ) : (
                      <div className="block mt-2 max-w-[25rem] border border-[#000000]">
                        {parser(notes)}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              {/* FOR THE FUTURE */}
              {/* <div className="medical-prescription"></div>
              <div className="scheduled-appointment"></div> */}
            </div>
            <div className="flex mt-5">
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
          </div>
        </Modal>
      )}
      {toggleError && (
        <Modal
          active={activeError}
          toggle={toggleError}
          onRequestClose={toggleError}
        >
          <div className="min-w-[20rem] max-w-[30rem] min-h-[20rem] m-5">
            <h2>[!] ERROR [!]</h2>
            <p>
              Antes de finalizar esta cita, debes ingresar al menos los datos
              del paciente (altura, peso, temperatura y anotaciones)
            </p>
            <button
              className="flex items-center justify-center border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9"
              onClick={() => toggleError()}
            >
              <MdSaveAs />
              Entendido
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
