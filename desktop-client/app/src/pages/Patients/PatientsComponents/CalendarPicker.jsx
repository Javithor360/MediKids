import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../../assets/scss/CalendarPickerStyles.scss'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
export function CalendarPicker() {
  const [value, setValue] = useState(null);
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  const handleDateChange = (date) => {
    setValue(date);
  }

  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
        {
            value ?
            <>
                <div className='w-fit mx-auto bg-[#f7f7f7] px-5 py-2 border border-[#c6c6c6] rounded-lg mt-4'>
                    <p className=''><span className='font-semibold'>Fecha seleccionada: </span>{formatDate(value)}</p>
                </div>
                <button className='py-1 px-5 my-4 text-[#ffffff] mx-auto block rounded-lg bg-[#A375FF]' onClick={()=>setValue(null)}>Borrar</button>
            </>
            :
            null
        }
        {/* <div className='w-fit mx-auto bg-[#f7f7f7] px-5 py-2 border border-[#c6c6c6] rounded-lg mt-4'>
            <p className=''><span className='font-semibold'>Fecha seleccionada: </span>{formatDate(value)}</p>
        </div> */}
        
    </>
  );
}
