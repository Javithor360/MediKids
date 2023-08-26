import { CalendarPicker } from "./CalendarPicker"
import 'react-calendar/dist/Calendar.css';
import TimeSlider from "./TimeSlider";
export const ScheduleAppointment = () => {

  return (
    <div className=''>
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        1. Seleccione una fecha
      </p>
      <CalendarPicker />
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        2. Selecciona un horario
      </p>
      <TimeSlider />
      <p className="mt-9 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        3. Motivo de la cita
      </p>
      <div className="w-[70%] ml-7 mb-4">
        <textarea type="text" placeholder="Escriba el motivo de la cita o detalles" name="" id="" className="mt-7 border border-[#a0a096] outline-none p-[5px] rounded-lg w-[100%] resize-none h-[7rem] focus:ring focus:ring-violet-300 ease-linear duration-200"/>
      </div>

    </div>
  )
}
