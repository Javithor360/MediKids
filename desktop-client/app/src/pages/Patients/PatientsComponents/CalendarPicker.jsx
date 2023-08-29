import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../assets/scss/CalendarPickerStyles.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

export function CalendarPicker({ setDate }) {
  const [value, setValue] = useState(null);
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  const handleDateChange = (date) => {
    setValue(date);
    setDate(date);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Calendar
        minDate={nextDay}
        onChange={handleDateChange}
        value={value}
        prev2Label={<BsChevronDoubleLeft />}
        prevLabel={<AiOutlineLeft />}
        next2Label={<BsChevronDoubleRight />}
        nextLabel={<AiOutlineRight />}
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
      {/* <div className='w-fit mx-auto bg-[#f7f7f7] px-5 py-2 border border-[#c6c6c6] rounded-lg mt-4'>
            <p className=''><span className='font-semibold'>Fecha seleccionada: </span>{formatDate(value)}</p>
        </div> */}
    </>
  );
}
