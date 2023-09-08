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

  const AnnouncCard = ({values}) => {
    return (
      <div className='message-card shadow-md mx-auto'>
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
            {new Date(values.Date_Time).toLocaleDateString()}
          </div>
        </div>
        <div className='content-text'>
          {values.Description}
        </div>
      </div>
    )
  }


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
        {
          announcements.length != 0 ?
            announcements.map((el, i) => {
              return <AnnouncCard key={i} values={el} />
            })
            :
            <div className='w-[100%] h-[90%] flex flex-col gap-4 justify-center items-center'>
              <img src={require("../assets/icons/no_messages.png")} className="w-[20%] h-auto" alt="" />
              <p className="text-[#707070] font-semibold  text-[1.6rem]">No tiene mensajes</p>
            </div>
        }
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
