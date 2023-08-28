import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DoctorEvents } from '../utils/DoctorEvents';
import esLocale from '@fullcalendar/core/locales/es';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import '../assets/scss/AgendaStyles.scss'
import { BsDot } from 'react-icons/bs'

export const MainAgenda = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`¿Está seguro de eliminar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }
  const renderEventContent = (eventInfo) => (
    <Tooltip
      position="top-start"
      trigger="mouseenter"
      theme="light"
      delay={300}
      distance={3}
      html={(
        <>
        <div className='h-full w-full flex flex-col items-start rounded-t-sm relative'>
          <div className='flex w-full bg-[#e6e5fe] border border-[#dddddd] rounded-t-[10px] px-3 py-2 items-center justify-start'>
            <b>{eventInfo.timeText}</b>
            <BsDot />
            <i>{eventInfo.event.title}</i>
          </div>
          <div className='border-b border-b-[#dddddd] border-l border-r border-l-[#dddddd] border-r-[#dddddd] flex flex-col w-full rounded-b-[10px] px-3 pb-2 items-start justify-start'>
            <b>Detalles:</b> 
            <p>{eventInfo.event.extendedProps.description}</p>
            <div className='absolute bg-[#ffffff] border-b border-r border-b-[#dddddd] border-r-[#dddddd] w-[.8rem] h-[.8rem] -bottom-[4px] left-[10%] rotate-45'></div>
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
    <div className='demo-app'>
      <div className='demo-app-main'>
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
            setCurrentMonth(info.view.currentStart); // Actualiza el estado cuando cambie el mes
          }}
          editable={false}
          selectable={false}
          selectMirror={false}
          dayMaxEvents={true}
          initialEvents={DoctorEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          locale={esLocale}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }}
          eventLimit={2}
        />
      </div>
    </div>
  );
}