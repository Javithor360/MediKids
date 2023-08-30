import { isActive } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import {GrAddCircle} from 'react-icons/gr'
import {MdOutlineDeleteForever} from 'react-icons/md'
import { useLocation } from "react-router-dom";
//toggle

import Toggle from 'react-toggle';
import 'react-toggle/style.css';
export const AddMedicalPrescription = ({
  setNewMedicalPrescriptionEntry,
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

  
    const [isChecked, setChecked] = useState(false);
  
    const handleToggle = () => {
      setChecked(!isChecked);
    };
  return (
    <div className="bg-transparent">
      <div className="inline-flex items-center gap-2 ml-7 mb-3">
        <p className="font-semibold text-[#707070] text-[1.1rem]">
          ¿Agregar medicamentos a la receta actual?
        </p>
        <form>
          <label className=" mr-5 text-[#707070] text-[1.2rem] " for="add_yes">
            <Toggle
              className="mt-2"
              checked={selectedOption}
              onChange={handleChange}
              id="add_yes"
              name="selection"
              value="add_yes"
              icons={true}
            />
          </label>
        </form>
      </div>
      {/* <div className="ml-7 text-[#707070] text-[1.2rem] mt-5">
      <p>Medicamento añadidos: 1</p>
      </div> */}
     
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
          selectedOption === false ? ` rounded-xl ` : ``
        } inline-flex items-center gap-2 mb-7`}
      >
        
        <button className="rounded-full mb-5 ml-7 h-10 shadow-lg px-4 transition duration-300 ease-linear hover:bg-[#a375ff83] flex items-center gap-2 border-[2px] border-[#a375ff83]" onClick={handleAddComponent} disabled={!selectedOption}>
        <GrAddCircle className="inline-flex items-center justify-center gap-3 text-[1.2rem]"/>
          Agregar nuevo medicamento
        </button>
        
        <button
          className="rounded-full  mb-5 h-10 shadow-lg px-4 transition duration-300 ease-linear hover:bg-[#a375ff83] flex items-center gap-2 border-[2px] border-[#a375ff83]"
          onClick={handleRemoveLastMedicine}
          disabled={!selectedOption && medicines.length > 1}
        >
          <MdOutlineDeleteForever className="inline-flex items-center justify-center gap-3 text-[1.2rem] text-[#e73131]" />
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
    
    <div className="w-[45rem] bg-white rounded-3xl border border-[#707070] ml-7 mr-2 mt-2 my-9">
     
      <form
        action=""
        className={`${isActive === false ? `bg-gray-50 rounded-3xl ` : ``} `}
      >
        
        <div className="inline-flex items-center gap-3 ml-7 mt-7">
          <label >
            <p className="text-[#707070] mb-3 font-semibold">Nombre del medicamento:</p>
            <input
              disabled={!isActive}
              type="text"
              name="add_medicine_name"
              id="add_medicine_name"
              value={m.formData.add_medicine_name}
              onChange={handleInput}
              className="w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
            />
          </label>
          <label>
            <p className="text-[#707070] mb-3 font-semibold">Instrucciones:</p>
            <input
              disabled={!isActive}
              type="text"
              name="add_instructions"
              id="add_instructions"
              value={m.formData.add_instructions}
              onChange={handleInput}
              className="w-[20rem] h-[3rem] ml-1 rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
            />
          </label>
        </div>
        <div className="inline-flex items-center gap-3 ml-7 mt-7">
       
        <label>
          <p className="text-[#707070] mb-3 font-semibold">Descripción:</p>
          <input
            disabled={!isActive}
            type="text"
            name="add_description"
            id="add_description"
            value={m.formData.add_description}
            onChange={handleInput}
             className="w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          />
        </label>
        <label  >
          <p className="text-[#707070] mb-3 font-semibold">Dosis:</p>
          <input
            placeholder="mg"
            disabled={!isActive}
            type="text"
            name="add_dose"
            id="add_dose"
            value={m.formData.add_dose}
            onChange={handleInput}
            className="w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          />   
        </label>
        </div>
        <div className="inline-flex items-center gap-8 ml-7 mb-7 mt-7">
        <label  className="mt-4 mb-4" >
          <p className="text-[#707070] mb-3 font-semibold">Cantidad de dosis por día:</p>
          <input
            disabled={!isActive}
            type="number"
            name="add_time_dose"
            id="add_time_dose"
            value={m.formData.add_time_dose}
            onChange={handleInput}
            className="w-full h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          />
        </label>
        
        <label  className="mt-4 mb-4" >
          <p className="text-[#707070] mb-3 font-semibold">Fecha de inicio de dosis:</p>
          <input
            disabled={!isActive}
            type="date"
            name="add_starting_dose_date"
            id="add_starting_dose_date"
            value={m.formData.add_starting_dose_date}
            onChange={handleInput}
            className="w-full h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          />
        </label>
      
        <label className="mt-4 mb-4">
          <p className="text-[#707070] mb-3 font-semibold"> Fecha de finalización de dosis:</p>
          <input
            disabled={!isActive}
            type="date"
            name="add_finishing_dose_date"
            id="add_finishing_dose_date"
            value={m.formData.add_finishing_dose_date}
            onChange={handleInput}
            className="w-full h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          />
        </label>
        </div>
      </form>
    </div>
  );
};
