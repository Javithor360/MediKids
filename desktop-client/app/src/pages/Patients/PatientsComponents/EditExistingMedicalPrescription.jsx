import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDash } from "../../../context/DoctorContext";

export const EditExistingMedicalPrescription = ({ setMedicalPrescript }) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalPrescriptions, medicalPrescriptions } = useDash();

  const [editPrescription, setEditPrescription] = useState(false);

  useEffect(() => {
    PatientMedicalPrescriptions(patient.id);
  }, []);

  const handleChange = async () => {
    setEditPrescription(!editPrescription);
  };

  return (
    <div className="bg-white">
      <div className="inline-flex items-center gap-2">
        <p className="mt-1 ml-7 font-semibold text-[#707070] text-[1.2rem]">¿Editar medicamentos de la receta actual?</p>
        <form>
          <label className="ml-5 mr-5 text-[#707070] text-[1.2rem] " for="yes2">
            Sí
            <input
            className="ml-2 mt-2.5"
              type="radio"
              id="yes2"
              name="selection"
              value="yes2"
              checked={editPrescription === true}
              onChange={handleChange}
            />
          </label>
          <label className=" mr-5 text-[#707070] text-[1.2rem]" for="no2">
            No
            <input
            className="ml-2"
              type="radio"
              id="no2"
              name="selection"
              value="no2"
              checked={editPrescription === false}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
      <div>
      <div  class="overflow-x-auto w-[80%] rounded-[1rem] border border-[#BBBBBB] ml-7" >
        <form
          action=""
          className={`${editPrescription === false ? `bg-gray-50   ` : ``} `}
        >
        
          <table class="table w-[100%]">
            <thead >
             <tr className="text-center">
                <th className=" border-r border-b border-[#BBBBBB]">Código</th>
                <th className="border-r border-b border-[#BBBBBB]">Nombre</th>
                <th className="border-r border-b border-[#BBBBBB]">Intrucciones</th>
                <th className="border-r border-b border-[#BBBBBB]">Descripción</th>
                <th className="border-r border-b border-[#BBBBBB]">Dosis</th>
                <th className="border-r border-b border-[#BBBBBB]">Cantidad por día</th>
                <th className="border-r border-b border-[#BBBBBB]">Fecha de inicio</th>
                <th className="border-b border-[#BBBBBB] " >Fecha de finalización</th>
              </tr>
            </thead>
            <tbody>
              {medicalPrescriptions.map((m) => {
                return (
                  <tr key={m.id} class="text-center">
                    <td class="border-r border-[#BBBBBB]">{m.Medical_Prescription_Code}</td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_medicine_name"
                        id="edit_medicine_name"
                        defaultValue={m.Medicine_Name}
                        required
                        
                        
                
                      />
                    </td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_instructions"
                        id="edit_instructions"
                        defaultValue={m.Instructions}
                        required
                      />
                    </td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_description"
                        id="edit_description"
                        defaultValue={m.Description}
                        required
                      />
                    </td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_dose"
                        id="edit_dose"
                        defaultValue={m.Dose}
                        required
                      />
                    </td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_time_dose"
                        id="edit_time_dose"
                        defaultValue={m.Time_Dose}
                        required
                      />
                    </td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                      
                        disabled={!editPrescription}
                        type="date"
                        name="edit_starting_dose_date"
                        id=""
                        defaultValue={new Date(m.Starting_Dose_Date).toISOString().substring(0,10)}
                        required
                      />
                    </td>
                    <td class="border-r border-[#BBBBBB]">
                      <input
                        disabled={!editPrescription}
                        type="date"
                        name="edit_finishing_dose_date"
                        id="edit_finishing_dose_date"
                        defaultValue={new Date(m.Finishing_Dose_Date).toISOString().substring(0,10)}
                        required
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         
        </form>
        </div>
      </div>
    </div>
  );
};
