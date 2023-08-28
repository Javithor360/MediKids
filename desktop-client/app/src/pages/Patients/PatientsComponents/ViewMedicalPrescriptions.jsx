import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDash } from "../../../context/DoctorContext";

export const ViewMedicalPrescriptions = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalPrescriptions, medicalPrescriptions } = useDash();

  useEffect(() => {
    PatientMedicalPrescriptions(patient.id);
  }, []);
  return (
    <div>
      <h1>
        RECETAS MÉDICA DE{" "}
        {`${patient.First_Names.toUpperCase()} ${patient.Last_Names.toUpperCase()}`}
      </h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre de la medicina</th>
            <th>Instrucciones de uso</th>
            <th>Descripción</th>
            <th>Dosis</th>
            <th>Cantidad de dosis por día</th>
            <th>Dosis empezada el</th>
            <th>Dosis finalizada el</th>
            <th>Dosis asignada el</th>
          </tr>
        </thead>
        <tbody>
          {medicalPrescriptions.map((m) => {
            const sdd = new Date(m.Starting_Dose_Date);
            const fdd = new Date(m.Finishing_Dose_Date);
            const cd = new Date(m.Created_Date);
            return (
              <tr key={m.id}>
                <td>{m.Medical_Prescription_Code}</td>
                <td>{m.Medicine_Name}</td>
                <td>{m.Instructions}</td>
                <td>{m.Description}</td>
                <td>{m.Dose}</td>
                <td>{m.Time_Dose}</td>
                <td>{`${sdd.getDate()}/${sdd.getMonth() + 1}/${sdd.getFullYear()}`}</td>
                <td>{`${fdd.getDate()}/${fdd.getMonth() + 1}/${fdd.getFullYear()}`}</td>
                <td>{`${cd.getDate()}/${cd.getMonth() + 1}/${cd.getFullYear()}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
