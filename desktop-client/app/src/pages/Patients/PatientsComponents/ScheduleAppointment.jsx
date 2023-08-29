import { CalendarPicker } from "./CalendarPicker";
import "react-calendar/dist/Calendar.css";
import TimeSlider from "./TimeSlider";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ScheduleAppointment = ({ setScheAppoint, nextAppointment }) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [hasSelectedYes, sethasSelectedYes] = useState(false);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [reason, setReason] = useState(null);

  useEffect(() => {
    setScheAppoint({
      hasSelectedYes: true, // CUANDO SE IMPLEMENTE LA ACTIVACIÓN DEL COMPONENTE SE CAMBIARÁ POR EL USESTATE
      originalAppointment: nextAppointment.id,
      Doctor_id: JSON.parse(localStorage.getItem("userSession")).id,
      Responsible_id: patient.Responsible_id,
      Patient_id: patient.id,
      Description: reason,
      Date: new Date(date).toISOString().split("T")[0],
      Hour: hour,
    });
  }, [date, hour, reason]);

  return (
    <div className="">
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        1. Seleccione una fecha
      </p>
      <CalendarPicker setDate={setDate} />
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        2. Selecciona un horario
      </p>
      <TimeSlider setHour={setHour} />
      <p className="mt-9 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        3. Motivo de la cita
      </p>
      <div className="w-[70%] ml-7 mb-4">
        <textarea
          type="text"
          placeholder="Escriba el motivo de la cita o detalles"
          className="mt-7 border border-[#a0a096] outline-none p-[5px] rounded-lg w-[100%] resize-none h-[7rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </div>
  );
};
