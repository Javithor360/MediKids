import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../components/assets/scss/TimeSlider.css'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { TiDeleteOutline } from "react-icons/ti";

const TimeSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <AiOutlineLeft/>,
    nextArrow: <AiOutlineRight/>
  };

  const timeValues = ["10:00 pm", "09:00 am", "12:00 pm", "01:00 pm", "08:00 am", "09:00 pm"];

  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <>
        <div className='w-[30rem] mt-[1.75rem]'>
            <Slider {...sliderSettings} className='ml-12 flex flex-row'>
                {timeValues.map((time, index) => (
                    <button
                        key={index}
                        onClick={() => handleTimeClick(time)}
                        className={`time-card ease-in duration-200 ${selectedTime === time ? 'bg-[#A375FF] border-[2px] border-[#A375FF]' : 'bg-white border-[2px] border-[#c6c6c6]'}`}
                    >
                        <p className={`${selectedTime === time ? 'text-[#FFFFFF]' : 'text-[#000000]'}`}>{time}</p>
                    </button>
                ))}
            </Slider>
        </div>
        {
            selectedTime ?
            <>
                <div className='flex flex-row gap-4 w-fit items-center ml-12 mt-9'>
                  <div className='w-fit bg-[#f7f7f7] px-5 py-1 border border-[#c6c6c6] rounded-lg'>
                      <p className=''><span className='font-semibold'>Hora seleccionada: </span>{selectedTime}</p>
                  </div>
                  <button className='flex flex-row items-center justify-center h-[2rem] w-fit text-[#ffffff] mx-auto rounded-lg' onClick={()=>setSelectedTime(null)}><TiDeleteOutline className='text-red-500 text-[1.2rem] mt-[.1rem]'/><span className='text-red-500 h-fit'>Borrar</span></button>
                </div>
            </>
            :
            null
        }
    </>

  );
};

export default TimeSlider;