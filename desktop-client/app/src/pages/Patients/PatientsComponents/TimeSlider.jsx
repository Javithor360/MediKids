import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../components/assets/scss/TimeSlider.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const TimeSlider = ({ setHour, hasSelectedYes, noShowBtn }) => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <AiOutlineLeft />,
    nextArrow: <AiOutlineRight />,
  };

  const timeValues = [
    "07:00 a.m.",
    "09:00 a.m.",
    "11:00 a.m.",
    "02:00 p.m.",
    "04:00 p.m.",
    "06:00 p.m.",
  ];

  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    if (!hasSelectedYes) {
      setSelectedTime(time);
      setHour(convertTo24HourFormat(time));
    }
  };

  return (
    <>
      <div className="w-[30rem] mt-[1.75rem]">
        <Slider {...sliderSettings} className="flex flex-row ml-12">
        {timeValues.map((time, index) => (
          <button
            key={index}
            onClick={() => handleTimeClick(time)}
            className={`time-card ease-in duration-200 ${
              selectedTime === time
                ? "bg-[#A375FF] border-[2px] border-[#A375FF]"
                : "bg-white border-[2px] border-[#c6c6c6]"
            } ${hasSelectedYes || noShowBtn ? "disabled" : ""}`}
            disabled={hasSelectedYes}
          >
            <p
              className={`${
                selectedTime === time ? "text-[#FFFFFF]" : "text-[#000000]"
              }`}
            >
              {time}
            </p>
          </button>
        ))}
        </Slider>
      </div>
      {selectedTime ? (
        <>
          <div className="flex flex-row items-center gap-4 ml-12 w-fit mt-9">
            <div className="w-fit bg-[#f7f7f7] px-5 py-1 border border-[#c6c6c6] rounded-lg">
              <p className="">
                <span className="font-semibold">Hora seleccionada: </span>
                {selectedTime}
              </p>
            </div>
            <button
              className="flex flex-row items-center justify-center h-[2rem] w-fit text-[#ffffff] mx-auto rounded-lg"
              onClick={() => {
                setSelectedTime(null);
                setHour(null);
              }}
            >
              <TiDeleteOutline className="text-red-500 text-[1.2rem] mt-[.1rem]" />
              <span className="text-red-500 h-fit">Borrar</span>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default TimeSlider;

function convertTo24HourFormat(timeString) {
  const [time, period] = timeString.split(' ');
  let [hour, minute] = time.split(':');

  hour = parseInt(hour, 10);
  minute = parseInt(minute, 10);

  if (period === 'p.m.' && hour !== 12) {
    hour += 12;
  } else if (period === 'a.m.' && hour === 12) {
    hour = 0;
  }

  hour = hour.toString().padStart(2, '0');
  minute = minute.toString().padStart(2, '0');

  return `${hour}:${minute}:00`;
}
