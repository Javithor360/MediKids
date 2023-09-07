import { useEffect, useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

import '../../assets/scss/SearchPatient.scss'
import { AiOutlineSearch } from 'react-icons/ai'

import { Link } from "react-router-dom";
import { useDash } from '../../context/DoctorContext';

export const MedicalRecords = () => {

  const { GetAllPatients, patients } = useDash();
  
  const [loadingScreen, setLoadingScreen] = useState(true);
  
  useEffect(() => {
    GetAllPatients();
    setTimeout(() => {
      setLoadingScreen(false);
    }, 3000);
  }, [])

  useEffect(() => {
    console.log(patients)
  }, [patients])
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
            Buscar paciente
          </h1>
        </div>
        <div className="shadow-md search-box-container">
          <button className="search-icon-cnt">
            <AiOutlineSearch className="text-[#707070] text-[2rem]"/>
          </button>
          <input type="text" className="input-search" placeholder="Ingrese el nombre del paciente o el código"/>
        </div>

        <div className="shadow-md results-box-container">
          {/* <div className="shadow-md patient-card">
            <div className="content-container">
              <div className="profile-photo-cnt">
                <div class="avatar w-[70%]">
                  <div class="w-24 rounded-full">
                    <img src={require('../../assets/template/walt_jr.png')} alt="" />
                  </div>
                </div>
              </div>
              <div className="patient-info-cnt">
                <div className="patient-info-row-1">
                  <div className="patient-info-row-col-1">
                    <p className="text-[#A375FF] font-semibold text-[1.1rem]">Nombre:</p>
                    <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
                    <p className="text-[#707070]">William Emnanuel Mazariego Orellana</p>
                  </div>
                  <div className="patient-info-row-col-2">
                    <p className="text-[#A375FF] font-semibold text-[1.1rem]">Edad:</p>
                    <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
                    <p className="text-[#707070]">10 años</p>
                  </div>
                </div>
                <div className="patient-info-row-1">
                  <div className="patient-info-row-col-1">
                    <p className="text-[#A375FF] font-semibold text-[1.1rem]">Encargado:</p>
                    <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
                    <p className="text-[#707070]">Alvin Josue Melendez Serrano</p>
                  </div>
                  <div className="patient-info-row-col-2">
                    <p className="text-[#A375FF] font-semibold text-[1.1rem]">Código:</p>
                    <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
                    <p className="text-[#707070]">E6E8EU</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="actions-container">
              <Link className="btn btn-sm bg-[#a49bb7] hover:bg-[#9890a9] text-white">
                Ver Expediente
              </Link>
              <Link className="btn btn-sm bg-[#a49bb7] hover:bg-[#9890a9] text-white">
                Historial de citas
              </Link>
            </div>
          </div> */}
          <div className="default-search-info-cnt">
            <img src={require('../../assets/icons/search.png')} alt="hola" className="search-big-icon"/>
            <p className="text-[#707070]">Los resultados se mostrarán aqui</p>
          </div>

          {/* <div className="default-search-info-cnt">
            <img src={require('../../assets/icons/no_search.png')} alt="hola" className="search-big-icon"/>
            <p className="text-[#707070]">No se encontraron coincidencias</p>
          </div> */}
        </div>
      </>
    }
    </>
  );
};
