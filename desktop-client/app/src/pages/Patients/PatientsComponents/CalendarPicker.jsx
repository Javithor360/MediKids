import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { isBefore, isSameDay, startOfMonth } from "date-fns";
import "../../../assets/scss/CalendarPickerStyles.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { BsCalendarXFill } from "react-icons/bs"
export function CalendarPicker({ setDate, hasSelectedYes, restrictedDays, formattedEndDate, formattedInitialDate, handleChangeData }) {
  const [value, setValue] = useState(null);
  const [showEndDateMessage, setShowEndDateMessage] = useState(null);

  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  const handleDateChange = (date) => {
    setValue(date);
    setDate(date);
  };
  
  useEffect(() => {
    if (restrictedDays && !isBefore(currentDate, formattedEndDate)) {
      setShowEndDateMessage(true);
    } else {
      setShowEndDateMessage(false);
    }
  }, [formattedEndDate, restrictedDays]);

  useEffect(() => {
    if(restrictedDays){
      handleChangeData(showEndDateMessage);
    }
  }, [showEndDateMessage])

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const isDateDisabled = (date) => {
    return isBefore(date, currentDate) || isSameDay(date, currentDate);
  };

  const initialMonthStartDate = startOfMonth(formattedInitialDate);

  return (
  <>
    {showEndDateMessage && (
      <div className="ml-7 mt-7 flex flex-row h-[100%] w-[90%]">
        <div className="bg-red-300 flex flex-row h-[inherit] w-[inherit]">
          <div className="w-4 h-full bg-red-400"></div>
          <div className="h-full bg-[#ffe9d9] flex flex-row gap-3 p-5 items-center">
            <BsCalendarXFill className="text-red-400 text-[1.3rem]"/>
            <span className="text-[#707070]">¡La fecha de límite ha llegado!, deberá rechazar la cita o ponerse en contacto con el responsable</span>
          </div>
        </div>
      </div>
    )}
    <div className="relative w-fit">
      <Calendar
        minDate={restrictedDays ? formattedInitialDate : tomorrowDate}
        maxDate={formattedEndDate}
        onChange={handleDateChange}
        value={value}
        prev2Label={<BsChevronDoubleLeft />}
        prevLabel={<AiOutlineLeft />}
        next2Label={<BsChevronDoubleRight />}
        nextLabel={<AiOutlineRight />}
        tileDisabled={restrictedDays ? ({ date }) => isDateDisabled(date) : null}
        className={hasSelectedYes ? 'custom-calendar' : null}
        activeStartDate={restrictedDays ? initialMonthStartDate : null}
      />
      {value ? (
        <>
          <div className="flex flex-row items-center gap-4 w-fit ml-7">
            <div className="w-fit bg-[#f7f7f7] px-5 py-1 border border-[#c6c6c6] rounded-lg">
              <p className="">
                <span className="font-semibold">Fecha seleccionada: </span>
                {formatDate(value)}
              </p>
            </div>
            <button
              className="flex flex-row items-center justify-center h-[2rem] w-fit text-[#ffffff] mx-auto rounded-lg"
              onClick={() => {
                setValue(null);
                setDate(null);
              }}
            >
              <TiDeleteOutline className="text-red-500 text-[1.2rem] mt-[.1rem]" />
              <span className="text-red-500 h-fit">Borrar</span>
            </button>
          </div>
        </>
      ) : null}
      {
        restrictedDays && ( 
          <div className="overlapped"></div>
      )}
    </div>
  </>
  );
}