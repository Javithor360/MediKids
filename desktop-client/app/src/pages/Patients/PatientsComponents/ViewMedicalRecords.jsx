import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parser from "html-react-parser";


import { useDash } from '../../../context/DoctorContext'

export const ViewMedicalRecords = ({ responsibleInfo }) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalRecords, medicalRecords } = useDash();

  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    <FirstPage state={patient} responsibleInfo={responsibleInfo} />,
    ...medicalRecords.map(i => <RecordsLayout key={i.id} record={i} />)
  ];

  useEffect(() => {
    PatientMedicalRecords(patient.id);
  }, [])

const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(pages.length - 1);
  };

  return (
    <>
      <div>{pages[currentPage]}</div>
      <button onClick={handleFirstPage} disabled={currentPage === 0}>
        Primera
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
        Regresar
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage === pages.length - 1}
      >
        Siguiente
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === pages.length - 1}
      >
        Última
      </button>
    </>
  );
};

// COMPONENTE DE LA PRIMERA PÁGINA DEL EXPEDIENTE, ÚNICAMENTE SE MUESTRA INFORMACIÓN DEL PACIENTE (FALTAN LAS VACUNAS)
const FirstPage = ({ responsibleInfo }) => {
  const location = useLocation();
  const { patient } = location.state || {};
  return (
    <>
      <h1>
        EXPEDIENTE DE {patient.First_Names.toUpperCase()}{" "}
        {patient.Last_Names.toUpperCase()}
      </h1>
      <div className="data">
        <div className="main-info">
          <h3>Información personal</h3>
          <p>
            Edad: {patient.Age} {patient.Age === 1 ? "año" : "años"}
          </p>
          <p>Tipo de sangre: {patient.Blood_Type}</p>
          <p>Peso: {patient.Weight}</p>
          <p>Altura: {patient.Height}</p>
        </div>
        <div className="resp-info">
          <h3>Informaciòn del responsable</h3>
          <p>
            Nombre: {responsibleInfo.First_Names} {responsibleInfo.Last_Names}
          </p>
          <p>Número de contacto: {responsibleInfo.Phone}</p>
        </div>
      </div>
    </>
  );
};

// COMPONENTE LAYOUT PARA CADA REGISTRO DEL EXPEDIENTE
const RecordsLayout = ({ record }) => {
  const appDate = new Date(record.Date_Time);
  return(
    <>
      <h1>Registro de cita {record.Medical_History_Code} ({`${appDate.getDate()}/${appDate.getMonth() + 1}/${appDate.getFullYear()}`})</h1>
      <div>
        <h2>Toma de datos</h2>
        <ul>
          <li>Altura: {record.Height}</li>
          <li>Peso: {record.Weight}</li>
          <li>Temperatura: {record.Temperature}</li>
        </ul>
      </div>
      <div>
        <h2>Anotaciones realizadas</h2>
        <div>
          {parser(record.Diagnosis)}
        </div>
      </div>
    </>
  );
};