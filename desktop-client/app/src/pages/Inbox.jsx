import { useEffect, useState } from 'react'
import '../assets/scss/Inbox.scss'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import PropagateLoader from "react-spinners/PropagateLoader";
import { useDash } from '../context/DoctorContext';

export const Inbox = () => {
  const { GetAnnouncements, announcements } = useDash();
  
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    GetAnnouncements(JSON.parse(localStorage.getItem("userSession")).id);
    setTimeout(() => {
      setLoadingScreen(false);
    }, 3000);
  })

  useEffect(() => {
    console.log(announcements)
  }, [announcements])
  return (
    <>
    {
      loadingScreen === false ?
      <>
        <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12">
          <h1 className="text-[#a375ff] font-bold text-3xl">
            Bandeja de entrada
          </h1>
        </div>
        <div className='message-card shadow-md'>
          <div className='heading shadow-sm'>
            <div className='avatar-container'>
              <div class="avatar __avatar">
                <div class="mask mask-squircle bg-contain">
                  <img src={require('../assets/template/avatar.jpg')} className="cover" alt=''/>
                </div>
              </div>
              <span className='text-[#707070] font-semibold'>
                • Administrador
              </span>
            </div>
            <div className='date-container'>
              <BsFillCalendarEventFill />
              06/09/2023
            </div>
          </div>
          <div className='content-text'>
            ¡Mensaje de bienvenida!, Le damos la bienvenida al sistema de gestión de Medikids, en el cual usted, como doctor, podrá tener un control sobre todos los procesos relacionados con sus pacientes y tener un mejor orden, desempeño y satisfacción al realizar su invaluable labor.
          </div>
        </div>
      </>
      :
      <div className="flex items-center justify-center w-full h-full">
        <PropagateLoader
          color="#a375ff"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    }
    </>
  )
}
