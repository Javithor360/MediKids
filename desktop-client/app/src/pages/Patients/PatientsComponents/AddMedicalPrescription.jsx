import { isActive } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AddMedicalPrescription = ({
  setNewMedicalPrescriptionEntry,
  newMedicalPrescriptionEntry,
}) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [selectedOption, setSelectedOption] = useState(false);
  const [medicines, setMedicines] = useState([
    {
      id: 0,
      isActive: true,
      formData: {
        add_medicine_name: "",
        add_instructions: "",
        add_description: "",
        add_dose: "",
        add_time_dose: "",
        add_starting_dose_date: "",
        add_finishing_dose_date: "",
      },
    },
  ]);

  useEffect(() => {
    const updateMedicineComponents = medicines.map((m) => ({
      ...m,
      component: <MedicinesLayout isActive={selectedOption} />,
    }));
    setMedicines(updateMedicineComponents);
  }, [selectedOption]);

  useEffect(() => {
    setNewMedicalPrescriptionEntry(
      medicines.map((m) => ({
        hasSelectedYes: selectedOption,
        data: {
          Medicine_Name: m.formData.add_medicine_name,
          Instructions: m.formData.add_instructions,
          Description: m.formData.add_description,
          Starting_Dose_Date: m.formData.add_starting_dose_date,
          Finishing_Dose_Date: m.formData.add_finishing_dose_date,
          Dose: m.formData.add_dose,
          Patient_id: patient.id,
          Time_Dose: m.formData.add_time_dose,
        }
      }))
    );
  }, [medicines])

  const handleAddComponent = async () => {
    const newMedicine = {
      id: medicines.length,
      isActive: true,
      formData: {
        add_medicine_name: "",
        add_instructions: "",
        add_description: "",
        add_dose: "",
        add_time_dose: "",
        add_starting_dose_date: "",
        add_finishing_dose_date: "",
      },
    };
    setMedicines([...medicines, newMedicine]);
  };

  const handleRemoveLastMedicine = () => {
    if (medicines.length > 1) {
      const deleteMedicines = medicines.slice(0, medicines.length - 1);
      setMedicines(deleteMedicines);
    }
  };

  const handleInputChange = async (medicine_id, input_name, value) => {
    const updatedMedicines = medicines.map((m) => {
      if (m.id === medicine_id) {
        return {
          ...m,
          formData: {
            ...m.formData,
            [input_name]: value,
          },
        };
      }
      return m;
    });

    setMedicines(updatedMedicines);
  };

  const handleChange = async () => {
    setSelectedOption(!selectedOption);
    const toggleMedicines = medicines.map((m) => ({
      ...m,
      isActive: !!m.isActive,
    }));
    setMedicines(toggleMedicines);
  };

  return (
    <div className="bg-cyan-100">
      <div className="inline-flex items-center gap-2">
        <p>¿Agregar medicamentos a la receta?</p>
        <form>
          <label for="add_yes">
            Sí
            <input
              type="radio"
              id="add_yes"
              name="selection"
              value="add_yes"
              checked={selectedOption === true}
              onChange={handleChange}
            />
          </label>
          <label for="add_no">
            No
            <input
              type="radio"
              id="add_no"
              name="selection"
              value="add_no"
              checked={selectedOption === false}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
      {medicines.map((m) => (
        <MedicinesLayout
          key={m.id}
          isActive={selectedOption}
          m={m}
          onInputChange={handleInputChange}
        />
      ))}
      <div
        className={`${
          selectedOption === false ? `bg-gray-200` : ``
        } mt-2 inline-flex items-center gap-2`}
      >
        <button onClick={handleAddComponent} disabled={!selectedOption}>
          Agregar nuevo medicamento
        </button>
        <button
          onClick={handleRemoveLastMedicine}
          disabled={!selectedOption && medicines.length > 1}
        >
          Eliminar último medicamento
        </button>
      </div>
    </div>
  );
};

const MedicinesLayout = ({ isActive, m, onInputChange }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    onInputChange(m.id, name, value);
  };

  return (
    <div>
      <form
        action=""
        className={`${isActive === false ? `bg-gray-200` : ``} mt-2`}
      >
        <label>
          <p>Nombre del medicamento:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_medicine_name"
            id="add_medicine_name"
            value={m.formData.add_medicine_name}
            onChange={handleInput}
          />
        </label>
        <label>
          <p>Instrucciones:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_instructions"
            id="add_instructions"
            value={m.formData.add_instructions}
            onChange={handleInput}
          />
        </label>
        <label>
          <p>Descripción:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_description"
            id="add_description"
            value={m.formData.add_description}
            onChange={handleInput}
          />
        </label>
        <label>
          <p>Dosis:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_dose"
            id="add_dose"
            value={m.formData.add_dose}
            onChange={handleInput}
          />
        </label>
        <label>
          <p>Cantidad de dosis por día:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_time_dose"
            id="add_time_dose"
            value={m.formData.add_time_dose}
            onChange={handleInput}
          />
        </label>
        <label>
          <p>Fecha de inicio de dosis:</p>
          <input
            disabled={!isActive}
            type="date"
            name="add_starting_dose_date"
            id="add_starting_dose_date"
            value={m.formData.add_starting_dose_date}
            onChange={handleInput}
          />
        </label>
        <label>
          <p>Fecha de finalización de dosis:</p>
          <input
            disabled={!isActive}
            type="date"
            name="add_finishing_dose_date"
            id="add_finishing_dose_date"
            value={m.formData.add_finishing_dose_date}
            onChange={handleInput}
          />
        </label>
      </form>
    </div>
  );
};
