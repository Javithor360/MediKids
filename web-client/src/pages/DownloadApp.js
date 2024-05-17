import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { NavBar, Footer } from '../components'
import  { MdAndroid, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { AiFillApple } from 'react-icons/ai'
import "./assets/scss/downloadApp.scss"
const AppImages = require.context("./assets/img", true);

export const DownloadApp = () => {
    const { t } = useTranslation();
  return (
    <>
        <NavBar />
        
        <main>
            <div className='w-full h-[100vh]'>
                <div className='w-[95%] h-[70%] flex items-center justify-center m-auto mt-[5rem]'>
                    <div className='h-fit w-3/4 flex flex-col justify-center items-center'>
                        <div>
                            <p className='text-[3.5rem] text-[#A375FF] max-w-[60rem] l'>{t("app.title")}</p>
                            <hr class="w-[40rem] h-1 my-4 bg-[#A375FF] border-0 rounded md:my-10" />
                            <p className='text-[1.2rem] text-[#707070] max-w-[50rem]'>{t("app.sub")}</p>
                            <div className='flex gap-9 mt-9'>
                                <Link className='flex justify-center items-center gap-3 h-[3rem] w-[10rem] bg-white __button-shadow' to="/">
                                    <MdAndroid className='text-[2.5rem]'/> <span>Android</span>
                                </Link>
                                <Link className='flex justify-center items-center gap-3 h-[3rem] w-[10rem] bg-white __button-shadow rounded-md' to="/">
                                    <AiFillApple className='text-[2.5rem]'/> <span>iOS</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-2/4'>
                        <img src={AppImages("./banners/download-app-banner.png")} alt="" className='max-w-full max-h-full ml-auto'/>
                    </div>
                </div>
                <MdOutlineKeyboardArrowDown className='text-[3rem] text-[#707070] animate-bounce mx-auto'/>
            </div>
            <div className='h-[35rem] w-[80rem] mx-auto flex'>
                <div className='h-full w-[35%]'>
                    <img src={AppImages("./mockups/Phone-mockup-1.png")} alt="" className='rounded-[3rem] w-auto h-[100%] m-auto'/>
                </div>
                <div className='h-full w-[65%]'>
                    <div className='w-[34rem] h-[28rem] bg-[#B2A4FF] shadow-md rounded-[3rem] relative mx-auto'>
                        <div className='w-[38rem] h-[31rem] bg-white border border-[#707070] shadow-md rounded-[3rem] absolute top-9 left-7'>
                            <p className='text-[#A375FF] font-bold text-[1.8rem] mt-11 ml-7'>{t("app.title2")}</p>
                            <ul className='__download_list'>
                                <li>{t("app.list1")}</li>
                                <li>{t("app.list2")}</li>
                                <li>{t("app.list3")}</li>
                                <li>Y {t("app.list4")}</li>
                            </ul>
                        </div>
                    </div>  
                </div>
            </div>
            <section className='__download_section w-[75rem] h-[45rem] m-auto rounded-[55px] border border-[#707070] shadow-xl mt-20 mb-60'>
                <div className='w-[65%] h-full m-auto flex flex-col justify-center items-center gap-3'>
                    <img src={AppImages("./icons/phone-image.svg")} alt="" className='w-[5rem]'/>
                    <p className='font-bold text-[3rem] text-[#A375FF]'>{t("app.title3")}</p>
                    <p className='text-[#707070]'>
                    {t("app.sub2")}
                    </p>
                    <div className='w-[100%]  h-[20rem] flex mt-6'>
                        <div className='w-1/2 h-full '>
                            <img src={AppImages("./icons/qr-download-an.jpg")} alt="" className='w-[15rem] block mx-auto'/>
                            <Link className='flex justify-center items-center gap-3 h-[3rem] w-[10rem] bg-white __button-shadow mx-auto mt-4' to="/">
                                <MdAndroid className='text-[2.5rem]'/> <span>Android*</span>
                            </Link>
                        </div>
                        <div className='w-1/2 h-full'>
                            <img src={AppImages("./icons/qr-download-ios.png")} alt="" className='w-[15rem] block mx-auto blur-sm'/>
                            <Link className='flex justify-center items-center gap-3 h-[3rem] w-fit px-2 bg-white __button-shadow rounded-md mx-auto mt-4' to="/">
                                <AiFillApple className='text-[2.5rem]'/> <span>iOS (Deshabilitado)</span>
                            </Link>
                        </div>
                    </div>
                    <p className='text-[#707070] text-[0.9rem] mt-[2rem] max-w-[40rem] text-center'>*{t("app.sub3")}</p>
                </div>
            </section>
        </main>

        <Footer />
    </>
    
  )
}
