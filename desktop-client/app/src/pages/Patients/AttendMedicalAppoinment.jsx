import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import parser from "html-react-parser";

import { FaUserAlt } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

import Modal from "../../components/Modal.jsx";

import { CgDanger } from "react-icons/cg";
import { HiBackspace } from "react-icons/hi";
import { CiWarning } from "react-icons/ci";
import { MdCancelPresentation } from "react-icons/md";
import {
  AiFillBackward,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillForward,
} from "react-icons/ai";

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
  const {
    EndMedicalAppointment,
    medicalPrescriptions,
    nextAppointment,
    errorMessage,
    setErrorMessage,
  } = useDash();

  // Variables utilized by modals
  const [active, setActive] = useState(false);
  const [errorHandler, setErrorHandler] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [chargin, setChargin] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [tabSelector, setTabSelector] = useState(1);

  // Each component's exported information needs to have its own state to be sure that the field is not empty
  const [medicalRecord, setMedicalRecord] = useState({});
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [notes, setNotes] = useState("");
  const [HtmlNotes, setHtmlNotes] = useState("");

  const [medicalPrescript, setMedicalPrescript] = useState([]);
  const [scheAppoint, setScheAppoint] = useState({});

  const pages = [
    <MedicalRecordConfirmation medicalRecord={medicalRecord} />,
    <MedicalPrescriptionConfirmation medicalPrescript={medicalPrescript} />,
    <MedicalAppointmentConfirmation
      scheAppoint={scheAppoint}
      patient={patient}
    />,
  ];

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

  useEffect(() => {
    if (height !== medicalRecord.height) setHeight(medicalRecord.height);
    if (weight !== medicalRecord.weight) setWeight(medicalRecord.weight);
    if (temperature !== medicalRecord.temperature)
      setTemperature(medicalRecord.temperature);
    if (notes !== medicalRecord.notes) setNotes(medicalRecord.notes);
    if (HtmlNotes !== medicalRecord.HtmlNotes) setHtmlNotes(medicalRecord);
    setHeight(medicalRecord.height);
  }, [medicalRecord]);

  const toggle = () => {
    setActive(!active);
  };

  const toggleError = () => {
    setErrorHandler(!errorHandler);
  };

  const toggleValidator = () => {
    const newErrorMessages = [];
    let isEmpty = false;
    let emptyCounter = 0;

    // Validating medical record variables
    for (const key in medicalRecord) {
      if (key !== "HtmlNotes" && !medicalRecord[key]) {
        newErrorMessages.push(
          `En el registro de expediente: El dato de '${key}' no está completo.`
        );
        isEmpty = true;
      }
    }

    // Validating medical prescription variables
    medicalPrescript.new_prescriptions.forEach((item, index) => {
      for (const key in item.data) {
        if (!item.data[key]) {
          newErrorMessages.push(
            `En la asignación de nueva receta médica: El dato de '${key} (${
              index + 1
            })' no está completo`
          );
          if (
            medicalPrescript.new_prescriptions.length === 1 &&
            medicalPrescript.new_prescriptions[index].hasSelectedYes === false
          ) {
            emptyCounter++;
          }
          isEmpty = true;
        }
        // }
      }
    });

    if (emptyCounter === 7) {
      newErrorMessages.splice(newErrorMessages.length - 7, 7);
    }

    if (scheAppoint && scheAppoint.hasSelectedYes) {
      if (new Date(scheAppoint.Date).getFullYear() < new Date().getFullYear()) { 
        newErrorMessages.push(
          `En la programación de citas: El dato de 'Fecha' está incompleto`
        );
        isEmpty = true;
      }
      if (!scheAppoint.Hour) {
        newErrorMessages.push(
          `En la programación de citas: El dato de 'Hora' no está completo`
        );
        isEmpty = true;
      }
      if (!scheAppoint.Description) {
        newErrorMessages.push(
          `En la programación de citas: El dato de 'Motivo de la cita' no está completo`
        );
        isEmpty = true;
      }
    }

    setErrorMessage(newErrorMessages);

    if (isEmpty && newErrorMessages.length > 0) {
      toggleError();
    } else {
      toggle();
    }
  };

  useEffect(() => {
    if (isSubmit) {
      if (errorMessage.length !== 0) {
        toggleError();
        toggle();
        setIsSubmit(false)
      } else {
        toggle();
        setIsSubmit(false);
        console.log(errorMessage.length);
      }
    }
  }, [errorMessage]);
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await EndMedicalAppointment(
        JSON.parse(localStorage.getItem("userSession")).id,
        patient.id,
        patient.Responsible_id,
        nextAppointment.id,
        {
          height,
          weight,
          temperature,
          notes,
          HtmlNotes,
        },
        medicalPrescript,
        scheAppoint,
        {
          addPrescriptions: medicalPrescript.new_prescriptions[0].hasSelectedYes,
          editPrescriptions: medicalPrescript.edited_prescriptions > 0 ? true : false,
          scheduleAppointment: scheAppoint.hasSelectedYes,
        }
      );
      setIsSubmit(true);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log('errorMessage')
  // setErrorMessage(errorMessage);
  // setChargin(true);
  // setTimeout(() => {
  //   toggle();
  //   setIsSubmit(false);
  //   setTimeout(() => {
  //     navigate(-1);
  //   }, 3000);
  // }, 3000);

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-[1.8rem] text-[#707070] mt-[.6rem] ml-7">
          Atendiendo Paciente:{" "}
        </p>
        <button
          className="flex flex-row items-center justify-center px-3 py-2 border border-[#c6c6c6] bg-[#D8D7FE] rounded-lg self-center gap-2 hover:bg-[#c9c8e8d3] ease-in duration-200"
          onClick={toggleValidator}
        >
          <AiOutlineCheckCircle />
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
            medicalPrescriptions={medicalPrescriptions}
            state={location.state}
          />
        </div>
        <div className={tabSelector === 3 ? "block" : "hidden"}>
          <ScheduleAppointment
            setScheAppoint={setScheAppoint}
            nextAppointment={nextAppointment}
            state={location.state}
          />
        </div>
        <div className={tabSelector === 4 ? "block" : "hidden"}>
          <ReferPatient state={location.state} />
        </div>
      </div>
      {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <div className="min-w-[20rem] max-w-[50rem] min-h-[20rem] m-5">
            <h2>
              <CiWarning className="inline-flex items-center justify-center gap-3 text-[1.8rem] text-[#e73131] mb-1.5" />
              ADVERTENCIA
            </h2>
            <p className="ml-2 text-[#707070] text-[1.2rem]">
              Esta acción de confirmación es irreversible. Por favor asegúrate
              que todos los datos estén en orden antes de proceder
            </p>
            <div className="mt-5 info-container ml-2 text-[#707070] text-[1.2rem] list-none">
              {pages[currentPage]}
            </div>
            <div className="flex items-center justify-center mt-5">
              <button
                className={`${
                  currentPage !== pages.length - 1
                    ? `bg-[#A375FF]`
                    : `bg-[#A375FF]`
                } flex items-center justify-center border-2 border-[#707070]   text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg  mb-9`}
                onClick={handleClick}
                disabled={currentPage !== pages.length - 1}
              >
                <MdSaveAs className="w-5 h-10" />
                Guardar
              </button>
              <button
                className="flex items-center justify-center border-2 border-[#707070] bg-[#ff1515] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-2  mb-9"
                onClick={() => toggle()}
              >
                <MdCancelPresentation className="w-5 h-10" />
                Cancelar
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="btn"
              >
                <AiFillCaretLeft />
              </button>
              <button
                className="ml-2 btn "
                onClick={handleNextPage}
                disabled={currentPage === pages.length - 1}
              >
                <AiFillCaretRight />
              </button>
            </div>
          </div>
        </Modal>
      )}
      {toggleError && (
        <Modal
          active={errorHandler}
          toggle={toggleError}
          onRequestClose={toggleError}
        >
          <div className="min-w-[30rem] max-w-[45rem] min-h-[30rem] m-5 rounded-lg ">
            <h2>
              <CiWarning className="inline-flex items-center justify-center gap-3 text-[1.8rem] text-[#e73131] mb-1.5" />
              ERROR
            </h2>
            <div className=" w-100 h-100">
              <p className="ml-2 text-[#707070] text-[1.2rem]">
                Parece que hay algunos detalles que revisar antes de finalizar
                la consulta:
              </p>

              <ul>
                {errorMessage.map((i) => {
                  return (
                    <li
                      className="ml-2 text-[#707070] text-[1.2rem] list-none items-center justify-center "
                      key={i}
                    >
                      {placeholderChanger(i)}{" "}
                      <CgDanger className="inline-flex items-center justify-center gap-3 text-[1.8rem]   text-[#e73131]" />
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-center ">
                <button
                  className=" flex items-center justify-center  border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[8rem] h-[3rem] rounded-lg   mt-5 text-[1.2rem] "
                  onClick={() => {
                    toggleError();
                    setErrorMessage([]);
                  }}
                >
                  <HiBackspace className="w-5 h-10" />
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const placeholderChanger = (str) => {
  const variable_names = {
    height: "altura",
    weight: "peso",
    temperature: "temperatura",
    notes: "anotaciones en expediente",
    Medicine_Name: "nombre de la medicina",
    Instructions: "instructions",
    Description: "descripción",
    Starting_Dose_Date: "fecha de inicio de la dosis",
    Finishing_Dose_Date: "fecha de finalización de la dosis",
    Dose: "dosis",
    Time_Dose: "aplicación de dosis por día",
  };
  return str.replace(
    /\b(?:height|weight|temperature|notes|Medicine_Name|Instructions|Description|Starting_Dose_Date|Finishing_Dose_Date|Dose|Time_Dose)\b/g,
    (match) => variable_names[match]
  );
};

// Modal's first page: Medical record related...
const MedicalRecordConfirmation = ({ medicalRecord }) => {
  return (
    <div className="medical-record">
      <h3>Información del expediente:</h3>
      <ul>
        <li className="list-none">Altura: {medicalRecord.height} lb </li>
        <li className="list-none">Peso: {medicalRecord.weight} mts </li>
        <li className="list-none">
          Temperatura: {medicalRecord.temperature} °C{" "}
        </li>

        <li className="list-none ">
          <h3> Anotaciones:</h3>

          <div className="block mt-2 max-w-[25rem] rounded-lg  border border-[#000000]     ">
            {parser(medicalRecord.HtmlNotes)}
          </div>
        </li>
      </ul>
    </div>
  );
};

const MedicalPrescriptionConfirmation = ({
  medicalPrescript,
  errorMessage,
}) => {
  return (
    <div className="medical-prescription">
      <h3>Información de la receta médica</h3>
      <ul>
        <li className="list-none">Receta de medicamentos editada</li>
        {medicalPrescript.edited_prescriptions.length > 0 ? (
          medicalPrescript.edited_prescriptions.map((m, i) => {
            return (
              <div key={i}>
                <p>Nombre del medicamento: {m.Medicine_Name}</p>
                <p>Instrucciones: {m.Instructions}</p>
                <p>Descripción: {m.Description}</p>
                <p>Dosis: {m.Dose}</p>
                <p>Dosis por día: {m.Time_Dose}</p>
                <p>Fecha de inicio de dosis: {m.Starting_Dose_Date}</p>
                <p>Fecha de finalización de dosis: {m.Finishing_Dose_Date}</p>
              </div>
            );
          })
        ) : (
          <div>No se editó ningún medicamento</div>
        )}
        <li className="font-bold list-none">Nuevos medicamentos agregados</li>
        {medicalPrescript.new_prescriptions.length === 1 &&
        medicalPrescript.new_prescriptions[0].hasSelectedYes === false ? (
          <div>No se han agregado medicamentos nuevos</div>
        ) : (
          medicalPrescript.new_prescriptions.map((m, i) => {
            return (
              <div key={i} className="my-3 border-2 border-black rounded-lg ">
                <p>Nombre del medicamento: {m.data.Medicine_Name}</p>
                <p>Instrucciones: {m.data.Instructions}</p>
                <p>Descripción: {m.data.Description}</p>
                <p>Dosis: {m.data.Dose}</p>
                <p>Dosis por día: {m.data.Time_Dose}</p>
                <p>Fecha de inicio de dosis: {m.data.Starting_Dose_Date}</p>
                <p>
                  Fecha de finalización de dosis: {m.data.Finishing_Dose_Date}
                </p>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

const MedicalAppointmentConfirmation = ({ scheAppoint, patient }) => {
  const schDate = new Date(scheAppoint.Date);
  return (
    <div className="medical-appointment">
      <h3>Información de cita programada</h3>
      {scheAppoint.hasSelectedYes === true ? (
        <div>
          <ul>
            <li>
              <b>Paciente:</b> {`${patient.First_Names} ${patient.Last_Names}`}
            </li>
            <li>
              <b>Fecha: </b>
              {`${schDate.getDate()}/${
                schDate.getMonth() + 1
              }/${schDate.getFullYear()} (${new Date(
                `2023-10-23T${scheAppoint.Hour}`
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })})`}
            </li>
            <li>
              <b>Motivo:</b> {scheAppoint.Description}
            </li>
          </ul>
        </div>
      ) : (
        <div>No se programó una cita durante esta sesión</div>
      )}
    </div>
  );
};
