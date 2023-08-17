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
    <div className="bg-yellow-100">
      <div className="inline-flex items-center gap-2">
        <p>¿Editar medicamentos de la receta actual?</p>
        <form>
          <label for="yes2">
            Sí
            <input
              type="radio"
              id="yes2"
              name="selection"
              value="yes2"
              checked={editPrescription === true}
              onChange={handleChange}
            />
          </label>
          <label for="no2">
            No
            <input
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
        <form
          action=""
          className={`${editPrescription === false ? `bg-gray-200` : ``} mt-2`}
        >
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Intrucciones</th>
                <th>Descripción</th>
                <th>Dosis</th>
                <th>Cantidad por día</th>
                <th>Fecha de inicio</th>
                <th>Fecha de finalización</th>
              </tr>
            </thead>
            <tbody>
              {medicalPrescriptions.map((m) => {
                return (
                  <tr key={m.id}>
                    <td>{m.Medical_Prescription_Code}</td>
                    <td>
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_medicine_name"
                        id="edit_medicine_name"
                        defaultValue={m.Medicine_Name}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_instructions"
                        id="edit_instructions"
                        defaultValue={m.Instructions}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_description"
                        id="edit_description"
                        defaultValue={m.Description}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_dose"
                        id="edit_dose"
                        defaultValue={m.Dose}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled={!editPrescription}
                        type="text"
                        name="edit_time_dose"
                        id="edit_time_dose"
                        defaultValue={m.Time_Dose}
                        required
                      />
                    </td>
                    <td>
                      <input
                        disabled={!editPrescription}
                        type="date"
                        name="edit_starting_dose_date"
                        id=""
                        defaultValue={new Date(m.Starting_Dose_Date).toISOString().substring(0,10)}
                        required
                      />
                    </td>
                    <td>
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
  );
};
