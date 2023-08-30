import React, { useEffect } from "react";

import { useDash } from "../../../context/DoctorContext";
import { useLocation } from "react-router-dom";

import { BiHistory } from "react-icons/bi";

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

  return (
    <div className="w-full h-full">
      {appointmentHistory.length > 0 ? (
        <div>
          <h1>
            Historial de consultas médicas de{" "}
            {`${patient.First_Names} ${patient.Last_Names}`}
          </h1>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Doctor encargado</th>
                <th>Motivo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {appointmentHistory.map((app) => {
                const doctor = doctors.find(i => i.id === app.Doctor_id);
                return (
                  <tr key={app.id}>
                    <td>
                      {new Date(app.Date).toLocaleDateString()} ({app.Hour})
                    </td>
                    <td>{doctor.First_Names} {doctor.Last_Names} ({doctor.Speciality_id === 1 ? 'Otorrinolaringología' : doctor.Speciality_id === 2 ? 'Neumología' : 'Gastroenterología'})</td>
                    <td>{app.Description}</td>
                    <td>{app.State === 4 ? 'Finalizada' : app.State === 2 ? 'Confirmada' : 'Programada'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Este paciente no dispone de citas previas</div>
      )}
    </div>
  );
};
