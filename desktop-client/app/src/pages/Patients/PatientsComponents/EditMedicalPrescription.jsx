import React, { useState } from "react";

import { GiBodyHeight } from "react-icons/gi";
import { EditExistingMedicalPrescription } from "./EditExistingMedicalPrescription";
import { AddMedicalPrescription } from "./AddMedicalPrescription";

export const EditMedicalPrescription = ({ setMedicalPrescript }) => {

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
        {
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
  const [newMedicalPrescriptionEntry, setNewMedicalPrescriptionEntry] = useState({});
  const [editMedicalPrescription, setEditMedicalPrescription] = useState({});
  return (
    <>
      <p className="mt-7 ml-7">RECETA MÉDICA DEL PACIENTE</p>
      <EditExistingMedicalPrescription setMedicalPrescript={setMedicalPrescript} />
      <AddMedicalPrescription newMedicalPrescriptionEntry={setNewMedicalPrescriptionEntry} />
    </>
  );
};
