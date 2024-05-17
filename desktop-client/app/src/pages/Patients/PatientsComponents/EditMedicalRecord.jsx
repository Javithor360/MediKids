import { useEffect, useState } from "react";
import { MdSaveAs } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeight, FaTemperatureHigh } from "react-icons/fa";
import Cleave from "cleave.js/react";
import TipTap from "./TipTap";

import Modal from "../../../components/Modal";

export const EditMedicalRecord = ({ setMedicalRecord }) => {
  const [active, setActive] = useState(false);
  const isModal = true;

  // const [medicalRecord, setMedicalRecord] = useState({});

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [notes, setNotes] = useState("");
  const [HtmlNotes, setHtmlNotes] = useState("");

  useEffect(() => {
    setMedicalRecord({ height, weight, temperature, notes, HtmlNotes });
  }, [height, weight, temperature, notes, HtmlNotes]);

  const toggle = () => {
    setActive(!active);
  };
  return (
    <>
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        1. Ingrese los siguientes datos
      </p>
      <form
        action=""
        className="flex items-center 2xl:flex-row md:flex-col gap-7 mt-7 mb-7 ml-7 w-fit"
      >
        <div className="inline-flex items-center gap-3">
          <GiBodyHeight className="text-[1.8rem] text-[#A375FF]" />
          <Cleave
            id="height"
            name="height"
            options={{
              delimiter: '.',
              blocks: [1, 2],
              numericOnly: true
            }}
            placeholder="Ingrese la altura"
            onChange={(e) => {
              if(e.target.value !== "") {
                setHeight(e.target.value);
              } else {
                setHeight(0);
              }
            }}
            value={""}
            className={
              "w-[17rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
            }
          />
          <p className="text-[#BBBBBB] text-[1.2rem]">mt</p>
        </div>
        <div className="inline-flex items-center justify-center gap-3">
          <FaWeight className="text-[1.8rem] text-[#A375FF]" />
          <Cleave
            id="weight"
            name="weight"
            options={{
              numericOnly: true,
              numeral: true,
              delimiter: ".",
              numeralIntegerScale: 3,
              numeralDecimalScale: 2,
              numeralPositiveOnly: true,
            }}
            placeholder="Ingrese el peso"
            onChange={(e) => {
              if(e.target.value !== "") {
                setWeight(e.target.value);
              } else {
                setWeight(0);
              }
            }}
            value={""}
            className={
              "w-[17rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
            }
          />
          <p className="text-[#BBBBBB] text-[1.2rem]">lb</p>
        </div>
        <div className="inline-flex items-center justify-center gap-3">
          <FaTemperatureHigh className="text-[1.8rem] text-[#A375FF]" />
          <Cleave
            id="temp"
            name="temp"
            options={{
              numericOnly: true,
              numeral: true,
              delimiter: ".",
              numeralIntegerScale: 2,
              numeralDecimalScale: 2,
              numeralPositiveOnly: true,
            }}
            placeholder="Ingrese la temperatura"
            onChange={(e) => {
              if(e.target.value !== "") {
                setTemperature(e.target.value);
              } else {
                setTemperature(0);
              }
            }}
            value={""}
            className={
              "w-[17rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem] focus:ring focus:ring-violet-300 ease-linear duration-200"
            }
          />
          <p className="text-[#BBBBBB] text-[1.2rem]">°C</p>
        </div>
      </form>
      <p className="mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        2. Ingrese las anotaciones para el expediente
      </p>
      <div className="w-[90%] ml-7 mt-7 mb-7">
        <TipTap setNotes={setNotes} setHtmlNotes={setHtmlNotes} />
      </div>
      {/* <p className="my-7 ml-7 font-semibold text-[#707070] text-[1.2rem]">
        3. Guarda todos los datos
      </p>
      <button
        className="flex items-center justify-center border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9"
        onClick={() => toggle()}
      >
        <MdSaveAs />
        Guardar
      </button> */}

      {/* {toggle && (
        <Modal active={active} toggle={toggle} onRequestClose={toggle}>
          <div className="w-[20rem] h-[20rem]">
            Estas seguro de guardar los datos
            <button
              className="flex items-center justify-center border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9"
              onClick={() => {
                toggle();
                setFinalMedicalRecord(medicalRecord);
              }}
            >
              <MdSaveAs />
              Aceptar
            </button>
            <button
              className="flex items-center justify-center border-2 border-[#707070] bg-[#A375FF] text-[#FFFFFF] gap-2 w-[7rem] h-[3rem] rounded-lg ml-7 mb-9"
              onClick={() => toggle()}
            >
              <MdSaveAs />
              Cancelar
            </button>
          </div>
        </Modal>
      )} */}
    </>
  );
};
