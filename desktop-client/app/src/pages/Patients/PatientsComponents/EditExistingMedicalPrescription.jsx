import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDash } from "../../../context/DoctorContext";
import Modal from "../../../components/Modal.jsx";

export const EditExistingMedicalPrescription = ({
  setEditMedicalPrescription
}) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalPrescriptions, setMedicalPrescriptions, medicalPrescriptions } = useDash();

  useEffect(() => {
    PatientMedicalPrescriptions(patient.id);
  }, []);

  const [active, setActive] = useState(false);
  const [save, setSave] = useState(false);
  const [modified, setModified] = useState();
  const [editPrescription, setEditPrescription] = useState(false);

  const [modifiedData, setModifiedData] = useState([]);

  const [medicine_Name, setMedicine_Name] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [dosis, setDosis] = useState("");
  const [dosisTime, setDosisTime] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setEditMedicalPrescription(modifiedData);
  }, [medicalPrescriptions]);

  const handleChange = async () => {
    setEditPrescription(!editPrescription);
  };

  const toggle = () => {
    setActive(!active);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      // Obteniendo los datos del formulario para construir el objeto de datos modificados, en caso de que no se haya modificado un campo, su valor será el que estaba por defecto
      const editedElement = {
        Medical_Prescription_Code: modified.Medical_Prescription_Code,
        Medicine_Name: !medicine_Name ? modified.Medicine_Name : medicine_Name,
        Instructions: !instructions ? modified.Instructions : instructions,
        Description: !description ? modified.Description : description,
        Dose: !dosis ? modified.Dose : dosis,
        Time_Dose: !dosisTime ? modified.Time_Dose : dosisTime,
        Starting_Dose_Date: !startDate ? modified.Starting_Dose_Date : startDate,
        Finishing_Dose_Date: !endDate ? modified.Finishing_Dose_Date : endDate
      }
      // Se busca el índice en el array de recetas médicas que coincida con el código de prescripción médica a modificar 
      const indexToUpdate = medicalPrescriptions.findIndex(item => item.Medical_Prescription_Code === editedElement.Medical_Prescription_Code);

      // Si se encuentra un resultado, se valida que hayan datos nuevos para sustituir
      if(indexToUpdate !== -1) {
        const allPropertiesMatch = Object.keys(editedElement).every(p => {
          return p === 'Medical_Prescription_Code' || medicalPrescriptions[indexToUpdate][p] === editedElement[p]
        })

        // Si todas las variables del formulario son iguales a las variables guardadas en el array de recetas, entonces no se guarda nada y se cierra el modal
        if(allPropertiesMatch) return toggle();
        
        // Si no, se procede con el reemplazo
        const updatedItem = { ...medicalPrescriptions[indexToUpdate], ...editedElement };
        const updatedArray = [...medicalPrescriptions];
        updatedArray[indexToUpdate] = updatedItem;
        setMedicalPrescriptions(updatedArray);
      }

      // También se guardan en un array diferente los datos que fueron modificados para presentarlos en el modal de confirmación
      const newEditedData = modifiedData.findIndex(item => item.Medical_Prescription_Code === editedElement.Medical_Prescription_Code);

      if(newEditedData !== -1) {
        const updatedData = [...modifiedData];
        updatedData[newEditedData] = editedElement;
        setModifiedData(updatedData);
      } else {
        setModifiedData(prevArr => [...prevArr, editedElement]);
      }


      setMedicine_Name("");
      setInstructions("");
      setDescription("");
      setDosis("");
      setDosisTime(0);
      setStartDate(null);
      setEndDate(null);
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>



    </>
  );
};
