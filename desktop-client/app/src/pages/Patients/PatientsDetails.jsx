import { useEffect, useState } from "react";
import {
  MdNotifications,
  MdPendingActions,
  MdOutlineReceiptLong,
  MdOutlineMedicalInformation,
  MdOutlineMedication,
} from "react-icons/md";
import medicalHistory from "../../assets/icons/overview_FILL0_wght400_GRAD0_opsz48.svg";
import profileAvatar from "../../assets/template/walt_jr.png";
import Modal from "../../components/Modal";
import { AiOutlineWarning } from "react-icons/ai"
import { ViewMedicalRecords } from "./PatientsComponents/index.jsx";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useDash } from "../../context/DoctorContext";
import { ViewMedicalPrescriptions } from "./PatientsComponents/ViewMedicalPrescriptions";
import { ViewAppointments } from "./PatientsComponents/ViewAppointments";
import { getPatientAge } from "../../utils/Functions";
import { differenceInDays, differenceInMinutes } from "date-fns";

export const PatientsDetails = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { patient } = location.state || {};

  const {
    PatientAppointmentWithDoctor,
    nextAppointment,
    ResponsibleInformation,
    responsibleInfo,
  } = useDash();

  useEffect(() => {
    PatientAppointmentWithDoctor(
      patient.id,
      JSON.parse(localStorage.getItem("userSession")).id
    );
    ResponsibleInformation(patient.Responsible_id);
  }, []);

  useEffect(() => {
    if (nextAppointment.Hour) {
      const timeDate = nextAppointment.Hour.split(":");
      let newTimeDate = new Date(
        appDate.getFullYear(),
        appDate.getMonth(),
        appDate.getDate(),
        parseInt(timeDate[0]),
        parseInt(timeDate[1]),
        parseInt(timeDate[2])
      );
      setCanAttendConsult(
        differenceInMinutes(new Date(), newTimeDate) <= 180 && differenceInDays(new Date(), newTimeDate) === 0
      );
    }
  }, [nextAppointment.Hour]);

  const [active, setActive] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const [canAttendConsult, setCanAttendConsult] = useState(false);
  const isModal = true;

  const toggle = () => {
    setActive(!active);
  };
  const toggleError = () => {
    if (canAttendConsult === false || nextAppointment.State !== 3) {
      setActiveError(!activeError);
    }
  };
  const [numbercomp, setNumbercomp] = useState(0);

  const appDate = new Date(nextAppointment.Date);

  const modalContent = () => {
    switch (numbercomp) {
      case 1:
        return (
          <div isModal={isModal} className="m-10">
            <ViewMedicalRecords responsibleInfo={responsibleInfo} />
          </div>
        );
      case 2:
        return (
          <div isModal={isModal} className="m-10">
            <ViewMedicalPrescriptions />
          </div>
        );
      case 3:
        return (
          <div isModal={isModal} className="m-10">
            <ViewAppointments />
          </div>
        );
      default:
        return <p>A</p>;
    }
  };

  return (
    <>
      <p className="text-[1.8rem] text-center text-[#707070]">
        <span className="font-semibold">{t("details.tittle")}</span>{" "}
        {`${patient.First_Names} ${patient.Last_Names}`}
      </p>
      <div className="mt-[6rem] mx-auto w-[95%] h-[40rem] rounded-3xl relative border border-[#707070] shadow-md">
        {/* HeaderSection */}
        <section className="relative h-[8.3rem] w-full">
          <div className="bg-slate-400 block absolute left-0 right-0 -top-14 mx-auto rounded-full h-[10rem] w-[10rem] overflow-hidden avatar">
            <img
              src={patient.Profile_Photo_Url}
              alt=""
              className="object-cover object-center"
            />
          </div>
          <div className="absolute right-4 top-3 ">
            <p className="flex items-center justify-center gap-3 font-semibold">
              <MdNotifications className="text-[#a375ff] text-[1.8rem]" />
              Proxima cita el:{" "}
              {`${appDate.getDate()}/${
                appDate.getMonth() + 1
              }/${appDate.getFullYear()} (${new Date(
                `1970-01-01T${nextAppointment.Hour}`
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })})`}
            </p>
          </div>
        </section>
        <section className="mt-[]">
          <div className="overflow-x-auto w-[80%] rounded-[1rem] border border-[#BBBBBB] mx-auto">
            <table className="table w-[100%]">
              {/* head */}
              <div className="bg-[#d8d7fe] flex flex-row w-[100%] h-[2.4rem] items-center">
                <div className="flex border-b border-r border-[#BBBBBB] w-[33.33%] h-full justify-center items-center text-center">
                  <span className="h-fit font-semibold text-[1rem] ">
                    {t("details.tittle2")}
                  </span>
                </div>
                <div className="flex border-b border-r border-[#BBBBBB] w-[33.33%] h-full justify-center items-center text-center">
                  <span className="font-semibold text-[1rem]">
                    {t("details.tittle3")}
                  </span>
                </div>
                <div className="flex border-b border-r border-[#BBBBBB] w-[33.33%] h-full justify-center items-center text-center">
                  <span className="font-semibold text-[1rem]">
                    {t("details.tittle9")}
                  </span>
                </div>
                <div className="flex border-b border-[#BBBBBB] w-[33.33%] h-full justify-center items-center text-center">
                  <span className="font-semibold text-[1rem]">
                    {t("details.tittle4")}
                  </span>
                </div>
              </div>
              <div className="h-[3rem] flex-row flex">
                {/* row 1 */}
                <div className="flex w-[33.33%] h-full justify-center items-center text-center border-r border-[#BBBBBB]">
                  {getPatientAge(patient.Age, patient.Birthdate)}
                </div>
                <div className="flex w-[33.33%] h-full justify-center items-center text-center border-r border-[#BBBBBB]">
                  {patient.Blood_Type}
                </div>
                <div className="flex w-[33.33%] h-full justify-center items-center text-center border-r border-[#BBBBBB]">
                  {patient.Weight} lb
                </div>
                <div className="flex w-[33.33%] h-full justify-center items-center text-center">
                  {patient.Height} m
                </div>
              </div>
            </table>
          </div>
        </section>
        <section className="mt-[2rem] mx-auto grid grid-cols-3 md:grid-cols-3 gap-2 w-[80%] md:h-[15rem] 2xl:grid-cols-5 2xl:h-[9rem]">
          <Link
            className="rounded-2xl border border-[#BBBBBB] flex flex-col justify-center items-center gap-3 hover:bg-[#d8d7fec0] hover:text-[#707070] ease-out transition-all"
            onClick={() => {
              toggle();
              setNumbercomp(1);
            }}
            state={location.state}
          >
            <MdOutlineReceiptLong className="text-[2.8rem] text-[#A375FF]" />
            <p className="font-semibold text-[#707070]">
              {t("details.tittle5")}
            </p>
          </Link>
          <Link
            className="rounded-2xl border border-[#BBBBBB] flex flex-col justify-center items-center gap-3 hover:bg-[#d8d7fec0] hover:text-[#707070] ease-out transition-all"
            onClick={() => {
              toggle();
              setNumbercomp(2);
            }}
            state={location.state}
          >
            <MdOutlineMedication className="text-[2.8rem] text-[#A375FF]" />
            <p className="font-semibold text-[#707070]">
              {t("details.tittle6")}
            </p>
          </Link>
          {/* <Link
            className="rounded-2xl border border-[#BBBBBB] flex flex-col justify-center items-center gap-3 hover:bg-[#d8d7fec0] hover:text-[#707070] ease-out transition-all"
            onClick={() => {
              toggle();
              setNumbercomp(3);
            }}
            state={location.state}
          >
            <MdPendingActions className="text-[2.8rem] text-[#A375FF]" />
            <p className="font-semibold text-[#707070]">
              Ver Historial clínico
            </p>
          </Link> */}
          <Link
            className="text-center rounded-2xl border border-[#BBBBBB] flex flex-col justify-center items-center gap-3 hover:bg-[#d8d7fec0] hover:text-[#707070] ease-out transition-all"
            onClick={() => {
              toggle();
              setNumbercomp(3);
            }}
            state={location.state}
          >
            <img
              src={medicalHistory}
              alt=""
              className="text-[2.8rem] text-[#A375FF]"
            />
            <p className="font-semibold text-[#707070]">
              {t("details.tittle7")}
            </p>
          </Link>
          <Link
            className={`${
              canAttendConsult && nextAppointment.State === 3
                ? "hover:bg-[#d8d7fec0] hover:text-[#707070]"
                : "bg-gray-200 cursor-default"
            } rounded-2xl text-center border border-[#BBBBBB] flex flex-col justify-center items-center gap-3  ease-out transition-all`}
            to={
              canAttendConsult && nextAppointment.State === 3
                ? "/patients/active/details/appoinment"
                : null
            }
            onClick={toggleError}
            state={{ patient }}
          >
            <MdOutlineMedicalInformation className="text-[2.8rem] text-[#A375FF]" />
            <p className="font-semibold text-[#707070]">
              {t("details.tittle8")}
            </p>
          </Link>
        </section>
      </div>
      {toggle && (
        <Modal
          active={active}
          toggle={toggle}
          onRequestClose={toggle}
          state={patient}
        >
          {modalContent()}
        </Modal>
      )}
      {toggleError && (
        <Modal
          active={activeError}
          toggle={toggleError}
          onRequestClose={toggleError}
          state={patient}
        >
          <div className="h-[100%] w-[38rem] p-[3rem]">
            <div className="border-b border-b-[#c6c6c6] mb-[1rem]">
              <p className="text-[1.6rem] text-red-400 font-semibold flex flex-row gap-2 items-center">
                <AiOutlineWarning className='text-red-400' /> Advertencia
              </p>
            </div>
            <div className="w-[100%] h-[100%] mx-auto rounded-sm flex bg-[#ffe9d9]">
              <div className="w-[2%] bg-red-400"> </div>
              <div className="w-[98%] h-full p-[1rem]">
                <p className="text-[#707070]">
                  Parece que no puedes atender esta consulta aún, por favor espera la fecha y hora indicada.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
