import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDash } from "../../../context/DoctorContext";
import { BsPrescription2 } from "react-icons/bs"

export const ViewMedicalPrescriptions = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalPrescriptions, medicalPrescriptions } = useDash();

  useEffect(() => {
    PatientMedicalPrescriptions(patient.id);
  }, []);
  return (
    <div>
      <div className="flex gap-2 items-center">
        <BsPrescription2 className="text-[#A375FF]"/>
        <p className="text-[1.4rem] text-[#707070]">Recetas médicas de</p>
      </div>
      <span className="text-[1.4rem] text-[#707070] font-bold">{`${patient.First_Names} ${patient.Last_Names}`}</span>
      <div className="w-[100%] h-[1px] bg-[#c6c6c6] my-[.5rem]"></div>
      <div className="rounded-md border-[#bbbbbb] border   border-t my-12">
        <table className="rounded-md shadow-md">
          <thead className="bg-[#D8D7FE] text-[#707070]">
            <tr>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb] rounded-tl-md">Código</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Nombre de la medicina</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Instrucciones de uso</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Descripción</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Dosis</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Cantidad de dosis por día</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Dosis empezada el</th>
              <th className="px-6 py-2 border-r border-r-[#bbbbbb]">Dosis finalizada el</th>
              <th className="px-6 py-2 rounded-tr-md">Dosis asignada el</th>
            </tr>
          </thead>
          <tbody>
            {medicalPrescriptions.map((m) => {
              const sdd = new Date(m.Starting_Dose_Date);
              const fdd = new Date(m.Finishing_Dose_Date);
              const cd = new Date(m.Created_Date);
              return (
                <tr key={m.id} className="text-center">
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb] text-[#A375FF] font-bold">{m.Medical_Prescription_Code}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{m.Medicine_Name}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{m.Instructions}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{m.Description}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{m.Dose}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{m.Time_Dose}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{`${sdd.getDate()}/${sdd.getMonth() + 1}/${sdd.getFullYear()}`}</td>
                  <td className="px-6 py-2 border-r border-r-[#bbbbbb]  border-t border-t-[#bbbbbb]">{`${fdd.getDate()}/${fdd.getMonth() + 1}/${fdd.getFullYear()}`}</td>
                  <td className="px-6 py-2 border-t border-t-[#bbbbbb]">{`${cd.getDate()}/${cd.getMonth() + 1}/${cd.getFullYear()}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
