import { CalendarPicker } from "./CalendarPicker"
import 'react-calendar/dist/Calendar.css';
export const ScheduleAppointment = () => {

  return (
    <div className=''>
      <p className='text-center font-semibold text-[1.5rem] text-[#707070] my-[2rem]'>
        Programar cita
      </p>
      <CalendarPicker />
      <div className="w-[70%] mx-auto block mb-4">
        <p className="my-[1rem] text-[#707070] font-semibold text-[1.2rem]">Motivo de la cita</p>
        <textarea type="text" name="" id="" className="border border-[#a0a096] outline-none p-[5px] rounded-lg w-[100%] resize-none max-h-[5rem] focus:ring focus:ring-violet-300 ease-linear duration-200"/>
      </div>
      <div class="join">
        <input class="join-item btn" type="radio" name="options" aria-label="Radio 1" />
        <input class="join-item btn" type="radio" name="options" aria-label="Radio 2" />
        <input class="join-item btn" type="radio" name="options" aria-label="Radio 3" />
      </div>
    </div>
  )
}
