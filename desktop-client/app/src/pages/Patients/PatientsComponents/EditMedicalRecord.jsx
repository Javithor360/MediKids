import { GiBodyHeight } from 'react-icons/gi'
import { FaWeight, FaTemperatureHigh } from 'react-icons/fa'
import Cleave from 'cleave.js/react'
export const EditMedicalRecord = () => {
  return(
    <>
    <p className='mt-7 ml-7 font-semibold text-[#707070] text-[1.2rem]'>1. Ingrese los siguentes datos</p>
    <form action="" className='flex 2xl:flex-row md:flex-col gap-7 items-center mt-7 mb-7 ml-7 w-fit'>
      <div className='inline-flex items-center gap-3'>
        <GiBodyHeight className='text-[1.8rem] text-[#A375FF]'/>
        <Cleave
          id="height"
          name="height"
          options={{ numericOnly: true, numeral:true, delimiter: ".", numeralIntegerScale: 1, numeralDecimalScale: 2 , numeralPositiveOnly: true}}
          placeholder='Ingrese la altura'
          onChange={""}
          value={""}
          className={'w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem]'}
        />
        <p className='text-[#BBBBBB] text-[1.2rem]'>mt</p>
      </div>
      <div className='inline-flex justify-center items-center gap-3'>
        <FaWeight className='text-[1.8rem] text-[#A375FF]'/>
        <Cleave
          id="weight"
          name="weight"
          options={{ numericOnly: true, numeral:true, delimiter: ".", numeralIntegerScale: 3, numeralDecimalScale: 2 , numeralPositiveOnly: true}}
          placeholder='Ingrese El peso'
          onChange={''}
          value={''}
          className={'w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem]'}
        /> 
        <p className='text-[#BBBBBB] text-[1.2rem]'>lb</p>
      </div>
      <div className='inline-flex justify-center items-center gap-3'>
        <FaTemperatureHigh className='text-[1.8rem] text-[#A375FF]'/>
        <Cleave
          id="temp"
          name="temp"
          options={{ numericOnly: true, numeral:true, delimiter: ".", numeralIntegerScale: 2, numeralDecimalScale: 2 , numeralPositiveOnly: true}}
          placeholder='Ingrese la temperatura'
          onChange={''}
          value={''}
          className={'w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem]'}
        />
        <p className='text-[#BBBBBB] text-[1.2rem]'>°C</p>
      </div>
    </form>
    </>
  );
}
