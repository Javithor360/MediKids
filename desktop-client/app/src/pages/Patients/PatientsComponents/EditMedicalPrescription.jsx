import React from "react";

import { GiBodyHeight } from "react-icons/gi";
import { EditExistingMedicalPrescription } from "./EditExistingMedicalPrescription";
import { AddMedicalPrescription } from "./AddMedicalPrescription";

export const EditMedicalPrescription = ({ setMedicalPrescript }) => {
  return (
    <>
      <p className="mt-7 ml-7">RECETA MÉDICA DEL PACIENTE</p>
      <EditExistingMedicalPrescription setMedicalPrescript={setMedicalPrescript} />
      <AddMedicalPrescription setMedicalPrescript={setMedicalPrescript} />
    </>
  );
};
