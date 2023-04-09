import { Link } from 'react-router-dom';
import { NavBar, Footer } from '../components'
import  { MdAndroid, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { AiFillApple } from 'react-icons/ai'
import "./assets/scss/downloadApp.scss"
const AppImages = require.context("./assets/img", true);

export const DownloadApp = () => {
  return (
    <>
        <NavBar />
        
        <main>
            <div className='w-full h-[100vh]'>
                <div className='w-[95%] h-[70%] flex items-center justify-center m-auto mt-[5rem]'>
                    <div className='h-fit w-3/4 flex flex-col justify-center items-center'>
                        <div>
                            <p className='text-[3.5rem] text-[#A375FF] max-w-[60rem] l'>El cuidado y la buena salud nunca fue tan accesible</p>
                            <hr class="w-[40rem] h-1 my-4 bg-[#A375FF] border-0 rounded md:my-10" />
                            <p className='text-[1.2rem] text-[#707070] max-w-[50rem]'>Obtén los mejores servicios de la forma más fácil, sencilla y amigable en nuestra App, en ella tendrás numerosas funcionalidades para cuidar la salud de tus hijos</p>
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
                    <img src={AppImages("./mockups/Phone mockup 1.png")} alt="" className='rounded-[3rem] w-auto h-[100%] m-auto'/>
                </div>
                <div className='h-full w-[65%]'>
                    <div className='w-[34rem] h-[28rem] bg-[#B2A4FF] shadow-md rounded-[3rem] relative mx-auto'>
                        <div className='w-[38rem] h-[31rem] bg-white border border-[#707070] shadow-md rounded-[3rem] absolute top-9 left-7'>
                            <p className='text-[#A375FF] font-bold text-[1.8rem] mt-11 ml-7'>Todo lo que necesitas en un solo lugar</p>
                            <ul className='__download_list'>
                                <li>Obten un resumen de la actividad medica de tus hijos</li>
                                <li>Agenda citas, y recíbelas de forma virtual a través de la app</li>
                                <li>Mantente al día y mediante los recordatorios y el calendario personalizado con eventos</li>
                                <li>Y mucho más...</li>
                            </ul>
                        </div>
                    </div>  
                </div>
            </div>
            <section className='__download_section w-[75rem] h-[45rem] m-auto rounded-[55px] border border-[#707070] shadow-xl mt-20 mb-60'>
                <div className='w-[65%] h-full m-auto flex flex-col justify-center items-center gap-3'>
                    <img src={AppImages("./icons/phone-image.svg")} alt="" className='w-[5rem]'/>
                    <p className='font-bold text-[3rem] text-[#A375FF]'>Descárgala Ya</p>
                    <p className='text-[#707070]'>
                        Solo escanea el <span className='text-[#A375FF] font-bold'>código QR</span> y empieza a ser parte de la familia MediKids
                    </p>
                    <div className='w-[100%]  h-[20rem] flex mt-6'>
                        <div className='w-1/2 h-full '>
                            <img src={AppImages("./icons/qr-download.png")} alt="" className='w-[15rem] block mx-auto'/>
                            <Link className='flex justify-center items-center gap-3 h-[3rem] w-[10rem] bg-white __button-shadow mx-auto mt-4' to="/">
                                <MdAndroid className='text-[2.5rem]'/> <span>Android*</span>
                            </Link>
                        </div>
                        <div className='w-1/2 h-full'>
                            <img src={AppImages("./icons/qr-download.png")} alt="" className='w-[15rem] block mx-auto'/>
                            <Link className='flex justify-center items-center gap-3 h-[3rem] w-[10rem] bg-white __button-shadow rounded-md mx-auto mt-4' to="/">
                                <AiFillApple className='text-[2.5rem]'/> <span>iOS</span>
                            </Link>
                        </div>
                    </div>
                    <p className='text-[#707070] text-[0.9rem] mt-[2rem] max-w-[40rem] text-center'>*Instala el archivo .apk, pero primero permite la instalación de orígenes desconocidos y luego podrás seguir normalmente con la instalación</p>
                </div>
            </section>
        </main>

        <Footer />
    </>
    
  )
}
