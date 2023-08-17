import { isActive } from "@tiptap/react";
import React, { useEffect, useState } from "react";

export const AddMedicalPrescription = ({ setNewMedicalPrescriptionEntry }) => {
  const [selectedOption, setSelectedOption] = useState(false);
  const [medicines, setMedicines] = useState([
    {
      id: 0,
      component: <MedicinesLayout key={0} selectedOption={selectedOption} />,
    },
  ]);
  
  useEffect(() => {
    const updateMedicineComponents = medicines.map((m) => ({
      ...m,
      component: <MedicinesLayout isActive={selectedOption} />,
    }));
    setMedicines(updateMedicineComponents);
  }, [selectedOption]);

  const handleAddComponent = async () => {
    const newMedicine = {
      id: medicines.length,
      component: (
        <MedicinesLayout key={medicines.length} isActive={selectedOption} />
      ),
    };
    setMedicines([...medicines, newMedicine]);
  };

  const handleRemoveLastMedicine = () => {
    if(medicines.length > 1) {
      const deleteMedicines = medicines.slice(0, medicines.length - 1);
      setMedicines(deleteMedicines);
    }
  }

  const handleChange = async () => {
    setSelectedOption(!selectedOption);
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
      {medicines.map((m) => {
        return <div key={m.id}>{m.component}</div>;
      })}
      <div className={`${selectedOption === false ? `bg-gray-200` : ``} mt-2 inline-flex items-center gap-2`}>
        <button onClick={handleAddComponent} disabled={!selectedOption}>
          Agregar nuevo medicamento
        </button>
        <button onClick={handleRemoveLastMedicine} disabled={!selectedOption && medicines.length > 1}>
          Eliminar último medicamento
        </button>
      </div>
    </div>
  );
};

const MedicinesLayout = ({ isActive }) => {
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
          />
        </label>
        <label>
          <p>Instrucciones:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_instructions"
            id="add_instructions"
          />
        </label>
        <label>
          <p>Descripción:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_description"
            id="add_description"
          />
        </label>
        <label>
          <p>Dosis:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_dose"
            id="add_dose"
          />
        </label>
        <label>
          <p>Cantidad de dosis por día:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_time_dose"
            id="add_time_dose"
          />
        </label>
        <label>
          <p>Fecha de inicio de dosis:</p>
          <input
            disabled={!isActive}
            type="date"
            name="add_starting_dose_date"
            id="add_starting_dose_date"
          />
        </label>
        <label>
          <p>Fecha de finalización de dosis:</p>
          <input
            disabled={!isActive}
            type="date"
            name="add_finishing_dose_date"
            id="add_finishing_dose_date"
          />
        </label>
      </form>
    </div>
  );
};
