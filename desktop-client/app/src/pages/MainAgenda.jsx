import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DoctorEvents } from '../utils/DoctorEvents';
import esLocale from '@fullcalendar/core/locales/es';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import '../assets/scss/AgendaStyles.scss'

export const MainAgenda = () => {

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`¿Está seguro de eliminar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }

  const renderEventContent = (eventInfo) => (
    <Tooltip
      title={`Detalles del evento: ${eventInfo.event.extendedProps.description}`} // Personaliza el contenido del tooltip aquí
      position="top"
      trigger="mouseenter"
      theme="light"
      html={(
        <div className='h-[4rem] bg-[#f7f7f7] w-full'>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
          <p>Detalles: {eventInfo.event.extendedProps.description}</p>
          {/* Agrega más detalles personalizados aquí */}
        </div>
      )}
      className="bg-green-300 w-full p-0"
    >
      <div className='h-full bg-[#A375FF] w-full flex gap-2 p-1 rounded-sm'>
        <b className='hover:cursor-default text-[#ffffff]'>{eventInfo.timeText}</b>
        <i className='hover:cursor-default text-[#ffffff] text-ellipsis overflow-hidden'>{eventInfo.event.title}</i>
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
        />
      </div>
    </div>
  );
}