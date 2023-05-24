import { useState } from 'react'
import { FaUserAlt } from "react-icons/fa"
import { EditMedicalPrescription, EditMedicalRecord, ReferPatient, ScheduleAppointment } from './PatientsComponents';
export const MedicalAppoinment = () => {
  const [tabSelector, setTabSelector] = useState(1);
  //switch (tabSelector) {
  // case 1:
  //   return <EditMedicalPrescription />;
  // case 2:
  //   return <EditMedicalRecord />;
  // case 3:
  //   return <ScheduleAppointment />;
  // case 4:
  //   return  <ReferPatient />;
  // default:
  //   return <EditMedicalPrescription />;
  //}
  return (
    <>
      <p className="text-[1.8rem] text-[#707070] mt-[.6rem] ml-7">Atendiendo Paciente: </p>
      <div className="inline-flex justify-center items-center gap-3 mt-[.5rem] ml-7">
        <FaUserAlt />
        <p>Javier Enrique Mejía Flores</p>
      </div>
      <div className="w-[100%] flex justify-center">
        <div className="inline-flex gap-16 justify-center items-center border border-[#BBBBBB] shadow-md rounded-xl mt-7 mx-auto w-[90%] h-[5rem] left-0 right-0 overflow-x-auto px-3">
          <div className={tabSelector === 1 ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none " : "w-fit h-fit cursor-pointer select-none"} onClick={()=>{
            setTabSelector(1);
          }}>Editar expediente</div>

          <div className={tabSelector === 2 ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none" : "w-fit h-fit cursor-pointer select-none"} onClick={()=>{
            setTabSelector(2);
          }}>Editar receta</div>

          <div className={tabSelector === 3 ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none" : "w-fit h-fit cursor-pointer select-none"} onClick={()=>{
            setTabSelector(3);
          }}>Programar cita</div>

          <div className={tabSelector === 4 ? "w-fit h-fit cursor-pointer border-b-[2px] border-[#707070] font-semibold font-[#707070] select-none" : "w-fit h-fit cursor-pointer select-none"} onClick={()=>{
            setTabSelector(4);
          }}>Referir paciente</div>
        </div>
      </div>
      <div className='border border-[#BBBBBB] w-[90%] h-fit mx-auto mt-5 rounded-2xl'>
        <div className={tabSelector === 1 ? "block" : "hidden"}><EditMedicalRecord /></div>
        <div className={tabSelector === 2 ? "block" : "hidden"}><EditMedicalPrescription /></div>
        <div className={tabSelector === 3 ? "block" : "hidden"}><ScheduleAppointment /></div>
        <div className={tabSelector === 4 ? "block" : "hidden"}><ReferPatient /></div>
      </div>
    </>
  )
}