import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import parser from "html-react-parser";
import { format } from 'date-fns'
import { FaUserAlt } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Modal from "../../components/Modal.jsx";
import PencilCharginAnimation from "../../components/PencilCharginAnimation.jsx";

import { BsCalendarFill, BsCalendar2EventFill } from 'react-icons/bs'
import { CgDanger } from "react-icons/cg";
import { HiBackspace } from "react-icons/hi";
import { GiBodyHeight } from 'react-icons/gi'
import { MdCancelPresentation, MdOutlineEditNote, MdIntegrationInstructions, MdDescription } from "react-icons/md";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineWarning,
  AiFillMedicineBox,
  AiFillFolderAdd
} from "react-icons/ai";
import { FaWeight, FaTemperatureHigh, FaUtensilSpoon, FaRulerVertical, FaChild } from 'react-icons/fa'

import {
  VscLoading
} from 'react-icons/vsc'
import {
  EditMedicalPrescription,
  EditMedicalRecord,
  ReferPatient,
  ScheduleAppointment,
} from "./PatientsComponents";
import { useDash } from "../../context/DoctorContext";
import { TiDirections } from "react-icons/ti";

export const MedicalAppoinment = () => {
  const location = useLocation();
  const { patient } = location.state || {};
  const { t } = useTranslation();

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
  const [chargin2, setChargin2] = useState(false);
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
    <MedicalRecordConfirmation medicalRecord={medicalRecord} HtmlNotes={HtmlNotes} />,
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

  useEffect(() => {
    if (isSubmit) {
      if (errorMessage.length !== 0) {
        toggleError();
        toggle();
        setIsSubmit(false)
      } else {
        setIsSubmit(false);
        setChargin(true);
        setTimeout(() => {
          toggle();
          setChargin2(true);
          setTimeout(() => {
            navigate(-2);
          }, 5000);
        }, 5000);
      }
    }
  }, [errorMessage]);

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
          `<p><span class="text-red-500">En el registro de expediente:</span><span class="text-[#707070]"> El dato de <i class="font-semibold">'${key}'</i> no está completo.</span></p>`
        );
        isEmpty = true;
      }
    }

    // Validating medical prescription variables
    medicalPrescript.new_prescriptions.forEach((item, index) => {
      for (const key in item.data) {
        if (!item.data[key]) {
          newErrorMessages.push(
            `<p><span class="text-red-500">En la asignación de nueva receta médica:</span><span class="text-[#707070]"> El dato de <i class="font-semibold">'${key} (${index + 1})'</i> no está completo.</span></p>`
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
          `<p><span class="text-red-500">En la programación de citas:</span><span class="text-[#707070]"> El dato de <i class="font-semibold">'Fecha'</i> no está completo.</span></p>`
        );
        isEmpty = true;
      }
      if (!scheAppoint.Hour) {
        newErrorMessages.push(
          `<p><span class="text-red-500">En la programación de citas:</span><span class="text-[#707070]"> El dato de <i class="font-semibold">'Hora'</i> no está completo.</span></p>`
        );
        isEmpty = true;
      }
      if (!scheAppoint.Description) {
        newErrorMessages.push(
          `<p><span class="text-red-500">En la programación de citas:</span><span class="text-[#707070]"> El dato de <i class="font-semibold">'Motivo de citas'</i> no está completo.</span></p>`
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
          editPrescriptions: medicalPrescript.edited_prescriptions.length > 0,
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
      {
        chargin2 === true ?
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
            <PencilCharginAnimation/>
        </div>
        :
        <>
          <div className="flex flex-row justify-between">
        <p className="text-[1.8rem] text-[#707070] mt-[.6rem] ml-7">
        {t("medical.tittle")}{" "}
        </p>
        <button
          className="flex flex-row items-center justify-center px-3 py-2 border border-[#c6c6c6] bg-[#D8D7FE] rounded-lg self-center gap-2 hover:bg-[#c9c8e8d3] ease-in duration-200"
          onClick={toggleValidator}
        >
          <AiOutlineCheckCircle />
          {t("medical.tittle1")}
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
            {t("medical.tittle2")}
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
            {t("medical.tittle3")}
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
            {t("medical.tittle4")}
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
          <div className="min-w-[20rem] max-w-[50rem] min-h-[20rem] m-5 p-[2rem]">
            <div className="border-b border-b-[#c6c6c6] mb-[1rem]">
              <p className="text-[1.6rem] text-[#707070] font-semibold flex flex-row gap-2 items-center">
                <AiOutlineWarning className='text-red-400' /> {t("settings.tittle")}
              </p>
            </div>
            <div className="w-[100%] h-[100%] mx-auto rounded-sm flex bg-[#D8D7FE]">
              <div className="w-[2%] bg-[#A375FF]"> </div>
              <div className="w-[98%] h-full p-[1rem]">
                <p className="text-[#707070]">
                {t("medical.tittle6")}
                </p>
              </div>
            </div>
            <div className="mt-5 info-container ml-2 text-[#707070] text-[1.2rem] list-none">
              {pages[currentPage]}
            </div>
            <div className="border-t border-t-[#c6c6c6] flex items-center justify-between pt-[1rem] mt-[1rem]">
              <div className="flex flex-row gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className={`btn btn-sm ${currentPage === 0 ? 'opacity-50' : ''}`}
                >
                  <AiFillCaretLeft />{t("medical.button")}
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pages.length - 1}
                  className={`btn btn-sm ${currentPage === pages.length - 1 ? 'opacity-50' : ''}`}
                >
                  {t("medical.button1")}<AiFillCaretRight />
                </button>
              </div>
              <div className="flex flex-row items-center gap-2">
                <button
                  className={`${currentPage !== pages.length -1 ? 'opacity-50' : '' } flex items-center justify-center gap-2 btn btn-sm rounded-lg bg-[#a49bb7] hover:bg-[#9890a9] text-white`}
                  onClick={handleClick}
                  disabled={currentPage !== pages.length - 1}
                >
                  {chargin === true ? (
                    <>
                      <VscLoading className="animate-spin" />
                      {t("medical.tittle7")}
                    </>
                  ) : (
                    <>
                      <MdSaveAs />
                      {t("medical.tittle8")}
                    </>
                  )}
                </button>
                <button
                  className={`flex items-center justify-center gap-2 btn btn-sm rounded-lg bg-red-400 hover:bg-[#716a81] text-white`}
                  onClick={() => toggle()}
                >
                  <MdCancelPresentation />
                  {t("medical.tittle9")}
                </button>
              </div>
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
          <div className="w-[35rem] h-[100%] m-5 rounded-lg">
            <div className="border-b border-b-[#c6c6c6] mb-[1rem]">
              <p className="text-[1.6rem] text-red-400 font-semibold flex flex-row gap-2 items-center">
                <AiOutlineWarning className='text-red-400' /> {t("medical.tittle10")}
              </p>
            </div>
            <div className="w-[100%] h-[100%] mx-auto rounded-sm flex bg-[#ffe9d9]">
              <div className="w-[2%] bg-red-400"> </div>
              <div className="w-[98%] h-full p-[1rem]">
                <p className="text-[#707070]">
                {t("medical.tittle11")}
                </p>
              </div>
            </div>
            <div className="h-[20rem] overflow-y-auto">
              <ul className="w-[90%] mx-auto block mt-4">
                {errorMessage.map((i) => {
                  return (
                    <li
                      className="ml-2 text-[1rem] list-none items-center flex flex-row gap-3 mb-3"
                      key={i}
                    >
                      <CgDanger className="w-[10%] inline-flex items-center justify-center gap-3 text-[1.8rem]  text-red-400" />
                      <span className="w-[90%]">
                        {parser(placeholderChanger(i))}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="pt-[1rem] border-t border-t-[#c6c6c6] mt-[1rem] flex items-end justify-end gap-5">
              <button
                className="btn btn-active border border-[#c6c6c6] bg-[#a49bb7] hover:bg-[#9890a9] text-white gap-3"
                onClick={() => {
                  toggleError();
                  setErrorMessage([]);
                }}
              >
                <HiBackspace />
                Si, OK, entiendo
              </button>
            </div>
          </div>
        </Modal>
      )} 
        </>
      }
      
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
    Instructions: "instrucciones",
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
  const { t } = useTranslation();
  const location = useLocation();
  const { patient } = location.state || {};

  const contentRef = useRef(null);

  const generatePDF = () => {
    const content = contentRef.current;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`${patient.Patient_Code}-Expediente.pdf`);
    });
  };

  return (
    <div className="h-[20rem] overflow-y-auto">
      <h2 className="text-[#707070] mt-[1rem] mb-[1rem]">{t("medical.tittle12")}</h2>
      <ul>
        <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
          <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><GiBodyHeight /> {t("medical.tittle13")} </div>
          <span>{medicalRecord.height} mt</span>
        </li>
        <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
          <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><FaWeight /> {t("medical.tittle14")} </div>
          <span>{medicalRecord.weight} lb</span>
        </li>
        <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
          <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><FaTemperatureHigh /> {t("medical.tittle15")} </div>
          <span>{medicalRecord.temperature} °C</span>
        </li>
        <li className="list-none ">
          <h2 className="text-[#707070] mt-[1rem] mb-[1rem]">{t("medical.tittle16")}</h2>
          <div className="bg-[#f7f7f7] ml-5 mt-[1rem] mb-2 h-[20rem] w-[90%] rounded-md border border-[#bbbbbb] shadow-lg overflow-y-auto p-3" ref={contentRef}>
            <div div className="p-4">
              {parser(medicalRecord.HtmlNotes)}
            </div>
          </div>
          <div className="flex items-center justify-center my-4"><button className="bg-[#A375FF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => generatePDF()}>descargar pdf</button></div>
        </li>
      </ul>
    </div>
  );
};

const MedicalPrescriptionConfirmation = ({
  medicalPrescript,
  errorMessage,
}) => {
  const { t } = useTranslation();
  return (
    <div className="h-[20rem] overflow-y-auto">
      <h2 className="text-[#707070] mt-[1rem] mb-[1rem]">{t("medical.tittle17")}</h2>
      <div>
        <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center mb-5"><MdOutlineEditNote /> {t("medical.tittle18")} </div>

        <div className="h-[15rem] w-[98%] overflow-y-auto p-[1rem] border-[#bbbbbb80] border rounded shadow-md gap-9">
          {medicalPrescript.edited_prescriptions.length > 0 ? (
            medicalPrescript.edited_prescriptions.map((m, i) => {
              return (
              <>
              <div key={i} className="overflow-hidden h-fit w-full rounded-md border border-[#c6c6c6]">
                <table className="w-full font-normal text-[1rem] h-fit">
                  <tr className="w-full bg-[#D8D7FE] border-b border-[#c6c6c6] h-[2.5rem] flex items-center">
                    <td className="flex flex-row items-center justify-center w-full align-middle h-fit">
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <AiFillMedicineBox />
                        <span>{t("medical.tittle19")} ({i + 1})</span> 
                      </th>
                    </td>
                  </tr>
                  <tr className="border-b border-[#c6c6c6] h-[2.5rem] flex items-center">
                    <td className="flex flex-row items-center justify-center w-full h-full">
                      <p>
                        {m.Medicine_Name}
                      </p>
                    </td>
                  </tr>
                  <tr className="w-full bg-[#f7f7f7] shadow-md flex flex-row h-[2.5rem] items-center">
                    <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                      <th></th>
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <MdDescription />
                        <span>{t("medical.tittle20")}</span> 
                      </th>
                    </td>
                    <td className="w-[50%] h-full flex flex-row justify-center items-center">
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <MdIntegrationInstructions />
                        <span>{t("medical.tittle21")}</span> 
                      </th>
                    </td>
                  </tr>
                  <tr className="border-b border-[#c6c6c6] flex flex-row h-[2.5rem] items-center">
                    <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                      <p>
                        {m.Description}
                      </p>
                    </td>
                    <td className="w-[50%] h-full flex flex-row justify-center items-center">
                      <p>
                        {m.Instructions}
                      </p>
                    </td>
                  </tr>
                  <tr className="w-full bg-[#f7f7f7] shadow-md flex flex-row h-[2.5rem] items-center">
                    <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <FaRulerVertical />
                        <span>{t("medical.tittle23")}</span> 
                      </th>
                    </td>
                    <td className="w-[50%] h-full flex flex-row justify-center items-center">
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <FaUtensilSpoon />
                        <span>{t("medical.tittle24")}</span> 
                      </th>
                    </td>
                  </tr>
                  <tr className="border-b border-[#c6c6c6] flex flex-row h-[2.5rem] items-center">
                    <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                      <p>
                        {m.Dose}
                      </p>
                    </td>
                    <td className="w-[50%] h-full flex flex-row justify-center items-center">
                      <p>
                        {m.Time_Dose}
                      </p>
                    </td>
                  </tr>
                  <tr className="w-full bg-[#f7f7f7] shadow-md flex flex-row h-[2.5rem] items-center">
                    <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <BsCalendarFill />
                        <span>{t("medical.tittle25")}</span> 
                      </th>
                    </td>
                    <td className="w-[50%] h-full flex flex-row justify-center items-center">
                      <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                        <BsCalendar2EventFill />
                        <span>{t("medical.tittle26")}</span> 
                      </th>
                    </td>
                  </tr>
                  <tr className="flex flex-row h-[2.5rem] items-center">
                    <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                      <p>
                        {format(new Date(m.Starting_Dose_Date), 'dd/MM/yyyy')}
                      </p>
                    </td>
                    <td className="w-[50%] h-full flex flex-row justify-center items-center">
                      <p>
                        {format(new Date(m.Finishing_Dose_Date), 'dd/MM/yyyy')}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="h-[2.5rem] w-full"><span className="text-white">...</span></div>
              </>
              );
            })
          ) : (
            <div className="flex-col items-center justify-center w-full h-full gap-5 text-center">
              <img style={{ width: '7rem' }} className="block mx-auto mb-5" src={require('../../assets/icons/no_edit.png')} alt="" />
              <h3 className="text-[#707070]">{t("medical.tittle27")}</h3>
            </div>
          )}
        </div>

        <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center mt-5 mb-5"><AiFillFolderAdd /> {t("medical.tittle28")} </div>

        <div className="h-[15rem] w-[98%] overflow-y-auto p-[1rem] border-[#bbbbbb80] border rounded shadow-md gap-9">
          {medicalPrescript.new_prescriptions.length === 1 &&
          medicalPrescript.new_prescriptions[0].hasSelectedYes === false ? (
            <div className="flex-col items-center justify-center w-full h-full gap-5 text-center">
              <img style={{ width: '7rem' }} className="block mx-auto mb-5" src={require('../../assets/icons/no_med.png')} alt="" />
              <h3 className="text-[#707070]">{t("medical.tittle29")}</h3>
            </div>
          ) : (
            medicalPrescript.new_prescriptions.map((m, i) => {
              return (
                <>
                  <div key={i} className="overflow-hidden h-fit w-full rounded-md border border-[#c6c6c6]">
                    <table className="w-full font-normal text-[1rem] h-fit">
                      <tr className="w-full bg-[#D8D7FE] border-b border-[#c6c6c6] h-[2.5rem] flex items-center">
                        <td className="flex flex-row items-center justify-center w-full align-middle h-fit">
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <AiFillMedicineBox />
                            <span>{t("medical.tittle19")} ({i + 1})</span> 
                          </th>
                        </td>
                      </tr>
                      <tr className="border-b border-[#c6c6c6] h-[2.5rem] flex items-center">
                        <td className="flex flex-row items-center justify-center w-full h-full">
                          <p>
                            {m.data.Medicine_Name}
                          </p>
                        </td>
                      </tr>
                      <tr className="w-full bg-[#f7f7f7] shadow-md flex flex-row h-[2.5rem] items-center">
                        <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                          <th></th>
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <MdDescription />
                            <span>{t("medical.tittle20")}</span> 
                          </th>
                        </td>
                        <td className="w-[50%] h-full flex flex-row justify-center items-center">
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <MdIntegrationInstructions />
                            <span>{t("medical.tittle21")}</span> 
                          </th>
                        </td>
                      </tr>
                      <tr className="border-b border-[#c6c6c6] flex flex-row h-[2.5rem] items-center">
                        <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                          <p>
                            {m.data.Description}
                          </p>
                        </td>
                        <td className="w-[50%] h-full flex flex-row justify-center items-center">
                          <p>
                            {m.data.Instructions}
                          </p>
                        </td>
                      </tr>
                      <tr className="w-full bg-[#f7f7f7] shadow-md flex flex-row h-[2.5rem] items-center">
                        <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <FaRulerVertical />
                            <span>{t("medical.tittle23")}</span> 
                          </th>
                        </td>
                        <td className="w-[50%] h-full flex flex-row justify-center items-center">
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <FaUtensilSpoon />
                            <span>{t("medical.tittle24")}</span> 
                          </th>
                        </td>
                      </tr>
                      <tr className="border-b border-[#c6c6c6] flex flex-row h-[2.5rem] items-center">
                        <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                          <p>
                            {m.data.Dose}
                          </p>
                        </td>
                        <td className="w-[50%] h-full flex flex-row justify-center items-center">
                          <p>
                            {m.data.Time_Dose}
                          </p>
                        </td>
                      </tr>
                      <tr className="w-full bg-[#f7f7f7] shadow-md flex flex-row h-[2.5rem] items-center">
                        <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <BsCalendarFill />
                            <span>{t("medical.tittle25")}</span> 
                          </th>
                        </td>
                        <td className="w-[50%] h-full flex flex-row justify-center items-center">
                          <th className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                            <BsCalendar2EventFill />
                            <span>{t("medical.tittle26")}</span> 
                          </th>
                        </td>
                      </tr>
                      <tr className="flex flex-row h-[2.5rem] items-center">
                        <td className="w-[50%] h-full flex flex-row justify-center items-center border-r border-[#c6c6c6]">
                          <p>
                            {format(new Date(m.data.Starting_Dose_Date), 'dd/MM/yyyy')}
                          </p>
                        </td>
                        <td className="w-[50%] h-full flex flex-row justify-center items-center">
                          <p>
                            {format(new Date(m.data.Finishing_Dose_Date), 'dd/MM/yyyy')}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="h-[2.5rem] w-full"><span className="text-white">...</span></div>
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const MedicalAppointmentConfirmation = ({ scheAppoint, patient }) => {
  const { t } = useTranslation();
  const schDate = new Date(scheAppoint.Date);
  return (
    <div className="h-[20rem] overflow-y-auto">
      <h2 className="text-[#707070] mt-[1rem] mb-[1rem]">{t("medical.tittle30")}</h2>
      {scheAppoint.hasSelectedYes === true ? (
        <ul>
            <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
              <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><FaChild /> {t("medical.tittle31")} </div>
              <span>{`${patient.First_Names} ${patient.Last_Names}`}</span>
            </li>
            <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
              <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><BsCalendar2EventFill /> {t("medical.tittle32")} </div>
              <span>
                {`${schDate.getDate()}/${
                  schDate.getMonth() + 1
                }/${schDate.getFullYear()} (${new Date(
                  `2023-10-23T${scheAppoint.Hour}`
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })})`}
              </span>
            </li>
            <li className="ml-2 text-[#707070] text-[1.2rem] list-none gap-3 flex flex-row items-center mb-[1rem]">
              <div className="text-[#A375FF] font-semibold flex flex-row gap-2 items-center"><MdDescription /> {t("medical.tittle33")} </div>
            </li>
            <div className="ml-7 w-[80%] h-fit p-2 overflow-y-auto border border-[#bbbbbb] bg-[#f7f7f7] mb-3 text-[#707070] rounded-md shadow-md">
              <p>
                {scheAppoint.Description}
              </p>
            </div>
        </ul>
      ) : (
        <div style={{marginTop: '3rem'}}className="w-[100%] h-[90%] flex-col justify-center items-center gap-5 text-center">
          <img style={{ width: '7rem' }} className="block mx-auto mb-5" src={require('../../assets/icons/no_programed.png')} alt="" />
          <h3 className="text-[#707070]">{t("medical.tittle34")}</h3>
        </div>
      )}
    </div>
  );
};
