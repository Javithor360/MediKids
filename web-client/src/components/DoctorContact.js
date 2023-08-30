import React from 'react'
import { useTranslation } from "react-i18next";
import { MdLocalPhone, MdMail } from "react-icons/md"

export const DoctorContact = ({details}) => {
    const { t } = useTranslation();
  return (
    <>
        <p className="text-[2.563rem] ml-16 mt-9"> {t("DrGarza.tittle4")}<hr class="w-[10rem] h-[2px] bg-[#000000] border-0 rounded mt-[1rem]" /></p>
        <p className="ml-16 mt-5 w-[80%] text-[#707070]">
             {t("DrGarza.subtittle2")}
        </p>
        <div className="w-[60rem] h-[10rem] border border-[#B8B8B8] flex rounded-[25px] shadow-xl ml-16 mt-9">
            <div className="w-1/2 h-full border-[#707070] border-r-[1px] flex items-center">
            <div className="w-fit h-fit mx-auto justify-center items-center flex">
                <span className="text-[#AFA1F9] mr-5 text-[3rem]"><MdLocalPhone/></span>
                <p className="text-[#707070] text-[1.2rem]">{details.cel}</p>
            </div>
            </div>
            <div className="w-1/2 h-full flex items-center">
            <div className="w-fit h-fit mx-auto justify-center items-center flex">
                <span className="text-[#AFA1F9] mr-5 text-[3rem]"><MdMail/></span>
                <p className="text-[#707070] text-[1.2rem]">{details.email}</p>
            </div>
            </div>
        </div>
    
    </>
    
  )
}
