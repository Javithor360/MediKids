import React, { useEffect, useState } from "react";
import { useDash } from "../../../context/DoctorContext";
import { useLocation } from "react-router-dom";
import { MdOutlineWorkHistory } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";

export const ViewAppointments = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { AppointmentsHistory, AllDoctors, appointmentHistory, doctors } = useDash();

  useEffect(() => {
    AppointmentsHistory(patient.id);
    AllDoctors();
  }, []);

  useEffect(() => {
    console.log(appointmentHistory);
  }, [appointmentHistory]);

  const [loadingScreen, setLoadingScreen] = useState(true);
  setTimeout(() => {
    setLoadingScreen(false);
  }, 3000);

  return (
    <>
    <div className="w-full h-full">
        <div className="flex items-center gap-2">
          <MdOutlineWorkHistory className="text-[#A375FF] text-[1.6rem]"/>
          <p className="text-[1.4rem] text-[#707070]">Historial de consultas médicas de{" "}</p>
        </div>
        <div className="text-[1.4rem] text-[#707070] font-bold flex flex-row items-center gap-3">{`${patient.First_Names} ${patient.Last_Names}`}</div>
        <div className="w-[100%] h-[1px] bg-[#c6c6c6] my-[.5rem]"></div>
      {
        loadingScreen === true ?
        <div style={{width: '57rem'}} className="flex items-center justify-center h-[20rem]">
          <PulseLoader
            color="#a375ff"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        :
        <>
        {appointmentHistory.length !== 0 ? (
          <div>
            <div className="rounded-md border-[#bbbbbb] border border-t my-12 ease-in duration-900">
              <table className="rounded-md shadow-md w-[60rem]">
                <thead className="bg-[#D8D7FE] text-[#707070]">
                  <tr>
                    <th className="px-6 py-2 border-r border-r-[#bbbbbb] rounded-tl-md">Fecha</th>
                    <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Doctor encargado</th>
                    <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Motivo</th>
                    <th className="px-6 py-2 ">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentHistory.map((app) => {
                    const doctor = doctors.find(i => i.id === app.Doctor_id);
                    return (
                      <tr key={app.id} className="text-center">
                        <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb] text-[#A375FF] font-bold">
                          {new Date(app.Date).toLocaleDateString()} ({app.Hour})
                        </td>
                        <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{doctor.First_Names} {doctor.Last_Names} ({doctor.Speciality_id === 1 ? 'Otorrinolaringología' : doctor.Speciality_id === 2 ? 'Neumología' : 'Gastroenterología'})</td>
                        <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]" >{app.Description}</td>
                        <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{app.State === 4 ? 'Finalizada' : app.State === 2 ? 'Confirmada' : 'Programada'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{height: '25rem', width: '57rem'}} className="justify-center items-center flex flex-col gap-5">
            <img style={{width: '12rem'}} src={require('../../../assets/icons/no_appmt2.png')} alt="" />
            <h2 className="text-[#707070]">Este paciente no tiene consultas previas</h2>
          </div>
        )}
        </>
      }
    </div>
  </>
  );
};
