import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDash } from "../../../context/DoctorContext";

export const EditExistingMedicalPrescription = ({
  setEditMedicalPrescription,
}) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalPrescriptions, medicalPrescriptions } = useDash();

  const [data, setData] = useState(medicalPrescriptions);
  const [editedData, setEditedData] = useState([]);
  const [editPrescription, setEditPrescription] = useState(false);

  useEffect(() => {
    PatientMedicalPrescriptions(patient.id);
  }, []);

  useEffect(() => {
    setEditMedicalPrescription(data);
  }, [data]);

  const handleChange = async () => {
    setEditPrescription(!editPrescription);
  };

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;

    const updatedItem = { ...data[index], [field]: value };
    console.log(`big lol: ${JSON.stringify(updatedItem)}`);

    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedItem;
      return newData;
    });
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
              {medicalPrescriptions.map((m, index) => (
                <tr key={m.id}>
                  <td>{m.Medical_Prescription_Code}</td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="text"
                      name="Medicine_Name"
                      defaultValue={m.Medicine_Name}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="text"
                      name="Instructions"
                      defaultValue={m.Instructions}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="text"
                      name="Description"
                      defaultValue={m.Description}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="text"
                      name="Dose"
                      defaultValue={m.Dose}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="text"
                      name="Time_Dose"
                      defaultValue={m.Time_Dose}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="date"
                      name="Starting_Dose_Date"
                      defaultValue={new Date(m.Starting_Dose_Date)
                        .toISOString()
                        .substring(0, 10)}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      disabled={!editPrescription}
                      type="date"
                      name="Finishing_Dose_Date"
                      defaultValue={new Date(m.Finishing_Dose_Date)
                        .toISOString()
                        .substring(0, 10)}
                      onBlur={(e) => handleInputChange(e, index, e.target.name)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};
