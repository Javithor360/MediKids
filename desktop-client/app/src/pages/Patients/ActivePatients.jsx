import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDash } from "../../context/DoctorContext";

export const ActivePatients = (props) => {
  const { PatientsClassificator, oldPatients, activePatients } = useDash();
  useEffect(() => {
    PatientsClassificator(JSON.parse(localStorage.getItem("userSession")).id);
  }, []);

  return (
    <>
      <h1 className="text-[#a375ff] font-bold text-3xl mb-12 after:content-[''] after:bg-[#a375ff] after:block after:w-[30%] after:h-[0.1875rem] after:mx-0 after:my-auto">
        Pacientes activos
      </h1>

      {activePatients.length !== 0 ? (
        <div className="overflow-x-auto w-[80%] rounded-lg border border-[#000000] mx-auto">
          <table className="table w-full">
            <thead className="bg-[#a375ff] text-white">
              <tr className="text-center">
                <th className="border-b border-r border-[#BBBBBB]">Paciente</th>
                <th className="border-b border-r border-[#BBBBBB]">
                  Número de código
                </th>
                <th className="border-b border-[#BBBBBB]">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {activePatients.map((patient) => {
                // setState({
                //   id: patient.id,
                //   first_names: patient.First_Names,
                //   last_names: patient.Last_Names,
                //   age: patient.Age,
                //   blood_type: patient.Blood_Type,
                //   weight: patient.Weight,
                //   height: patient.Height,
                // });
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
                          <div className="text-sm text-left opacity-50">{`${patient.Age} años`}</div>
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

      <h1 className="mt-[2rem] text-[#a375ff] font-bold text-3xl mb-12 after:content-[''] after:bg-[#a375ff] after:block after:w-[45%] after:h-[0.1875rem] after:mx-0 after:my-auto">
        Pacientes atentidos previamente
      </h1>
      
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
                // setState({
                //   id: patient.id,
                //   first_names: patient.First_Names,
                //   last_names: patient.Last_Names,
                //   age: patient.Age,
                //   blood_type: patient.Blood_Type,
                //   weight: patient.Weight,
                //   height: patient.Height,
                // });
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
                          <div className="text-sm text-left opacity-50">{`${patient.Age} años`}</div>
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
        <></>
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
