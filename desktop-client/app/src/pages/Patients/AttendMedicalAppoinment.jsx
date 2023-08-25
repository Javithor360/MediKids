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

  // Variables utilized by modals
  const [active, setActive] = useState(false);
  const [errorHandler, setErrorHandler] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [chargin, setChargin] = useState(false);

  const [tabSelector, setTabSelector] = useState(1);

  // Each component's exported information needs to have its own state to be sure that the field is not empty
  const [medicalRecord, setMedicalRecord] = useState({});
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [notes, setNotes] = useState("");

  const [medicalPrescript, setMedicalPrescript] = useState([]);
  const [scheAppoint, setScheAppoint] = useState({});

  const pages = [
    <MedicalRecordConfirmation
      medicalRecord={medicalRecord}
      height={height}
      weight={weight}
      temperature={temperature}
      notes={notes}
    />,
    <MedicalPrescriptionConfirmation medicalPrescript={medicalPrescript} />,
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
    // console.log(medicalRecord);
    setHeight(medicalRecord.height);
  }, [medicalRecord]);

  useEffect(() => {
    console.log(medicalPrescript);
  }, [medicalPrescript]);

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
      if (!medicalRecord[key]) {
        newErrorMessages.push(
          `En el registro de expediente, el dato de '${key}' no está completo.`
        );
        isEmpty = true;
      }
    }

    medicalPrescript.new_prescriptions.forEach((item, index) => {
      for (const key in item.data) {
        if (!item.data[key]) {
          newErrorMessages.push(
            `En la asignación de nueva receta médica, el dato de '${key} (${
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

    setErrorMessage(newErrorMessages);

    if (isEmpty && newErrorMessages.length > 0) {
      toggleError();
    } else {
      toggle();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await EndMedicalAppointment(
        { height, weight, temperature, notes, Patient_id: patient.id },
        { medicalPrescript },
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
        <button className="self-center justify-end" onClick={toggleValidator}>
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
            <div className="mt-5 info-container">{pages[currentPage]}</div>
            <div className="flex mt-5">
              <button
                className={`${
                  currentPage !== pages.length - 1
                    ? `bg-gray-500`
                    : `bg-[#A375FF]`
                } flex items-center justify-center border-2 border-[#707070]  text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9`}
                onClick={handleClick}
                disabled={currentPage !== pages.length - 1}
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
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Regresar
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
            >
              Siguiente
            </button>
          </div>
        </Modal>
      )}
      {toggleError && (
        <Modal
          active={errorHandler}
          toggle={toggleError}
          onRequestClose={toggleError}
        >
          <div className="min-w-[20rem] max-w-[45rem] min-h-[20rem] m-5">
            <h2>[!] ERROR [!]</h2>
            <p>
              Parece que hay algunos detalles que revisar antes de finalizar la
              consulta:
            </p>
            <ul>
              {errorMessage.map((i) => {
                return <li key={i}>{placeholderChanger(i)}</li>;
              })}
            </ul>
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
        <li>Altura: {medicalRecord.height} lb </li>
        <li>Peso: {medicalRecord.weight} mts </li>
        <li>Temperatura: {medicalRecord.temperature} °C </li>

        <li>
          Anotaciones:
          <div className="block mt-2 max-w-[25rem] border border-[#000000]">
            {parser(medicalRecord.notes)}
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
        <li>Receta de medicamentos editada</li>
        <li>Nuevos medicamentos agregados</li>
        {medicalPrescript.new_prescriptions.length === 1 &&
        medicalPrescript.new_prescriptions[0].hasSelectedYes === false ? (
          <div>No se han agregado medicamentos nuevos</div>
        ) : (
          medicalPrescript.new_prescriptions.map((m, i) => {
            return (
              <div key={i}>
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
