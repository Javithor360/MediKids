import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDash } from "../../context/DoctorContext";
import { getPatientAge } from "../../utils/Functions";
import PropagateLoader from "react-spinners/PropagateLoader";

export const ActivePatients = (props) => {
  const { t } = useTranslation();
  const { PatientsClassificator, oldPatients, activePatients } = useDash();
  useEffect(() => {
    PatientsClassificator(JSON.parse(localStorage.getItem("userSession")).id);
  }, []);
  const [loadingScreen, setLoadingScreen] = useState(true);
  setTimeout(() => {
    setLoadingScreen(false);
  }, 3000);
  return (
    <>
    {
      loadingScreen === true ? 
      <div className="flex items-center justify-center w-full h-full">
        <PropagateLoader
          color="#a375ff"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      :
      <>
      <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12">
        <h1 className="text-[#a375ff] font-bold text-3xl">
        {t("pacients.tittle")}
        </h1>
      </div>
      

      {activePatients.length !== 0 ? (
        <div className="overflow-x-auto w-[80%] rounded-lg border border-[#c6c6c6] shadow-md mx-auto">
          <table className="table w-full">
            <thead className="bg-[#a375ff] text-white">
              <tr className="text-center">
                <th className="border-b border-r border-[rgb(187,187,187)]">{t("pacients.subtittle")}</th>
                <th className="border-b border-r border-[#BBBBBB]">
                {t("pacients.subtittle1")}
                </th>
                <th className="border-b border-[#BBBBBB]">{t("pacients.subtittle2")}</th>
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
                        {t("pacients.button")}
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
        // <div className="h-[15rem] w-[100%] flex flex-col gap-5 items-center justify-center">
        //   <img className="w-[10rem]" src={require('../../assets/icons/no_appmt.png')} alt="" />
        //   <h3 className="text-[#707070]">No tienes ningún paciente con cita pendiente</h3>
        // </div>
        <div className="h-[15rem] w-[100%] flex flex-col gap-5 justify-center items-center">
          <div className="w-fit h-full flex-col gap-5">
            <img className="w-[10rem] mx-auto block mb-5" src={require('../../assets/icons/no_appmt.png')} alt="" />
            <h3 className="text-[#707070]">{t("pacients.tittle2")}</h3>
          </div>
        </div>
      )}

      <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mt-12 mb-12">
        <h1 className="text-[#a375ff] font-bold text-3xl">
        {t("pacients.tittle3")}
        </h1>
      </div>

      {oldPatients.length !== 0 ? (
        <div className="overflow-x-auto w-[80%] rounded-lg border border-[#c6c6c6] mx-auto shadow-md">
          <table className="table w-full">
            <thead className="bg-[#a375ff] text-white">
              <tr className="text-center">
                <th className="border-b border-r border-[#BBBBBB]">{t("pacients.subtittle")}</th>
                <th className="border-b border-r border-[#BBBBBB]">
                {t("pacients.subtittle1")}
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
        <div className="h-[15rem] w-[100%] flex flex-col gap-5 justify-center items-center">
          <div className="w-fit h-full flex-col gap-5">
            <img className="w-[10rem] mx-auto block mb-5" src={require('../../assets/icons/no_prev.png')} alt="" />
            <h3 className="text-[#707070]">{t("pacients.tittle4")}</h3>
          </div>
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
    }
    </>
  );
};
