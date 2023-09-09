import { useEffect, useState } from 'react';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import 'react-tippy/dist/tippy.css';
import { BsDot } from 'react-icons/bs'
//utils
import { DoctorEvents } from '../../utils/DoctorEvents';
import '../../assets/scss/AgendaStyles.scss'
import { useDash } from '../../context/DoctorContext';
import PropagateLoader from "react-spinners/PropagateLoader";

export const MainAgenda = () => {
  const { PatientsClassificator, appointments, activePatients } = useDash();
  const [events, setEvents] = useState(appointments);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loadingScreen, setLoadingScreen] = useState(true);
  setTimeout(() => {
    setLoadingScreen(false);
  }, 3000);
  useEffect(() => {
    PatientsClassificator(JSON.parse(localStorage.getItem("userSession")).id);
  }, [])

  const slotLabelContent = (arg) => {
    const date = arg.date;
    const hour = date.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}${ampm}`;
  };
  
  const renderEventContent = (eventInfo) => (
    <Tooltip
      position="top-start"
      trigger="mouseenter"
      theme="light"
      delay={300}
      distance={3}
      html={(
        <>
        <div className='relative flex flex-col items-start w-full h-full rounded-t-sm'>
          <div className='flex w-full bg-[#e6e5fe] border border-[#dddddd] rounded-t-[10px] px-3 py-2 items-center justify-start'>
            <b>{eventInfo.timeText}</b>
            <BsDot />
            <i>{eventInfo.event.title}</i>
          </div>
          <div className='border-b border-b-[#dddddd] border-l border-r border-l-[#dddddd] border-r-[#dddddd] flex flex-col w-full rounded-b-[10px] px-3 pb-2 items-start justify-start'>
            <b>Detalles:</b> 
            <p>{eventInfo.event.extendedProps.description}</p>
            {/* <div className='absolute bg-[#ffffff] border-b border-r border-b-[#dddddd] border-r-[#dddddd] w-[.8rem] h-[.8rem] -bottom-[4px] left-[10%] rotate-45'></div> */}
            <b>Paciente:</b> 
            <p>{eventInfo.event.extendedProps.patient}</p>
            {/* <div className='absolute bg-[#ffffff] border-b border-r border-b-[#dddddd] border-r-[#dddddd] w-[.8rem] h-[.8rem] -bottom-[4px] left-[10%] rotate-45'></div> */}
          </div>
        </div>
        <div className='h-2 bg-transparent'>

        </div>
        </>
      )}
      className="bg-[#A375FF] h-full w-full rounded-md border-none p-0"
    >
      <div className='bg-[#A375FF] w-full flex gap-2 p-1 rounded-md h-full'>
        {/* <b className='w-[30%] hover:cursor-default text-[#ffffff] text-ellipsis overflow-hidden'>{eventInfo.timeText}</b> */}
        <span className='w-[100%] hover:cursor-default text-[#ffffff] text-ellipsis overflow-hidden'>{eventInfo.event.title}</span>
      </div>
    </Tooltip>
  );

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
        <div className='calendar-main-container'>
          <div className='calendar-container'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView='dayGridMonth'
              initialDate={currentMonth} 
              datesSet={(info) => {
                setCurrentMonth(info.view.currentStart);
              }}
              editable={false}
              selectable={false}
              selectMirror={false}
              dayMaxEvents={true}
              events={DoctorEvents(appointments, activePatients)}
              eventContent={renderEventContent}
              locale={esLocale}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              }}
              eventLimit={2}
              height={'75vh'}
              width={'100%'}
              slotLabelContent={slotLabelContent}
            />
          </div>
        </div>
      }
    </>
    
  );
}