import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDash } from "../../context/DoctorContext";
import { getPatientAge } from "../../utils/Functions";

export const ActivePatients = (props) => {
  const { PatientsClassificator, oldPatients, activePatients } = useDash();
  useEffect(() => {
    PatientsClassificator(JSON.parse(localStorage.getItem("userSession")).id);
  }, []);

  return (
    <>
      <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12">
        <h1 className="text-[#a375ff] font-bold text-3xl">
          Pacientes activos
        </h1>
      </div>
      

      {activePatients.length !== 0 ? (
        <div className="overflow-x-auto w-[80%] rounded-lg border border-[#000000] mx-auto">
          <table className="table w-full">
            <thead className="bg-[#a375ff] text-white">
              <tr className="text-center">
                <th className="border-b border-r border-[rgb(187,187,187)]">Paciente</th>
                <th className="border-b border-r border-[#BBBBBB]">
                  Número de código
                </th>
                <th className="border-b border-[#BBBBBB]">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {activePatients.map((patient) => {
                return (
                  <tr className="text-center" key={patient.id}>
                    <td className="border-r border-[#BBBBBB]">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-squircle">
                            <img
                              src={
                                patient.Profile_Photo == "NULL"
                                  ? require("../../assets/template/avatar.jpg")
                                  : patient.Profile_Photo_Url
                              }
                              alt="pfp"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-left">
                            {`${patient.First_Names} ${patient.Last_Names}`}
                          </div>
                          <div className="text-sm text-left opacity-50">{getPatientAge(patient.Age, patient.Birthdate)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-r border-[#BBBBBB]">
                      {patient.Patient_Code}
                    </td>
                    <td className="border-[#BBBBBB]">
                      <Link to="/patients/active/details" state={{ patient }}>
                        <button className="btn btn-outline btn-xs hover:bg-[#a375ff] hover:text-white">
                          Ver detalles
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2>No tienes ningún paciente con cita pendiente</h2>
        </div>
      )}

      <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mt-12 mb-12">
        <h1 className="text-[#a375ff] font-bold text-3xl">
          Pacientes atentidos previamente
        </h1>
      </div>

      {oldPatients.length !== 0 ? (
        <div className="overflow-x-auto w-[80%] rounded-lg border border-[#000000] mx-auto">
          <table className="table w-full">
            <thead className="bg-[#a375ff] text-white">
              <tr className="text-center">
                <th className="border-b border-r border-[#BBBBBB]">Paciente</th>
                <th className="border-b border-r border-[#BBBBBB]">
                  Número de código
                </th>
              </tr>
            </thead>
            <tbody>
              {oldPatients.map((patient) => {
                return (
                  <tr className="text-center" key={patient.id}>
                    <td className="border-r border-[#BBBBBB]">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-squircle">
                            <img
                              src={
                                patient.Profile_Photo == "NULL"
                                  ? require("../../assets/template/avatar.jpg")
                                  : patient.Profile_Photo_Url
                              }
                              alt="pfp"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-left">
                            {`${patient.First_Names} ${patient.Last_Names}`}
                          </div>
                          <div className="text-sm text-left opacity-50">{getPatientAge(patient.Age, patient.Birthdate)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-r border-[#BBBBBB]">
                      {patient.Patient_Code}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2>No has atendido a ningún paciente anteriormente</h2>
        </div>
      )}

      {/* <div className="w-full mx-auto my-6 overflow-x-auto">
        <table className="table w-full border border-collapse rounded-lg border-slate-500">
          <tr className="text-center">
            <th>Paciente</th>
            <th>Número de código</th>
            <th></th>
          </tr>
          <tr className="text-center hover">
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src={require("../../assets/template/avatar.jpg")}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    Daniel Ernesto Vásquez Venturax
                  </div>
                  <div className="text-sm opacity-50">9 años</div>
                </div>
              </div>
            </td>

            <td>
              <span className="bg-green-400 badge badge-ghost badge-lg">
                XX12345
              </span>
            </td>

            <th>
              <Link to="/patients/active/details">
                <button className="btn btn-outline btn-xs hover:bg-[#a375ff]">
                  Ver detalles
                </button>
              </Link>
            </th>
          </tr>

          <tr className="text-center hover">
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img
                      src={require("../../assets/template/avatar.jpg")}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    Daniel Ernesto Vásquez Venturax
                  </div>
                  <div className="text-sm opacity-50">9 años</div>
                </div>
              </div>
            </td>

            <td>
              <span className="bg-green-400 badge badge-ghost badge-lg">
                XX12345
              </span>
            </td>

            <th>
              <Link to="/patients/active/details">
                <button className="btn btn-outline btn-xs hover:bg-[#a375ff]">
                  Ver detalles
                </button>
              </Link>
            </th>
          </tr>
        </table>
      </div> */}
    </>
  );
};
