import { CalendarPicker } from "./CalendarPicker";
import "react-calendar/dist/Calendar.css";
import TimeSlider from "./TimeSlider";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Toggle from "react-toggle";
export const ScheduleAppointment = ({ setScheAppoint, nextAppointment }) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [hasSelectedYes, setHasSelectedYes] = useState(false);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [reason, setReason] = useState(null);

  useEffect(() => {
    setScheAppoint({
      hasSelectedYes,
      Description: reason,
      Date: new Date(date).toISOString().split("T")[0],
      Hour: hour,
    });
  }, [date, hour, reason, hasSelectedYes]);

  const handleChange = async () => {
    setHasSelectedYes(!hasSelectedYes);
  };

  const restrictedDays = false;

  return (
    <div className="">
      <div className="inline-flex items-center gap-2 mb-3 ml-7 mt-7">
        <p className="font-semibold text-[#707070] text-[1.1rem]">
          ¿Programar una cita próxima?
        </p>
        <form>
          <label className=" mr-5 text-[#707070] text-[1.2rem] " for="add_yes">
            <Toggle
              className="mt-2"
              checked={hasSelectedYes}
              onChange={handleChange}
              id="add_yes"
              name="selection"
              value="add_yes"
              icons={true}
            />
          </label>
        </form>
      </div>
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        1. Seleccione una fecha
      </p>
      <CalendarPicker setDate={setDate} hasSelectedYes={!hasSelectedYes} restrictedDays={restrictedDays}/>
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        2. Selecciona un horario
      </p>
      <TimeSlider setHour={setHour} hasSelectedYes={!hasSelectedYes}/>
      <p className="mt-9 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        3. Motivo de la cita
      </p>
      <div className="w-[70%] ml-7 mb-4">
        <textarea
          type="text"
          placeholder="Escriba el motivo de la cita o detalles"
          className="mt-7 border border-[#a0a096] outline-none p-[5px] rounded-lg w-[100%] resize-none h-[7rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          onChange={(e) => setReason(e.target.value)}
          disabled={!hasSelectedYes}
        />
      </div>
    </div>
  );
};
