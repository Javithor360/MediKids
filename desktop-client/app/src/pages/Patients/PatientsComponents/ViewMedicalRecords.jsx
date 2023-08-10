import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDash } from '../../../context/DoctorContext'

export const ViewMedicalRecords = ({ responsibleInfo }) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const { PatientMedicalRecords, medicalRecords } = useDash();

  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    <FirstPage state={patient} responsibleInfo={responsibleInfo} />,
    ...medicalRecords.map(i => <div key={i.id}>{i.Medical_History_Code}</div>)
  ];



  useEffect(() => {
    PatientMedicalRecords(patient.id);
  }, [])

//   useEffect(() => {
//     console.log(medicalRecords)
//   }, [medicalRecords])

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
