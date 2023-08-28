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
      <div className="bg-white">
        <div>
          {medicalPrescriptions.length > 0 ? (
            <>
              <div className="inline-flex items-center gap-2">
                <p className="mt-1 ml-7 font-semibold text-[#707070] text-[1.2rem]">
                  ¿Editar medicamentos de la receta actual?
                </p>
                <form>
                  <label
                    className="ml-5 mr-5 text-[#707070] text-[1.2rem] "
                    for="yes2"
                  >
                    Sí
                    <input
                      className="ml-2 mt-2.5"
                      type="radio"
                      id="yes2"
                      name="selection"
                      value="yes2"
                      checked={editPrescription === true}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    className=" mr-5 text-[#707070] text-[1.2rem]"
                    for="no2"
                  >
                    No
                    <input
                      className="ml-2"
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
              <div class="overflow-x-auto w-[80%] rounded-[1rem] border border-[#BBBBBB] ml-7">
                <table class="table w-[100%]">
                  <thead>
                    <tr className="text-center">
                      <th className=" border-r border-b border-[#BBBBBB]">
                        Código
                      </th>
                      <th className="border-r border-b border-[#BBBBBB]">
                        Nombre
                      </th>
                      <th className="border-r border-b border-[#BBBBBB]">
                        Acción
                      </th>
                      {/* <th className="border-r border-b border-[#BBBBBB]">
                        Intrucciones
                      </th>
                      <th className="border-r border-b border-[#BBBBBB]">
                        Descripción
                      </th>
                      <th className="border-r border-b border-[#BBBBBB]">
                        Dosis
                      </th>
                      <th className="border-r border-b border-[#BBBBBB]">
                        Cantidad por día
                      </th>
                      <th className="border-r border-b border-[#BBBBBB]">
                        Fecha de inicio
                      </th>
                      <th className="border-b border-[#BBBBBB] ">
                        Fecha de finalización
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {medicalPrescriptions.map((m) => {
                      return (
                        <tr key={m.id} class="text-center">
                          <td class="border-r border-[#BBBBBB]">
                            {m.Medical_Prescription_Code}
                          </td>
                          <td class="border-r border-[#BBBBBB]">
                            {m.Medicine_Name}
                          </td>
                          <td class="border-r border-[#BBBBBB] flex justify-center gap-4">
                            <button
                              disabled={!editPrescription}
                              onClick={() => {
                                setModified(m);
                                toggle();
                              }}
                            >
                              Editar
                            </button>
                            <button disabled={!editPrescription}>
                              Eliminar
                            </button>
                          </td>
                          {/* <td class="border-r border-[#BBBBBB]">
                            {m.Instructions}
                          </td>
                          <td class="border-r border-[#BBBBBB]">
                            {m.Description}
                          </td>
                          <td class="border-r border-[#BBBBBB]">{m.Dose}</td>
                          <td class="border-r border-[#BBBBBB]">
                            {m.Time_Dose}
                          </td>
                          <td class="border-r border-[#BBBBBB]">
                            {new Date(m.Starting_Dose_Date)
                              .toISOString()
                              .substring(0, 10)}
                          </td>
                          <td class="border-r border-[#BBBBBB]">
                            {new Date(m.Finishing_Dose_Date)
                              .toISOString()
                              .substring(0, 10)}
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="overflow-x-auto w-[80%] ml-7">
              <h3>
                no hay receta medica previa para modificar pe :v +100 lince
              </h3>
            </div>
          )}
        </div>
      </div>
      {toggle && modified && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <div className="min-w-[20rem] max-w-[40rem] min-h-[20rem] m-5">
            <h3>Modificando receta #{modified.Medical_Prescription_Code}</h3>
            <form onSubmit={handleForm}>
              <div className="block">
                <div>
                  <label htmlFor="Editing-Medical_Prescription_Code">
                    Código
                  </label>
                  <input
                    disabled
                    className="ml-2 mt-2.5"
                    type="text"
                    name="Editing-Medical_Prescription_Code"
                    value={modified.Medical_Prescription_Code}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Medicine_Name">
                    Nombre del medicamento
                  </label>
                  <input
                    className="ml-2 mt-2.5"
                    type="text"
                    name="Editing-Medicine_Name"
                    defaultValue={modified.Medicine_Name}
                    onChange={(e) => setMedicine_Name(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Instructions">Instrucciones</label>
                  <input
                    className="ml-2 mt-2.5"
                    type="text"
                    name="Editing-Instructions"
                    defaultValue={modified.Instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Description">Descripción</label>
                  <input
                    className="ml-2 mt-2.5"
                    type="text"
                    name="Editing-Description"
                    defaultValue={modified.Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Dose">Dosis</label>
                  <input
                    className="ml-2 mt-2.5"
                    type="text"
                    name="Editing-Dose"
                    defaultValue={modified.Dose}
                    onChange={(e) => setDosis(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Time_Dose">Dosis por día</label>
                  <input
                    className="ml-2 mt-2.5"
                    type="number"
                    name="Editing-Time_Dose"
                    defaultValue={modified.Time_Dose}
                    onChange={(e) => setDosisTime(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Starting_Dose_Date">
                    Inicio de la dosis
                  </label>
                  <input
                    className="ml-2 mt-2.5"
                    type="date"
                    name="Editing-Starting_Dose_Date"
                    defaultValue={new Date(modified.Starting_Dose_Date)
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Editing-Finishing_Dose_Date">
                    Finalización de la dosis
                  </label>
                  <input
                    className="ml-2 mt-2.5"
                    type="date"
                    name="Editing-Finishing_Dose_Date"
                    defaultValue={new Date(modified.Finishing_Dose_Date)
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button type="submit">Guardar</button>
                <button onClick={toggle}>Cancelar</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};
