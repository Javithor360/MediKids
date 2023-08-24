import React, { useEffect, useState } from "react";

import { GiBodyHeight } from "react-icons/gi";
import { EditExistingMedicalPrescription } from "./EditExistingMedicalPrescription";
import { AddMedicalPrescription } from "./AddMedicalPrescription";
import { useLocation } from "react-router-dom";

export const EditMedicalPrescription = ({ setMedicalPrescript }) => {
  const location = useLocation();
  const { patient } = location.state || {};
  /* 
    NEW MEDICAL PRESCRIPTION STRUCTURE
    {
      edited_prescriptions: [
        {
          Medical_Prescription_Code,
          Medicine_Name,
          Instructions,
          Description,
          Starting_Dose_Date,
          Finishing_Dose_Date,
          Dose,
          Time_Dose
        }
        {...}
      ],
      new_prescriptions: [
        hasSelectedYes
        data: {
          Medicine_Name,
          Instructions,
          Description,
          Starting_Dose_Date,
          Finishing_Dose_Date,
          Dose,
          Patient_id
          Time_Dose,
        }
      ]
    }
  */
  const [newMedicalPrescriptionEntry, setNewMedicalPrescriptionEntry] =
    useState([]);
  const [editMedicalPrescription, setEditMedicalPrescription] = useState([]);

  useEffect(() => {
    setMedicalPrescript({
      Patient_id: patient.id,
      Doctor_id: JSON.parse(localStorage.getItem('userSession')).id,
      edited_prescriptions: editMedicalPrescription,
      new_prescriptions: newMedicalPrescriptionEntry,
    })
  }, [newMedicalPrescriptionEntry]);
  
  return (
    <>
      <p className="mt-7 ml-7">RECETA MÉDICA DEL PACIENTE</p>
      <EditExistingMedicalPrescription
        setMedicalPrescript={setEditMedicalPrescription}
        editMedicalPrescription={editMedicalPrescription}
      />
      <AddMedicalPrescription
        setNewMedicalPrescriptionEntry={setNewMedicalPrescriptionEntry} newMedicalPrescriptionEntry={newMedicalPrescriptionEntry}
      />
    </>
  );
};
