import "../assets/scss/doctors.scss"
import { useTranslation } from "react-i18next";
import { NavBar, Footer, DoctorContact, DownloadAppAdd } from "../../components"
import { MdOutlineTipsAndUpdates } from "react-icons/md"
const DocImages = require.context("../assets/img", true);

export const DraGarza = () => {
    const { t } = useTranslation();
  return (
    <>
        <NavBar />
        <div className="__docBannerContainer mb-[20rem]">
            <div className="__docBannerContent flex justify-center relative">
                <div className="__contentText w-[55rem] h-[110%] absolute top-[10rem] flex justify-center">
                    <div className="__layered-content __boxYellow w-[80%] h-[30rem] bg-[#FBFBFB] top-[40%] flex justify-center rounded-[65px] absolute">
                        <div className="rounded-[50%] bg-[#DDD7FF] w-[25rem] h-[25rem] mx-auto absolute overflow-hidden flex justify-center top-[-18rem]">
                            <img src={DocImages("./doctores/dra-garza-2.png")} alt="" className=" bottom-0 w-auto h-[100%]"/>
                        </div>
                        <p className="text-[2.2rem] text-[#A375FF] font-bold top-[8.2rem] text-center absolute">Dra. Fátima Garza
                        <hr class="w-[10rem] h-1 bg-[#A375FF] border-0 rounded mx-auto mt-[1rem]" />
                        </p>
                        <p className="text-[#707070] text-[1.2rem] max-w-[70%] bottom-[4rem] absolute">
                        {t("DrGarza.subtittle")}
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>

        <p className="text-[2.563rem] ml-16">{t("DrGarza.tittle")} <span className="text-[#D48888]">{t("DrGarza.tittle1")}</span><hr class="w-[12rem] h-[2px] bg-[#000000] border-0 rounded mt-[1rem]" /></p>

        <div className="w-[90%] h-[40rem] my-[5rem] mx-auto flex">
            <div className="w-[40%] h-[100%] flex items-center">
                <img src={DocImages("./banners/Doctor-info.png")} alt="" className="w-[90%] h-auto block my-auto mx-auto"/>
            </div>
            <div className="w-[60%] h-full flex items-center">
                <div className="h-[35rem] w-[40rem] bg-[#AFA1F9] relative rounded-[79px] mx-auto">
                    <div className="h-[35rem] w-[40rem] bg-[#DDD7FF] absolute top-[-5rem] z-[-10] rounded-[79px]">
                        <p className="flex items-center gap-3 right-[5rem] top-[1.2rem] text-[1.6rem] text-[#707070] absolute"><MdOutlineTipsAndUpdates />{t("DrGarza.sub")}</p>
                    </div>
                    <ul className="__medical-list  absolute top-[3rem]">
                        <li>{t("DrGarza.li")}</li>
                        <li>{t("DrGarza.li1")}</li>
                        
                    </ul>
                </div>
            </div>
        </div>

        <p className="text-[2.563rem] ml-16">{t("DrGarza.tittle2")} <span className="text-[#D48888]">{t("DrGarza.tittle3")}</span><hr class="w-[22rem] h-[2px] bg-[#000000] border-0 rounded mt-[1rem]" /></p>

        <p className="ml-16 mt-5 w-[80%] text-[#707070]">
        {t("DrGarza.subtittle1")}
        </p>

        <div className="h-[15rem] grid grid-cols-3 w-[75rem] ml-16 mt-7 bg-[#AFA1F9] rounded-[25px] shadow-md">
            <div>
                <img src={DocImages("./icons/treatment.svg")} alt="" className="ml-11 mt-9 w-[7rem]"/>
                <p className="text-[#FFFFFF] text-[1.6rem] ml-11 mt-7">{t("DrGarza.t1")}</p>
            </div>
            <div className="bg-[#DDD7FF] scale-[1.05]">
                <img src={DocImages("./icons/service.svg")} alt="" className="ml-11 mt-9 w-[7rem]"/>
                <p className="text-[#707070] text-[1.6rem] ml-11 mt-7">{t("DrGarza.t2")}</p>
            </div>
            <div>
                <img src={DocImages("./icons/control.svg")} alt="" className="ml-11 mt-9 w-[7rem]"/>
                <p className="text-[#FFFFFF] text-[1.6rem] ml-11 mt-3">{t("DrGarza.t3")}</p>
            </div>
        </div>

        <DoctorContact details={{ cel: '2525 - 2525 | 7567 - 046', email: 'fatimaGarzaGastro@medikids.com' }}/>
        <DownloadAppAdd />
        
        <Footer />
    </>
  )
}

