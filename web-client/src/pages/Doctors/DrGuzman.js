import "../assets/scss/doctors.scss"
import { NavBar, Footer, DoctorContact, DownloadAppAdd } from "../../components"
import { MdOutlineTipsAndUpdates } from "react-icons/md"
const DocImages = require.context("../assets/img", true);

export const DrGuzman = () => {
  return (
    <>
        <NavBar />
        <div className="__docBannerContainer mb-[20rem]">
            <div className="__docBannerContent flex justify-center relative">
                <div className="__contentText w-[55rem] h-[110%] absolute top-[10rem] flex justify-center">
                    <div className="__layered-content __boxBlue w-[80%] h-[30rem] bg-[#FBFBFB] top-[40%] flex justify-center rounded-[65px] absolute">
                        <div className="rounded-[50%] bg-[#DDD7FF] w-[25rem] h-[25rem] mx-auto absolute overflow-hidden flex justify-center top-[-18rem]">
                            <img src={DocImages("./doctores/dr-guzman-2.png")} alt="" className=" bottom-0 w-auto h-[100%]"/>
                        </div>
                        <p className="text-[2.2rem] text-[#A375FF] font-bold top-[8.2rem] text-center absolute">Dr. Esteban Gúzman
                        <hr class="w-[10rem] h-1 bg-[#A375FF] border-0 rounded mx-auto mt-[1rem]" />
                        </p>
                        <p className="text-[#707070] text-[1.2rem] max-w-[70%] bottom-[4rem] absolute">
                            El Dr. Esteban Gúzman es un Otorrinolaringólogo que en afecciones como sinusitis, otitis, ronquidos, trastornos del equilibrio, etc. Es reconocido por su enfoque compasivo y su habilidad en la realización de procedimientos quirúrgicos especializados en otorrinolaringología y tratamientos a los pacientes pedriáticos.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>

        <p className="text-[2.563rem] ml-16">Un médico en quien puedes <span className="text-[#D48888]">confiar</span><hr class="w-[12rem] h-[2px] bg-[#000000] border-0 rounded mt-[1rem]" /></p>

        <div className="w-[90%] h-[40rem] my-[5rem] mx-auto flex">
            <div className="w-[40%] h-[100%] flex items-center">
                <img src={DocImages("./banners/Doctor-info.png")} alt="" className="w-[90%] h-auto block my-auto mx-auto"/>
            </div>
            <div className="w-[60%] h-full flex items-center">
                <div className="h-[35rem] w-[40rem] bg-[#AFA1F9] relative rounded-[79px] mx-auto">
                    <div className="h-[35rem] w-[40rem] bg-[#DDD7FF] absolute top-[-5rem] z-[-10] rounded-[79px]">
                        <p className="flex items-center gap-3 right-[5rem] top-[1.2rem] text-[1.6rem] text-[#707070] absolute"><MdOutlineTipsAndUpdates />Conoce Más..</p>
                    </div>
                    <ul className="__medical-list  absolute top-[3rem]">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>In vulputate elit quis erat faucibus aliquet.</li>
                        <li>Praesent mauris nulla, posuere vulputate egestas nec, eleifend et diam.</li>
                        <li>Suspendisse porta scelerisque ex, id tincidunt eros eleifend elementum</li>
                    </ul>
                </div>
            </div>
        </div>

        <p className="text-[2.563rem] ml-16">Atención y servicio integral <span className="text-[#D48888]">garantizado</span><hr class="w-[22rem] h-[2px] bg-[#000000] border-0 rounded mt-[1rem]" /></p>

        <p className="ml-16 mt-5 w-[80%] text-[#707070]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus magna nec ex faucibus, nec tincidunt risus cursus. Quisque in dignissim libero. Suspendisse potenti. Nulla vel ante ut justo tincidunt consequat a at lacus. Aenean pretium nibh odio, at maximus risus pretium nec. Mauris tellus ligula, pulvinar ac ullamcorper vel, dictum at dolor. Sed id fermentum enim.
        </p>

        <div className="h-[15rem] grid grid-cols-3 w-[75rem] ml-16 mt-7 bg-[#AFA1F9] rounded-[25px] shadow-md">
            <div>
                <img src={DocImages("./icons/treatment.svg")} alt="" className="ml-11 mt-9 w-[7rem]"/>
                <p className="text-[#FFFFFF] text-[1.6rem] ml-11 mt-7">Tratamiento Efectivo</p>
            </div>
            <div className="bg-[#DDD7FF] scale-[1.05]">
                <img src={DocImages("./icons/service.svg")} alt="" className="ml-11 mt-9 w-[7rem]"/>
                <p className="text-[#707070] text-[1.6rem] ml-11 mt-7">Atención y cuidado</p>
            </div>
            <div>
                <img src={DocImages("./icons/control.svg")} alt="" className="ml-11 mt-9 w-[7rem]"/>
                <p className="text-[#FFFFFF] text-[1.6rem] ml-11 mt-3">Control y chequeos</p>
            </div>
        </div>

        <DoctorContact details={{ cel: '2525 - 2525 | 6757 - 946', email: 'estebanGuzOtorrino@medikids.com' }}/>
        <DownloadAppAdd />
        
        <Footer />
    </>
  )
}
