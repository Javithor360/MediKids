import React, { useEffect, useState } from "react";

export const AddMedicalPrescription = ({ setMedicalPrescript }) => {
  const [selectedOption, setSelectedOption] = useState(false);

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
      <div>
        <form
          action=""
          className={`${selectedOption === false ? `bg-gray-200` : ``} mt-2`}
        >
          <label>
            <p>Nombre del medicamento:</p>
            <input
              disabled={!selectedOption}
              type="text"
              name="add_medicine_name"
              id="add_medicine_name"
            />
          </label>
          <label>
            <p>Instrucciones:</p>
            <input
              disabled={!selectedOption}
              type="text"
              name="add_instructions"
              id="add_instructions"
            />
          </label>
          <label>
            <p>Descripción:</p>
            <input
              disabled={!selectedOption}
              type="text"
              name="add_description"
              id="add_description"
            />
          </label>
          <label>
            <p>Dosis:</p>
            <input
              disabled={!selectedOption}
              type="text"
              name="add_dose"
              id="add_dose"
            />
          </label>
          <label>
            <p>Cantidad de dosis por día:</p>
            <input
              disabled={!selectedOption}
              type="text"
              name="add_time_dose"
              id="add_time_dose"
            />
          </label>
          <label>
            <p>Fecha de inicio de dosis:</p>
            <input
              disabled={!selectedOption}
              type="date"
              name="add_starting_dose_date"
              id="add_starting_dose_date"
            />
          </label>
          <label>
            <p>Fecha de finalización de dosis:</p>
            <input
              disabled={!selectedOption}
              type="date"
              name="add_finishing_dose_date"
              id="add_finishing_dose_date"
            />
          </label>
        </form>
      </div>
    </div>
  );
};
