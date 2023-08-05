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

import { Link, useLocation } from "react-router-dom";
import { useDash } from "../../context/DoctorContext";

export const PatientsDetails = () => {
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

  const [active, setActive] = useState(false);
  const isModal = true;
  const toggle = () => {
    setActive(!active);
  };
  const [numbercomp, setNumbercomp] = useState(0);

  const appDate = new Date(nextAppointment.Date);

  console.log(responsibleInfo)

  const modalContent = () => {
    switch (numbercomp) {
      case 1:
        return (
          <div isModal={isModal} className="m-10">
            <h1>
              EXPEDIENTE DE {patient.First_Names.toUpperCase()}{" "}
              {patient.Last_Names.toUpperCase()}
            </h1>
            <div className="data">
              <div className="main-info">
                <h3>Información personal</h3>
                <p>
                  Edad: {patient.Age} {patient.Age === 1 ? "año" : "años"}
                </p>
                <p>Tipo de sangre: {patient.Blood_Type}</p>
                <p>Peso: {patient.Weight}</p>
                <p>Altura: {patient.Height}</p>
              </div>
              <div className="resp-info">
                <h3>Informaciòn del responsable</h3>
                <p>Nombre: {responsibleInfo.First_Names} {responsibleInfo.Last_Names}</p>
                <p>Número de contacto: {responsibleInfo.Phone}</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <p isModal={isModal}>
            Contenido 2 del modal (Crear un componente individual para desplegar
            mejor la informacion y luego retornarlo aquí)
          </p>
        );
      case 3:
        return (
          <p isModal={isModal}>
            Contenido 3 del modal (Crear un componente individual para desplegar
            mejor la informacion y luego retornarlo aquí)
          </p>
        );
      case 4:
        return (
          <p isModal={isModal}>
            Contenido 4 del modal (Crear un componente individual para desplegar
            mejor la informacion y luego retornarlo aquí)
          </p>
        );
      default:
        return <p>A</p>;
    }
  };

  return (
    <>
      <p className="text-[1.8rem] text-center text-[#707070]">
        <span className="font-semibold">Paciente:</span>{" "}
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
              {`${appDate.getDate()}/${appDate.getMonth()}/${appDate.getFullYear()} (${appDate.toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )})`}
            </p>
          </div>
        </section>
        <section className="mt-[]">
          <div className="overflow-x-auto w-[80%] rounded-[2rem] border border-[#BBBBBB] mx-auto">
            <table className="table w-[100%]">
              {/* head */}
              <thead className="bg-[#d8d7fe]">
                <tr className="text-center">
                  <th className="border-b border-r border-[#BBBBBB]">Edad</th>
                  <th className="border-b border-r border-[#BBBBBB]">
                    Tipo Sanguíneo
                  </th>
                  <th className="border-b border-r border-[#BBBBBB]">Peso</th>
                  <th className="border-b border-[#BBBBBB]">Altura</th>
                </tr>
              </thead>
              <tbody className="">
                {/* row 1 */}
                <tr className="text-center">
                  <td className="border-r border-[#BBBBBB]">
                    {patient.Age} años
                  </td>
                  <td className="border-r border-[#BBBBBB]">
                    {patient.Blood_Type}
                  </td>
                  <td className="border-r border-[#BBBBBB]">
                    {patient.Weight} lb
                  </td>
                  <td className="">{patient.Height} m</td>
                </tr>
              </tbody>
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
            <p className="font-semibold text-[#707070]">Ver expendiente</p>
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
            <p className="font-semibold text-[#707070]">Ver recetas</p>
          </Link>
          <Link
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
          </Link>
          <Link
            className="rounded-2xl border border-[#BBBBBB] flex flex-col justify-center items-center gap-3 hover:bg-[#d8d7fec0] hover:text-[#707070] ease-out transition-all"
            onClick={() => {
              toggle();
              setNumbercomp(4);
            }}
            state={location.state}
          >
            <img
              src={medicalHistory}
              alt=""
              className="text-[2.8rem] text-[#A375FF]"
            />
            <p className="font-semibold text-[#707070]">
              Ver historial de citas
            </p>
          </Link>
          <Link
            className="rounded-2xl border border-[#BBBBBB] flex flex-col justify-center items-center gap-3 hover:bg-[#d8d7fec0] hover:text-[#707070] ease-out transition-all"
            to={"/patients/active/details/appoinment"}
            state={{ patient }}
          >
            <MdOutlineMedicalInformation className="text-[2.8rem] text-[#A375FF]" />
            <p className="font-semibold text-[#707070]">Atender consulta</p>
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
    </>
  );
};
