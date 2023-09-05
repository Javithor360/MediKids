import React, { useEffect, useState } from "react";
import { BsPrescription2 } from 'react-icons/bs'
import { GiBodyHeight } from "react-icons/gi";
import { EditExistingMedicalPrescription } from "./EditExistingMedicalPrescription";
import { AddMedicalPrescription } from "./AddMedicalPrescription";
import { useLocation } from "react-router-dom";
import { useDash } from "../../../context/DoctorContext";

export const EditMedicalPrescription = ({
  setMedicalPrescript
}) => {
  const location = useLocation();
  const { patient } = location.state || {};

  /* 
    MEDICAL PRESCRIPTION STRUCTURE
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
      edited_prescriptions: editMedicalPrescription,
      new_prescriptions: newMedicalPrescriptionEntry,
    });
  }, [newMedicalPrescriptionEntry, editMedicalPrescription]);

  return (
    <>
      <div className="flex gap-2 items-center ml-7 mt-8 text-[1.4rem] border-b-[2px] border-b-[#A375FF] w-fit mb-7">
        <BsPrescription2 className="text-[#A375FF]"/>
        <p className="text-[1.4rem] text-[#A375FF] font-semibold">Receta médica del paciente</p>
      </div>
      <EditExistingMedicalPrescription
        setEditMedicalPrescription={setEditMedicalPrescription}
      />
      <AddMedicalPrescription
        setNewMedicalPrescriptionEntry={setNewMedicalPrescriptionEntry}
      />
    </>
  );
};
